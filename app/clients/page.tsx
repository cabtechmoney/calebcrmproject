import Link from "next/link";
import { PageHeader, Panel } from "@/components/ui";
import { api } from "@/lib/api";
import type { Client } from "@/lib/types";

export const dynamic = "force-dynamic";

async function getClients() {
  try {
    return await api<Client[]>("/clients");
  } catch {
    return [];
  }
}

export default async function ClientsPage() {
  const clients = await getClients();
  const pipelineValue = clients.reduce(
    (sum, client) => sum + (client.projects?.reduce((projectSum, project) => projectSum + (project.budget ?? 0), 0) ?? 0),
    0
  );
  const followUps = clients.reduce(
    (count, client) => count + (client.projects?.filter((project) => project.status && project.status !== "Completed").length ?? 0),
    0
  );

  return (
    <div>
      <PageHeader
        title="Clients"
        description="Keep a sharp view on account health, open opportunities, and the next best action."
        action={
          <Link
            href="/clients/new"
            className="inline-flex h-10 items-center rounded-md bg-[color:var(--accent)] px-4 text-sm font-semibold text-white transition hover:bg-[color:var(--accent-hover)]"
          >
            Add client
          </Link>
        }
      />

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] p-4 shadow-sm">
          <p className="text-sm text-[color:var(--text-muted)]">Healthy accounts</p>
          <p className="mt-2 text-2xl font-semibold text-[color:var(--text)]">{clients.length}</p>
        </div>
        <div className="rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] p-4 shadow-sm">
          <p className="text-sm text-[color:var(--text-muted)]">Pipeline value</p>
          <p className="mt-2 text-2xl font-semibold text-[color:var(--text)]">${pipelineValue.toLocaleString()}</p>
        </div>
        <div className="rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] p-4 shadow-sm">
          <p className="text-sm text-[color:var(--text-muted)]">Open follow-ups</p>
          <p className="mt-2 text-2xl font-semibold text-[color:var(--text)]">{followUps}</p>
        </div>
      </div>

      <Panel title="Client accounts">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="border-b border-[color:var(--border)] text-left text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--text-muted)]">
                <th className="py-3">Client</th>
                <th className="py-3">Company</th>
                <th className="py-3">Contact</th>
                <th className="py-3">Projects</th>
                <th className="py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[color:var(--border)]">
              {clients.map((client) => (
                <tr key={client.id}>
                  <td className="py-4 font-semibold text-[color:var(--text)]">{client.name}</td>
                  <td className="py-4 text-[color:var(--text-muted)]">{client.company ?? "—"}</td>
                  <td className="py-4 text-[color:var(--text-muted)]">{client.email ?? client.phone ?? "—"}</td>
                  <td className="py-4 text-[color:var(--text-muted)]">{client.projects?.length ?? 0}</td>
                  <td className="py-4">
                    {client.id ? (
                      <Link
                        href={`/clients/${client.id}`}
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
    </div>
  );
}
