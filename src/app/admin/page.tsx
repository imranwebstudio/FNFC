"use client";

import { useState } from "react";

import { PageTitle, Panel, Select } from "~/components/ui";
import { formatTaka } from "~/lib/datetime";
import { api } from "~/trpc/react";

export default function AdminOverviewPage() {
  const locations = api.location.list.useQuery();
  const [locationId, setLocationId] = useState<string>("");
  const overview = api.analytics.overview.useQuery(
    locationId ? { locationId } : undefined,
  );

  const d = overview.data;

  return (
    <div>
      <PageTitle
        title="Admin analytics"
        subtitle="Today's orders, cash collected, wallet charges, and outstanding due."
      />
      <div className="mb-4 max-w-xs">
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

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Orders today", d?.ordersToday ?? "—"],
          ["Delivered", d?.deliveredToday ?? "—"],
          ["Cash collected", formatTaka(d?.cashCollectedToday ?? 0)],
          ["Wallet charged", formatTaka(d?.walletChargedToday ?? 0)],
          ["Active users", d?.activeUsers ?? "—"],
          ["Users with due", d?.usersWithDueCount ?? "—"],
          ["Outstanding due", formatTaka(d?.outstandingDue ?? 0)],
        ].map(([label, value]) => (
          <Panel key={String(label)}>
            <p className="text-xs uppercase tracking-wide text-ink-muted">
              {label}
            </p>
            <p className="font-display mt-1 text-2xl font-semibold">{value}</p>
          </Panel>
        ))}
      </div>

      <h2 className="mb-3 mt-8 font-display text-xl font-semibold">
        Today&apos;s menus
      </h2>
      <ul className="space-y-2">
        {d?.menusToday.map((m) => (
          <Panel key={m.id} className="flex justify-between py-3">
            <div>
              <p className="font-semibold">
                {m.title}{" "}
                <span className="text-xs font-normal text-ink-muted">
                  {m.slot} · {m.locationName}
                </span>
              </p>
            </div>
            <p className="text-sm">
              {m.orderCount} orders · {formatTaka(m.price)}
            </p>
          </Panel>
        ))}
      </ul>
    </div>
  );
}
