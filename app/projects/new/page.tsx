"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { PageHeader, Panel } from "@/components/ui";
import { api } from "@/lib/api";
import type { Project } from "@/lib/types";

export default function NewProjectPage() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const createProject = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setIsSaving(true);
    setError("");

    try {
      await api<Project>("/projects", {
        method: "POST",
        body: JSON.stringify({
          title: formData.get("title"),
          description: formData.get("description"),
          budget: Number(formData.get("budget")) || null,
          status: formData.get("status"),
        }),
      });
      router.push("/projects");
    } catch (createError) {
      setError(createError instanceof Error ? createError.message : "Could not create project.");
    } finally {
      setIsSaving(false);
    }
  };

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
        <form className="grid gap-4" onSubmit={createProject}>
          <input name="title" required className="h-11 rounded-lg border border-[color:var(--border)] bg-[color:var(--surface-alt)] px-3 text-sm outline-none transition focus:border-[color:var(--accent)]" placeholder="Project name" />
          <div className="grid gap-4 sm:grid-cols-2">
            <input name="budget" type="number" min="0" className="h-11 rounded-lg border border-[color:var(--border)] bg-[color:var(--surface-alt)] px-3 text-sm outline-none transition focus:border-[color:var(--accent)]" placeholder="Budget" />
            <select name="status" className="h-11 rounded-lg border border-[color:var(--border)] bg-[color:var(--surface-alt)] px-3 text-sm outline-none transition focus:border-[color:var(--accent)]" defaultValue="Planning">
              <option>Planning</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>
          <textarea name="description" className="min-h-28 rounded-lg border border-[color:var(--border)] bg-[color:var(--surface-alt)] px-3 py-2 text-sm outline-none transition focus:border-[color:var(--accent)]" placeholder="Scope notes" />
          {error && <p className="form-error" role="alert">{error}</p>}
          <button disabled={isSaving} className="h-11 rounded-lg bg-[color:var(--accent)] px-4 text-sm font-semibold text-white transition hover:bg-[color:var(--accent-hover)]">
            {isSaving ? "Creating..." : "Create project"}
          </button>
        </form>
      </Panel>
    </div>
  );
}
