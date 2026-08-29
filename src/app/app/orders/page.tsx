"use client";

import { motion } from "framer-motion";
import { Receipt } from "lucide-react";

import { Badge, PageTitle, Panel } from "~/components/ui";
import { formatTaka } from "~/lib/datetime";
import { api } from "~/trpc/react";

export default function OrdersPage() {
  const orders = api.order.listMine.useQuery();

  return (
    <div>
      <PageTitle
        icon={<Receipt className="h-5 w-5" strokeWidth={2.25} />}
        title="My orders"
        subtitle="Recent set-meal orders."
      />
      {orders.isLoading ? (
        <p className="text-sm text-ink-muted">Loading…</p>
      ) : null}
      <ul className="space-y-3">
        {orders.data?.map((o, i) => (
          <motion.li
            key={o.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
          >
            <Panel className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-semibold tracking-tight text-ink">
                  {o.dailyMenu.title}
                </p>
                <p className="mt-0.5 text-xs text-ink-muted">
                  {o.dailyMenu.slot} · {o.location.name} ·{" "}
                  {new Date(o.createdAt).toLocaleString("en-BD", {
                    timeZone: "Asia/Dhaka",
                  })}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold tabular-nums">
                  {formatTaka(o.amount)}
                </span>
                <Badge
                  tone={
                    o.status === "DELIVERED"
                      ? "good"
                      : o.status === "CANCELLED"
                        ? "bad"
                        : "warn"
                  }
                >
                  {o.status}
                </Badge>
                <Badge
                  tone={
                    o.paymentStatus === "UNPAID"
                      ? "warn"
                      : o.paymentStatus === "PAID"
                        ? "good"
                        : "neutral"
                  }
                >
                  {o.paymentStatus}
                </Badge>
              </div>
            </Panel>
          </motion.li>
        ))}
      </ul>
      {!orders.isLoading && orders.data?.length === 0 ? (
        <Panel>
          <p className="text-sm text-ink-muted">No orders yet.</p>
        </Panel>
      ) : null}
    </div>
  );
}
