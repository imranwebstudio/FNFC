"use client";

import Link from "next/link";
import { useState } from "react";
import { Loader2, ScrollText, Users } from "lucide-react";

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
import { promptBalanceEdit, showSuccess } from "~/lib/swal";
import { api } from "~/trpc/react";

export default function AdminUsersPage() {
  const locations = api.location.list.useQuery();
  const [locationId, setLocationId] = useState("all");
  const [search, setSearch] = useState("");
  const [depositUserId, setDepositUserId] = useState<string | null>(null);
  const [amount, setAmount] = useState(1000);
  const [note, setNote] = useState("");
  const [typeError, setTypeError] = useState<string | null>(null);
  const [balanceError, setBalanceError] = useState<string | null>(null);
  const utils = api.useUtils();

  const listInput = {
    locationId:
      locationId === "all" || locationId === "unassigned"
        ? undefined
        : locationId,
    unassignedOnly: locationId === "unassigned" ? true : undefined,
    search: search || undefined,
  };

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
        subtitle="Assign catering zones. Set Regular / One-time. Deposit and edit balance for regular customers only."
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

      <div className="mb-4 grid gap-3 sm:grid-cols-2">
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
          return (
            <Panel key={u.id} className="py-3">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold">
                    {u.name ?? u.email}{" "}
                    <Badge tone="neutral">{u.role}</Badge>
                  </p>
                  <p className="text-xs text-ink-muted">
                    {u.locationLabel ? (
                      <>
                        Wrote: {u.locationLabel}
                        {" · "}
                      </>
                    ) : null}
                    {u.location?.name ? (
                      <>
                        Zone: {u.location.name}
                        {" · "}
                      </>
                    ) : (
                      <span className="text-spice">No zone · </span>
                    )}
                    {u.employeeId} · Bldg {u.buildingNumber} · Fl{" "}
                    {u.floorNumber} · Desk {u.deskNumber}
                  </p>
                  <p className="mt-1 text-sm">
                    <span
                      className={
                        balanceLabel.isDue
                          ? "font-semibold text-spice-deep"
                          : undefined
                      }
                    >
                      {balanceLabel.isDue
                        ? balanceLabel.text
                        : `Bal ${balanceLabel.text}`}
                    </span>{" "}
                    ·{" "}
                    <Badge tone={isRegular ? "good" : "neutral"}>
                      {isRegular ? "Regular" : "One-time"}
                    </Badge>
                  </p>
                  <div className="mt-2 max-w-xs">
                    <Label>Assign zone</Label>
                    <Select
                      value={u.locationId ?? ""}
                      disabled={setUserZone.isPending}
                      onChange={(e) =>
                        setUserZone.mutate({
                          userId: u.id,
                          locationId: e.target.value || null,
                        })
                      }
                    >
                      <option value="">Unassigned</option>
                      {locations.data?.map((l) => (
                        <option key={l.id} value={l.id}>
                          {l.name}
                        </option>
                      ))}
                    </Select>
                  </div>
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
                    disabled={typeBusy}
                    aria-busy={typeBusy}
                    onClick={() =>
                      setCustomerType.mutate({
                        userId: u.id,
                        customerType: nextType,
                      })
                    }
                  >
                    {typeBusy ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Switching…
                      </>
                    ) : (
                      <>
                        Switch to{" "}
                        {nextType === "REGULAR" ? "Regular" : "One-time"}
                      </>
                    )}
                  </Button>
                  {isRegular ? (
                    <>
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => setDepositUserId(u.id)}
                      >
                        Deposit
                      </Button>
                      <Button
                        type="button"
                        variant="secondary"
                        disabled={balanceBusy}
                        aria-busy={balanceBusy}
                        onClick={async () => {
                          const newBalance = await promptBalanceEdit({
                            title: "Edit balance",
                            text: `Current balance: ${formatTaka(u.balance)}. Enter the new wallet balance.`,
                            currentBalance: u.balance,
                          });
                          if (newBalance === null || newBalance === u.balance)
                            return;
                          setBalance.mutate({
                            userId: u.id,
                            balance: newBalance,
                          });
                        }}
                      >
                        {balanceBusy ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Saving…
                          </>
                        ) : (
                          "Edit balance"
                        )}
                      </Button>
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
