import { PageHeader, Panel } from "@/components/ui";

const files = [
  { name: "Acme CRM proposal.pdf", type: "Proposal", updated: "Today", owner: "Caleb Ops" },
  { name: "June invoice batch.csv", type: "Finance", updated: "Yesterday", owner: "Finance" },
  { name: "Project kickoff notes.docx", type: "Delivery", updated: "Jun 26", owner: "Delivery" },
];

export default function FilePage() {
  return (
    <div>
      <PageHeader title="Files" description="Keep client documents and operational files organized by workflow." />
      <Panel title="Recent Files">
        <div className="divide-y divide-slate-100">
          {files.map((file) => (
            <div key={file.name} className="grid gap-2 py-4 text-sm sm:grid-cols-[1fr_120px_120px_120px]">
              <p className="font-medium text-slate-950">{file.name}</p>
              <p className="text-slate-600">{file.type}</p>
              <p className="text-slate-600">{file.updated}</p>
              <p className="text-slate-600">{file.owner}</p>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
