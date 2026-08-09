"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  fullWidth?: boolean;
};

const buttonStyles: Record<ButtonVariant, string> = {
  primary: "bg-[color:var(--accent)] text-white hover:bg-[color:var(--accent-hover)]",
  secondary: "bg-[color:var(--surface-alt)] text-[color:var(--text)] hover:bg-slate-100 dark:bg-slate-800 dark:text-white",
  ghost: "bg-transparent text-[color:var(--text)] hover:bg-[color:var(--surface-alt)]",
  danger: "bg-rose-500 text-white hover:bg-rose-600",
};

export function Button({
  variant = "primary",
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${fullWidth ? "w-full" : "inline-flex"} items-center justify-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold transition ${buttonStyles[variant]} ${className}`}
      {...props}
    />
  );
}

export function Input({ className = "", ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`h-11 w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-alt)] px-4 text-sm text-[color:var(--text)] outline-none transition placeholder:text-[color:var(--text-muted)] focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--accent-soft)] ${className}`}
      {...props}
    />
  );
}

export function Select({ className = "", ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={`h-11 w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-alt)] px-4 text-sm text-[color:var(--text)] outline-none transition focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--accent-soft)] ${className}`}
      {...props}
    />
  );
}

export function Badge({ className = "", tone = "slate", children }: { className?: string; tone?: "slate" | "emerald" | "amber" | "rose"; children: ReactNode }) {
  const tones: Record<string, string> = {
    slate: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200",
    emerald: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300",
    amber: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300",
    rose: "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300",
  };

  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${tones[tone]} ${className}`}>{children}</span>;
}

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] px-5 py-6 shadow-sm sm:flex-row sm:items-start sm:justify-between">
      <div>
        <motion.h1
          className="text-2xl font-semibold tracking-tight text-[color:var(--text)] sm:text-3xl"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          {title}
        </motion.h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[color:var(--text-muted)]">{description}</p>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

export function StatCard({
  label,
  value,
  trend,
  tone = "slate",
}: {
  label: string;
  value: string;
  trend: string;
  tone?: "slate" | "emerald" | "amber" | "rose";
}) {
  const tones: Record<string, string> = {
    slate: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200",
    emerald: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300",
    amber: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300",
    rose: "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300",
  };

  return (
    <motion.div
      className="rounded-[1.75rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-5 shadow-sm"
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
    >
      <p className="text-sm font-medium text-[color:var(--text-muted)]">{label}</p>
      <div className="mt-4 flex items-end justify-between gap-3">
        <p className="text-2xl font-semibold text-[color:var(--text)]">{value}</p>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${tones[tone]}`}>{trend}</span>
      </div>
    </motion.div>
  );
}

export function Panel({
  title,
  children,
  className = "",
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface-elevated)] shadow-sm ${className}`}>
      <div className="border-b border-[color:var(--border)] px-5 py-4">
        <h2 className="text-sm font-semibold text-[color:var(--text)]">{title}</h2>
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}

export function MotionList({ children }: { children: ReactNode }) {
  return (
    <AnimatePresence>
      <motion.div
        className="space-y-3"
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export function MotionItem({ children }: { children: ReactNode }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.22 }}
    >
      {children}
    </motion.div>
  );
}
