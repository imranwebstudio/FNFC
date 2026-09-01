"use client";

import Link from "next/link";
import {
  ArrowRight,
  Banknote,
  CircleDollarSign,
  ClipboardCheck,
  ClipboardList,
  ShoppingBag,
  Users,
  Wallet,
} from "lucide-react";
import { useState } from "react";

import { FoodPlateLoader } from "~/components/food-plate-loader";
import { Label, Panel, Select, StatCard } from "~/components/ui";
import { formatTaka } from "~/lib/datetime";
import { api } from "~/trpc/react";

export default function AdminOverviewPage() {
  const locations = api.location.list.useQuery();
  const [locationId, setLocationId] = useState<string>("");
  const overview = api.analytics.overview.useQuery(
    locationId ? { locationId } : undefined,
  );

  const d = overview.data;

  const primaryStats = [
    {
      label: "Orders today",
      value: d?.ordersToday ?? "—",
      icon: <ShoppingBag className="h-4 w-4" strokeWidth={2.25} />,
    },
    {
      label: "Delivered",
      value: d?.deliveredToday ?? "—",
      icon: <ClipboardCheck className="h-4 w-4" strokeWidth={2.25} />,
    },
    {
      label: "Cash collected",
      value: formatTaka(d?.cashCollectedToday ?? 0),
      icon: <Banknote className="h-4 w-4" strokeWidth={2.25} />,
    },
    {
      label: "Wallet charged",
      value: formatTaka(d?.walletChargedToday ?? 0),
      icon: <Wallet className="h-4 w-4" strokeWidth={2.25} />,
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
      title: "Distribution",
      desc: "Mark delivered & cash paid",
      Icon: ClipboardList,
    },
    {
      href: "/admin/menu",
      title: "Publish menu",
      desc: "Set meals for days or weeks",
      Icon: ShoppingBag,
    },
    {
      href: "/admin/users",
      title: "Users & wallet",
      desc: "Deposits and payment mode",
      Icon: Users,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Overview
          </h1>
          <p className="mt-1 text-sm text-ink-muted">
            Today&apos;s snapshot across your offices.
          </p>
        </div>
        <div className="w-full sm:max-w-xs">
          <Label>Location</Label>
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
      </div>

      {overview.isLoading ? (
        <FoodPlateLoader label="Cooking up today's snapshot…" />
      ) : (
        <>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
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
          <h2 className="font-display text-lg font-bold tracking-tight">
            Today&apos;s menus
          </h2>
          <Link
            href="/admin/menu"
            className="text-xs font-semibold text-leaf hover:underline"
          >
            Manage
          </Link>
        </div>
        <ul className="space-y-2">
          {(d?.menusToday.length ?? 0) === 0 ? (
            <Panel className="py-4">
              <p className="text-sm text-ink-muted">
                No menus published for today yet.
              </p>
            </Panel>
          ) : (
            d?.menusToday.map((m) => (
              <Panel
                key={m.id}
                className="flex items-center justify-between gap-3 py-3.5"
              >
                <div className="min-w-0">
                  <p className="truncate font-semibold tracking-tight">
                    {m.title}
                  </p>
                  <p className="mt-0.5 text-xs text-ink-muted">
                    {m.slot} · {m.locationName}
                  </p>
                </div>
                <p className="shrink-0 text-sm font-semibold tabular-nums text-ink-muted">
                  {m.orderCount} · {formatTaka(m.price)}
                </p>
              </Panel>
            ))
          )}
        </ul>
      </div>
        </>
      )}
    </div>
  );
}
