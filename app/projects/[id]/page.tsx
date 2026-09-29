"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PageHeader, Panel, StatCard } from "@/components/ui";
import { api } from "@/lib/api";
import type { Project } from "@/lib/types";

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    setError("");
    api<Project>(`/projects/${id}`)
      .then(setProject)
      .catch((loadError: unknown) => setError(loadError instanceof Error ? loadError.message : "Could not load project."))
      .finally(() => setIsLoading(false));
  }, [attempt, id]);

  if (isLoading) return <p className="p-6" role="status">Loading project...</p>;

  if (!project) {
    return (
      <div>
        <PageHeader
          title={error ? "Project unavailable" : "Project not found"}
          description={error || "The requested project could not be found."}
          action={
            <div className="flex gap-2">
              {error && <button type="button" onClick={() => setAttempt((current) => current + 1)} className="inline-flex h-10 items-center rounded-md border border-[color:var(--border)] px-4 text-sm font-semibold text-[color:var(--text)] hover:bg-[color:var(--surface-alt)]">Retry</button>}
              <Link href="/projects" className="inline-flex h-10 items-center rounded-md border border-[color:var(--border)] px-4 text-sm font-semibold text-[color:var(--text)] hover:bg-[color:var(--surface-alt)]">Back to projects</Link>
            </div>
          }
        />
      </div>
    );
  }

  const budgetValue = project.budget ? `$${project.budget.toLocaleString()}` : "N/A";
  const statusTone = project.status === "Completed" ? "emerald" : project.status === "At risk" ? "rose" : "amber";

  return (
    <div>
      <PageHeader
        title={project.title ?? `Project #${project.id}`}
        description="A focused view of project health, budget, milestones, and client commitments."
        action={
          <Link href="/projects" className="inline-flex h-10 items-center rounded-md border border-[color:var(--border)] px-4 text-sm font-semibold text-[color:var(--text)] hover:bg-[color:var(--surface-alt)]">
            Back to projects
          </Link>
        }
      />

      {error && <p className="form-error mb-4" role="alert">{error}</p>}

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Client" value={project.client?.name ?? "Unassigned"} trend={project.clientId ? "Connected" : "Missing"} tone="slate" />
        <StatCard label="Status" value={project.status ?? "Pending"} trend="Current" tone={statusTone} />
        <StatCard label="Budget" value={budgetValue} trend={project.deadline ? `Due ${new Date(project.deadline).toLocaleDateString()}` : "No deadline"} tone="slate" />
      </div>

      <Panel title="Project summary">
        <div className="space-y-4 text-sm text-[color:var(--text-muted)]">
          <p>{project.description ?? "No project description has been added yet."}</p>
          <p>
            <span className="font-semibold text-[color:var(--text)]">Project created:</span>{" "}
            {project.id}
          </p>
        </div>
      </Panel>
    </div>
  );
}
