import Link from "next/link";
import { Button, Input } from "@/components/ui";

export default function SignUpPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-[color:var(--bg)] px-4 py-10">
      <div className="w-full max-w-lg rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-8 shadow-[var(--shadow)]">
        <div className="mb-8 space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[color:var(--accent)]">Caleb CRM</p>
          <h1 className="text-3xl font-semibold text-[color:var(--text)]">Create your workspace</h1>
          <p className="text-sm leading-6 text-[color:var(--text-muted)]">Launch a polished client operations hub for your team in minutes.</p>
        </div>

        <form className="space-y-4" aria-label="Create workspace form">
          <Input id="name" name="name" type="text" placeholder="Full name" aria-label="Full name" required />
          <Input id="email" name="email" type="email" placeholder="Email address" aria-label="Email address" required />
          <Input id="password" name="password" type="password" placeholder="Password" aria-label="Password" required />
          <Input id="confirm-password" name="confirmPassword" type="password" placeholder="Confirm password" aria-label="Confirm password" required />
          <Button type="button" fullWidth>Create account</Button>
        </form>

        <p className="mt-6 text-center text-sm text-[color:var(--text-muted)]">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-[color:var(--accent)] hover:text-[color:var(--accent-hover)]">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
