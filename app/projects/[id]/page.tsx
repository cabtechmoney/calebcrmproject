import Link from "next/link";
import { PageHeader, Panel, StatCard } from "@/components/ui";
import { api } from "@/lib/api";
import type { Project } from "@/lib/types";
export const dynamic = "force-dynamic";
type ProjectDetailPageProps = {
  params: Promise<{ id: string }>;
};

async function getProject(id: string): Promise<Project | null> {
  if (!id || id === "undefined") return null;

  try {
    return await api<Project>(`/projects/${id}`);
  } catch {
    return null;
  }
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    return (
      <div>
        <PageHeader
          title="Project not found"
          description="The requested project could not be loaded. If the database has not been set up yet, apply the schema in Supabase and try again."
          action={
            <Link href="/projects" className="inline-flex h-10 items-center rounded-md border border-[color:var(--border)] px-4 text-sm font-semibold text-[color:var(--text)] hover:bg-[color:var(--surface-alt)]">
              Back to projects
            </Link>
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
