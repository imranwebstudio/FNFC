"use client";

import { motion } from "framer-motion";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Loader2,
  Receipt,
  Trash2,
  Wallet,
} from "lucide-react";
import { useMemo, useState } from "react";

import { Badge, Button, Panel, StatCard } from "~/components/ui";
import {
  formatMenuDateLabel,
  formatTaka,
} from "~/lib/datetime";
import type { StatementEntry } from "~/lib/build-account-statement";
import type { AccountStatementSummary } from "~/lib/build-account-statement";

type Filter = "all" | "orders" | "payments";

function formatWhen(d: Date) {
  return new Date(d).toLocaleString("en-BD", { timeZone: "Asia/Dhaka" });
}

function paymentTone(
  status: string,
): "good" | "warn" | "neutral" | "bad" {
  if (status === "PAID" || status === "WALLET_CHARGED") return "good";
  if (status === "UNPAID") return "warn";
  return "neutral";
}

function orderStatusTone(status: string): "good" | "warn" | "bad" | "neutral" {
  if (status === "DELIVERED") return "good";
  if (status === "CANCELLED") return "bad";
  return "warn";
}

function walletTypeLabel(type: string) {
  switch (type) {
    case "DEPOSIT":
      return "Deposit";
    case "DUE_PAYMENT":
      return "Due payment";
    case "CHARGE":
      return "Meal charge";
    case "ADJUSTMENT":
      return "Adjustment";
    default:
      return type;
  }
}

function EntryRow({
  entry,
  index,
  adminActions,
}: {
  entry: StatementEntry;
  index: number;
  adminActions?: {
    onDeleteOrder: (orderId: string) => void;
    deletingOrderId?: string;
  };
}) {
  if (entry.kind === "order") {
    const isCancelled = entry.status === "CANCELLED";
    const deleteBusy = adminActions?.deletingOrderId === entry.id;
    return (
      <motion.li
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.02 }}
      >
        <Panel className="py-3.5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-spice/15 text-spice">
                <Receipt className="h-4 w-4" strokeWidth={2.25} />
              </div>
              <div>
                <p className="font-semibold tracking-tight text-ink">
                  {entry.mealTitle}
                  {entry.quantity > 1 ? (
                    <span className="ml-1.5 text-sm font-medium text-ink-muted">
                      ×{entry.quantity}
                    </span>
                  ) : null}
                </p>
                <p className="mt-0.5 text-xs text-ink-muted">
                  {entry.mealSlot} · {entry.locationName} · meal day{" "}
                  {formatMenuDateLabel(entry.mealDate)}
                </p>
                <p className="mt-0.5 text-[11px] text-ink-muted">
                  Ordered {formatWhen(entry.at)}
                  {entry.placedByName
                    ? ` · by admin ${entry.placedByName}`
                    : ""}
                </p>
                {entry.note ? (
                  <p className="mt-1 text-xs text-ink-muted">{entry.note}</p>
                ) : null}
                {entry.deliveredAt ? (
                  <p className="mt-0.5 text-[11px] text-ink-muted">
                    Delivered {formatWhen(entry.deliveredAt)}
                  </p>
                ) : null}
                {entry.paidAt ? (
                  <p className="mt-0.5 text-[11px] text-leaf">
                    Cash paid {formatWhen(entry.paidAt)}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="text-right">
              <p
                className={`text-sm font-bold tabular-nums ${
                  isCancelled ? "text-ink-muted line-through" : "text-ink"
                }`}
              >
                {formatTaka(entry.amount)}
              </p>
              <div className="mt-1.5 flex flex-wrap justify-end gap-1">
                <Badge tone={orderStatusTone(entry.status)}>
                  {entry.status}
                </Badge>
                <Badge tone={paymentTone(entry.paymentStatus)}>
                  {entry.paymentStatus}
                </Badge>
              </div>
              {adminActions ? (
                <Button
                  type="button"
                  variant="danger"
                  className="mt-2 px-3 py-1.5 text-xs"
                  disabled={deleteBusy}
                  aria-busy={deleteBusy}
                  onClick={() => adminActions.onDeleteOrder(entry.id)}
                >
                  {deleteBusy ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      Deleting…
                    </>
                  ) : (
                    <>
                      <Trash2 className="h-3.5 w-3.5" />
                      Delete
                    </>
                  )}
                </Button>
              ) : null}
            </div>
          </div>
        </Panel>
      </motion.li>
    );
  }

  const positive = entry.amount >= 0;
  return (
    <motion.li
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.02 }}
    >
      <Panel className="py-3.5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex gap-3">
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                positive ? "bg-leaf/15 text-leaf" : "bg-spice/15 text-spice"
              }`}
            >
              {positive ? (
                <ArrowDownLeft className="h-4 w-4" strokeWidth={2.25} />
              ) : (
                <ArrowUpRight className="h-4 w-4" strokeWidth={2.25} />
              )}
            </div>
            <div>
              <p className="font-semibold text-ink">
                {walletTypeLabel(entry.txType)}
              </p>
              <p className="mt-0.5 text-xs text-ink-muted">
                {entry.note ?? "—"}
              </p>
              <p className="mt-0.5 text-[11px] text-ink-muted">
                {formatWhen(entry.at)}
                {entry.createdByName ? ` · recorded by ${entry.createdByName}` : ""}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p
              className={`text-sm font-bold tabular-nums ${
                positive ? "text-leaf-deep" : "text-spice-deep"
              }`}
            >
              {positive ? "+" : ""}
              {formatTaka(entry.amount)}
            </p>
            <p className="mt-1 text-xs text-ink-muted">
              balance {formatTaka(entry.balanceAfter)}
            </p>
          </div>
        </div>
      </Panel>
    </motion.li>
  );
}

export function AccountStatementView({
  summary,
  entries,
  title = "Activity",
  adminActions,
}: {
  summary: AccountStatementSummary;
  entries: StatementEntry[];
  title?: string;
  adminActions?: {
    onDeleteOrder: (orderId: string) => void;
    deletingOrderId?: string;
  };
}) {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(() => {
    if (filter === "orders") {
      return entries.filter((e) => e.kind === "order");
    }
    if (filter === "payments") {
      return entries.filter((e) => e.kind === "wallet");
    }
    return entries;
  }, [entries, filter]);

  const tabs: { id: Filter; label: string }[] = [
    { id: "all", label: "All" },
    { id: "orders", label: "Orders" },
    { id: "payments", label: "Deposits & wallet" },
  ];

  return (
    <>
      <div className="mb-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard label="Balance" value={formatTaka(summary.balance)} />
        <StatCard
          label="Total due"
          value={
            <span className="text-spice-deep">
              {formatTaka(summary.totalDue)}
            </span>
          }
        />
        <StatCard
          label="Due (wallet)"
          value={formatTaka(summary.due)}
        />
        <StatCard
          label="Unpaid cash orders"
          value={formatTaka(summary.unpaidCashTotal)}
        />
        <Panel>
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-muted">
            Payment mode
          </p>
          <p className="mt-3">
            <Badge tone={summary.paymentMode === "WALLET" ? "good" : "neutral"}>
              {summary.paymentMode}
            </Badge>
          </p>
        </Panel>
      </div>

      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Panel className="py-3">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-muted">
            Meals ordered
          </p>
          <p className="mt-1 text-lg font-bold tabular-nums">
            {summary.orderCount}
            {summary.cancelledCount > 0 ? (
              <span className="ml-1 text-sm font-normal text-ink-muted">
                ({summary.cancelledCount} cancelled)
              </span>
            ) : null}
          </p>
        </Panel>
        <Panel className="py-3">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-muted">
            Total meal spend
          </p>
          <p className="mt-1 text-lg font-bold tabular-nums">
            {formatTaka(summary.totalSpent)}
          </p>
        </Panel>
        <Panel className="py-3">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-muted">
            Deposits received
          </p>
          <p className="mt-1 text-lg font-bold tabular-nums text-leaf-deep">
            {formatTaka(summary.totalDeposits)}
          </p>
        </Panel>
        <Panel className="py-3">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-muted">
            Due payments
          </p>
          <p className="mt-1 text-lg font-bold tabular-nums">
            {formatTaka(summary.totalDuePayments)}
          </p>
        </Panel>
      </div>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-xl font-bold tracking-tight">
          {title}
        </h2>
        <div className="flex gap-1 rounded-2xl bg-sand/60 p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilter(tab.id)}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
                filter === tab.id
                  ? "bg-leaf/20 text-leaf-deep"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <Panel>
          <p className="text-sm text-ink-muted">No activity yet.</p>
        </Panel>
      ) : (
        <ul className="space-y-2">
          {filtered.map((entry, i) => (
            <EntryRow
              key={`${entry.kind}-${entry.id}`}
              entry={entry}
              index={i}
              adminActions={entry.kind === "order" ? adminActions : undefined}
            />
          ))}
        </ul>
      )}
    </>
  );
}

export function AccountStatementHeader({
  name,
  subtitle,
}: {
  name?: string | null;
  subtitle?: string;
}) {
  return (
  <div className="mb-6 flex items-center gap-3">
    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-leaf/15 text-leaf">
      <Wallet className="h-5 w-5" strokeWidth={2.25} />
    </div>
    <div>
      {name ? (
        <p className="font-display text-lg font-bold">{name}</p>
      ) : null}
      {subtitle ? (
        <p className="text-xs text-ink-muted">{subtitle}</p>
      ) : null}
    </div>
  </div>
  );
}
