"use client";

import { LogOut } from "lucide-react";

import { signOutAction } from "~/server/actions/auth";

export function SignOutButton() {
  return (
    <form action={signOutAction}>
      <button
        type="submit"
        className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-rice px-3 py-2 text-xs font-semibold text-ink-muted transition hover:border-leaf/30 hover:text-ink"
      >
        <LogOut className="h-3.5 w-3.5" strokeWidth={2.25} />
        Out
      </button>
    </form>
  );
}
