import Link from "next/link";
import { PageHeader, Panel } from "@/components/ui";
import { api } from "@/lib/api";
import type { Client } from "@/lib/types";

export const dynamic = "force-dynamic";

type ClientDetailPageProps = {
  params: Promise<{ id: string }>;
};

async function getClient(id: string): Promise<Client | null> {
  if (!id || id === "undefined") return null;

  try {
    return await api<Client>(`/clients/${id}`);
  } catch {
    return null;
  }
}

export default async function ClientDetailPage({ params }: ClientDetailPageProps) {
  const { id } = await params;
  const client = await getClient(id);

  if (!client) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Client not found"
          description="The requested client could not be loaded. If the database has not been set up yet, apply the schema in Supabase and try again."
          action={
            <Link
              href="/clients"
              className="inline-flex h-10 items-center rounded-md border border-[color:var(--border)] px-4 text-sm font-semibold text-[color:var(--text)] hover:bg-[color:var(--surface-alt)]"
            >
              Back to clients
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={client.name}
        description="A complete client profile with active projects and contact details."
        action={
          <Link
            href="/clients"
            className="inline-flex h-10 items-center rounded-md border border-[color:var(--border)] px-4 text-sm font-semibold text-[color:var(--text)] hover:bg-[color:var(--surface-alt)]"
          >
            Back to clients
          </Link>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Panel title="Client information">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm text-[color:var(--text-muted)]">Email</p>
              <p className="mt-2 text-[color:var(--text)]">{client.email ?? "Not provided"}</p>
            </div>
            <div>
              <p className="text-sm text-[color:var(--text-muted)]">Phone</p>
              <p className="mt-2 text-[color:var(--text)]">{client.phone ?? "Not provided"}</p>
            </div>
            <div>
              <p className="text-sm text-[color:var(--text-muted)]">Company</p>
              <p className="mt-2 text-[color:var(--text)]">{client.company ?? "Not provided"}</p>
            </div>
            <div>
              <p className="text-sm text-[color:var(--text-muted)]">Projects</p>
              <p className="mt-2 text-[color:var(--text)]">{client.projects?.length ?? 0}</p>
            </div>
          </div>
        </Panel>

        <Panel title="Status summary">
          <div className="space-y-3 text-sm text-[color:var(--text-muted)]">
            <p>
              Created at <span className="font-semibold text-[color:var(--text)]">{client.createdAt ? new Date(client.createdAt).toLocaleDateString() : "Unknown"}</span>
            </p>
            <p>
              Updated at <span className="font-semibold text-[color:var(--text)]">{client.updatedAt ? new Date(client.updatedAt).toLocaleDateString() : "Unknown"}</span>
            </p>
            <p>
              Client ID <span className="font-mono rounded-full bg-[color:var(--surface-alt)] px-2 py-1 text-xs text-[color:var(--text)]">{client.id}</span>
            </p>
          </div>
        </Panel>
      </div>

      <Panel title="Active projects">
        {client.projects?.length ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-b border-[color:var(--border)] text-left text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--text-muted)]">
                  <th className="py-3">Project</th>
                  <th className="py-3">Status</th>
                  <th className="py-3">Budget</th>
                  <th className="py-3">Deadline</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[color:var(--border)]">
                {client.projects.map((project) => (
                  <tr key={project.id}>
                    <td className="py-4 text-[color:var(--text)]">{project.title}</td>
                    <td className="py-4 text-[color:var(--text-muted)]">{project.status ?? "Pending"}</td>
                    <td className="py-4 text-[color:var(--text-muted)]">{project.budget ? `$${project.budget.toLocaleString()}` : "—"}</td>
                    <td className="py-4 text-[color:var(--text-muted)]">{project.deadline ? new Date(project.deadline).toLocaleDateString() : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm text-[color:var(--text-muted)]">No projects are currently associated with this client.</p>
        )}
      </Panel>
    </div>
  );
}
