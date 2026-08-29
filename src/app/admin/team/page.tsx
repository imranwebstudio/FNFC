"use client";

import { useState } from "react";
import { redirect } from "next/navigation";
import { MapPinned } from "lucide-react";

import {
  Badge,
  Button,
  Input,
  Label,
  PageTitle,
  Panel,
  Select,
} from "~/components/ui";
import { api } from "~/trpc/react";

export default function AdminTeamPage() {
  const me = api.user.me.useQuery();
  const utils = api.useUtils();
  const locations = api.location.list.useQuery();
  const users = api.admin.listUsers.useQuery({});
  const [search, setSearch] = useState("");
  const [locForm, setLocForm] = useState({
    name: "",
    address: "",
    defaultCutoffTime: "11:00",
  });

  if (me.data && me.data.role !== "SUPER_ADMIN") {
    redirect("/admin");
  }

  const createLoc = api.location.create.useMutation({
    onSuccess: async () => {
      setLocForm({ name: "", address: "", defaultCutoffTime: "11:00" });
      await utils.location.list.invalidate();
    },
  });
  const setLocActive = api.location.update.useMutation({
    onSuccess: async () => utils.location.list.invalidate(),
  });
  const setRole = api.admin.setRole.useMutation({
    onSuccess: async () => utils.admin.listUsers.invalidate(),
  });
  const assign = api.admin.assignLocation.useMutation({
    onSuccess: async () => utils.admin.listUsers.invalidate(),
  });
  const unassign = api.admin.removeLocationAssignment.useMutation({
    onSuccess: async () => utils.admin.listUsers.invalidate(),
  });
  const setBanned = api.admin.setBanned.useMutation({
    onSuccess: async () => utils.admin.listUsers.invalidate(),
  });

  const filtered =
    users.data?.filter((u) => {
      if (!search) return true;
      const q = search.toLowerCase();
      return (
        u.name?.toLowerCase().includes(q) ||
        u.email?.toLowerCase().includes(q) ||
        u.employeeId?.toLowerCase().includes(q)
      );
    }) ?? [];

  return (
    <div>
      <PageTitle
        icon={<MapPinned className="h-5 w-5" strokeWidth={2.25} />}
        title="Staff & offices"
        subtitle="Super admin only: create office locations, promote admins, assign which offices they manage, and ban users."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel>
          <h2 className="mb-3 font-display text-lg font-semibold">
            New location
          </h2>
          <form
            className="space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              createLoc.mutate(locForm);
            }}
          >
            <div>
              <Label>Name</Label>
              <Input
                required
                value={locForm.name}
                onChange={(e) =>
                  setLocForm((f) => ({ ...f, name: e.target.value }))
                }
              />
            </div>
            <div>
              <Label>Address</Label>
              <Input
                value={locForm.address}
                onChange={(e) =>
                  setLocForm((f) => ({ ...f, address: e.target.value }))
                }
              />
            </div>
            <div>
              <Label>Default cutoff</Label>
              <Input
                required
                pattern="([01]\d|2[0-3]):([0-5]\d)"
                value={locForm.defaultCutoffTime}
                onChange={(e) =>
                  setLocForm((f) => ({
                    ...f,
                    defaultCutoffTime: e.target.value,
                  }))
                }
              />
            </div>
            <Button type="submit" disabled={createLoc.isPending}>
              Create location
            </Button>
          </form>

          <h3 className="mb-2 mt-6 text-sm font-semibold uppercase tracking-wide text-ink-muted">
            Locations
          </h3>
          <ul className="space-y-2">
            {locations.data?.map((l) => (
              <li
                key={l.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-sand/40 px-3 py-2 text-sm"
              >
                <span>
                  {l.name}{" "}
                  <span className="text-ink-muted">
                    cutoff {l.defaultCutoffTime}
                  </span>
                </span>
                <div className="flex items-center gap-2">
                  <Badge tone={l.isActive ? "good" : "bad"}>
                    {l.isActive ? "Active" : "Off"}
                  </Badge>
                  <Button
                    type="button"
                    variant={l.isActive ? "danger" : "secondary"}
                    className="px-2.5 py-1.5 text-xs"
                    disabled={setLocActive.isPending}
                    onClick={() =>
                      setLocActive.mutate({ id: l.id, isActive: !l.isActive })
                    }
                  >
                    {l.isActive ? "Deactivate" : "Reactivate"}
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </Panel>

        <div>
          <div className="mb-3">
            <Label>Search users</Label>
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Name or email"
            />
          </div>
          <ul className="space-y-2">
            {filtered.map((u) => (
              <Panel key={u.id} className="space-y-2 py-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="font-semibold">{u.name ?? u.email}</p>
                    <p className="text-xs text-ink-muted">{u.email}</p>
                  </div>
                  <div className="flex gap-1">
                    <Badge>{u.role}</Badge>
                    {u.isBanned ? <Badge tone="bad">Banned</Badge> : null}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Select
                    className="max-w-[160px]"
                    value={u.role}
                    disabled={u.isBanned}
                    onChange={(e) =>
                      setRole.mutate({
                        userId: u.id,
                        role: e.target.value as
                          | "USER"
                          | "ADMIN"
                          | "SUPER_ADMIN",
                      })
                    }
                  >
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                    <option value="SUPER_ADMIN">SUPER_ADMIN</option>
                  </Select>
                  <Select
                    className="max-w-[200px]"
                    defaultValue=""
                    disabled={u.isBanned}
                    onChange={(e) => {
                      if (!e.target.value) return;
                      assign.mutate({
                        userId: u.id,
                        locationId: e.target.value,
                      });
                      e.target.value = "";
                    }}
                  >
                    <option value="">Assign location…</option>
                    {locations.data?.map((l) => (
                      <option key={l.id} value={l.id}>
                        {l.name}
                      </option>
                    ))}
                  </Select>
                  {u.role !== "SUPER_ADMIN" ? (
                    <Button
                      type="button"
                      variant={u.isBanned ? "secondary" : "danger"}
                      disabled={setBanned.isPending}
                      onClick={() =>
                        setBanned.mutate({
                          userId: u.id,
                          isBanned: !u.isBanned,
                        })
                      }
                    >
                      {u.isBanned ? "Unban" : "Ban"}
                    </Button>
                  ) : null}
                </div>
                {u.adminLocations.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {u.adminLocations.map((al) => (
                      <button
                        key={al.locationId}
                        type="button"
                        className="rounded-md bg-leaf/15 px-2 py-0.5 text-xs font-semibold text-leaf-deep"
                        onClick={() =>
                          unassign.mutate({
                            userId: u.id,
                            locationId: al.locationId,
                          })
                        }
                        title="Remove assignment"
                      >
                        {al.location.name} ×
                      </button>
                    ))}
                  </div>
                ) : null}
              </Panel>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
