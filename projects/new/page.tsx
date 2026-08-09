import { PageHeader, Panel } from "@/components/ui";

export default function NewProjectPage() {
  return (
    <div>
      <PageHeader title="New Project" description="Capture the core project details before creating a delivery plan." />
      <Panel title="Project Intake" className="max-w-3xl">
        <form className="grid gap-4">
          <input className="h-10 rounded-md border border-slate-200 px-3 text-sm outline-none focus:border-slate-400" placeholder="Project name" />
          <input className="h-10 rounded-md border border-slate-200 px-3 text-sm outline-none focus:border-slate-400" placeholder="Client" />
          <div className="grid gap-4 sm:grid-cols-2">
            <input className="h-10 rounded-md border border-slate-200 px-3 text-sm outline-none focus:border-slate-400" placeholder="Budget" />
            <select className="h-10 rounded-md border border-slate-200 px-3 text-sm outline-none focus:border-slate-400" defaultValue="Planning">
              <option>Planning</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>
          <textarea className="min-h-28 rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400" placeholder="Scope notes" />
          <button className="h-10 rounded-md bg-slate-950 px-4 text-sm font-semibold text-white hover:bg-slate-800">
            Create project
          </button>
        </form>
      </Panel>
    </div>
  );
}
