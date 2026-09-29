'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { api } from '../lib/api';
import { LogoutButton } from '../components/auth/LogoutButton';

type Project = {
  id: string;
  title?: string;
  description?: string;
  budget?: number;
  status?: string;
  deadline?: string;
  client?: { name?: string };
};

const tasks = [
  'Review onboarding checklist for 3 new clients',
  'Prepare analytics snapshot for Q3 pipeline review',
  'Follow up with 5 overdue proposals',
  'Approve design revisions for Brandlift project',
];

const activities = [
  { name: 'Maria', action: 'updated pricing for Atlas Renewal', time: '12 min ago' },
  { name: 'Leo', action: 'shared notes on onboarding kickoff', time: '34 min ago' },
  { name: 'Sonia', action: 'closed the Summit Works deal', time: '1 hour ago' },
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);

export default function HomePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    let isActive = true;
    let timedOut = false;
    const timeout = setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, 20000);

    const loadProjects = async () => {
      try {
        const data = await api<Project[]>('/projects', {
          signal: controller.signal,
          cache: 'no-store',
        });
        if (isActive) setProjects(Array.isArray(data) ? data : []);
      } catch (loadError) {
        if (!isActive) return;
        setError(timedOut
          ? 'Project data is taking longer than expected. Check the API connection and retry.'
          : loadError instanceof Error ? loadError.message : 'Could not load projects.');
      } finally {
        clearTimeout(timeout);
        if (isActive) setIsLoading(false);
      }
    };

    void loadProjects();
    return () => {
      isActive = false;
      clearTimeout(timeout);
      controller.abort();
    };
  }, []);

  const stats = useMemo(() => {
    const totalRevenue = projects.reduce((sum, project) => sum + (project.budget ?? 0), 0);
    const active = projects.filter((project) => !['completed', 'closed'].includes((project.status ?? '').toLowerCase())).length;
    const won = projects.filter((project) => (project.status ?? '').toLowerCase() === 'won').length;

    return [
      { label: 'Projects', value: String(projects.length), change: '+12.5%', tone: 'positive' },
      { label: 'Active deals', value: String(active), change: '+8.4%', tone: 'positive' },
      { label: 'Revenue', value: formatCurrency(totalRevenue), change: '+12.1%', tone: 'positive' },
      { label: 'Won', value: String(won), change: '-3.1%', tone: 'neutral' },
    ];
  }, [projects]);

  const pipeline = useMemo(
    () =>
      projects.slice(0, 3).map((project, index) => ({
        name: project.title || 'Untitled project',
        stage: project.status || 'New',
        value: formatCurrency(project.budget ?? 0),
        color: index === 0 ? 'blue' : index === 1 ? 'purple' : 'teal',
      })),
    [projects],
  );

  return (
    <main className="dashboard-shell">
      <aside className="sidebar">
        <div className="brand-block">
          <div className="brand-mark">C</div>
          <div>
            <p className="brand-name">Caleb CRM</p>
            <small>Operations Suite</small>
          </div>
        </div>

        <nav className="nav">
          <Link href="/" className="nav-item active">Overview</Link>
          <Link href="/clients" className="nav-item">Clients</Link>
          <Link href="/projects" className="nav-item">Projects</Link>
          <LogoutButton className="nav-item" />
        </nav>
      </aside>

      <section className="main-panel">
        <header className="topbar">
          <div>
            <p className="eyebrow">Executive overview</p>
            <h1>Welcome back, Caleb</h1>
          </div>
          <button className="primary-button">+ New report</button>
        </header>

        <div className="stats-grid">
          {stats.map((stat) => (
            <article key={stat.label} className="stat-card">
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
              <em className={stat.tone}>{stat.change}</em>
            </article>
          ))}
        </div>

        <div className="content-grid">
          <article className="panel">
            <div className="panel-header">
              <h2>Pipeline</h2>
              <a href="#">View all</a>
            </div>

            <div className="pipeline-list">
              {isLoading ? (
                <div role="status">Loading projects...</div>
              ) : error ? (
                <div role="alert">{error} <button type="button" onClick={() => window.location.reload()}>Retry</button></div>
              ) : pipeline.length ? (
                pipeline.map((deal) => (
                  <div key={deal.name} className="deal-row">
                    <div className="deal-left">
                      <span className={`dot ${deal.color}`} />
                      <div>
                        <strong>{deal.name}</strong>
                        <small>{deal.stage}</small>
                      </div>
                    </div>
                    <span>{deal.value}</span>
                  </div>
                ))
              ) : (
                <div>No project data available yet.</div>
              )}
            </div>
          </article>

          <article className="panel">
            <div className="panel-header">
              <h2>Tasks</h2>
              <a href="#">Today</a>
            </div>

            <ul className="task-list">
              {tasks.map((task) => (
                <li key={task}>{task}</li>
              ))}
            </ul>
          </article>
        </div>

        <article className="panel full-panel">
          <div className="panel-header">
            <h2>Recent activity</h2>
            <a href="#">Sync</a>
          </div>

          <div className="activity-list">
            {activities.map((item) => (
              <div key={item.name + item.time} className="activity-row">
                <div className="avatar">{item.name[0]}</div>
                <div>
                  <strong>{item.name}</strong>
                  <p>{item.action}</p>
                </div>
                <span>{item.time}</span>
              </div>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}
