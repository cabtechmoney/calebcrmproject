'use client';

import Link from 'next/link';
import { FormEvent, useEffect, useState } from 'react';
import { api } from '../../lib/api';
import type { Project } from '../../lib/types';

type ProjectDraft = { title: string; description: string; budget: string; status: string; deadline: string };
const emptyDraft: ProjectDraft = { title: '', description: '', budget: '', status: 'Planning', deadline: '' };

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [draft, setDraft] = useState<ProjectDraft>(emptyDraft);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const loadProjects = async () => {
    setIsLoading(true);
    setError('');
    try {
      setProjects(await api<Project[]>('/projects'));
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Could not load projects.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { void loadProjects(); }, []);

  const saveProject = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    setError('');
    const payload = { ...draft, budget: draft.budget ? Number(draft.budget) : null, deadline: draft.deadline || null };
    try {
      const project = await api<Project>(editingId ? `/projects/${editingId}` : '/projects', {
        method: editingId ? 'PUT' : 'POST', body: JSON.stringify(payload),
      });
      setProjects((current) => editingId
        ? current.map((item) => item.id === project.id ? project : item)
        : [project, ...current]);
      setDraft(emptyDraft);
      setEditingId(null);
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Could not save project.');
    } finally {
      setIsSaving(false);
    }
  };

  const editProject = (project: Project) => {
    setEditingId(project.id);
    setDraft({ title: project.title, description: project.description ?? '', budget: project.budget?.toString() ?? '', status: project.status ?? 'Planning', deadline: project.deadline?.slice(0, 10) ?? '' });
  };

  const deleteProject = async (id: string) => {
    setError('');
    try {
      await api<void>(`/projects/${id}`, { method: 'DELETE' });
      setProjects((current) => current.filter((project) => project.id !== id));
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'Could not delete project.');
    }
  };

  return (
    <main className="page-shell">
      <header className="page-header">
        <div><p className="eyebrow">Projects</p><h1>Delivery pipeline</h1></div>
        <nav className="page-nav">
          <Link href="/">Overview</Link>
          <Link href="/clients">Clients</Link>
          <Link href="/projects/new">New project</Link>
        </nav>
      </header>

      <form className="page-card mb-6 grid gap-3 sm:grid-cols-2" onSubmit={saveProject}>
        <h2 className="sm:col-span-2">{editingId ? 'Edit project' : 'Quick project update'}</h2>
        <input required aria-label="Project title" placeholder="Project title" value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} />
        <input type="number" min="0" aria-label="Budget" placeholder="Budget" value={draft.budget} onChange={(event) => setDraft({ ...draft, budget: event.target.value })} />
        <input aria-label="Status" placeholder="Status" value={draft.status} onChange={(event) => setDraft({ ...draft, status: event.target.value })} />
        <input type="date" aria-label="Deadline" value={draft.deadline} onChange={(event) => setDraft({ ...draft, deadline: event.target.value })} />
        <textarea className="sm:col-span-2" aria-label="Description" placeholder="Description" value={draft.description} onChange={(event) => setDraft({ ...draft, description: event.target.value })} />
        <div className="flex gap-2 sm:col-span-2">
          <button className="primary-button" disabled={isSaving}>{isSaving ? 'Saving...' : editingId ? 'Save changes' : 'Update project'}</button>
          {editingId && <button type="button" className="secondary-button" onClick={() => { setEditingId(null); setDraft(emptyDraft); }}>Cancel</button>}
        </div>
      </form>

      {error && <p className="form-error mb-4" role="alert">{error} <button type="button" onClick={() => void loadProjects()}>Retry</button></p>}
      {isLoading ? <p role="status">Loading projects...</p> : projects.length === 0 ? <p className="page-card">No projects yet. Create a project to start your pipeline.</p> : (
        <section className="card-grid">
          {projects.map((project) => (
            <article key={project.id} className="page-card">
              <span className="page-chip">{project.status || 'New'}</span>
              <h3><Link href={`/projects/${project.id}`}>{project.title || 'Untitled project'}</Link></h3>
              <p>{project.description || 'No description yet.'}</p>
              <div className="meta-row"><span>{project.deadline || 'No deadline'}</span><strong>{project.budget ? `$${project.budget.toLocaleString()}` : '$0'}</strong></div>
              <div className="mt-4 flex gap-2">
                <button type="button" className="secondary-button" onClick={() => editProject(project)}>Edit</button>
                <button type="button" className="danger-button" onClick={() => void deleteProject(project.id)}>Delete</button>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
