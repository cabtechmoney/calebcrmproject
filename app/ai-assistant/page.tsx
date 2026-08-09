import { PageHeader, Panel } from "@/components/ui";

const prompts = [
  "Summarize overdue invoices and draft follow-ups",
  "Find clients without activity in the last 7 days",
  "Create a project risk brief for this week",
];

export default function AiAssistantPage() {
  return (
    <div>
      <PageHeader
        title="AI Assistant"
        description="Use guided prompts to turn CRM data into next actions."
      />
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.2fr]">
        <Panel title="Suggested Prompts">
          <div className="space-y-3">
            {prompts.map((prompt) => (
              <button key={prompt} className="w-full rounded-md border border-slate-200 px-3 py-3 text-left text-sm hover:bg-slate-50">
                {prompt}
              </button>
            ))}
          </div>
        </Panel>
        <Panel title="Workspace Brief">
          <div className="space-y-4 text-sm leading-6 text-slate-700">
            <p>
              You have 4 proposals awaiting responses, 3 invoices requiring follow-up, and 6 active projects
              with milestones due this week.
            </p>
            <p>
              Priority recommendation: follow up with Globex, confirm the Lagos Studio milestone, and move
              Northstar Labs from discovery into proposal.
            </p>
          </div>
        </Panel>
      </div>
    </div>
  );
}
