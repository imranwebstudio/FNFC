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
  const today = api.menu.todayForUser.useQuery();
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
  const cutoffLabel = window?.cutoffTime ?? "—";
  const badge = dateBadgeParts(window?.orderDate);

  const orderedMenus = menus.filter((m) => m.myOrder);
  const availableMenus = menus.filter((m) => !m.myOrder && !m.isPastCutoff);
  const closedMenus = menus.filter((m) => !m.myOrder && m.isPastCutoff);

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
      showSuccess(
        cartLines.length === 1 ? "Order placed" : "Orders placed",
        "Your meal has been booked.",
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
    me.data?.location?.name ?? me.data?.locationLabel ?? today.data?.locationName,
    me.data?.floorNumber ? `${me.data.floorNumber} Floor` : null,
    me.data?.deskNumber ? `Desk ${me.data.deskNumber}` : null,
  ]
    .filter(Boolean)
    .join(", ");

  const firstName = me.data?.name?.split(" ")[0] ?? "there";
  const showAllZones =
    Boolean(me.data?.profileComplete) && !me.data?.locationId;
  const dayOff = today.data?.dayOff;

  if (!today.isLoading && dayOff?.active) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.86, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="relative w-full max-w-md"
        >
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -inset-8 rounded-full bg-spice/10 blur-3xl"
            animate={{ opacity: [0.35, 0.7, 0.35], scale: [0.95, 1.05, 0.95] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <Panel className="relative overflow-hidden border-spice/25 bg-gradient-to-b from-spice/10 to-transparent py-10">
            <motion.div
              className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-spice/15 text-spice"
              animate={{ rotate: [0, -8, 8, 0], y: [0, -4, 0] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <Coffee className="h-10 w-10" strokeWidth={2} />
            </motion.div>
            <motion.p
              className="font-display text-2xl font-bold tracking-tight text-ink"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              Day off
            </motion.p>
            <motion.p
              className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ink-muted"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28 }}
            >
              {dayOff.message}
            </motion.p>
            <motion.p
              className="mt-5 text-xs font-semibold uppercase tracking-wide text-spice"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ delay: 0.45, duration: 2.4, repeat: Infinity }}
            >
              See you tomorrow
            </motion.p>
          </Panel>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pb-28 sm:pb-8">
      {/* Greeting + location */}
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

      {/* Order window */}
      {window ? (
        <Panel
          className={`mb-6 flex items-center gap-3 py-3.5 ${
            window.rolledOver
              ? "border-spice/25 bg-spice/5"
              : "border-leaf/25 bg-leaf/5"
          }`}
        >
          <span
            className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
              window.rolledOver
                ? "bg-spice/15 text-spice"
                : "bg-leaf/15 text-leaf"
            }`}
          >
            <Clock3 className="h-5 w-5" strokeWidth={2.25} />
          </span>
          <div className="min-w-0 flex-1">
            <p
              className={`font-semibold ${
                window.rolledOver ? "text-spice" : "text-leaf"
              }`}
            >
              {window.rolledOver ? "After cutoff" : "Order Open"}
            </p>
            <p className="text-xs text-ink-muted">
              Ordering for{" "}
              <span className="font-semibold text-ink">
                {formatMenuDateLabel(window.orderDate)}
              </span>
            </p>
            <p className="text-xs text-ink-muted">
              {window.rolledOver
                ? `Today closed at ${cutoffLabel}. Ordering tomorrow.`
                : `Orders close at ${cutoffLabel} today.`}
            </p>
          </div>
          <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl border border-line bg-rice text-center">
            <span className="text-base font-bold leading-none tabular-nums text-ink">
              {badge.day}
            </span>
            <span className="mt-0.5 text-[9px] font-bold uppercase tracking-wide text-ink-muted">
              {badge.mon}
            </span>
          </div>
        </Panel>
      ) : null}

      {today.isLoading ? (
        <FoodPlateLoader label="Checking today's menu…" />
      ) : null}

      {showAllZones && !today.isLoading ? (
        <Panel className="mb-6 border-leaf/25 bg-leaf/5 py-3">
          <p className="text-sm text-ink-muted">
            No catering zone yet — showing menus from all offices. Pick your
            office on Profile to set your zone and see only that office&apos;s
            meals.
          </p>
        </Panel>
      ) : null}

      {/* Already ordered */}
      {orderedMenus.length > 0 ? (
        <section className="mb-6">
          <h2 className="mb-3 flex items-center gap-2 font-display text-lg font-bold text-leaf">
            <UtensilsCrossed className="h-4 w-4" />
            Your Daily Order
          </h2>
          <ul className="space-y-2">
            {orderedMenus.map((menu) => {
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
                        </div>
                        <p className="shrink-0 text-sm font-bold tabular-nums text-leaf">
                          {formatTaka(menu.myOrder!.amount)}
                        </p>
                      </div>
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <Badge tone="good">
                          Qty {menu.myOrder!.quantity}
                        </Badge>
                        <Badge tone="neutral">{menu.myOrder!.status}</Badge>
                        {menu.myOrder!.status === "PLACED" &&
                        !menu.isPastCutoff ? (
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
            })}
          </ul>
        </section>
      ) : null}

      {/* Menu list */}
      <section>
        <div className="mb-3 flex items-end justify-between gap-3">
          <div>
            <h2 className="flex items-center gap-2 font-display text-lg font-bold text-ink">
              <UtensilsCrossed className="h-4 w-4 text-leaf" />
              Today&apos;s Menu
            </h2>
            <p className="mt-0.5 text-xs text-ink-muted">
              Choose meals and set quantity.
            </p>
          </div>
        </div>

        {!today.isLoading && menus.length === 0 ? (
          <Panel>
            <p className="text-sm text-ink-muted">
              No published set meal for{" "}
              {window ? formatMenuDateLabel(window.orderDate) : "this day"}
              {today.data?.locationName
                ? ` at ${today.data.locationName}`
                : ""}
              .
            </p>
          </Panel>
        ) : null}

        <ul className="space-y-2">
          {[...availableMenus, ...closedMenus].map((menu, i) => {
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
                            {menu.slot}
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
          })}
        </ul>
      </section>

      {/* Sticky cart bar — mobile-first */}
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
