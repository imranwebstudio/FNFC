"use client";

import Link from "next/link";
import { use } from "react";
import { ArrowLeft, UserRound } from "lucide-react";

import {
  AccountStatementHeader,
  AccountStatementView,
} from "~/components/account-statement";
import { Badge, PageTitle, Panel } from "~/components/ui";
import { formatTaka } from "~/lib/datetime";
import { api } from "~/trpc/react";

export default function AdminUserStatementPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = use(params);
  const statement = api.account.userStatement.useQuery({ userId });

  return (
    <div>
      <div className="mb-4">
        <Link
          href="/admin/users"
          className="inline-flex items-center gap-2 rounded-2xl px-3 py-2 text-sm font-semibold text-ink-muted transition hover:bg-sand hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to users
        </Link>
      </div>

      <PageTitle
        icon={<UserRound className="h-5 w-5" strokeWidth={2.25} />}
        title="Member account"
        subtitle="Full order and payment history for this person."
      />

      {statement.isLoading ? (
        <p className="text-sm text-ink-muted">Loading…</p>
      ) : statement.isError ? (
        <Panel>
          <p className="text-sm text-red-400">{statement.error.message}</p>
        </Panel>
      ) : statement.data ? (
        <>
          <Panel className="mb-6">
            <AccountStatementHeader
              name={statement.data.user.name ?? statement.data.user.email}
              subtitle={[
                statement.data.user.employeeId,
                statement.data.user.location?.name,
                statement.data.user.email,
              ]
                .filter(Boolean)
                .join(" · ")}
            />
            <div className="flex flex-wrap gap-2">
              <Badge>{statement.data.user.paymentMode}</Badge>
              <Badge tone="neutral">
                Bal {formatTaka(statement.data.user.balance)}
              </Badge>
            </div>
          </Panel>
          <AccountStatementView
            summary={statement.data.summary}
            entries={statement.data.entries}
            title="Full history"
          />
        </>
      ) : null}
    </div>
  );
}
