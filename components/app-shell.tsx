import type { ReactNode } from "react";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[color:var(--bg)] text-[color:var(--text)]">
      <div className="mx-auto flex min-h-screen max-w-[1600px] flex-col px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-6 rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] px-5 py-5 shadow-sm">
          <div className="max-w-5xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[color:var(--accent)]">Caleb CRM</p>
            <p className="mt-2 text-sm leading-6 text-[color:var(--text-muted)]">Manage clients, projects, invoices, and revenue across your workspace.</p>
          </div>
        </header>

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
