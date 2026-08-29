"use client";

import { motion } from "framer-motion";
import { Wallet } from "lucide-react";

import { Badge, PageTitle, Panel, StatCard } from "~/components/ui";
import { formatTaka } from "~/lib/datetime";
import { api } from "~/trpc/react";

export default function WalletPage() {
  const summary = api.wallet.summary.useQuery();
  const txs = api.wallet.listMine.useQuery();

  return (
    <div>
      <PageTitle
        icon={<Wallet className="h-5 w-5" strokeWidth={2.25} />}
        title="Wallet"
        subtitle="Deposits are recorded by admin. Balance can go negative as due."
      />

      <div className="mb-7 grid gap-3 sm:grid-cols-3">
        <StatCard
          label="Balance"
          value={formatTaka(summary.data?.balance ?? 0)}
        />
        <StatCard
          label="Due"
          value={
            <span className="text-spice-deep">
              {formatTaka(summary.data?.due ?? 0)}
            </span>
          }
        />
        <Panel>
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-muted">
            Mode
          </p>
          <p className="mt-3">
            <Badge
              tone={
                summary.data?.paymentMode === "WALLET" ? "good" : "neutral"
              }
            >
              {summary.data?.paymentMode ?? "—"}
            </Badge>
          </p>
        </Panel>
      </div>

      <h2 className="font-display mb-3 text-xl font-bold tracking-tight">
        History
      </h2>
      <ul className="space-y-2">
        {txs.data?.map((t, i) => (
          <motion.li
            key={t.id}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.03 }}
          >
            <Panel className="flex items-center justify-between gap-3 py-3.5">
              <div>
                <p className="text-sm font-semibold">{t.type}</p>
                <p className="text-xs text-ink-muted">
                  {t.note ?? "—"} ·{" "}
                  {new Date(t.createdAt).toLocaleString("en-BD", {
                    timeZone: "Asia/Dhaka",
                  })}
                </p>
              </div>
              <div className="text-right">
                <p
                  className={`text-sm font-bold tabular-nums ${
                    t.amount >= 0 ? "text-leaf-deep" : "text-spice-deep"
                  }`}
                >
                  {t.amount >= 0 ? "+" : ""}
                  {formatTaka(t.amount)}
                </p>
                <p className="text-xs text-ink-muted">
                  after {formatTaka(t.balanceAfter)}
                </p>
              </div>
            </Panel>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
