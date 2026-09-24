"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Ban,
  HandCoins,
  Loader2,
  MapPin,
  Repeat,
  ShieldCheck,
  Trash2,
  Users,
} from "lucide-react";
import Swal from "sweetalert2";

import { FloorFilter } from "~/components/floor-filter";
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
import { formatBalanceLabel, formatTaka } from "~/lib/datetime";
import { confirmAction, promptBalanceEdit, showSuccess } from "~/lib/swal";
import { api } from "~/trpc/react";

export default function AdminUsersPage() {
  const me = api.user.me.useQuery();
  const locations = api.location.list.useQuery();
  const [locationId, setLocationId] = useState("all");
  const [floorNumber, setFloorNumber] = useState("");
  const [search, setSearch] = useState("");
  const [depositUserId, setDepositUserId] = useState<string | null>(null);
  const [amount, setAmount] = useState(1000);
  const [note, setNote] = useState("");
  const [typeError, setTypeError] = useState<string | null>(null);
  const [balanceError, setBalanceError] = useState<string | null>(null);
  const utils = api.useUtils();

  const isSuper = me.data?.role === "SUPER_ADMIN";

  const listInput = {
    locationId:
      locationId === "all" || locationId === "unassigned"
        ? undefined
        : locationId,
    unassignedOnly: locationId === "unassigned" ? true : undefined,
    floorNumber: floorNumber || undefined,
    search: search || undefined,
  };

  const floors = api.admin.listFloors.useQuery({
    locationId:
      locationId === "all" || locationId === "unassigned"
        ? undefined
        : locationId,
    unassignedOnly: locationId === "unassigned" ? true : undefined,
  });

  useEffect(() => {
    setFloorNumber("");
  }, [locationId]);

  useEffect(() => {
    if (floorNumber && floors.data && !floors.data.includes(floorNumber)) {
      setFloorNumber("");
    }
  }, [floorNumber, floors.data]);

  const users = api.admin.listUsers.useQuery(listInput);
  const deposit = api.wallet.deposit.useMutation({
    onSuccess: async (_data, vars) => {
      showSuccess("Deposit recorded");
      setDepositUserId(null);
      setNote("");
      await utils.admin.listUsers.invalidate();
      await utils.account.userStatement.invalidate({ userId: vars.userId });
    },
  });

  const setBalance = api.wallet.setBalance.useMutation({
    onSuccess: async (_data, vars) => {
      setBalanceError(null);
      showSuccess("Balance updated");
      await utils.admin.listUsers.invalidate();
      await utils.account.userStatement.invalidate({ userId: vars.userId });
    },
    onError: (err) => {
      setBalanceError(err.message || "Could not update balance");
    },
  });

  const setCustomerType = api.admin.setCustomerType.useMutation({
    onMutate: async ({ userId, customerType }) => {
      setTypeError(null);
      await utils.admin.listUsers.cancel(listInput);
      const previous = utils.admin.listUsers.getData(listInput);
      utils.admin.listUsers.setData(listInput, (old) =>
        old?.map((u) =>
          u.id === userId
            ? {
                ...u,
                customerType,
                paymentMode: customerType === "REGULAR" ? "WALLET" : "CASH",
              }
            : u,
        ),
      );
      return { previous };
    },
    onError: (err, _vars, ctx) => {
      if (ctx?.previous) {
        utils.admin.listUsers.setData(listInput, ctx.previous);
      }
      setTypeError(err.message || "Could not change customer type");
    },
    onSuccess: () => {
      showSuccess("Customer type updated");
    },
    onSettled: () => {
      void utils.admin.listUsers.invalidate();
    },
  });

  const setUserZone = api.admin.setUserZone.useMutation({
    onSuccess: async () => {
      showSuccess("Zone updated");
      await utils.admin.listUsers.invalidate();
    },
    onError: (err) => setTypeError(err.message || "Could not assign zone"),
  });

  const setBanned = api.admin.setBanned.useMutation({
    onSuccess: async () => {
      showSuccess("User status updated");
      await utils.admin.listUsers.invalidate();
    },
    onError: (err) => {
      void Swal.fire({
        icon: "error",
        title: "Could not update ban",
        text: err.message,
        background: "#1a2421",
        color: "#eef3f0",
        confirmButtonColor: "#2dd4bf",
      });
    },
  });

  const deleteUser = api.admin.deleteUser.useMutation({
    onSuccess: async (res) => {
      showSuccess(
        "Account deleted",
        `${res.name ?? res.email ?? "User"} was removed permanently.`,
      );
      await utils.admin.listUsers.invalidate();
    },
    onError: (err) => {
      void Swal.fire({
        icon: "error",
        title: "Could not delete",
        text: err.message,
        background: "#1a2421",
        color: "#eef3f0",
        confirmButtonColor: "#2dd4bf",
      });
    },
  });

  const pendingTypeUserId = setCustomerType.isPending
    ? setCustomerType.variables?.userId
    : undefined;
  const pendingBalanceUserId = setBalance.isPending
    ? setBalance.variables?.userId
    : undefined;

  return (
    <div>
      <PageTitle
        icon={<Users className="h-5 w-5" strokeWidth={2.25} />}
        title="Users & deposits"
        subtitle={
          isSuper
            ? "Assign catering zones. Set Regular / One-time. Deposit, ban, or permanently delete members."
            : "Assign catering zones. Set Regular / One-time. Deposit and edit balance for regular customers only."
        }
      />

      {typeError ? (
        <p className="mb-4 rounded-xl bg-red-500/10 px-3 py-2 text-sm text-red-400">
          {typeError}
        </p>
      ) : null}

      {balanceError ? (
        <p className="mb-4 rounded-xl bg-red-500/10 px-3 py-2 text-sm text-red-400">
          {balanceError}
        </p>
      ) : null}

      <div className="mb-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <Label>Zone</Label>
          <Select
            value={locationId}
            onChange={(e) => setLocationId(e.target.value)}
          >
            <option value="all">All zones</option>
            <option value="unassigned">Unassigned (no zone)</option>
            {locations.data?.map((l) => (
              <option key={l.id} value={l.id}>
                {l.name}
              </option>
            ))}
          </Select>
        </div>
        <FloorFilter
          value={floorNumber}
          floors={floors.data ?? []}
          onChange={setFloorNumber}
        />
        <div>
          <Label>Search</Label>
          <Input
            placeholder="Name, email, employee ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {users.isLoading ? (
        <FoodPlateLoader label="Fetching members…" />
      ) : null}

      <ul className="space-y-2">
        {!users.isLoading
          ? users.data?.map((u) => {
              const isRegular = u.customerType === "REGULAR";
              const nextType = isRegular ? "ONE_TIME" : "REGULAR";
              const balanceLabel = formatBalanceLabel(u.balance);
              const typeBusy = pendingTypeUserId === u.id;
              const balanceBusy = pendingBalanceUserId === u.id;
              const canModerate =
                isSuper && u.role !== "SUPER_ADMIN" && u.id !== me.data?.id;
              return (
                <Panel key={u.id} className="py-3">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold">
                        <Link
                          href={`/admin/users/${u.id}`}
                          className="text-leaf-deep transition hover:text-leaf hover:underline"
                        >
                          {u.name ?? u.email}
                        </Link>{" "}
                        <Badge tone="neutral">{u.role}</Badge>
                        {u.isBanned ? <Badge tone="bad">Banned</Badge> : null}
                      </p>
                      <p className="text-xs text-ink-muted">
                        {u.locationLabel ? (
                          <>
                            Wrote: {u.locationLabel}
                            {" · "}
                          </>
                        ) : null}
                        {!u.locationId ? (
                          <span className="text-spice">No zone · </span>
                        ) : null}
                        {u.employeeId} · Bldg {u.buildingNumber} · Fl{" "}
                        {u.floorNumber} · Desk {u.deskNumber}
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <span
                          className={
                            balanceLabel.isDue
                              ? "text-sm font-semibold text-spice-deep"
                              : "text-sm"
                          }
                        >
                          {balanceLabel.isDue
                            ? balanceLabel.text
                            : `Bal ${balanceLabel.text}`}
                        </span>
                        <Badge tone={isRegular ? "good" : "neutral"}>
                          {isRegular ? "Regular" : "One-time"}
                        </Badge>
                        <label className="relative inline-flex max-w-[11rem] items-center">
                          <MapPin
                            className="pointer-events-none absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 text-leaf"
                            strokeWidth={2.5}
                            aria-hidden
                          />
                          <select
                            aria-label="Assign zone"
                            value={u.locationId ?? ""}
                            disabled={setUserZone.isPending || u.isBanned}
                            onChange={(e) =>
                              setUserZone.mutate({
                                userId: u.id,
                                locationId: e.target.value || null,
                              })
                            }
                            className={`w-full appearance-none truncate rounded-full border py-1 pl-6 pr-6 text-[11px] font-semibold outline-none transition focus:border-leaf/40 focus:ring-2 focus:ring-leaf/15 disabled:opacity-50 ${
                              u.locationId
                                ? "border-leaf/25 bg-leaf/10 text-leaf"
                                : "border-spice/30 bg-spice/10 text-spice"
                            }`}
                          >
                            <option value="">Unassigned</option>
                            {locations.data?.map((l) => (
                              <option key={l.id} value={l.id}>
                                {l.name}
                              </option>
                            ))}
                          </select>
                          <span
                            aria-hidden
                            className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[9px] text-ink-muted"
                          >
                            ▾
                          </span>
                        </label>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-5">
                      <button
                        type="button"
                        title={`Switch to ${nextType === "REGULAR" ? "Regular" : "One-time"}`}
                        aria-label={`Switch to ${nextType === "REGULAR" ? "Regular" : "One-time"}`}
                        aria-busy={typeBusy}
                        disabled={typeBusy || u.isBanned}
                        className="inline-flex h-10 w-10 shrink-0 gap-2 items-center justify-center rounded-xl border border-line bg-sand/80 text-leaf transition hover:border-leaf/40 hover:bg-leaf/10 disabled:opacity-50"
                        onClick={() =>
                          setCustomerType.mutate({
                            userId: u.id,
                            customerType: nextType,
                          })
                        }
                      >
                        {typeBusy ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Repeat className="h-4 w-4" strokeWidth={2.25} />
                        )}
                      </button>
                      {isRegular ? (
                        <button
                          type="button"
                          title="Deposit to wallet"
                          aria-label="Deposit to wallet"
                          disabled={u.isBanned}
                          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line bg-sand/80 text-leaf transition hover:border-leaf/40 hover:bg-leaf/10 disabled:opacity-50"
                          onClick={() => setDepositUserId(u.id)}
                        >
                          <HandCoins className="h-4 w-4" strokeWidth={2.25} />
                        </button>
                      ) : null}
                      {canModerate ? (
                        <>
                          <button
                            type="button"
                            title={u.isBanned ? "Unban member" : "Ban member"}
                            aria-label={
                              u.isBanned ? "Unban member" : "Ban member"
                            }
                            disabled={
                              setBanned.isPending || deleteUser.isPending
                            }
                            className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition disabled:opacity-50 ${
                              u.isBanned
                                ? "border-line bg-sand/80 text-leaf hover:border-leaf/40 hover:bg-leaf/10"
                                : "border-red-500/30 bg-red-600/15 text-red-300 hover:bg-red-600/25"
                            }`}
                            onClick={() =>
                              setBanned.mutate({
                                userId: u.id,
                                isBanned: !u.isBanned,
                              })
                            }
                          >
                            {u.isBanned ? (
                              <ShieldCheck
                                className="h-4 w-4"
                                strokeWidth={2.25}
                              />
                            ) : (
                              <Ban className="h-4 w-4" strokeWidth={2.25} />
                            )}
                          </button>
                          <button
                            type="button"
                            title="Delete account forever"
                            aria-label={`Delete ${u.name ?? u.email ?? "user"}`}
                            disabled={deleteUser.isPending}
                            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-red-500/30 bg-red-600/15 text-red-300 transition hover:bg-red-600/25 disabled:opacity-50"
                            onClick={async () => {
                              const ok = await confirmAction({
                                title: `Delete “${u.name ?? u.email}”?`,
                                text: "This permanently removes the account, orders, and wallet history from the database. This cannot be undone.",
                                confirmText: "Delete forever",
                              });
                              if (ok) deleteUser.mutate({ userId: u.id });
                            }}
                          >
                            <Trash2 className="h-4 w-4" strokeWidth={2.25} />
                          </button>
                        </>
                      ) : null}
                    </div>
                  </div>

                  {isRegular && depositUserId === u.id ? (
                    <form
                      className="mt-3 flex flex-wrap items-end gap-2 border-t border-line/50 pt-3"
                      onSubmit={(e) => {
                        e.preventDefault();
                        deposit.mutate({
                          userId: u.id,
                          amount,
                          note: note || undefined,
                          asDuePayment: balanceLabel.isDue,
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
            })
          : null}
      </ul>
      {!users.isLoading && users.data && users.data.length === 0 ? (
        <p className="text-sm text-ink-muted">No members found.</p>
      ) : null}
    </div>
  );
}
