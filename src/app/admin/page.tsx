"use client";

import Link from "next/link";
import {
  ArrowRight,
  CircleDollarSign,
  ClipboardCheck,
  ClipboardList,
  Moon,
  ShoppingBag,
  Sun,
  Users,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

import { FloorFilter } from "~/components/floor-filter";
import { FoodPlateLoader } from "~/components/food-plate-loader";
import { Badge, Button, Label, Panel, Select, StatCard } from "~/components/ui";
import { formatTaka } from "~/lib/datetime";
import { confirmAction, showSuccess } from "~/lib/swal";
import { api } from "~/trpc/react";

type PackSelection = { title: string; slot: "LUNCH" | "DINNER" };

export default function AdminOverviewPage() {
  const locations = api.location.list.useQuery();
  const [locationId, setLocationId] = useState<string>("");
  const [floorNumber, setFloorNumber] = useState("");
  const [selected, setSelected] = useState<PackSelection | null>(null);
  const floors = api.admin.listFloors.useQuery({
    locationId: locationId || undefined,
  });
  const overview = api.analytics.overview.useQuery({
    locationId: locationId || undefined,
    floorNumber: floorNumber || undefined,
  });
  const dayOffTarget = api.service.adminDayOffTarget.useQuery();
  const utils = api.useUtils();
  const setDayOff = api.service.setDayOff.useMutation({
    onSuccess: async (res) => {
      showSuccess(
        res.isOff ? "Day off enabled" : "Service resumed",
        res.isOff
          ? "Home will show the day-off message."
          : "Members can order again.",
      );
      await Promise.all([
        utils.service.adminDayOffTarget.invalidate(),
        utils.service.dayOffStatus.invalidate(),
        utils.menu.todayForUser.invalidate(),
      ]);
    },
  });
  const packOrders = api.analytics.packItemOrders.useQuery(
    {
      title: selected?.title ?? "",
      slot: selected?.slot ?? "LUNCH",
      locationId: locationId || undefined,
      floorNumber: floorNumber || undefined,
    },
    { enabled: Boolean(selected) },
  );

  useEffect(() => {
    setFloorNumber("");
    setSelected(null);
  }, [locationId]);

  useEffect(() => {
    if (floorNumber && floors.data && !floors.data.includes(floorNumber)) {
      setFloorNumber("");
    }
  }, [floorNumber, floors.data]);

  useEffect(() => {
    if (!selected) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setSelected(null);
    }
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [selected]);

  const d = overview.data;

  const primaryStats = [
    {
      label: "Today's Orders",
      value: d?.ordersToday ?? "—",
      icon: <ShoppingBag className="h-4 w-4" strokeWidth={2.25} />,
    },
    {
      label: "Portions to pack",
      value: d?.portionsToday ?? "—",
      icon: <ClipboardList className="h-4 w-4" strokeWidth={2.25} />,
    },
    {
      label: "Delivered",
      value: d?.deliveredToday ?? "—",
      icon: <ClipboardCheck className="h-4 w-4" strokeWidth={2.25} />,
    },
    {
      label: "Pending",
      value:
        d != null
          ? Math.max(0, (d.ordersToday ?? 0) - (d.deliveredToday ?? 0))
          : "—",
      icon: <ClipboardList className="h-4 w-4" strokeWidth={2.25} />,
    },
    {
      label: "Total Sales",
      value: formatTaka(
        (d?.cashCollectedToday ?? 0) + (d?.walletChargedToday ?? 0),
      ),
      icon: <CircleDollarSign className="h-4 w-4" strokeWidth={2.25} />,
    },
  ];

  const secondaryStats = [
    {
      label: "Active users",
      value: d?.activeUsers ?? "—",
      icon: <Users className="h-4 w-4" strokeWidth={2.25} />,
    },
    {
      label: "Users with due",
      value: d?.usersWithDueCount ?? "—",
      icon: <CircleDollarSign className="h-4 w-4" strokeWidth={2.25} />,
    },
    {
      label: "Outstanding due",
      value: formatTaka(d?.outstandingDue ?? 0),
      icon: <CircleDollarSign className="h-4 w-4" strokeWidth={2.25} />,
    },
  ];

  const shortcuts = [
    {
      href: "/admin/orders",
      title: "Today's Orders",
      desc: "Mark delivered, charge wallet, cash paid",
      Icon: ClipboardList,
    },
    {
      href: "/admin/menu",
      title: "Menu",
      desc: "Weekly schedule & dated meals",
      Icon: ShoppingBag,
    },
    {
      href: "/admin/users",
      title: "Customers",
      desc: "Regular / one-time, deposits",
      Icon: Users,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-ink-muted">
            Today&apos;s snapshot across your offices.
          </p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:max-w-lg sm:flex-row">
          <div className="min-w-0 flex-1">
            <Label>Office / Building</Label>
            <Select
              value={locationId}
              onChange={(e) => setLocationId(e.target.value)}
            >
              <option value="">All my locations</option>
              {locations.data?.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.name}
                </option>
              ))}
            </Select>
          </div>
          <div className="min-w-0 flex-1">
            <FloorFilter
              value={floorNumber}
              floors={floors.data ?? []}
              onChange={(next) => {
                setFloorNumber(next);
                setSelected(null);
              }}
            />
          </div>
        </div>
      </div>

      {overview.isLoading ? (
        <FoodPlateLoader label="Cooking up today's snapshot…" />
      ) : (
        <>
          <Panel
            className={`flex flex-wrap items-center justify-between gap-3 py-3.5 ${
              dayOffTarget.data?.isOff
                ? "border-spice/30 bg-spice/10"
                : "border-line/60"
            }`}
          >
            <div className="flex min-w-0 items-start gap-3">
              <span
                className={`mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                  dayOffTarget.data?.isOff
                    ? "bg-spice/15 text-spice"
                    : "bg-leaf/15 text-leaf"
                }`}
              >
                {dayOffTarget.data?.isOff ? (
                  <Moon className="h-5 w-5" strokeWidth={2.25} />
                ) : (
                  <Sun className="h-5 w-5" strokeWidth={2.25} />
                )}
              </span>
              <div className="min-w-0">
                <p className="font-semibold text-ink">
                  {dayOffTarget.data?.isOff
                    ? "Day off is on"
                    : "Catering is open"}
                </p>
                <p className="text-xs text-ink-muted">
                  Meal day:{" "}
                  <span className="font-medium text-ink">
                    {dayOffTarget.data?.dateLabel ?? "—"}
                  </span>
                  {dayOffTarget.data?.isOff
                    ? " — members see a day-off message instead of menus."
                    : " — turn on a day off when you're closed."}
                </p>
              </div>
            </div>
            <Button
              type="button"
              variant={dayOffTarget.data?.isOff ? "secondary" : "danger"}
              disabled={
                setDayOff.isPending || !dayOffTarget.data?.date
              }
              onClick={async () => {
                if (!dayOffTarget.data?.date) return;
                const turningOff = !dayOffTarget.data.isOff;
                const ok = await confirmAction({
                  title: turningOff
                    ? `Take ${dayOffTarget.data.dateLabel} off?`
                    : `Resume service for ${dayOffTarget.data.dateLabel}?`,
                  text: turningOff
                    ? "The home page will show a day-off message. No new orders that day."
                    : "Menus and ordering will return for members.",
                  confirmText: turningOff ? "Take day off" : "Resume",
                });
                if (!ok) return;
                setDayOff.mutate({
                  date: dayOffTarget.data.date,
                  off: turningOff,
                });
              }}
            >
              {setDayOff.isPending
                ? "Saving…"
                : dayOffTarget.data?.isOff
                  ? "Resume service"
                  : "Take day off"}
            </Button>
          </Panel>

          {!overview.isLoading && d ? (
            <Panel className="flex flex-wrap items-center justify-between gap-3 border-leaf/25 bg-leaf/5 py-3.5">
              <div>
                <p className="font-semibold text-leaf">Order window</p>
                <p className="text-xs text-ink-muted">
                  Review today&apos;s distribution and settle payments.
                </p>
              </div>
              <Link
                href="/admin/orders"
                className="inline-flex items-center gap-1.5 rounded-xl bg-leaf px-3 py-2 text-xs font-bold text-[#042f2e]"
              >
                View today&apos;s orders
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Panel>
          ) : null}

          <div className="grid grid-cols-2 gap-3 xl:grid-cols-5">
            {primaryStats.map((s) => (
              <StatCard
                key={s.label}
                label={s.label}
                value={s.value}
                icon={s.icon}
              />
            ))}
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {secondaryStats.map((s) => (
              <StatCard
                key={s.label}
                label={s.label}
                value={s.value}
                icon={s.icon}
              />
            ))}
          </div>

          <div>
            <h2 className="font-display mb-3 text-lg font-bold tracking-tight">
              Quick actions
            </h2>
            <div className="grid gap-3 sm:grid-cols-3">
              {shortcuts.map(({ href, title, desc, Icon }) => (
                <Link key={href} href={href} className="group">
                  <Panel className="h-full transition group-hover:border-leaf/30">
                    <div className="flex items-start justify-between gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-leaf/15 text-leaf">
                        <Icon className="h-4 w-4" strokeWidth={2.25} />
                      </span>
                      <ArrowRight className="h-4 w-4 text-ink-muted transition group-hover:translate-x-0.5 group-hover:text-leaf" />
                    </div>
                    <p className="mt-3 font-semibold text-ink">{title}</p>
                    <p className="mt-0.5 text-xs text-ink-muted">{desc}</p>
                  </Panel>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-3 flex items-center justify-between gap-2">
              <div>
                <h2 className="font-display text-lg font-bold tracking-tight">
                  Pack by item
                </h2>
                <p className="text-xs text-ink-muted">
                  Tap a dish to see who ordered it and their zone
                </p>
              </div>
              <Link
                href="/admin/orders"
                className="text-xs font-semibold text-leaf hover:underline"
              >
                Orders
              </Link>
            </div>
            <ul className="space-y-2">
              {(d?.packByItem.length ?? 0) === 0 ? (
                <Panel className="py-4">
                  <p className="text-sm text-ink-muted">
                    No menus published for today yet.
                  </p>
                </Panel>
              ) : (
                d?.packByItem.map((m) => {
                  const isOpen =
                    selected?.title === m.title && selected.slot === m.slot;
                  return (
                    <button
                      key={`${m.slot}-${m.title}`}
                      type="button"
                      onClick={() =>
                        setSelected({
                          title: m.title,
                          slot: m.slot as "LUNCH" | "DINNER",
                        })
                      }
                      className="w-full text-left cursor-pointer"
                    >
                      <Panel
                        className={`flex items-center justify-between gap-3 py-3.5 transition hover:border-leaf/30 ${
                          isOpen ? "ring-2 ring-leaf/40" : ""
                        }`}
                      >
                        <div className="min-w-0">
                          <p className="truncate font-semibold tracking-tight">
                            {m.title}
                          </p>
                          <p className="mt-0.5 text-xs text-ink-muted">
                            {m.slot}
                            {m.locations.length === 1
                              ? ` · ${m.locations[0]}`
                              : m.locations.length > 1
                                ? ` · ${m.locations.length} offices`
                                : ""}
                            {m.orderCount > 0
                              ? ` · ${m.orderCount} order${m.orderCount === 1 ? "" : "s"}`
                              : ""}
                          </p>
                        </div>
                        <div className="shrink-0 text-right">
                          <p className="text-xl font-bold tabular-nums text-leaf">
                            {m.quantity}
                          </p>
                          <p className="text-[11px] text-ink-muted">
                            portions · {formatTaka(m.price)}
                          </p>
                        </div>
                      </Panel>
                    </button>
                  );
                })
              )}
            </ul>
          </div>
        </>
      )}

      {selected ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-0 backdrop-blur-sm sm:items-center sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="pack-item-title"
          onClick={() => setSelected(null)}
        >
          <div
            className="surface-card flex max-h-[90vh] w-full max-w-lg flex-col rounded-t-3xl p-5 sm:rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex shrink-0 flex-wrap items-start justify-between gap-2 border-b border-line/50 pb-3">
              <div className="min-w-0">
                <h3
                  id="pack-item-title"
                  className="font-display text-lg font-semibold"
                >
                  {selected.title}
                </h3>
                <p className="text-xs text-ink-muted">
                  {selected.slot}
                  {packOrders.data
                    ? ` · ${packOrders.data.totalPortions} portions · ${packOrders.data.orders.length} people`
                    : ""}
                </p>
              </div>
              <Button
                type="button"
                variant="ghost"
                className="px-2 py-1.5"
                onClick={() => setSelected(null)}
              >
                <X className="h-4 w-4" />
                Close
              </Button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto pt-3">
              {packOrders.isLoading ? (
                <FoodPlateLoader size="inline" label="Loading orderers…" />
              ) : null}

              {packOrders.data && packOrders.data.orders.length === 0 ? (
                <p className="text-sm text-ink-muted">
                  No orders for this dish yet.
                </p>
              ) : null}

              {packOrders.data && packOrders.data.orders.length > 0 ? (
                <ul className="divide-y divide-line/60">
                  {packOrders.data.orders.map((o) => (
                    <li
                      key={o.id}
                      className="flex flex-wrap items-start justify-between gap-2 py-2.5 first:pt-0 last:pb-0"
                    >
                      <div className="min-w-0">
                        <p className="font-semibold text-ink">
                          {o.user.name ?? o.user.email ?? "Member"}
                          {o.user.employeeId ? (
                            <span className="ml-1.5 text-xs font-normal text-ink-muted">
                              · {o.user.employeeId}
                            </span>
                          ) : null}
                        </p>
                        <p className="mt-0.5 text-xs text-ink-muted">
                          Zone:{" "}
                          <span className="font-medium text-ink">
                            {o.user.zoneName ?? o.zoneName}
                          </span>
                          {o.user.locationLabel &&
                          o.user.locationLabel !==
                            (o.user.zoneName ?? o.zoneName)
                            ? ` · Wrote: ${o.user.locationLabel}`
                            : null}
                        </p>
                        <p className="text-xs text-ink-muted">
                          {[
                            o.user.buildingNumber
                              ? `Bldg ${o.user.buildingNumber}`
                              : null,
                            o.user.floorNumber
                              ? `Fl ${o.user.floorNumber}`
                              : null,
                            o.user.deskNumber
                              ? `Desk ${o.user.deskNumber}`
                              : null,
                            o.user.phoneNumber,
                          ]
                            .filter(Boolean)
                            .join(" · ")}
                        </p>
                      </div>
                      <div className="flex shrink-0 flex-col items-end gap-1">
                        <Badge tone="good">×{o.quantity}</Badge>
                        <span className="text-[11px] text-ink-muted">
                          {o.status === "DELIVERED" ? "Delivered" : "Pending"}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
