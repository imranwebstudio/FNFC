"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function AdminSubNav({
  links,
}: {
  links: Array<{ href: string; label: string }>;
}) {
  const pathname = usePathname();

  return (
    <div className="mb-6 flex flex-wrap gap-2">
      {links.map((l) => {
        const active =
          l.href === "/admin"
            ? pathname === "/admin"
            : pathname === l.href || pathname.startsWith(`${l.href}/`);

        return (
          <Link
            key={l.href}
            href={l.href}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
              active
                ? "bg-leaf/15 text-leaf-deep"
                : "bg-sand/80 text-ink-muted hover:bg-leaf/15 hover:text-leaf-deep"
            }`}
          >
            {l.label}
          </Link>
        );
      })}
    </div>
  );
}
