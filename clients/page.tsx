import { PageHeader, Panel } from "@/components/ui";

const clients = [
  { name: "Acme Retail", owner: "Maya Chen", value: "$18,400", status: "Active", lastTouch: "Today" },
  { name: "Globex Inc", owner: "Daniel Brooks", value: "$12,200", status: "At risk", lastTouch: "Yesterday" },
  { name: "Northstar Labs", owner: "Aisha Bello", value: "$9,800", status: "Lead", lastTouch: "2 days ago" },
  { name: "Lagos Studio", owner: "Caleb Ops", value: "$6,250", status: "Active", lastTouch: "Jun 27" },
];

export default function ClientsPage() {
  return (
    <div>
      <PageHeader
        title="Clients"
        description="Manage your highest-value accounts, owners, and follow-up timing."
        action={
          <button className="h-10 rounded-md bg-slate-950 px-4 text-sm font-semibold text-white hover:bg-slate-800">
            New client
          </button>
        }
      />

      <Panel title="Client Accounts">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left text-xs font-semibold uppercase text-slate-500">
                <th className="pb-3">Client</th>
                <th className="pb-3">Owner</th>
                <th className="pb-3">Value</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Last touch</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {clients.map((client) => (
                <tr key={client.name}>
                  <td className="py-4 font-medium text-slate-950">{client.name}</td>
                  <td className="py-4 text-slate-600">{client.owner}</td>
                  <td className="py-4 text-slate-700">{client.value}</td>
                  <td className="py-4">
                    <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
                      {client.status}
                    </span>
                  </td>
                  <td className="py-4 text-slate-600">{client.lastTouch}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
