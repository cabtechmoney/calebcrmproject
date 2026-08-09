import Link from "next/link";
import { KanbanBoard } from "@/components/kanban-board";
import { PageHeader, Panel } from "@/components/ui";
import { api } from "@/lib/api";
import type { Project } from "@/lib/types";

export const dynamic = "force-dynamic";

async function getProjects() {
  try {
    return await api<Project[]>("/projects");
  } catch {
    return [];
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects();
  const inFlightCount = projects.filter((project) => project.status && project.status !== "Completed").length;
  const budgetTotal = projects.reduce((sum, project) => sum + (project.budget ?? 0), 0);
  const riskCount = projects.filter((project) => project.status === "At risk" || project.status === "Delayed").length;

  return (
    <div>
      <PageHeader
        title="Projects"
        description="Monitor delivery status, budgets, and client commitments."
        action={
          <Link
            href="/projects/new"
            className="inline-flex h-10 items-center rounded-md bg-[color:var(--accent)] px-4 text-sm font-semibold text-white hover:bg-[color:var(--accent-hover)]"
          >
            New project
          </Link>
        }
      />

      <div className="mb-6 grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] p-4 shadow-sm">
          <p className="text-sm text-[color:var(--text-muted)]">In flight</p>
          <p className="mt-2 text-2xl font-semibold text-[color:var(--text)]">{inFlightCount}</p>
        </div>
        <div className="rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] p-4 shadow-sm">
          <p className="text-sm text-[color:var(--text-muted)]">Budget tracked</p>
          <p className="mt-2 text-2xl font-semibold text-[color:var(--text)]">${budgetTotal.toLocaleString()}</p>
        </div>
        <div className="rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] p-4 shadow-sm">
          <p className="text-sm text-[color:var(--text-muted)]">Milestones at risk</p>
          <p className="mt-2 text-2xl font-semibold text-[color:var(--text)]">{riskCount}</p>
        </div>
      </div>

      <Panel title="Active Work">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="border-b border-[color:var(--border)] text-left text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--text-muted)]">
                <th className="pb-3">Title</th>
                <th className="pb-3">Client</th>
                <th className="pb-3">Budget</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[color:var(--border)]">
              {projects.map((project) => (
                <tr key={project.id}>
                  <td className="py-4 font-medium text-[color:var(--text)]">{project.title}</td>
                  <td className="py-4 text-[color:var(--text-muted)]">{project.client?.name ?? "Unassigned"}</td>
                  <td className="py-4 text-[color:var(--text-muted)]">
                    {project.budget ? `$${project.budget.toLocaleString()}` : "—"}
                  </td>
                  <td className="py-4 text-[color:var(--text-muted)]">{project.status ?? "Pending"}</td>
                  <td className="py-4">
                    {project.id ? (
                      <Link
                        href={`/projects/${project.id}`}
                        className="rounded-md border border-[color:var(--border)] px-3 py-1.5 text-sm font-medium text-[color:var(--text)] transition hover:bg-[color:var(--surface-alt)]"
                      >
                        View
                      </Link>
                    ) : (
                      <span className="text-sm text-[color:var(--text-muted)]">Missing ID</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <Panel title="Kanban Board" className="mt-6">
        <KanbanBoard />
      </Panel>
    </div>
  );
}
