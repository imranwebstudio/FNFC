"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  ClipboardList,
  LayoutGrid,
  MapPinned,
  Menu,
  UtensilsCrossed,
  UserRound,
  Users,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

import { SignOutButton } from "~/components/sign-out-button";
import { APP_NAME } from "~/lib/constants";
import { formatTaka } from "~/lib/datetime";

type NavUser = {
  name?: string | null;
  role: "USER" | "ADMIN" | "SUPER_ADMIN";
  balance: number;
};

type AdminLink = {
  href: string;
  label: string;
  Icon: typeof LayoutGrid;
};

export function AdminShell({
  user,
  links,
  children,
}: {
  user: NavUser;
  links: Array<{ href: string; label: string }>;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const due = Math.max(0, -user.balance);

  const iconMap: Record<string, typeof LayoutGrid> = {
    Overview: LayoutGrid,
    Menu: BookOpen,
    Orders: ClipboardList,
    Users: Users,
    Staff: MapPinned,
  };

  const navLinks: AdminLink[] = links.map((l) => ({
    ...l,
    Icon: iconMap[l.label] ?? LayoutGrid,
  }));

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  function isActive(href: string) {
    if (href === "/admin") return pathname === "/admin";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  const activeLabel =
    navLinks.find((l) => isActive(l.href))?.label ?? "Admin";

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="border-b border-line/60 px-4 py-5">
        <Link
          href="/admin"
          className="font-display text-lg font-bold tracking-tight text-leaf"
        >
          {APP_NAME}
        </Link>
        <p className="mt-1 text-xs text-ink-muted">Admin dashboard</p>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-muted">
          Manage
        </p>
        {navLinks.map(({ href, label, Icon }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-semibold transition ${
                active
                  ? "bg-leaf text-[#042f2e] shadow-[0_8px_20px_rgba(45,212,191,0.25)]"
                  : "text-ink-muted hover:bg-sand hover:text-ink"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" strokeWidth={2.25} />
              {label}
            </Link>
          );
        })}

        <p className="mb-2 mt-6 px-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-muted">
          App
        </p>
        <Link
          href="/app"
          className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-semibold text-ink-muted transition hover:bg-sand hover:text-ink"
        >
          <UtensilsCrossed className="h-4 w-4" strokeWidth={2.25} />
          Today&apos;s meal
        </Link>
        <Link
          href="/app/profile"
          className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-semibold text-ink-muted transition hover:bg-sand hover:text-ink"
        >
          <UserRound className="h-4 w-4" strokeWidth={2.25} />
          Profile
        </Link>
      </nav>

      <div className="border-t border-line/60 p-4">
        <div className="mb-3">
          <p className="truncate text-sm font-semibold text-ink">
            {user.name ?? "Admin"}
          </p>
          <p className="text-xs text-ink-muted">
            {due > 0
              ? `Due ${formatTaka(due)}`
              : `Bal ${formatTaka(user.balance)}`}
          </p>
        </div>
        <SignOutButton />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen lg:flex">
      {/* Desktop sidebar */}
      <aside className="surface-card fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-line/50 lg:block">
        {sidebar}
      </aside>

      {/* Mobile drawer */}
      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <aside className="surface-card absolute inset-y-0 left-0 w-[min(18rem,88vw)] shadow-2xl">
            <div className="absolute right-3 top-3">
              <button
                type="button"
                aria-label="Close"
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-sand text-ink"
                onClick={() => setOpen(false)}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            {sidebar}
          </aside>
        </div>
      ) : null}

      <div className="flex min-h-screen flex-1 flex-col lg:pl-64">
        <header className="nav-glass sticky top-0 z-20 flex items-center gap-3 px-4 py-3 lg:px-6">
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-sand/80 text-ink lg:hidden"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            <Menu className="h-5 w-5" strokeWidth={2.25} />
          </button>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-ink lg:text-base">
              {activeLabel}
            </p>
            <p className="truncate text-xs text-ink-muted lg:hidden">
              {user.name ?? "Admin"}
            </p>
          </div>
          <Link
            href="/app"
            className="hidden rounded-xl px-3 py-2 text-xs font-semibold text-ink-muted transition hover:bg-sand hover:text-ink sm:inline-flex"
          >
            ← Back to app
          </Link>
        </header>

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="mx-auto w-full max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
