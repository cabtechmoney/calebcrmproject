import { PageHeader, Panel, StatCard } from "@/components/ui";

const pipeline = [
  { client: "Acme Retail", value: "$18,400", stage: "Proposal sent", health: "High" },
  { client: "Northstar Labs", value: "$9,800", stage: "Discovery call", health: "Medium" },
  { client: "Lagos Studio", value: "$6,250", stage: "Contract review", health: "High" },
];

const tasks = [
  "Follow up on Globex invoice",
  "Send revised CRM scope to Sarah",
  "Prepare weekly delivery notes",
  "Review Paystack settlement report",
];

export default function DashboardPage() {
  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Track client activity, revenue, and delivery risk from one operating view."
        action={
          <a
            className="inline-flex h-10 items-center rounded-md bg-slate-950 px-4 text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
            href="/clients"
          >
            Add client
          </a>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total clients" value="128" trend="+14 this month" tone="emerald" />
        <StatCard label="Active projects" value="24" trend="6 due soon" tone="amber" />
        <StatCard label="Monthly revenue" value="$42.8k" trend="+18.2%" tone="emerald" />
        <StatCard label="Pending payments" value="$12.4k" trend="3 overdue" tone="rose" />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <Panel title="Revenue Pipeline">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px] text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left text-xs font-semibold uppercase text-slate-500">
                  <th className="pb-3">Client</th>
                  <th className="pb-3">Value</th>
                  <th className="pb-3">Stage</th>
                  <th className="pb-3">Health</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {pipeline.map((item) => (
                  <tr key={item.client}>
                    <td className="py-4 font-medium text-slate-950">{item.client}</td>
                    <td className="py-4 text-slate-700">{item.value}</td>
                    <td className="py-4 text-slate-600">{item.stage}</td>
                    <td className="py-4">
                      <span className="rounded-md bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700">
                        {item.health}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel title="Today">
          <div className="space-y-3">
            {tasks.map((task) => (
              <label key={task} className="flex items-center gap-3 rounded-md border border-slate-200 px-3 py-2 text-sm">
                <input className="h-4 w-4 rounded border-slate-300 accent-slate-950" type="checkbox" />
                <span>{task}</span>
              </label>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
