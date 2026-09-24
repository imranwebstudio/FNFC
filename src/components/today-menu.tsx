"use client";

import { motion } from "framer-motion";
import {
  Ban,
  Clock3,
  Coffee,
  MapPin,
  Minus,
  Plus,
  ShoppingBag,
  UserRound,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

import { DeliveryDatePicker } from "~/components/delivery-date-picker";
import { Badge, Button, Panel } from "~/components/ui";
import { FoodPlateLoader } from "~/components/food-plate-loader";
import { cloudinaryDisplayUrl } from "~/lib/cloudinary-url";
import {
  formatMenuDateLabel,
  formatTaka,
} from "~/lib/datetime";
import { MAX_ORDER_QUANTITY } from "~/lib/order-quantity";
import { api } from "~/trpc/react";
import { confirmAction, showSuccess } from "~/lib/swal";

type Cart = Record<string, number>;

function QtyStepper({
  value,
  onChange,
  disabled,
}: {
  value: number;
  onChange: (n: number) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex items-center gap-1.5 rounded-xl border border-leaf/35 bg-sand/60 p-0.5">
      <button
        type="button"
        disabled={disabled || value <= 0}
        onClick={() => onChange(Math.max(0, value - 1))}
        className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-leaf transition hover:bg-leaf/15 disabled:opacity-35"
        aria-label="Decrease"
      >
        <Minus className="h-4 w-4" strokeWidth={2.5} />
      </button>
      <span className="min-w-[1.5rem] text-center text-sm font-bold tabular-nums text-ink">
        {value}
      </span>
      <button
        type="button"
        disabled={disabled || value >= MAX_ORDER_QUANTITY}
        onClick={() => onChange(Math.min(MAX_ORDER_QUANTITY, value + 1))}
        className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-leaf transition hover:bg-leaf/15 disabled:opacity-35"
        aria-label="Increase"
      >
        <Plus className="h-4 w-4" strokeWidth={2.5} />
      </button>
    </div>
  );
}

function dateBadgeParts(dateStr: string | undefined) {
  if (!dateStr) return { day: "—", mon: "" };
  const label = formatMenuDateLabel(dateStr);
  // e.g. "Tue, 8 Sep"
  const parts = label.split(" ");
  const day = parts[1] ?? "—";
  const mon = (parts[2] ?? "").toUpperCase();
  return { day, mon };
}

export function TodayMenu() {
  const utils = api.useUtils();
  const me = api.user.me.useQuery();
  /** undefined = live ordering (lunch/dinner may be different dates) */
  const [browseDate, setBrowseDate] = useState<string | undefined>();
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const today = api.menu.todayForUser.useQuery(
    browseDate ? { date: browseDate } : undefined,
  );
  const [cart, setCart] = useState<Cart>({});
  const [placing, setPlacing] = useState(false);
  const [placeError, setPlaceError] = useState<string | null>(null);

  const create = api.order.create.useMutation();
  const cancel = api.order.cancel.useMutation({
    onSuccess: async () => {
      showSuccess("Order cancelled");
      await utils.menu.todayForUser.invalidate();
      await utils.order.listMine.invalidate();
      await utils.account.myStatement.invalidate();
    },
  });

  const menus = today.data?.menus ?? [];
  const window = today.data?.window;
  const minDate = today.data?.minDate;
  const maxDate = today.data?.maxDate;
  const mode = today.data?.mode ?? "live";
  const lunchDate = today.data?.lunchDate;
  const dinnerDate = today.data?.dinnerDate;
  const viewDate =
    browseDate ?? today.data?.selectedDate ?? window?.calendarToday ?? window?.orderDate;
  const cutoffLabel = window?.cutoffTime ?? "—";
  const lunchCutoffLabel = window?.lunchCutoffTime ?? cutoffLabel;
  const dinnerCutoffLabel = window?.dinnerCutoffTime ?? cutoffLabel;
  const badge = dateBadgeParts(viewDate);
  const isLive = mode === "live" && !browseDate;
  const dinnerOffered = me.data?.location?.dinnerEnabled !== false;
  const lunchClosed = isLive && Boolean(today.data?.lunchClosed);
  const dinnerClosed =
    isLive && dinnerOffered && Boolean(today.data?.dinnerClosed);

  function changeDate(next: string) {
    if (minDate && next < minDate) return;
    if (maxDate && next > maxDate) return;
    setCart({});
    setPlaceError(null);
    const liveDay = window?.calendarToday ?? window?.orderDate;
    if (liveDay && next === liveDay) {
      setBrowseDate(undefined);
      return;
    }
    setBrowseDate(next);
  }

  function backToLive() {
    setCart({});
    setPlaceError(null);
    setBrowseDate(undefined);
  }

  const orderedMenus = menus.filter((m) => m.myOrder);
  const availableMenus = menus.filter((m) => !m.myOrder && !m.isPastCutoff);
  const closedMenus = menus.filter((m) => !m.myOrder && m.isPastCutoff);

  const orderedLunch = orderedMenus.filter((m) => m.slot === "LUNCH");
  const orderedDinner = orderedMenus.filter((m) => m.slot === "DINNER");

  function groupOrdersByDate(rows: typeof orderedMenus) {
    const groups = new Map<string, typeof orderedMenus>();
    for (const row of rows) {
      const key = row.menuDate;
      const list = groups.get(key) ?? [];
      list.push(row);
      groups.set(key, list);
    }
    return [...groups.entries()].sort(([a], [b]) => a.localeCompare(b));
  }

  const lunchOrdersByDate = groupOrdersByDate(orderedLunch);
  const dinnerOrdersByDate = groupOrdersByDate(orderedDinner);
  const menuLunch = (lunchClosed
    ? []
    : isLive
      ? availableMenus
      : [...availableMenus, ...closedMenus]
  ).filter((m) => m.slot === "LUNCH");
  const menuDinner = (dinnerClosed
    ? []
    : isLive
      ? availableMenus
      : [...availableMenus, ...closedMenus]
  ).filter((m) => m.slot === "DINNER");

  const cartLines = useMemo(() => {
    return Object.entries(cart)
      .filter(([, q]) => q > 0)
      .map(([id, qty]) => {
        const menu = menus.find((m) => m.id === id);
        return menu ? { menu, qty } : null;
      })
      .filter(Boolean) as Array<{
      menu: (typeof menus)[number];
      qty: number;
    }>;
  }, [cart, menus]);

  const cartItemCount = cartLines.length;
  const cartQtyTotal = cartLines.reduce((s, l) => s + l.qty, 0);
  const cartTotal = cartLines.reduce((s, l) => s + l.menu.price * l.qty, 0);

  function setQty(menuId: string, qty: number) {
    setCart((prev) => {
      const next = { ...prev };
      if (qty <= 0) delete next[menuId];
      else next[menuId] = qty;
      return next;
    });
  }

  async function placeCart() {
    if (cartLines.length === 0) return;
    setPlacing(true);
    setPlaceError(null);
    try {
      for (const line of cartLines) {
        await create.mutateAsync({
          dailyMenuId: line.menu.id,
          quantity: line.qty,
        });
      }
      setCart({});
      const dates = [
        ...new Set(cartLines.map((l) => l.menu.menuDate).filter(Boolean)),
      ] as string[];
      showSuccess(
        cartLines.length === 1 ? "Order placed" : "Orders placed",
        dates.length === 1
          ? `Delivery ${formatMenuDateLabel(dates[0]!)}.`
          : "Your meals have been booked.",
      );
      await utils.menu.todayForUser.invalidate();
      await utils.order.listMine.invalidate();
      await utils.account.myStatement.invalidate();
    } catch (e) {
      setPlaceError(e instanceof Error ? e.message : "Could not place order");
    } finally {
      setPlacing(false);
    }
  }

  const locationLine = [
    me.data?.location?.name ??
      me.data?.locationLabel ??
      today.data?.locationName,
    me.data?.floorNumber ? `${me.data.floorNumber} Floor` : null,
    me.data?.deskNumber ? `Desk ${me.data.deskNumber}` : null,
  ]
    .filter(Boolean)
    .join(", ");

  const firstName = me.data?.name?.split(" ")[0] ?? "there";
  const showAllZones =
    Boolean(me.data?.profileComplete) && !me.data?.locationId;
  const dayOff = today.data?.dayOff;

  type MenuRow = (typeof menus)[number];

  function renderOrderCard(menu: MenuRow) {
    const photo = cloudinaryDisplayUrl(menu.imageUrl, {
      width: 160,
      height: 160,
    });
    return (
      <Panel key={menu.id} className="p-3">
        <div className="flex gap-3">
          <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full border border-line bg-sand">
            {photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={photo}
                alt=""
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-spice/40 to-leaf/40">
                <UtensilsCrossed className="h-5 w-5 text-ink" />
              </div>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-semibold text-ink">{menu.title}</p>
                {menu.description ? (
                  <p className="mt-0.5 line-clamp-2 text-xs text-ink-muted">
                    {menu.description}
                  </p>
                ) : null}
                <p className="mt-1 text-[11px] text-ink-muted">
                  {formatMenuDateLabel(menu.menuDate)}
                </p>
              </div>
              <p className="shrink-0 text-sm font-bold tabular-nums text-leaf">
                {formatTaka(menu.myOrder!.amount)}
              </p>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <Badge tone="good">Qty {menu.myOrder!.quantity}</Badge>
              <Badge tone="neutral">{menu.myOrder!.status}</Badge>
              {menu.myOrder!.status === "PLACED" && !menu.isPastCutoff ? (
                <Button
                  type="button"
                  variant="ghost"
                  className="px-2 py-1.5 text-xs text-spice"
                  disabled={cancel.isPending}
                  onClick={async () => {
                    const ok = await confirmAction({
                      title: "Cancel this order? 😢",
                      text: "Are you sure you want to cancel your meal order?",
                      confirmText: "Yes, cancel order",
                      cancelText: "Keep order",
                    });
                    if (!ok) return;
                    cancel.mutate({ orderId: menu.myOrder!.id });
                  }}
                >
                  <Ban className="h-3.5 w-3.5" />
                  Skip / Cancel
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </Panel>
    );
  }

  function renderMenuCard(menu: MenuRow, i: number) {
    const photo = cloudinaryDisplayUrl(menu.imageUrl, {
      width: 160,
      height: 160,
    });
    const qty = cart[menu.id] ?? 0;
    const canOrder = !menu.isPastCutoff;
    return (
      <motion.li
        key={menu.id}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.04 }}
      >
        <Panel className="p-3">
          <div className="flex gap-3">
            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full border border-line bg-sand">
              {photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={photo}
                  alt=""
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-spice/40 to-leaf/40">
                  <UtensilsCrossed className="h-5 w-5 text-ink" />
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="font-semibold text-ink">{menu.title}</p>
                  {menu.description ? (
                    <p className="mt-0.5 line-clamp-2 text-xs text-ink-muted">
                      {menu.description}
                    </p>
                  ) : null}
                  <p className="mt-1 text-[11px] text-ink-muted">
                    {formatMenuDateLabel(menu.menuDate)}
                    {today.data?.scope === "all" ||
                    today.data?.scope === "admin"
                      ? ` · ${menu.location.name}`
                      : ""}
                  </p>
                </div>
                <p className="shrink-0 text-sm font-bold tabular-nums text-leaf">
                  {formatTaka(menu.price)}
                </p>
              </div>
              <div className="mt-2 flex items-center justify-end">
                {canOrder ? (
                  <QtyStepper
                    value={qty}
                    onChange={(n) => setQty(menu.id, n)}
                    disabled={placing}
                  />
                ) : (
                  <Badge tone="warn">Closed</Badge>
                )}
              </div>
            </div>
          </div>
        </Panel>
      </motion.li>
    );
  }

  function slotHeading(
    slot: "LUNCH" | "DINNER",
    dateStr: string | undefined,
  ) {
    return (
      <h3 className="mb-2 flex items-center gap-2 text-sm font-bold tracking-tight text-ink">
        <span className="rounded-lg bg-leaf/15 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-leaf">
          {slot === "LUNCH" ? "Lunch" : "Dinner"}
        </span>
        {dateStr ? (
          <span className="text-xs font-medium text-ink-muted">
            {formatMenuDateLabel(dateStr)}
          </span>
        ) : null}
      </h3>
    );
  }

  return (
    <div className="pb-28 sm:pb-8">
      <Panel className="mb-4 p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <div className="flex min-w-0 flex-1 items-start gap-3">
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-leaf/15 text-leaf">
              <UserRound className="h-5 w-5" strokeWidth={2.25} />
            </span>
            <div className="min-w-0">
              <p className="font-display text-lg font-bold tracking-tight text-ink">
                Hello, {firstName}{" "}
                <span aria-hidden>👋</span>
              </p>
              <p className="text-sm text-ink-muted">
                Have a good meal! <span aria-hidden>😊</span>
              </p>
            </div>
          </div>
          {locationLine ? (
            <div className="flex w-full min-w-0 items-start gap-2 border-t border-line/50 pt-3 sm:w-auto sm:max-w-[14rem] sm:shrink-0 sm:border-l sm:border-t-0 sm:pl-4 sm:pt-0">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-leaf" />
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-leaf">
                  {me.data?.locationId ? "Your zone" : "Your location"}
                </p>
                <p className="break-words text-sm font-medium leading-snug text-ink">
                  {locationLine}
                </p>
              </div>
            </div>
          ) : null}
        </div>
      </Panel>

      {window ? (
        <Panel
          className={`mb-6 py-3.5 ${
            isLive && !lunchClosed && !dinnerClosed
              ? "border-leaf/25 bg-leaf/5"
              : isLive && (lunchClosed || dinnerClosed)
                ? "border-spice/25 bg-spice/5"
                : "border-leaf/20 bg-sand/40"
          }`}
        >
          <div className="flex items-start gap-3">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-leaf/15 text-leaf">
              <Clock3 className="h-5 w-5" strokeWidth={2.25} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-leaf">
                {isLive
                  ? lunchClosed && (dinnerClosed || !dinnerOffered)
                    ? "Closed for today"
                    : lunchClosed
                      ? "Lunch closed"
                      : dinnerClosed
                        ? "Dinner closed"
                        : "Order open"
                  : "Browse day"}
              </p>
              <p className="text-xs text-ink-muted">
                {isLive ? (
                  <>
                    {lunchDate ? (
                      <>
                        Lunch{" "}
                        <span className="font-semibold text-ink">
                          {formatMenuDateLabel(lunchDate)}
                        </span>
                        {lunchClosed ? " (closed)" : ""}
                      </>
                    ) : null}
                    {lunchDate && dinnerDate && dinnerOffered ? " · " : null}
                    {dinnerDate && dinnerOffered ? (
                      <>
                        Dinner{" "}
                        <button
                          type="button"
                          onClick={() => setDatePickerOpen(true)}
                          className="font-semibold text-ink underline decoration-leaf/40 underline-offset-2 transition hover:text-leaf"
                        >
                          {formatMenuDateLabel(dinnerDate)}
                        </button>
                        {dinnerClosed ? " (closed)" : ""}
                      </>
                    ) : null}
                  </>
                ) : (
                  <>
                    Delivery{" "}
                    <button
                      type="button"
                      onClick={() => setDatePickerOpen(true)}
                      className="font-semibold text-ink underline decoration-leaf/40 underline-offset-2 transition hover:text-leaf"
                    >
                      {viewDate ? formatMenuDateLabel(viewDate) : "—"}
                    </button>
                  </>
                )}
              </p>
              <p className="text-xs text-ink-muted">
                {isLive
                  ? lunchClosed && dinnerClosed
                    ? "Lunch and dinner for today are closed. See you tomorrow. Tap the date badge to pre-order another day."
                    : lunchClosed && dinnerOffered
                      ? `Lunch for today is closed, see you tomorrow. Dinner stays open until ${dinnerCutoffLabel}. Tap the date badge to pre-order.`
                      : lunchClosed
                        ? `Lunch for today is closed, see you tomorrow. Tap the date badge to pre-order another day.`
                        : dinnerClosed
                          ? `Dinner for today is closed, see you tomorrow. Tap the date badge to pre-order another day.`
                          : dinnerOffered
                            ? `Lunch closes at ${lunchCutoffLabel}, dinner at ${dinnerCutoffLabel}. Tap the date badge to pre-order another day.`
                            : `Ordering open until ${lunchCutoffLabel}. Tap the date badge to pre-order another day.`
                  : "Showing both lunch and dinner for this day. Closed slots can’t be ordered."}
              </p>
              {!isLive ? (
                <button
                  type="button"
                  className="mt-1.5 text-xs font-semibold text-leaf hover:underline"
                  onClick={backToLive}
                >
                  Back to live ordering
                </button>
              ) : null}
            </div>
            <DeliveryDatePicker
              value={viewDate}
              min={minDate}
              max={maxDate}
              badgeDay={badge.day}
              badgeMon={badge.mon}
              open={datePickerOpen}
              onOpenChange={setDatePickerOpen}
              onChange={changeDate}
            />
          </div>
        </Panel>
      ) : null}

      {today.isLoading ? <FoodPlateLoader label="Loading menu…" /> : null}

      {showAllZones && !today.isLoading ? (
        <Panel className="mb-6 border-leaf/25 bg-leaf/5 py-3">
          <p className="text-sm text-ink-muted">
            No catering zone yet — showing menus from all offices. Pick your
            office on Profile to set your zone and see only that office&apos;s
            meals.
          </p>
        </Panel>
      ) : null}

      {!today.isLoading && dayOff?.active ? (
        <Panel className="mb-6 border-spice/25 bg-gradient-to-b from-spice/10 to-transparent py-8 text-center">
          <Coffee
            className="mx-auto mb-3 h-10 w-10 text-spice"
            strokeWidth={2}
          />
          <p className="font-display text-xl font-bold text-ink">Day off</p>
          <p className="mx-auto mt-2 max-w-sm text-sm text-ink-muted">
            {dayOff.message}
          </p>
          <p className="mt-3 text-xs text-ink-muted">
            Pick another date above to order for a different day.
          </p>
        </Panel>
      ) : null}

      {orderedMenus.length > 0 ? (
        <section className="mb-6">
          <h2 className="mb-3 flex items-center gap-2 font-display text-lg font-bold text-leaf">
            <UtensilsCrossed className="h-4 w-4" />
            Your order
          </h2>
          {lunchOrdersByDate.map(([dateStr, rows], i) => (
            <div
              key={`lunch-${dateStr}`}
              className={
                i < lunchOrdersByDate.length - 1 || dinnerOrdersByDate.length > 0
                  ? "mb-4"
                  : undefined
              }
            >
              {slotHeading("LUNCH", dateStr)}
              <ul className="space-y-2">{rows.map(renderOrderCard)}</ul>
            </div>
          ))}
          {dinnerOrdersByDate.map(([dateStr, rows], i) => (
            <div
              key={`dinner-${dateStr}`}
              className={
                i < dinnerOrdersByDate.length - 1 ? "mb-4" : undefined
              }
            >
              {slotHeading("DINNER", dateStr)}
              <ul className="space-y-2">{rows.map(renderOrderCard)}</ul>
            </div>
          ))}
        </section>
      ) : null}

      {!dayOff?.active ? (
        <section>
          <div className="mb-3">
            <h2 className="flex items-center gap-2 font-display text-lg font-bold text-ink">
              <UtensilsCrossed className="h-4 w-4 text-leaf" />
              Menu
            </h2>
            <p className="mt-0.5 text-xs text-ink-muted">
              Lunch and dinner are listed separately. Choose and set quantity.
            </p>
          </div>

          {!today.isLoading &&
          menus.length === 0 &&
          !lunchClosed &&
          !dinnerClosed ? (
            <Panel>
              <p className="text-sm text-ink-muted">
                No published meals right now
                {today.data?.locationName
                  ? ` at ${today.data.locationName}`
                  : ""}
                .
              </p>
            </Panel>
          ) : null}

          {lunchClosed ? (
            <Panel className="mb-5 border-spice/25 bg-spice/5 py-5 text-center">
              {slotHeading("LUNCH", lunchDate)}
              <p className="font-display text-base font-bold text-ink">
                Lunch for today is closed
              </p>
              <p className="mt-1 text-sm text-ink-muted">
                See you tomorrow. Tap the date badge to pre-order another day.
              </p>
            </Panel>
          ) : menuLunch.length > 0 ? (
            <div className="mb-5">
              {slotHeading("LUNCH", lunchDate ?? menuLunch[0]?.menuDate)}
              <ul className="space-y-2">
                {menuLunch.map((m, i) => renderMenuCard(m, i))}
              </ul>
            </div>
          ) : null}

          {dinnerClosed ? (
            <Panel className="border-spice/25 bg-spice/5 py-5 text-center">
              {slotHeading("DINNER", dinnerDate)}
              <p className="font-display text-base font-bold text-ink">
                Dinner for today is closed
              </p>
              <p className="mt-1 text-sm text-ink-muted">
                See you tomorrow. Tap the date badge to pre-order another day.
              </p>
            </Panel>
          ) : menuDinner.length > 0 ? (
            <div>
              {slotHeading("DINNER", dinnerDate ?? menuDinner[0]?.menuDate)}
              <ul className="space-y-2">
                {menuDinner.map((m, i) => renderMenuCard(m, i))}
              </ul>
            </div>
          ) : null}
        </section>
      ) : null}

      {cartItemCount > 0 ? (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line/60 bg-rice/95 px-3 py-3 backdrop-blur-lg sm:static sm:mt-6 sm:rounded-3xl sm:border sm:border-line sm:bg-sand/80 sm:backdrop-blur-none">
          <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-3">
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-leaf/15 text-leaf">
                <ShoppingBag className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-ink">
                  Your Order Summary
                </p>
                <p className="text-xs text-ink-muted">
                  {cartItemCount} item{cartItemCount === 1 ? "" : "s"} · Qty{" "}
                  {cartQtyTotal}
                </p>
                <ul className="mt-1 hidden text-[11px] text-ink-muted sm:block">
                  {cartLines.map(({ menu, qty }) => (
                    <li key={menu.id}>
                      {menu.slot === "LUNCH" ? "Lunch" : "Dinner"} ·{" "}
                      {menu.title} × {qty}: {formatTaka(menu.price * qty)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-[11px] text-ink-muted">Total</p>
                <p className="text-lg font-bold tabular-nums text-leaf">
                  {formatTaka(cartTotal)}
                </p>
              </div>
              <Button
                type="button"
                disabled={placing}
                onClick={() => void placeCart()}
              >
                {placing ? "Placing…" : "Confirm Order"}
              </Button>
              <button
                type="button"
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-ink-muted hover:bg-sand hover:text-ink sm:hidden"
                aria-label="Clear cart"
                onClick={() => setCart({})}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
          {placeError ? (
            <p className="mx-auto mt-2 max-w-5xl text-sm text-red-400">
              {placeError}
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
