"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Loader2, ScrollText, Users } from "lucide-react";

import {
  Badge,
  Button,
  Input,
  Label,
  PageTitle,
  Panel,
  Select,
} from "~/components/ui";
import { formatTaka } from "~/lib/datetime";
import { api } from "~/trpc/react";

export default function AdminUsersPage() {
  const locations = api.location.list.useQuery();
  const [locationId, setLocationId] = useState("");
  const [search, setSearch] = useState("");
  const [depositUserId, setDepositUserId] = useState<string | null>(null);
  const [amount, setAmount] = useState(1000);
  const [note, setNote] = useState("");
  const [modeError, setModeError] = useState<string | null>(null);
  const utils = api.useUtils();

  useEffect(() => {
    if (!locationId && locations.data?.[0]) {
      setLocationId(locations.data[0].id);
    }
  }, [locations.data, locationId]);

  const listInput = {
    locationId,
    search: search || undefined,
  };

  const users = api.admin.listUsers.useQuery(listInput, {
    enabled: Boolean(locationId),
  });

  const deposit = api.wallet.deposit.useMutation({
    onSuccess: async (_data, vars) => {
      setDepositUserId(null);
      setNote("");
      await utils.admin.listUsers.invalidate();
      await utils.account.userStatement.invalidate({ userId: vars.userId });
    },
  });
  const setMode = api.wallet.setPaymentMode.useMutation({
    onMutate: async ({ userId, paymentMode }) => {
      setModeError(null);
      await utils.admin.listUsers.cancel(listInput);
      const previous = utils.admin.listUsers.getData(listInput);
      utils.admin.listUsers.setData(listInput, (old) =>
        old?.map((u) => (u.id === userId ? { ...u, paymentMode } : u)),
      );
      return { previous };
    },
    onError: (err, _vars, ctx) => {
      if (ctx?.previous) {
        utils.admin.listUsers.setData(listInput, ctx.previous);
      }
      setModeError(err.message || "Could not change payment mode");
    },
    onSettled: () => {
      void utils.admin.listUsers.invalidate();
    },
  });

  const pendingModeUserId = setMode.isPending
    ? setMode.variables?.userId
    : undefined;

  return (
    <div>
      <PageTitle
        icon={<Users className="h-5 w-5" strokeWidth={2.25} />}
        title="Users & deposits"
        subtitle="Record wallet deposits / due payments. Switch cash vs wallet per user."
      />

      {modeError ? (
        <p className="mb-4 rounded-xl bg-red-500/10 px-3 py-2 text-sm text-red-400">
          {modeError}
        </p>
      ) : null}

      <div className="mb-4 grid gap-3 sm:grid-cols-2">
        <div>
          <Label>Location</Label>
          <Select
            value={locationId}
            onChange={(e) => setLocationId(e.target.value)}
          >
            {locations.data?.map((l) => (
              <option key={l.id} value={l.id}>
                {l.name}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <Label>Search</Label>
          <Input
            placeholder="Name, email, employee ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <ul className="space-y-2">
        {users.data?.map((u) => {
          const due = Math.max(0, -u.balance);
          const nextMode = u.paymentMode === "CASH" ? "WALLET" : "CASH";
          const modeBusy = pendingModeUserId === u.id;
          return (
            <Panel key={u.id} className="py-3">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold">
                    {u.name ?? u.email}{" "}
                    <Badge tone="neutral">{u.role}</Badge>
                  </p>
                  <p className="text-xs text-ink-muted">
                    {u.employeeId} · Bldg {u.buildingNumber} · Fl{" "}
                    {u.floorNumber} · Desk {u.deskNumber}
                  </p>
                  <p className="mt-1 text-sm">
                    Bal {formatTaka(u.balance)}
                    {due > 0 ? (
                      <span className="text-spice-deep">
                        {" "}
                        · Due {formatTaka(due)}
                      </span>
                    ) : null}{" "}
                    ·{" "}
                    <Badge
                      tone={u.paymentMode === "WALLET" ? "good" : "neutral"}
                    >
                      {u.paymentMode}
                    </Badge>
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href={`/admin/users/${u.id}`}
                    className="inline-flex items-center gap-2 rounded-2xl bg-sand/80 px-3 py-2 text-sm font-semibold text-ink transition hover:bg-sand"
                  >
                    <ScrollText className="h-4 w-4" />
                    Account
                  </Link>
                  <Button
                    type="button"
                    variant="secondary"
                    disabled={modeBusy}
                    aria-busy={modeBusy}
                    onClick={() =>
                      setMode.mutate({
                        userId: u.id,
                        paymentMode: nextMode,
                      })
                    }
                  >
                    {modeBusy ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Switching…
                      </>
                    ) : (
                      <>Switch to {nextMode === "WALLET" ? "Wallet" : "Cash"}</>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setDepositUserId(u.id)}
                  >
                    Deposit
                  </Button>
                </div>
              </div>

              {depositUserId === u.id ? (
                <form
                  className="mt-3 flex flex-wrap items-end gap-2 border-t border-line/50 pt-3"
                  onSubmit={(e) => {
                    e.preventDefault();
                    deposit.mutate({
                      userId: u.id,
                      amount,
                      note: note || undefined,
                      asDuePayment: due > 0,
                    });
                  }}
                >
                  <div>
                    <Label>Amount ৳</Label>
                    <Input
                      type="number"
                      min={1}
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                    />
                  </div>
                  <div className="min-w-[180px] flex-1">
                    <Label>Note</Label>
                    <Input
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Cash received"
                    />
                  </div>
                  <Button type="submit" disabled={deposit.isPending}>
                    Record
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setDepositUserId(null)}
                  >
                    Cancel
                  </Button>
                </form>
              ) : null}
            </Panel>
          );
        })}
      </ul>
    </div>
  );
}
