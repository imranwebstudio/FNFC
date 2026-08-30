"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  UserRound,
  UtensilsCrossed,
  Wallet,
} from "lucide-react";

import { SignOutButton } from "~/components/sign-out-button";
import { APP_NAME } from "~/lib/constants";
import { formatTaka } from "~/lib/datetime";

type NavUser = {
  name?: string | null;
  role: "USER" | "ADMIN" | "SUPER_ADMIN";
  balance: number;
  profileComplete: boolean;
};

type NavLink = {
  href: string;
  label: string;
  Icon: typeof UtensilsCrossed;
};

export function AppNav({ user }: { user: NavUser }) {
  const pathname = usePathname();
  const due = Math.max(0, -user.balance);
  const isAdmin = user.role === "ADMIN" || user.role === "SUPER_ADMIN";

  const navLinks: NavLink[] = isAdmin
    ? [
        { href: "/app", label: "Today", Icon: UtensilsCrossed },
        { href: "/app/profile", label: "Profile", Icon: UserRound },
        { href: "/admin", label: "Admin", Icon: LayoutDashboard },
      ]
    : [
        { href: "/app", label: "Today", Icon: UtensilsCrossed },
        { href: "/app/account", label: "Account", Icon: Wallet },
        { href: "/app/profile", label: "Profile", Icon: UserRound },
      ];

  function isActive(href: string) {
    if (href === "/app") return pathname === "/app";
    if (href === "/admin") {
      return pathname === "/admin" || pathname.startsWith("/admin/");
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header className="nav-glass sticky top-0 z-40">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <Link
          href="/app"
          className="font-display text-lg font-bold tracking-tight text-leaf-deep sm:text-xl"
        >
          {APP_NAME}
        </Link>
        <nav className="hidden items-center gap-1 sm:flex">
          {navLinks.map(({ href, label, Icon }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-leaf/12 text-leaf-deep"
                    : "text-ink-muted hover:bg-sand hover:text-ink"
                }`}
              >
                <Icon className="h-4 w-4 opacity-80" strokeWidth={2.25} />
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          {user.profileComplete ? (
            <div className="hidden text-right text-xs sm:block">
              <div className="font-semibold text-ink">{user.name}</div>
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
      <nav className="flex gap-1 overflow-x-auto border-t border-line/50 px-2 py-2 sm:hidden">
        {navLinks.map(({ href, label, Icon }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              className={`inline-flex shrink-0 items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium ${
                active ? "bg-leaf/12 text-leaf-deep" : "text-ink-muted"
              }`}
            >
              <Icon className="h-4 w-4" strokeWidth={2.25} />
              {label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
