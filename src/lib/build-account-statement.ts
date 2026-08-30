import { formatInTimeZone } from "date-fns-tz";

import { dueFromBalance } from "~/lib/datetime";

export type StatementEntry =
  | {
      kind: "order";
      id: string;
      at: Date;
      amount: number;
      mealTitle: string;
      mealSlot: string;
      mealDate: string;
      locationName: string;
      status: string;
      paymentStatus: string;
      note: string | null;
      placedByName: string | null;
      deliveredAt: Date | null;
      paidAt: Date | null;
    }
  | {
      kind: "wallet";
      id: string;
      at: Date;
      amount: number;
      balanceAfter: number;
      txType: string;
      note: string | null;
      orderId: string | null;
      createdByName: string | null;
    };

export type AccountStatementSummary = {
  balance: number;
  due: number;
  totalDue: number;
  paymentMode: string;
  orderCount: number;
  cancelledCount: number;
  totalSpent: number;
  totalDeposits: number;
  totalDuePayments: number;
  unpaidCashTotal: number;
  unpaidCashCount: number;
};

type OrderRow = {
  id: string;
  amount: number;
  note: string | null;
  status: string;
  paymentStatus: string;
  createdAt: Date;
  deliveredAt: Date | null;
  paidAt: Date | null;
  dailyMenu: {
    title: string;
    slot: string;
    date: Date;
  };
  location: { name: string };
  placedBy: { name: string | null; email: string | null } | null;
};

type WalletRow = {
  id: string;
  type: string;
  amount: number;
  balanceAfter: number;
  note: string | null;
  orderId: string | null;
  createdAt: Date;
  createdBy: { name: string | null; email: string | null } | null;
};

export function buildAccountStatement(input: {
  balance: number;
  paymentMode: string;
  orders: OrderRow[];
  walletTxs: WalletRow[];
}) {
  const entries: StatementEntry[] = [];

  const chargeOrderIds = new Set(
    input.walletTxs
      .filter((t) => t.type === "CHARGE" && t.orderId)
      .map((t) => t.orderId!),
  );

  for (const o of input.orders) {
    entries.push({
      kind: "order",
      id: o.id,
      at: o.createdAt,
      amount: o.amount,
      mealTitle: o.dailyMenu.title,
      mealSlot: o.dailyMenu.slot,
      mealDate: formatInTimeZone(o.dailyMenu.date, "UTC", "yyyy-MM-dd"),
      locationName: o.location.name,
      status: o.status,
      paymentStatus: o.paymentStatus,
      note: o.note,
      placedByName: o.placedBy?.name ?? o.placedBy?.email ?? null,
      deliveredAt: o.deliveredAt,
      paidAt: o.paidAt,
    });
  }

  for (const t of input.walletTxs) {
    if (t.type === "CHARGE" && t.orderId && chargeOrderIds.has(t.orderId)) {
      continue;
    }
    entries.push({
      kind: "wallet",
      id: t.id,
      at: t.createdAt,
      amount: t.amount,
      balanceAfter: t.balanceAfter,
      txType: t.type,
      note: t.note,
      orderId: t.orderId,
      createdByName: t.createdBy?.name ?? t.createdBy?.email ?? null,
    });
  }

  entries.sort((a, b) => b.at.getTime() - a.at.getTime());

  const activeOrders = input.orders.filter((o) => o.status !== "CANCELLED");
  const cancelledCount = input.orders.filter(
    (o) => o.status === "CANCELLED",
  ).length;

  const totalDeposits = input.walletTxs
    .filter((t) => t.type === "DEPOSIT")
    .reduce((s, t) => s + t.amount, 0);

  const totalDuePayments = input.walletTxs
    .filter((t) => t.type === "DUE_PAYMENT")
    .reduce((s, t) => s + t.amount, 0);

  const unpaidCash = activeOrders.filter((o) => o.paymentStatus === "UNPAID");
  const due = dueFromBalance(input.balance);
  const unpaidCashTotal = unpaidCash.reduce((s, o) => s + o.amount, 0);

  const summary: AccountStatementSummary = {
    balance: input.balance,
    due,
    totalDue: due + unpaidCashTotal,
    paymentMode: input.paymentMode,
    orderCount: activeOrders.length,
    cancelledCount,
    totalSpent: activeOrders.reduce((s, o) => s + o.amount, 0),
    totalDeposits,
    totalDuePayments,
    unpaidCashTotal,
    unpaidCashCount: unpaidCash.length,
  };

  return { summary, entries };
}
