"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { Badge, Button, Label, PageTitle, Panel, Select } from "~/components/ui";
import { formatTaka, todayDateString } from "~/lib/datetime";
import { api } from "~/trpc/react";

export default function AdminOrdersPage() {
  const locations = api.location.list.useQuery();
  const me = api.user.me.useQuery();
  const [locationId, setLocationId] = useState("all");
  const [date, setDate] = useState(todayDateString());
  const utils = api.useUtils();

  const orders = api.order.listForAdmin.useQuery({
    locationId: locationId === "all" ? undefined : locationId,
    date,
  });

  const deliver = api.order.markDelivered.useMutation({
    onSuccess: async () => utils.order.listForAdmin.invalidate(),
  });
  const confirmPay = api.order.confirmCashPayment.useMutation({
    onSuccess: async () => utils.order.listForAdmin.invalidate(),
  });

  const isSuper = me.data?.role === "SUPER_ADMIN";

  return (
    <div>
      <PageTitle
        title="Distribution board"
        subtitle="Mark delivered when food is handed over. Confirm cash paid separately when the customer pays."
      />

      <div className="mb-4 grid max-w-lg gap-3 sm:grid-cols-2">
        <div>
          <Label>Location</Label>
          <Select
            value={locationId}
            onChange={(e) => setLocationId(e.target.value)}
          >
            <option value="all">
              {isSuper ? "All offices" : "All my offices"}
            </option>
            {locations.data?.map((l) => (
              <option key={l.id} value={l.id}>
                {l.name}
                {!l.isActive ? " (off)" : ""}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <Label>Date</Label>
          <input
            type="date"
            className="w-full rounded-xl border border-line bg-rice/90 px-3 py-2.5 text-sm"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>

      <ul className="space-y-2">
        {orders.data?.map((o, i) => (
          <motion.li
            key={o.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.02 }}
          >
            <Panel className="flex flex-wrap items-center justify-between gap-3 py-3">
              <div>
                <p className="font-semibold">
                  {o.user.name ?? o.user.email}{" "}
                  <span className="text-xs font-normal text-ink-muted">
                    {o.user.employeeId}
                  </span>
                </p>
                <p className="text-xs text-ink-muted">
                  {o.location.name} · Bldg {o.user.buildingNumber} · Fl{" "}
                  {o.user.floorNumber} · Desk {o.user.deskNumber} ·{" "}
                  {o.dailyMenu.slot} · {o.dailyMenu.title}
                </p>
                <div className="mt-1 flex flex-wrap gap-1">
                  <Badge
                    tone={o.status === "DELIVERED" ? "good" : "warn"}
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
                  <Badge>{o.user.paymentMode}</Badge>
                  <span className="text-xs font-semibold">
                    {formatTaka(o.amount)}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {o.status === "PLACED" ? (
                  <Button
                    type="button"
                    variant="secondary"
                    disabled={deliver.isPending}
                    onClick={() => deliver.mutate({ orderId: o.id })}
                  >
                    Mark delivered
                  </Button>
                ) : null}
                {o.paymentStatus === "UNPAID" ? (
                  <Button
                    type="button"
                    disabled={confirmPay.isPending}
                    onClick={() => confirmPay.mutate({ orderId: o.id })}
                  >
                    Confirm cash paid
                  </Button>
                ) : null}
              </div>
            </Panel>
          </motion.li>
        ))}
      </ul>
      {!orders.isLoading && orders.data?.length === 0 ? (
        <p className="text-sm text-ink-muted">No orders for this day.</p>
      ) : null}
    </div>
  );
}
