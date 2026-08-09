import Link from "next/link";
import { Button, Input } from "@/components/ui";

export default function LoginPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-[color:var(--bg)] px-4 py-12">
      <div className="w-full max-w-md rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-8 shadow-[var(--shadow)]">
        <div className="mb-8 space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[color:var(--accent)]">Caleb CRM</p>
          <h1 className="text-3xl font-semibold text-[color:var(--text)]">Sign in to your workspace</h1>
          <p className="text-sm leading-6 text-[color:var(--text-muted)]">Access clients, projects, invoices, and revenue operations with a secure workspace login.</p>
        </div>

        <form className="space-y-4" aria-label="Sign in form">
          <Input id="email" name="email" type="email" placeholder="Email address" aria-label="Email address" required />
          <Input id="password" name="password" type="password" placeholder="Password" aria-label="Password" required />
          <Button type="button" fullWidth>Continue</Button>
        </form>

        <p className="mt-6 text-center text-sm text-[color:var(--text-muted)]">
          Need an account?{' '}
          <Link href="/sign-up" className="font-semibold text-[color:var(--accent)] hover:text-[color:var(--accent-hover)]">
            Create one
          </Link>
        </p>
      </div>
    </main>
  );
}
