import { PageHeader, Panel, StatCard } from "@/components/ui";

const bars = [
  { label: "Mon", value: 38 },
  { label: "Tue", value: 64 },
  { label: "Wed", value: 52 },
  { label: "Thu", value: 78 },
  { label: "Fri", value: 70 },
  { label: "Sat", value: 42 },
  { label: "Sun", value: 48 },
];

export default function AnalyticsPage() {
  return (
    <div>
      <PageHeader
        title="Analytics"
        description="Understand revenue movement, sales conversion, and client engagement."
      />
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Win rate" value="42%" trend="+5.4%" tone="emerald" />
        <StatCard label="Avg. deal size" value="$7.1k" trend="+$820" tone="emerald" />
        <StatCard label="Cycle time" value="18d" trend="-3 days" tone="slate" />
      </div>
      <Panel title="Weekly Activity" className="mt-6">
        <div className="flex h-64 items-end gap-3">
          {bars.map((bar) => (
            <div key={bar.label} className="flex flex-1 flex-col items-center gap-2">
              <div
                className="w-full rounded-t-md bg-slate-900"
                style={{ height: `${bar.value}%` }}
                title={`${bar.label}: ${bar.value}`}
              />
              <span className="text-xs font-medium text-slate-500">{bar.label}</span>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
