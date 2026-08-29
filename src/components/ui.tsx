import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
} from "react";

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
}) {
  const styles = {
    primary:
      "bg-spice text-white shadow-[0_8px_24px_rgba(255,122,69,0.35)] hover:bg-spice-deep disabled:opacity-50",
    secondary:
      "bg-leaf text-[#042f2e] shadow-[0_8px_24px_rgba(45,212,191,0.3)] hover:brightness-110 disabled:opacity-50",
    ghost:
      "bg-transparent text-ink-muted hover:bg-sand hover:text-ink disabled:opacity-50",
    danger:
      "bg-red-600 text-white hover:bg-red-500 disabled:opacity-50",
  } as const;

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold tracking-tight transition duration-200 active:scale-[0.98] ${styles[variant]} ${className}`}
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
      className={`w-full rounded-2xl border border-line bg-sand/80 px-3.5 py-2.5 text-sm text-ink outline-none transition placeholder:text-ink-muted/60 focus:border-leaf/40 focus:ring-4 focus:ring-leaf/15 ${className}`}
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
      className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-muted"
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
      className={`w-full rounded-2xl border border-line bg-sand/80 px-3.5 py-2.5 text-sm text-ink outline-none transition focus:border-leaf/40 focus:ring-4 focus:ring-leaf/15 ${className}`}
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
      className={`w-full rounded-2xl border border-line bg-sand/80 px-3.5 py-2.5 text-sm text-ink outline-none transition placeholder:text-ink-muted/60 focus:border-leaf/40 focus:ring-4 focus:ring-leaf/15 ${className}`}
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
    <div className={`surface-card rounded-3xl p-5 ${className}`}>{children}</div>
  );
}

export function PageTitle({
  title,
  subtitle,
  icon,
}: {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
}) {
  return (
    <div className="mb-7">
      <div className="flex items-center gap-3">
        {icon ? (
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-leaf/15 text-leaf">
            {icon}
          </span>
        ) : null}
        <h1 className="font-display text-3xl font-bold tracking-tight text-ink md:text-[2.35rem]">
          {title}
        </h1>
      </div>
      {subtitle ? (
        <p
          className={`mt-2 max-w-xl text-sm leading-relaxed text-ink-muted ${icon ? "pl-14" : ""}`}
        >
          {subtitle}
        </p>
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
    neutral: "bg-sand text-ink-muted ring-1 ring-line",
    good: "bg-leaf/15 text-leaf ring-1 ring-leaf/25",
    warn: "bg-amber-400/15 text-amber-200 ring-1 ring-amber-400/25",
    bad: "bg-red-500/15 text-red-300 ring-1 ring-red-400/25",
  } as const;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wide ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

export function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <Panel className="relative overflow-hidden">
      <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-leaf/10" />
      <div className="relative flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-muted">
            {label}
          </p>
          <p className="font-display mt-2 text-2xl font-bold tracking-tight text-ink">
            {value}
          </p>
        </div>
        {icon ? (
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sand text-leaf">
            {icon}
          </span>
        ) : null}
      </div>
    </Panel>
  );
}
