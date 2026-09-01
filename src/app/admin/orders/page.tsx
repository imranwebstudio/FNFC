"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Banknote,
  ClipboardList,
  PackageCheck,
  Phone,
} from "lucide-react";

import { FoodPlateLoader } from "~/components/food-plate-loader";
import {
  Badge,
  Button,
  Input,
  Label,
  PageTitle,
  Panel,
  Select,
} from "~/components/ui";
import {
  addDaysToDateString,
  formatMenuDateLabel,
  formatTaka,
  todayDateString,
} from "~/lib/datetime";
import { api } from "~/trpc/react";
import { showSuccess } from "~/lib/swal";

export default function AdminOrdersPage() {
  const locations = api.location.list.useQuery();
  const me = api.user.me.useQuery();
  const [locationId, setLocationId] = useState("all");
  const [date, setDate] = useState(todayDateString());
  const utils = api.useUtils();

  const [behalfLocationId, setBehalfLocationId] = useState("");
  const [behalfDate, setBehalfDate] = useState(todayDateString());
  const [behalfUserId, setBehalfUserId] = useState("");
  const [behalfMenuId, setBehalfMenuId] = useState("");
  const [behalfNote, setBehalfNote] = useState("Phone order");
  const [behalfMsg, setBehalfMsg] = useState<string | null>(null);
  const [behalfOk, setBehalfOk] = useState(false);

  const minMealDate = todayDateString();
  const maxMealDate = addDaysToDateString(minMealDate, 42);

  useEffect(() => {
    if (!behalfLocationId && locations.data?.[0]) {
      setBehalfLocationId(locations.data[0].id);
    }
  }, [locations.data, behalfLocationId]);

  const orders = api.order.listForAdmin.useQuery({
    locationId: locationId === "all" ? undefined : locationId,
    date,
  });

  const members = api.admin.listUsers.useQuery(
    { locationId: behalfLocationId },
    { enabled: Boolean(behalfLocationId) },
  );

  const mealOptions = api.menu.optionsForLocation.useQuery(
    { locationId: behalfLocationId, date: behalfDate },
    { enabled: Boolean(behalfLocationId && behalfDate) },
  );

  const deliver = api.order.markDelivered.useMutation({
    onSuccess: async () => {
      showSuccess("Marked delivered");
      await utils.order.listForAdmin.invalidate();
      await utils.account.userStatement.invalidate();
    },
  });
  const confirmPay = api.order.confirmCashPayment.useMutation({
    onSuccess: async () => {
      showSuccess("Cash payment confirmed");
      await utils.order.listForAdmin.invalidate();
      await utils.account.userStatement.invalidate();
    },
  });
  const createForUser = api.order.createForUser.useMutation({
    onSuccess: async (_data, vars) => {
      showSuccess("Order placed", `Order recorded for ${formatMenuDateLabel(behalfDate)}.`);
      setBehalfOk(true);
      setBehalfMsg(`Order placed for ${formatMenuDateLabel(behalfDate)}`);
      setBehalfMenuId("");
      setBehalfNote("Phone order");
      await utils.order.listForAdmin.invalidate();
      await utils.admin.listUsers.invalidate();
      await utils.account.userStatement.invalidate({ userId: vars.userId });
    },
    onError: (e) => {
      setBehalfOk(false);
      setBehalfMsg(e.message);
    },
  });

  const isSuper = me.data?.role === "SUPER_ADMIN";
  const selectedMember = members.data?.find((u) => u.id === behalfUserId);

  useEffect(() => {
    setBehalfUserId("");
    setBehalfMenuId("");
  }, [behalfLocationId]);

  useEffect(() => {
    setBehalfMenuId("");
  }, [behalfDate]);

  return (
    <div>
      <PageTitle
        icon={<ClipboardList className="h-5 w-5" strokeWidth={2.25} />}
        title="Distribution board"
        subtitle="Mark delivered when food is handed over. Confirm cash paid separately when the customer pays. Place phone orders for members below — including future days from the weekly schedule."
      />

      <Panel className="mb-6">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Phone className="h-4 w-4 text-leaf" strokeWidth={2.25} />
          <h2 className="font-display text-base font-semibold">
            Order for member
          </h2>
        </div>
        <p className="mb-4 text-xs text-ink-muted">
          Record a meal under a member&apos;s account (e.g. after a phone call).
          Pick any upcoming day — weekday templates load automatically. Uses
          their cash/wallet mode. Cutoff is skipped for admins.
        </p>

        {behalfMsg ? (
          <p
            className={`mb-3 rounded-xl px-3 py-2 text-sm ${
              behalfOk
                ? "bg-leaf/10 text-leaf"
                : "bg-red-500/10 text-red-400"
            }`}
          >
            {behalfMsg}
          </p>
        ) : null}

        <form
          className="grid gap-3 sm:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            setBehalfMsg(null);
            setBehalfOk(false);
            if (!behalfUserId || !behalfMenuId) {
              setBehalfMsg("Select a member and a meal");
              return;
            }
            createForUser.mutate({
              userId: behalfUserId,
              dailyMenuId: behalfMenuId,
              note: behalfNote.trim() || undefined,
            });
          }}
        >
          <div>
            <Label>Office</Label>
            <Select
              value={behalfLocationId}
              onChange={(e) => setBehalfLocationId(e.target.value)}
              required
            >
              {locations.data?.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.name}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label>Meal day</Label>
            <Input
              type="date"
              required
              min={minMealDate}
              max={maxMealDate}
              value={behalfDate}
              onChange={(e) => setBehalfDate(e.target.value)}
            />
            <p className="mt-1 text-[11px] text-ink-muted">
              Today through ~6 weeks ahead
            </p>
          </div>
          <div>
            <Label>Member</Label>
            <Select
              value={behalfUserId}
              onChange={(e) => setBehalfUserId(e.target.value)}
              required
            >
              <option value="">Select member…</option>
              {members.data?.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name ?? u.email}
                  {u.employeeId ? ` · ${u.employeeId}` : ""}
                  {u.deskNumber ? ` · Desk ${u.deskNumber}` : ""}
                </option>
              ))}
            </Select>
            {selectedMember ? (
              <p className="mt-1 text-[11px] text-ink-muted">
                Pays with {selectedMember.paymentMode} · Bal{" "}
                {formatTaka(selectedMember.balance)}
              </p>
            ) : null}
          </div>
          <div>
            <Label>
              Meal
              {mealOptions.data?.date
                ? ` · ${formatMenuDateLabel(mealOptions.data.date)}`
                : ""}
            </Label>
            <Select
              value={behalfMenuId}
              onChange={(e) => setBehalfMenuId(e.target.value)}
              required
            >
              <option value="">Select meal…</option>
              {mealOptions.data?.menus.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.slot}: {m.title} · {formatTaka(m.price)}
                </option>
              ))}
            </Select>
            {mealOptions.isError ? (
              <p className="mt-1 text-[11px] text-red-400">
                {mealOptions.error.message}
              </p>
            ) : mealOptions.isLoading || mealOptions.isFetching ? (
              <FoodPlateLoader
                size="sm"
                label="Loading meals…"
                className="items-start py-2"
              />
            ) : mealOptions.data && mealOptions.data.menus.length === 0 ? (
              <p className="mt-1 text-[11px] text-ink-muted">
                No meals on {formatMenuDateLabel(behalfDate)}. Change Meal day
                to the day that has the weekly meal (e.g. Sunday), or add meals
                in Admin → Menu.
              </p>
            ) : null}
          </div>
          <div className="sm:col-span-2">
            <Label>Note</Label>
            <Input
              value={behalfNote}
              onChange={(e) => setBehalfNote(e.target.value)}
              placeholder="Phone order"
              maxLength={300}
            />
          </div>
          <div className="sm:col-span-2">
            <Button type="submit" disabled={createForUser.isPending}>
              {createForUser.isPending ? "Placing…" : "Place order for member"}
            </Button>
          </div>
        </form>
      </Panel>

      <div className="mb-5 grid max-w-lg gap-3 sm:grid-cols-2">
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
            className="w-full rounded-2xl border border-line bg-rice px-3.5 py-2.5 text-sm outline-none transition focus:border-leaf/50 focus:ring-4 focus:ring-leaf/15"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>

      {orders.isLoading ? (
        <FoodPlateLoader label="Fetching today's orders…" />
      ) : null}

      <ul className="space-y-2.5">
        {!orders.isLoading
          ? orders.data?.map((o, i) => (
          <motion.li
            key={o.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.02 }}
          >
            <Panel className="flex flex-wrap items-center justify-between gap-3 py-3.5">
              <div>
                <p className="font-semibold tracking-tight">
                  <Link
                    href={`/admin/users/${o.user.id}`}
                    className="text-leaf-deep transition hover:text-leaf hover:underline"
                  >
                    {o.user.name ?? o.user.email}
                  </Link>{" "}
                  <span className="text-xs font-normal text-ink-muted">
                    {o.user.employeeId}
                  </span>
                </p>
                <p className="mt-0.5 text-xs text-ink-muted">
                  {o.location.name} · Bldg {o.user.buildingNumber} · Fl{" "}
                  {o.user.floorNumber} · Desk {o.user.deskNumber} ·{" "}
                  {o.dailyMenu.slot} · {o.dailyMenu.title}
                </p>
                {o.placedBy ? (
                  <p className="mt-1 text-[11px] text-ink-muted">
                    Placed by{" "}
                    <span className="font-medium text-ink">
                      {o.placedBy.name ?? o.placedBy.email}
                    </span>
                    {o.note ? ` · ${o.note}` : null}
                  </p>
                ) : o.note ? (
                  <p className="mt-1 text-[11px] text-ink-muted">{o.note}</p>
                ) : null}
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <Badge tone={o.status === "DELIVERED" ? "good" : "warn"}>
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
                  {o.placedBy ? <Badge tone="neutral">Admin order</Badge> : null}
                  <span className="text-xs font-bold tabular-nums">
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
                    <PackageCheck className="h-4 w-4" />
                    Mark delivered
                  </Button>
                ) : null}
                {o.paymentStatus === "UNPAID" ? (
                  <Button
                    type="button"
                    disabled={confirmPay.isPending}
                    onClick={() => confirmPay.mutate({ orderId: o.id })}
                  >
                    <Banknote className="h-4 w-4" />
                    Confirm cash paid
                  </Button>
                ) : null}
              </div>
            </Panel>
          </motion.li>
        ))
          : null}
      </ul>
      {!orders.isLoading && orders.data?.length === 0 ? (
        <p className="text-sm text-ink-muted">No orders for this day.</p>
      ) : null}
    </div>
  );
}
