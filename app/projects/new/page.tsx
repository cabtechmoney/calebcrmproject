import Link from "next/link";
import { PageHeader, Panel } from "@/components/ui";

export default function NewProjectPage() {
  return (
    <div>
      <PageHeader
        title="New Project"
        description="Create a polished intake card for your next client engagement."
        action={
          <Link
            href="/projects"
            className="inline-flex h-10 items-center rounded-md border border-[color:var(--border)] px-4 text-sm font-semibold text-[color:var(--text)] transition hover:bg-[color:var(--surface-alt)]"
          >
            Back to projects
          </Link>
        }
      />

      <Panel title="Project intake" className="max-w-3xl">
        <form className="grid gap-4">
          <input className="h-11 rounded-lg border border-[color:var(--border)] bg-[color:var(--surface-alt)] px-3 text-sm outline-none transition focus:border-[color:var(--accent)]" placeholder="Project name" />
          <input className="h-11 rounded-lg border border-[color:var(--border)] bg-[color:var(--surface-alt)] px-3 text-sm outline-none transition focus:border-[color:var(--accent)]" placeholder="Client" />
          <div className="grid gap-4 sm:grid-cols-2">
            <input className="h-11 rounded-lg border border-[color:var(--border)] bg-[color:var(--surface-alt)] px-3 text-sm outline-none transition focus:border-[color:var(--accent)]" placeholder="Budget" />
            <select className="h-11 rounded-lg border border-[color:var(--border)] bg-[color:var(--surface-alt)] px-3 text-sm outline-none transition focus:border-[color:var(--accent)]" defaultValue="Planning">
              <option>Planning</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>
          <textarea className="min-h-28 rounded-lg border border-[color:var(--border)] bg-[color:var(--surface-alt)] px-3 py-2 text-sm outline-none transition focus:border-[color:var(--accent)]" placeholder="Scope notes" />
          <button className="h-11 rounded-lg bg-[color:var(--accent)] px-4 text-sm font-semibold text-white transition hover:bg-[color:var(--accent-hover)]">
            Create project
          </button>
        </form>
      </Panel>
    </div>
  );
}
