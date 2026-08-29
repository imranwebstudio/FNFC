"use client";

import { useEffect, useState } from "react";
import { Users } from "lucide-react";

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
  const utils = api.useUtils();

  useEffect(() => {
    if (!locationId && locations.data?.[0]) {
      setLocationId(locations.data[0].id);
    }
  }, [locations.data, locationId]);

  const users = api.admin.listUsers.useQuery(
    { locationId, search: search || undefined },
    { enabled: Boolean(locationId) },
  );

  const deposit = api.wallet.deposit.useMutation({
    onSuccess: async () => {
      setDepositUserId(null);
      setNote("");
      await utils.admin.listUsers.invalidate();
    },
  });
  const setMode = api.wallet.setPaymentMode.useMutation({
    onSuccess: async () => utils.admin.listUsers.invalidate(),
  });

  return (
    <div>
      <PageTitle
        icon={<Users className="h-5 w-5" strokeWidth={2.25} />}
        title="Users & deposits"
        subtitle="Record wallet deposits / due payments. Toggle cash vs wallet."
      />

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
                    · <Badge>{u.paymentMode}</Badge>
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() =>
                      setMode.mutate({
                        userId: u.id,
                        paymentMode:
                          u.paymentMode === "CASH" ? "WALLET" : "CASH",
                      })
                    }
                  >
                    Toggle mode
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
