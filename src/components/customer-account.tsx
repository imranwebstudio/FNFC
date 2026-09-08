"use client";

import Link from "next/link";
import {
  AlertCircle,
  ArrowDownLeft,
  ArrowUpRight,
  Building2,
  CalendarDays,
  MapPin,
  Phone,
  Receipt,
  Wallet,
} from "lucide-react";
import type { ReactNode } from "react";

import { Badge, Button, Panel } from "~/components/ui";
import { FoodPlateLoader } from "~/components/food-plate-loader";
import {
  formatBalanceLabel,
  formatMenuDateLabel,
  formatTaka,
} from "~/lib/datetime";
import type { StatementEntry } from "~/lib/build-account-statement";
import type { AccountStatementSummary } from "~/lib/build-account-statement";
import { api } from "~/trpc/react";

function initials(name: string | null | undefined) {
  if (!name?.trim()) return "?";
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

function formatWhen(d: Date) {
  return new Date(d).toLocaleString("en-BD", {
    timeZone: "Asia/Dhaka",
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function memberSinceLabel(createdAt: Date | string | undefined) {
  if (!createdAt) return "—";
  const start = new Date(createdAt);
  const days = Math.max(
    0,
    Math.floor((Date.now() - start.getTime()) / (1000 * 60 * 60 * 24)),
  );
  if (days < 30) return `${days} day${days === 1 ? "" : "s"}`;
  const months = Math.floor(days / 30);
  if (months < 12) {
    const rem = months % 1 === 0 ? months : (days / 30).toFixed(1);
    return `${rem} month${months === 1 ? "" : "s"}`;
  }
  const years = (days / 365).toFixed(1);
  return `${years} year${Number(years) === 1 ? "" : "s"}`;
}

export function CustomerAccountView() {
  const me = api.user.me.useQuery();
  const statement = api.account.myStatement.useQuery();

  if (me.isLoading || statement.isLoading) {
    return <FoodPlateLoader label="Opening your account…" />;
  }
  if (me.isError) {
    return <p className="text-sm text-red-400">{me.error.message}</p>;
  }
  if (statement.isError) {
    return <p className="text-sm text-red-400">{statement.error.message}</p>;
  }
  if (!me.data || !statement.data) return null;

  const user = me.data;
  const isRegular = user.customerType === "REGULAR";
  const { summary, entries } = statement.data;

  return (
    <div className="space-y-5">
      {/* Profile header */}
      <Panel className="p-5">
        <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-leaf/20 text-2xl font-bold text-leaf">
            {initials(user.name)}
          </div>
          <div className="mt-4 min-w-0 sm:ml-5 sm:mt-0">
            <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
              <h1 className="font-display text-xl font-bold text-ink">
                {user.name ?? user.email}
              </h1>
              <Badge tone={isRegular ? "good" : "neutral"}>
                {isRegular ? "REGULAR" : "ONE-TIME"}
              </Badge>
            </div>
            <ul className="mt-3 space-y-1.5 text-sm text-ink-muted">
              {user.phoneNumber ? (
                <li className="flex items-center justify-center gap-2 sm:justify-start">
                  <Phone className="h-3.5 w-3.5 text-leaf" />
                  {user.phoneNumber}
                </li>
              ) : null}
              {user.location?.name || user.deskNumber ? (
                <li className="flex items-center justify-center gap-2 sm:justify-start">
                  <MapPin className="h-3.5 w-3.5 text-leaf" />
                  {[
                    user.location?.name,
                    user.floorNumber ? `Fl ${user.floorNumber}` : null,
                    user.deskNumber ? `Desk ${user.deskNumber}` : null,
                  ]
                    .filter(Boolean)
                    .join(", ")}
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      </Panel>

      {!isRegular ? (
        <Panel className="border-leaf/20 bg-leaf/5 py-3.5">
          <p className="text-sm text-ink">
            <span className="font-semibold text-leaf">One-time customer.</span>{" "}
            No wallet balance. Pay at delivery.
          </p>
        </Panel>
      ) : null}

      {/* Stats */}
      <Panel className="grid grid-cols-2 gap-0 divide-x divide-line/60 p-0 overflow-hidden">
        <div className="p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-muted">
            Total Orders
          </p>
          <p className="mt-1 text-2xl font-bold tabular-nums text-ink">
            {summary.orderCount}
          </p>
          <Link
            href="/app/orders"
            className="mt-1 inline-block text-xs font-semibold text-leaf hover:underline"
          >
            View Orders →
          </Link>
        </div>
        <div className="p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-muted">
            Member Since
          </p>
          <p className="mt-1 text-lg font-bold text-ink">
            {memberSinceLabel(user.createdAt)}
          </p>
          <p className="mt-0.5 text-xs text-ink-muted">
            {user.createdAt
              ? new Date(user.createdAt).toLocaleDateString("en-BD", {
                  timeZone: "Asia/Dhaka",
                })
              : ""}
          </p>
        </div>
      </Panel>

      {isRegular ? (
        <RegularWalletBlock summary={summary} entries={entries} />
      ) : (
        <OneTimePaymentBlock summary={summary} entries={entries} />
      )}

      {/* Customer info */}
      <Panel>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-base font-semibold text-ink">
            Customer Information
          </h2>
          <Link
            href="/app/profile"
            className="text-xs font-semibold text-leaf hover:underline"
          >
            Edit
          </Link>
        </div>
        <ul className="space-y-3 text-sm">
          <InfoRow
            icon={<Phone className="h-4 w-4" />}
            label="Phone"
            value={user.phoneNumber ?? "—"}
          />
          <InfoRow
            icon={<Building2 className="h-4 w-4" />}
            label="Office"
            value={user.location?.name ?? "—"}
          />
          <InfoRow
            icon={<MapPin className="h-4 w-4" />}
            label="Desk"
            value={[
              user.buildingNumber ? `Bldg ${user.buildingNumber}` : null,
              user.floorNumber ? `Fl ${user.floorNumber}` : null,
              user.deskNumber ? `Desk ${user.deskNumber}` : null,
            ]
              .filter(Boolean)
              .join(" · ") || "—"}
          />
          <InfoRow
            icon={<CalendarDays className="h-4 w-4" />}
            label="Type"
            value={isRegular ? "Regular (wallet)" : "One-time"}
          />
        </ul>
      </Panel>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 text-leaf">{icon}</span>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-muted">
          {label}
        </p>
        <p className="text-ink">{value}</p>
      </div>
    </li>
  );
}

function RegularWalletBlock({
  summary,
  entries,
}: {
  summary: AccountStatementSummary;
  entries: StatementEntry[];
}) {
  const bal = formatBalanceLabel(summary.balance);
  const recent = entries.filter((e) => e.kind === "wallet").slice(0, 6);

  return (
    <>
      <Panel
        className={`p-4 ${
          bal.isDue ? "border-red-400/30 bg-red-500/10" : "border-leaf/25 bg-leaf/5"
        }`}
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-muted">
              Wallet Balance
            </p>
            <p
              className={`mt-1 text-3xl font-bold tabular-nums ${
                bal.isDue ? "text-red-400" : "text-ink"
              }`}
            >
              {bal.isDue ? `-${formatTaka(-summary.balance).slice(1)}` : bal.text}
            </p>
            {bal.isDue ? <Badge tone="bad">Due</Badge> : null}
          </div>
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-sand text-leaf">
            <Wallet className="h-5 w-5" />
          </span>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 border-t border-line/50 pt-3 text-center text-xs">
          <div>
            <p className="text-ink-muted">Total Deposit</p>
            <p className="mt-0.5 font-bold tabular-nums text-leaf">
              {formatTaka(summary.totalDeposits)}
            </p>
          </div>
          <div>
            <p className="text-ink-muted">Total Spent</p>
            <p className="mt-0.5 font-bold tabular-nums text-ink">
              {formatTaka(summary.totalSpent)}
            </p>
          </div>
          <div>
            <p className="text-ink-muted">Available</p>
            <p
              className={`mt-0.5 font-bold tabular-nums ${
                bal.isDue ? "text-red-400" : "text-ink"
              }`}
            >
              {bal.text}
            </p>
          </div>
        </div>
      </Panel>

      <Panel className="border-spice/20 bg-spice/5 py-3">
        <p className="text-xs leading-relaxed text-ink-muted">
          <span className="font-semibold text-spice">About wallet:</span> Meal
          charges deduct after delivery. Negative balance means you have due —
          deposits clear it first.
        </p>
      </Panel>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-base font-semibold">
            Recent Transactions
          </h2>
        </div>
        {recent.length === 0 ? (
          <Panel className="py-4">
            <p className="text-sm text-ink-muted">No wallet activity yet.</p>
          </Panel>
        ) : (
          <ul className="space-y-2">
            {recent.map((e) => {
              if (e.kind !== "wallet") return null;
              const positive = e.amount >= 0;
              return (
                <Panel key={e.id} className="flex items-center gap-3 py-3">
                  <span
                    className={`inline-flex h-9 w-9 items-center justify-center rounded-xl ${
                      positive
                        ? "bg-leaf/15 text-leaf"
                        : "bg-red-500/15 text-red-300"
                    }`}
                  >
                    {positive ? (
                      <ArrowDownLeft className="h-4 w-4" />
                    ) : (
                      <ArrowUpRight className="h-4 w-4" />
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-ink">
                      {e.txType === "DEPOSIT"
                        ? "Deposit"
                        : e.txType === "CHARGE"
                          ? "Wallet Charge"
                          : e.txType === "DUE_PAYMENT"
                            ? "Due Payment"
                            : "Adjustment"}
                      {e.createdByName ? ` by ${e.createdByName}` : ""}
                    </p>
                    <p className="text-[11px] text-ink-muted">
                      {formatWhen(e.at)}
                    </p>
                  </div>
                  <p
                    className={`text-sm font-bold tabular-nums ${
                      positive ? "text-leaf" : "text-red-400"
                    }`}
                  >
                    {positive ? "+" : ""}
                    {formatTaka(e.amount)}
                  </p>
                </Panel>
              );
            })}
          </ul>
        )}
      </section>
    </>
  );
}

function OneTimePaymentBlock({
  summary,
  entries,
}: {
  summary: AccountStatementSummary;
  entries: StatementEntry[];
}) {
  const cashPaid = entries
    .filter((e) => e.kind === "order" && e.paymentStatus === "PAID")
    .reduce((s, e) => s + (e.kind === "order" ? e.amount : 0), 0);
  const dueAmount = summary.unpaidCashTotal;
  const recentOrders = entries
    .filter((e) => e.kind === "order" && e.status !== "CANCELLED")
    .slice(0, 8);

  return (
    <>
      <Panel>
        <h2 className="font-display text-base font-semibold text-ink">
          Payment Status
        </h2>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="rounded-2xl border border-leaf/25 bg-leaf/5 p-3">
            <div className="flex items-center gap-2 text-leaf">
              <Wallet className="h-4 w-4" />
              <span className="text-[11px] font-semibold uppercase">
                Cash Paid
              </span>
            </div>
            <p className="mt-2 text-xl font-bold tabular-nums text-leaf">
              {formatTaka(cashPaid)}
            </p>
          </div>
          <div className="rounded-2xl border border-red-400/25 bg-red-500/10 p-3">
            <div className="flex items-center gap-2 text-red-300">
              <AlertCircle className="h-4 w-4" />
              <span className="text-[11px] font-semibold uppercase">
                Due Amount
              </span>
            </div>
            <p className="mt-2 text-xl font-bold tabular-nums text-red-400">
              {formatTaka(dueAmount)}
            </p>
          </div>
        </div>
        <p className="mt-3 text-xs text-ink-muted">
          Due amount should be paid on next order / delivery.
        </p>
      </Panel>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-base font-semibold">
            Recent Orders
          </h2>
          <Link
            href="/app/orders"
            className="text-xs font-semibold text-leaf hover:underline"
          >
            View All
          </Link>
        </div>
        {recentOrders.length === 0 ? (
          <Panel className="py-4">
            <p className="text-sm text-ink-muted">No orders yet.</p>
          </Panel>
        ) : (
          <ul className="space-y-2">
            {recentOrders.map((e) => {
              if (e.kind !== "order") return null;
              const due =
                e.paymentStatus === "UNPAID" || e.paymentStatus === "DUE";
              return (
                <Panel
                  key={e.id}
                  className="flex items-center justify-between gap-3 py-3"
                >
                  <div className="flex min-w-0 items-start gap-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-spice/15 text-spice">
                      <Receipt className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-ink">
                        {e.mealTitle}
                        {e.quantity > 1 ? ` ×${e.quantity}` : ""}
                      </p>
                      <p className="text-[11px] text-ink-muted">
                        {formatMenuDateLabel(e.mealDate)} · {formatWhen(e.at)}
                      </p>
                    </div>
                  </div>
                  <Badge tone={due ? "bad" : "good"}>
                    {due
                      ? `Due ${formatTaka(e.amount)}`
                      : `Paid ${formatTaka(e.amount)}`}
                  </Badge>
                </Panel>
              );
            })}
          </ul>
        )}
      </section>
    </>
  );
}
