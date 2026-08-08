import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from "react";

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
}) {
  const styles = {
    primary:
      "bg-spice text-rice hover:bg-spice-deep shadow-sm disabled:opacity-50",
    secondary:
      "bg-leaf text-rice hover:bg-leaf-deep shadow-sm disabled:opacity-50",
    ghost: "bg-transparent text-ink hover:bg-sand/60 disabled:opacity-50",
    danger: "bg-red-700 text-white hover:bg-red-800 disabled:opacity-50",
  } as const;

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${styles[variant]} ${className}`}
      {...props}
    />
  );
}

export function Input({
  className = "",
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`w-full rounded-xl border border-line bg-rice/90 px-3 py-2.5 text-sm outline-none ring-leaf/30 focus:ring-2 ${className}`}
      {...props}
    />
  );
}

export function Label({
  children,
  htmlFor,
}: {
  children: ReactNode;
  htmlFor?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-muted"
    >
      {children}
    </label>
  );
}

export function Select({
  className = "",
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={`w-full rounded-xl border border-line bg-rice/90 px-3 py-2.5 text-sm outline-none ring-leaf/30 focus:ring-2 ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}

export function Textarea({
  className = "",
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={`w-full rounded-xl border border-line bg-rice/90 px-3 py-2.5 text-sm outline-none ring-leaf/30 focus:ring-2 ${className}`}
      {...props}
    />
  );
}

export function Panel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-line/70 bg-rice/70 p-5 backdrop-blur-sm ${className}`}
    >
      {children}
    </div>
  );
}

export function PageTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-6">
      <h1 className="font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
        {title}
      </h1>
      {subtitle ? (
        <p className="mt-1 max-w-xl text-sm text-ink-muted">{subtitle}</p>
      ) : null}
    </div>
  );
}

export function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "good" | "warn" | "bad";
}) {
  const tones = {
    neutral: "bg-sand text-ink-muted",
    good: "bg-leaf/15 text-leaf-deep",
    warn: "bg-amber-100 text-amber-900",
    bad: "bg-red-100 text-red-800",
  } as const;
  return (
    <span
      className={`inline-flex rounded-md px-2 py-0.5 text-xs font-semibold ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
