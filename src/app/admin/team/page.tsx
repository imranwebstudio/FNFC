"use client";

import { useMemo, useState } from "react";
import { redirect } from "next/navigation";
import { MapPinned, UserPlus, X } from "lucide-react";
import Swal from "sweetalert2";

import {
  Badge,
  Button,
  Input,
  Label,
  PageTitle,
  Panel,
} from "~/components/ui";
import { FoodPlateLoader } from "~/components/food-plate-loader";
import { showSuccess, confirmAction } from "~/lib/swal";
import { api } from "~/trpc/react";

export default function AdminTeamPage() {
  const me = api.user.me.useQuery();
  const utils = api.useUtils();
  const locations = api.location.list.useQuery();
  const [locForm, setLocForm] = useState({
    name: "",
    address: "",
    defaultCutoffTime: "14:00",
  });
  const [cutoffEdits, setCutoffEdits] = useState<Record<string, string>>({});
  const [managersFor, setManagersFor] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const createLoc = api.location.create.useMutation({
    onSuccess: async () => {
      setLocForm({ name: "", address: "", defaultCutoffTime: "14:00" });
      showSuccess("Location created");
      await utils.location.list.invalidate();
    },
  });
  const setCutoff = api.location.setCutoff.useMutation({
    onSuccess: async (_, vars) => {
      setCutoffEdits((e) => {
        const next = { ...e };
        delete next[vars.locationId];
        return next;
      });
      showSuccess("Cutoff updated");
      await utils.location.list.invalidate();
    },
  });
  const setLocActive = api.location.update.useMutation({
    onSuccess: async () => {
      showSuccess("Location updated");
      await utils.location.list.invalidate();
    },
  });
  const deleteLoc = api.location.delete.useMutation({
    onSuccess: async (res) => {
      showSuccess("Location deleted", `${res.name} was removed permanently.`);
      await utils.location.list.invalidate();
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

  if (me.isLoading) {
    return <FoodPlateLoader label="Loading staff tools…" />;
  }

  if (me.data && me.data.role !== "SUPER_ADMIN") {
    redirect("/admin");
  }

  return (
    <div>
      <PageTitle
        icon={<MapPinned className="h-5 w-5" strokeWidth={2.25} />}
        title="Staff & offices"
        subtitle="Create offices, set cutoffs, and assign managers who can run each location."
      />

      <div className="mx-auto grid max-w-3xl gap-6">
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
              <Label>Order cutoff (Asia/Dhaka)</Label>
              <Input
                type="time"
                required
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
        </Panel>

        <div>
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-ink-muted">
            Locations
          </h3>
          <ul className="space-y-3">
            {locations.data?.map((l) => {
              const draft = cutoffEdits[l.id] ?? l.defaultCutoffTime;
              const dirty = draft !== l.defaultCutoffTime;
              const managers = l.adminLocations ?? [];
              return (
                <Panel key={l.id} className="space-y-3 py-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-display text-base font-semibold">
                        {l.name}
                      </p>
                      {l.address ? (
                        <p className="text-xs text-ink-muted">{l.address}</p>
                      ) : null}
                    </div>
                    <Badge tone={l.isActive ? "good" : "bad"}>
                      {l.isActive ? "Active" : "Off"}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <Input
                      type="time"
                      className="w-[9.5rem] py-1.5 text-xs"
                      value={draft}
                      onChange={(e) =>
                        setCutoffEdits((m) => ({
                          ...m,
                          [l.id]: e.target.value,
                        }))
                      }
                    />
                    <Button
                      type="button"
                      variant="secondary"
                      className="px-2.5 py-1.5 text-xs"
                      disabled={!dirty || setCutoff.isPending}
                      onClick={() =>
                        setCutoff.mutate({
                          locationId: l.id,
                          defaultCutoffTime: draft,
                        })
                      }
                    >
                      Save cutoff
                    </Button>
                    <Button
                      type="button"
                      variant={l.isActive ? "danger" : "secondary"}
                      className="px-2.5 py-1.5 text-xs"
                      disabled={setLocActive.isPending || deleteLoc.isPending}
                      onClick={() =>
                        setLocActive.mutate({
                          id: l.id,
                          isActive: !l.isActive,
                        })
                      }
                    >
                      {l.isActive ? "Deactivate" : "Reactivate"}
                    </Button>
                    {!l.isActive ? (
                      <Button
                        type="button"
                        variant="danger"
                        className="px-2.5 py-1.5 text-xs"
                        disabled={deleteLoc.isPending}
                        onClick={async () => {
                          const ok = await confirmAction({
                            title: `Delete “${l.name}”?`,
                            text: "This permanently removes the office, its menus, and related orders. Users assigned here will lose their office link.",
                            confirmText: "Delete forever",
                          });
                          if (ok) deleteLoc.mutate({ id: l.id });
                        }}
                      >
                        {deleteLoc.isPending ? "Deleting…" : "Delete forever"}
                      </Button>
                    ) : null}
                  </div>

                  <div className="rounded-2xl border border-line/50 bg-sand/30 p-3">
                    <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-muted">
                        Managers
                        {managers.length > 0 ? ` · ${managers.length}` : ""}
                      </p>
                      <Button
                        type="button"
                        variant="secondary"
                        className="px-2.5 py-1.5 text-xs"
                        onClick={() =>
                          setManagersFor({ id: l.id, name: l.name })
                        }
                      >
                        <UserPlus className="h-3.5 w-3.5" />
                        Add managers
                      </Button>
                    </div>
                    {managers.length === 0 ? (
                      <p className="text-xs text-ink-muted">
                        No managers yet — add someone who can run this office.
                      </p>
                    ) : (
                      <div className="flex flex-wrap gap-1.5">
                        {managers.map((al) => (
                          <Badge key={al.userId} tone="good">
                            {al.user.name ?? al.user.email}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </Panel>
              );
            })}
          </ul>
        </div>
      </div>

      {managersFor ? (
        <ManagersModal
          locationId={managersFor.id}
          locationName={managersFor.name}
          onClose={() => setManagersFor(null)}
        />
      ) : null}
    </div>
  );
}

function ManagersModal({
  locationId,
  locationName,
  onClose,
}: {
  locationId: string;
  locationName: string;
  onClose: () => void;
}) {
  const utils = api.useUtils();
  const [search, setSearch] = useState("");
  const locations = api.location.list.useQuery();
  const users = api.admin.listUsers.useQuery({});

  const location = locations.data?.find((l) => l.id === locationId);
  const assignedIds = useMemo(
    () => new Set((location?.adminLocations ?? []).map((a) => a.userId)),
    [location?.adminLocations],
  );

  const assign = api.admin.assignLocation.useMutation({
    onSuccess: async () => {
      showSuccess("Manager added");
      await Promise.all([
        utils.location.list.invalidate(),
        utils.admin.listUsers.invalidate(),
      ]);
    },
    onError: (err) => {
      void Swal.fire({
        icon: "error",
        title: "Could not assign",
        text: err.message,
        background: "#1a2421",
        color: "#eef3f0",
        confirmButtonColor: "#2dd4bf",
      });
    },
  });

  const unassign = api.admin.removeLocationAssignment.useMutation({
    onSuccess: async () => {
      showSuccess("Manager removed");
      await Promise.all([
        utils.location.list.invalidate(),
        utils.admin.listUsers.invalidate(),
      ]);
    },
  });

  const q = search.trim().toLowerCase();
  const candidates =
    users.data?.filter((u) => {
      if (u.isBanned) return false;
      if (assignedIds.has(u.id)) return false;
      if (!q) return true;
      return (
        u.name?.toLowerCase().includes(q) ||
        u.email?.toLowerCase().includes(q) ||
        u.employeeId?.toLowerCase().includes(q)
      );
    }) ?? [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="managers-modal-title"
      onClick={onClose}
    >
      <div
        className="surface-card flex max-h-[90vh] w-full max-w-lg flex-col rounded-t-3xl p-5 sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-start justify-between gap-2 border-b border-line/50 pb-3">
          <div className="min-w-0">
            <h3
              id="managers-modal-title"
              className="font-display text-lg font-semibold"
            >
              Managers
            </h3>
            <p className="truncate text-xs text-ink-muted">{locationName}</p>
          </div>
          <Button
            type="button"
            variant="ghost"
            className="px-2 py-1.5"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
            Close
          </Button>
        </div>

        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto pt-4">
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-muted">
              Assigned
            </p>
            {(location?.adminLocations ?? []).length === 0 ? (
              <p className="text-sm text-ink-muted">None yet.</p>
            ) : (
              <ul className="space-y-1.5">
                {(location?.adminLocations ?? []).map((al) => (
                  <li
                    key={al.userId}
                    className="flex items-center justify-between gap-2 rounded-xl bg-sand/50 px-3 py-2"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">
                        {al.user.name ?? al.user.email}
                      </p>
                      <p className="truncate text-xs text-ink-muted">
                        {al.user.email}
                        {al.user.role !== "USER" ? ` · ${al.user.role}` : ""}
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      className="px-2 py-1 text-xs"
                      disabled={unassign.isPending}
                      onClick={() =>
                        unassign.mutate({
                          userId: al.userId,
                          locationId,
                        })
                      }
                    >
                      Remove
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <Label htmlFor="manager-search">Add manager</Label>
            <Input
              id="manager-search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, email, or employee ID"
              autoFocus
            />
            {users.isLoading ? (
              <FoodPlateLoader size="sm" label="Loading members…" />
            ) : (
              <ul className="mt-2 max-h-56 space-y-1 overflow-y-auto">
                {candidates.slice(0, 40).map((u) => (
                  <li key={u.id}>
                    <button
                      type="button"
                      disabled={assign.isPending}
                      className="flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2 text-left transition hover:bg-leaf/10 disabled:opacity-50"
                      onClick={() =>
                        assign.mutate({ userId: u.id, locationId })
                      }
                    >
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-semibold">
                          {u.name ?? u.email}
                        </span>
                        <span className="block truncate text-xs text-ink-muted">
                          {[u.email, u.employeeId, u.role !== "USER" ? u.role : null]
                            .filter(Boolean)
                            .join(" · ")}
                        </span>
                      </span>
                      <UserPlus className="h-4 w-4 shrink-0 text-leaf" />
                    </button>
                  </li>
                ))}
                {candidates.length === 0 ? (
                  <li className="px-1 py-2 text-sm text-ink-muted">
                    No matching members.
                  </li>
                ) : null}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
