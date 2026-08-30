"use client";

import { Wallet } from "lucide-react";

import {
  AccountStatementView,
} from "~/components/account-statement";
import { PageTitle } from "~/components/ui";
import { api } from "~/trpc/react";

export default function AccountPage() {
  const me = api.user.me.useQuery();
  const statement = api.account.myStatement.useQuery();

  return (
    <div>
      <PageTitle
        icon={<Wallet className="h-5 w-5" strokeWidth={2.25} />}
        title="Account"
        subtitle="All orders, deposits, wallet charges, and cash payments in one place."
      />

      {statement.isLoading ? (
        <p className="text-sm text-ink-muted">Loading account…</p>
      ) : statement.data ? (
        <AccountStatementView
          summary={statement.data.summary}
          entries={statement.data.entries}
        />
      ) : statement.isError ? (
        <p className="text-sm text-red-400">{statement.error.message}</p>
      ) : null}

      {me.data ? (
        <p className="mt-8 text-center text-xs text-ink-muted">
          Signed in as {me.data.name ?? me.data.email}
        </p>
      ) : null}
    </div>
  );
}
