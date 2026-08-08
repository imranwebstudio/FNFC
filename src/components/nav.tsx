"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { SignOutButton } from "~/components/sign-out-button";
import { APP_NAME } from "~/lib/constants";
import { formatTaka } from "~/lib/datetime";

type NavUser = {
  name?: string | null;
  role: "USER" | "ADMIN" | "SUPER_ADMIN";
  balance: number;
  profileComplete: boolean;
};

export function AppNav({ user }: { user: NavUser }) {
  const pathname = usePathname();
  const due = Math.max(0, -user.balance);

  const isAdmin = user.role === "ADMIN" || user.role === "SUPER_ADMIN";

  const links = [
    { href: "/app", label: "Today" },
    ...(!isAdmin
      ? [
          { href: "/app/orders", label: "Orders" },
          { href: "/app/wallet", label: "Wallet" },
        ]
      : []),
    { href: "/app/profile", label: "Profile" },
    ...(isAdmin ? [{ href: "/admin", label: "Admin" }] : []),
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-line/60 bg-cream/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/app" className="font-display text-xl font-semibold text-leaf-deep">
          {APP_NAME}
        </Link>
        <nav className="hidden items-center gap-1 sm:flex">
          {links.map((l) => {
            const active =
              l.href === "/app"
                ? pathname === "/app"
                : pathname === l.href || pathname.startsWith(`${l.href}/`);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                  active
                    ? "bg-leaf/15 text-leaf-deep"
                    : "text-ink-muted hover:bg-sand/70 hover:text-ink"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          {user.profileComplete ? (
            <div className="hidden text-right text-xs sm:block">
              <div className="font-medium text-ink">{user.name}</div>
              <div className="text-ink-muted">
                {due > 0
                  ? `Due ${formatTaka(due)}`
                  : `Bal ${formatTaka(user.balance)}`}
              </div>
            </div>
          ) : null}
          <SignOutButton />
        </div>
      </div>
      <nav className="flex gap-1 overflow-x-auto border-t border-line/40 px-2 py-2 sm:hidden">
        {links.map((l) => {
          const active =
            l.href === "/app"
              ? pathname === "/app"
              : pathname === l.href || pathname.startsWith(`${l.href}/`);
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium ${
                active ? "bg-leaf/15 text-leaf-deep" : "text-ink-muted"
              }`}
            >
              {l.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
