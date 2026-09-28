"use client";

import { History } from "lucide-react";

import { AccountStatementView } from "~/components/account-statement";
import { FoodPlateLoader } from "~/components/food-plate-loader";
import { PageTitle, Panel } from "~/components/ui";
import { api } from "~/trpc/react";

export default function MyHistoryPage() {
  const statement = api.account.myStatement.useQuery();

  return (
    <div>
      <PageTitle
        icon={<History className="h-5 w-5" strokeWidth={2.25} />}
        title="Your history"
        subtitle="Your orders, deliveries, deposits, and wallet charges."
      />

      {statement.isLoading ? (
        <FoodPlateLoader label="Loading your history…" />
      ) : statement.isError ? (
        <Panel>
          <p className="text-sm text-red-400">{statement.error.message}</p>
        </Panel>
      ) : statement.data ? (
        <AccountStatementView
          summary={statement.data.summary}
          entries={statement.data.entries}
          title="All activity"
        />
      ) : null}
    </div>
  );
}
