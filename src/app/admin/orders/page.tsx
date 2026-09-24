"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Banknote,
  ClipboardList,
  PackageCheck,
  Phone,
  Plus,
  Repeat,
  Wallet,
  X,
} from "lucide-react";

import { FoodPlateLoader } from "~/components/food-plate-loader";
import { SearchSelect } from "~/components/combobox";
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
  formatBalanceLabel,
  formatMenuDateLabel,
  formatTaka,
  todayDateString,
} from "~/lib/datetime";
import { MAX_ORDER_QUANTITY } from "~/lib/order-quantity";
import { api } from "~/trpc/react";
import type { RouterOutputs } from "~/trpc/react";
import { showSuccess } from "~/lib/swal";

export default function AdminOrdersPage() {
  const locations = api.location.list.useQuery();
  const me = api.user.me.useQuery();
  const [locationId, setLocationId] = useState("all");
  const [date, setDate] = useState(todayDateString());
  const [searchQuery, setSearchQuery] = useState("");
  const utils = api.useUtils();

  const [behalfLocationId, setBehalfLocationId] = useState("");
  const [behalfDate, setBehalfDate] = useState(todayDateString());
  const [behalfUserId, setBehalfUserId] = useState("");
  const [behalfMenuId, setBehalfMenuId] = useState("");
  const [behalfQuantity, setBehalfQuantity] = useState(1);
  const [behalfNote, setBehalfNote] = useState("Phone order");
  const [behalfMsg, setBehalfMsg] = useState<string | null>(null);
  const [behalfOk, setBehalfOk] = useState(false);
  const [showBehalfForm, setShowBehalfForm] = useState(false);

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
    { enabled: Boolean(behalfLocationId && showBehalfForm) },
  );

  const mealOptions = api.menu.optionsForLocation.useQuery(
    { locationId: behalfLocationId, date: behalfDate },
    { enabled: Boolean(behalfLocationId && behalfDate && showBehalfForm) },
  );

  const deliver = api.order.markDelivered.useMutation({
    onSuccess: async () => {
      showSuccess("Marked delivered");
      await utils.order.listForAdmin.invalidate();
      await utils.account.userStatement.invalidate();
      await utils.menu.todayForUser.invalidate();
    },
  });
  const confirmPay = api.order.confirmCashPayment.useMutation({
    onSuccess: async () => {
      showSuccess("Cash payment confirmed");
      await utils.order.listForAdmin.invalidate();
      await utils.account.userStatement.invalidate();
    },
  });
  const chargeWallet = api.order.chargeWallet.useMutation({
    onSuccess: async () => {
      showSuccess("Wallet charged");
      await utils.order.listForAdmin.invalidate();
      await utils.account.userStatement.invalidate();
      await utils.admin.listUsers.invalidate();
    },
  });
  const markDue = api.order.markDue.useMutation({
    onSuccess: async () => {
      showSuccess("Marked as due");
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
      setBehalfQuantity(1);
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

  const filteredOrders =
    orders.data?.filter((o) => {
      const q = searchQuery.trim().toLowerCase();
      if (!q) return true;
      return (
        (o.user.name?.toLowerCase().includes(q) ?? false) ||
        (o.user.email?.toLowerCase().includes(q) ?? false) ||
        (o.user.employeeId?.toLowerCase().includes(q) ?? false)
      );
    }) ?? [];

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
        subtitle="Mark delivered when food is handed over. Regular: Charge Wallet after delivery. One-time: Cash Paid or Due. Place phone orders below."
      />

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-leaf" strokeWidth={2.25} />
          <div>
            <h2 className="font-display text-base font-semibold">
              Order for member
            </h2>
            <p className="text-xs text-ink-muted">
              Place a phone order under a member&apos;s account.
            </p>
          </div>
        </div>
        {!showBehalfForm ? (
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              setShowBehalfForm(true);
              setBehalfMsg(null);
            }}
          >
            <Plus className="h-4 w-4" />
            Order for member
          </Button>
        ) : null}
      </div>

      {showBehalfForm ? (
      <Panel className="mb-6">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <Phone className="h-4 w-4 text-leaf" strokeWidth={2.25} />
            <h2 className="font-display text-base font-semibold">
              Order for member
            </h2>
          </div>
        </div>
        <p className="mb-4 text-xs text-ink-muted">
          Record a meal under a member&apos;s account (e.g. after a phone call).
          Pick any upcoming day — weekday templates load automatically. Orders
          stay unpaid until settled after delivery. Cutoff is skipped for admins.
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
              quantity: behalfQuantity,
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
            <SearchSelect
              label="Member"
              required
              value={behalfUserId}
              onChange={setBehalfUserId}
              placeholder="Search name, email, ID, desk…"
              emptyText={
                members.isLoading ? "Loading members…" : "No members match"
              }
              options={
                members.data?.map((u) => ({
                  value: u.id,
                  label: u.name ?? u.email ?? "Unknown",
                  keywords: [
                    u.email,
                    u.employeeId,
                    u.deskNumber ? `Desk ${u.deskNumber}` : null,
                    u.phoneNumber,
                  ]
                    .filter(Boolean)
                    .join(" · "),
                })) ?? []
              }
            />
            {selectedMember ? (
              <p className="mt-1 text-[11px] text-ink-muted">
                {selectedMember.customerType === "REGULAR"
                  ? "Regular"
                  : "One-time"}{" "}
                · {formatBalanceLabel(selectedMember.balance).text}
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
          <div>
            <Label>Quantity</Label>
            <Input
              type="number"
              min={1}
              max={MAX_ORDER_QUANTITY}
              value={behalfQuantity}
              onChange={(e) => {
                const parsed = Number(e.target.value);
                if (!Number.isFinite(parsed)) return;
                setBehalfQuantity(
                  Math.min(
                    MAX_ORDER_QUANTITY,
                    Math.max(1, Math.floor(parsed)),
                  ),
                );
              }}
              required
            />
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
          <div className="flex flex-wrap gap-2 sm:col-span-2">
            <Button type="submit" disabled={createForUser.isPending}>
              {createForUser.isPending ? "Placing…" : "Place order for member"}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setShowBehalfForm(false);
                setBehalfMsg(null);
                setBehalfUserId("");
                setBehalfMenuId("");
                setBehalfQuantity(1);
                setBehalfNote("Phone order");
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Panel>
      ) : null}

      <div className="mb-5 grid max-w-3xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
        <div>
          <Label htmlFor="order-search">Search member</Label>
          <Input
            id="order-search"
            placeholder="Name or employee ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {orders.isLoading ? (
        <FoodPlateLoader label="Fetching today's orders…" />
      ) : null}

      <ul className="space-y-2.5">
        {!orders.isLoading
          ? filteredOrders.map((o, i) => (
              <OrderCard
                key={o.id}
                order={o}
                index={i}
                date={date}
                deliverPending={deliver.isPending}
                chargeWalletPending={chargeWallet.isPending}
                confirmPayPending={confirmPay.isPending}
                markDuePending={markDue.isPending}
                onDeliver={() => deliver.mutate({ orderId: o.id })}
                onChargeWallet={() => chargeWallet.mutate({ orderId: o.id })}
                onConfirmPay={() => confirmPay.mutate({ orderId: o.id })}
                onMarkDue={() => markDue.mutate({ orderId: o.id })}
              />
            ))
          : null}
      </ul>
      {!orders.isLoading && orders.data?.length === 0 ? (
        <p className="text-sm text-ink-muted">No orders for this day.</p>
      ) : null}
      {!orders.isLoading &&
      (orders.data?.length ?? 0) > 0 &&
      filteredOrders.length === 0 ? (
        <p className="text-sm text-ink-muted">
          No members match &ldquo;{searchQuery}&rdquo;.
        </p>
      ) : null}
    </div>
  );
}

type AdminOrder = RouterOutputs["order"]["listForAdmin"][number];

function OrderCard({
  order: o,
  index: i,
  date,
  deliverPending,
  chargeWalletPending,
  confirmPayPending,
  markDuePending,
  onDeliver,
  onChargeWallet,
  onConfirmPay,
  onMarkDue,
}: {
  order: AdminOrder;
  index: number;
  date: string;
  deliverPending: boolean;
  chargeWalletPending: boolean;
  confirmPayPending: boolean;
  markDuePending: boolean;
  onDeliver: () => void;
  onChargeWallet: () => void;
  onConfirmPay: () => void;
  onMarkDue: () => void;
}) {
  const utils = api.useUtils();
  const [swapOpen, setSwapOpen] = useState(false);
  const canChangeMeal =
    (o.paymentStatus === "UNPAID" || o.paymentStatus === "DUE") &&
    date >= todayDateString();

  const mealOptions = api.menu.optionsForLocation.useQuery(
    { locationId: o.locationId, date },
    { enabled: canChangeMeal && swapOpen },
  );

  const changeMeal = api.order.changeMeal.useMutation({
    onSuccess: async (result) => {
      const updated = result.order;
      const label = `${updated.dailyMenu.slot} · ${updated.dailyMenu.title}`;
      showSuccess(
        result.split ? "Meal split" : "Meal updated",
        result.split
          ? `Moved ${result.swappedQuantity} → ${label}`
          : label,
      );
      setSwapOpen(false);
      await utils.order.listForAdmin.invalidate();
      await utils.account.userStatement.invalidate();
    },
  });

  const menuChoices =
    mealOptions.data?.menus.length
      ? mealOptions.data.menus
      : [
          {
            id: o.dailyMenuId,
            slot: o.dailyMenu.slot,
            title: o.dailyMenu.title,
            price: o.dailyMenu.price,
          },
        ];

  const swapOne = (dailyMenuId: string) => {
    if (dailyMenuId === o.dailyMenuId) return;
    changeMeal.mutate({
      orderId: o.id,
      dailyMenuId,
      quantity: 1,
    });
  };

  const swapAll = (dailyMenuId: string) => {
    if (dailyMenuId === o.dailyMenuId) return;
    changeMeal.mutate({
      orderId: o.id,
      dailyMenuId,
      quantity: o.quantity,
    });
  };

  return (
    <motion.li
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.02 }}
    >
      <Panel className="flex flex-wrap items-center justify-between gap-3 py-3.5">
        <div className="min-w-0 flex-1">
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
            {o.user.floorNumber} · Desk {o.user.deskNumber}
          </p>
          <div className="mt-1 flex items-center gap-1.5">
            <p className="min-w-0 text-sm font-bold tracking-tight text-ink">
              {o.dailyMenu.slot} · {o.dailyMenu.title}
              {o.quantity > 1 ? ` ×${o.quantity}` : ""}
            </p>
            {canChangeMeal ? (
              <button
                type="button"
                title="Replace meal"
                aria-label="Replace meal"
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-line bg-sand/80 text-leaf transition hover:border-leaf/40 hover:bg-leaf/10"
                onClick={() => setSwapOpen(true)}
              >
                <Repeat className="h-4 w-4" strokeWidth={2.25} />
              </button>
            ) : null}
          </div>
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
                o.paymentStatus === "DUE"
                  ? "bad"
                  : o.paymentStatus === "UNPAID"
                    ? "warn"
                    : o.paymentStatus === "PAID" ||
                        o.paymentStatus === "WALLET_CHARGED"
                      ? "good"
                      : "neutral"
              }
            >
              {o.paymentStatus}
            </Badge>
            <Badge
              tone={o.user.customerType === "REGULAR" ? "good" : "neutral"}
            >
              {o.user.customerType === "REGULAR" ? "Regular" : "One-time"}
            </Badge>
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
              disabled={deliverPending}
              onClick={onDeliver}
            >
              <PackageCheck className="h-4 w-4" />
              Mark delivered
            </Button>
          ) : null}
          {o.user.customerType === "REGULAR" &&
          o.status === "DELIVERED" &&
          o.paymentStatus === "UNPAID" ? (
            <Button
              type="button"
              disabled={chargeWalletPending}
              onClick={onChargeWallet}
            >
              <Wallet className="h-4 w-4" />
              Charge Wallet
            </Button>
          ) : null}
          {o.user.customerType === "ONE_TIME" &&
          o.status === "DELIVERED" &&
          (o.paymentStatus === "UNPAID" || o.paymentStatus === "DUE") ? (
            <Button
              type="button"
              disabled={confirmPayPending}
              onClick={onConfirmPay}
            >
              <Banknote className="h-4 w-4" />
              Cash Paid
            </Button>
          ) : null}
          {o.user.customerType === "ONE_TIME" &&
          o.status === "DELIVERED" &&
          o.paymentStatus === "UNPAID" ? (
            <Button
              type="button"
              variant="secondary"
              disabled={markDuePending}
              onClick={onMarkDue}
            >
              Due
            </Button>
          ) : null}
        </div>
      </Panel>

      {swapOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-0 backdrop-blur-sm sm:items-center sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby={`swap-meal-title-${o.id}`}
          onClick={() => !changeMeal.isPending && setSwapOpen(false)}
        >
          <div
            className="surface-card flex max-h-[90vh] w-full max-w-md flex-col rounded-t-3xl p-5 sm:rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex shrink-0 items-start justify-between gap-2 border-b border-line/50 pb-3">
              <div className="min-w-0">
                <h3
                  id={`swap-meal-title-${o.id}`}
                  className="font-display text-lg font-semibold"
                >
                  Replace meal
                </h3>
                <p className="truncate text-xs text-ink-muted">
                  {o.user.name ?? o.user.email}
                  {o.user.employeeId ? ` · ${o.user.employeeId}` : ""}
                </p>
                <p className="mt-0.5 text-xs font-medium text-ink">
                  Current: {o.dailyMenu.slot} · {o.dailyMenu.title}
                  {o.quantity > 1 ? ` ×${o.quantity}` : ""} ·{" "}
                  {formatTaka(o.amount)}
                </p>
              </div>
              <Button
                type="button"
                variant="ghost"
                className="px-2 py-1.5"
                disabled={changeMeal.isPending}
                onClick={() => setSwapOpen(false)}
              >
                <X className="h-4 w-4" />
                Close
              </Button>
            </div>

            <div className="min-h-0 flex-1 space-y-3 overflow-y-auto pt-4">
              {mealOptions.isLoading ? (
                <FoodPlateLoader size="sm" label="Loading meals…" />
              ) : null}

              {o.quantity > 1 ? (
                <>
                  <p className="text-xs text-ink-muted">
                    Change one plate at a time if they took different dishes,
                    or swap all below.
                  </p>
                  {Array.from({ length: o.quantity }, (_, idx) => (
                    <div key={`${o.id}-unit-${idx}`}>
                      <Label htmlFor={`meal-${o.id}-${idx}`}>
                        Meal {idx + 1} of {o.quantity}
                      </Label>
                      <Select
                        id={`meal-${o.id}-${idx}`}
                        className="font-bold"
                        value={o.dailyMenuId}
                        disabled={changeMeal.isPending || mealOptions.isLoading}
                        onChange={(e) => swapOne(e.target.value)}
                      >
                        {menuChoices.map((m) => (
                          <option key={m.id} value={m.id}>
                            {m.slot} · {m.title} · {formatTaka(m.price)}
                          </option>
                        ))}
                      </Select>
                    </div>
                  ))}
                  <div>
                    <Label htmlFor={`meal-all-${o.id}`}>Change all</Label>
                    <Select
                      id={`meal-all-${o.id}`}
                      value={o.dailyMenuId}
                      disabled={changeMeal.isPending || mealOptions.isLoading}
                      onChange={(e) => swapAll(e.target.value)}
                    >
                      {menuChoices.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.slot} · {m.title} ·{" "}
                          {formatTaka(m.price * o.quantity)}
                          {` (${formatTaka(m.price)} ×${o.quantity})`}
                        </option>
                      ))}
                    </Select>
                  </div>
                </>
              ) : (
                <div>
                  <Label htmlFor={`meal-${o.id}`}>New meal</Label>
                  <Select
                    id={`meal-${o.id}`}
                    className="font-bold"
                    value={o.dailyMenuId}
                    disabled={changeMeal.isPending || mealOptions.isLoading}
                    onChange={(e) => swapAll(e.target.value)}
                  >
                    {menuChoices.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.slot} · {m.title} · {formatTaka(m.price)}
                      </option>
                    ))}
                  </Select>
                </div>
              )}

              {changeMeal.error ? (
                <p className="text-xs text-red-400">
                  {changeMeal.error.message}
                </p>
              ) : changeMeal.isPending ? (
                <p className="text-xs text-ink-muted">Updating…</p>
              ) : (
                <p className="text-[11px] text-ink-muted">
                  Stock-out swap — price updates automatically.
                </p>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </motion.li>
  );
}
