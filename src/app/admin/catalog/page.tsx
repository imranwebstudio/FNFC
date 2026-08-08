"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { CloudinaryUpload } from "~/components/cloudinary-upload";
import {
  Badge,
  Button,
  Input,
  Label,
  PageTitle,
  Panel,
  Select,
  Textarea,
} from "~/components/ui";
import { formatTaka, todayDateString } from "~/lib/datetime";
import { api } from "~/trpc/react";

export default function CatalogPage() {
  const utils = api.useUtils();
  const catalog = api.menu.catalogList.useQuery({ includeInactive: true });
  const locations = api.location.list.useQuery();
  const [tab, setTab] = useState<"active" | "archived">("active");
  const [publishFor, setPublishFor] = useState<string | null>(null);
  const [locationId, setLocationId] = useState("");
  const [slot, setSlot] = useState<"LUNCH" | "DINNER">("LUNCH");
  const [msg, setMsg] = useState("");

  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    defaultPrice: 160,
    imageUrl: "",
  });

  const create = api.menu.catalogCreate.useMutation({
    onSuccess: async () => {
      setForm({ name: "", description: "", defaultPrice: 160, imageUrl: "" });
      await utils.menu.catalogList.invalidate();
      setMsg("Saved to catalog. Use “Publish for today” to show it to employees.");
    },
  });

  const update = api.menu.catalogUpdate.useMutation({
    onSuccess: async () => {
      await utils.menu.catalogList.invalidate();
      if (editId) {
        setEditId(null);
        setForm({ name: "", description: "", defaultPrice: 160, imageUrl: "" });
        setMsg("Catalog item updated");
      }
    },
  });

  const publish = api.menu.upsertDaily.useMutation({
    onSuccess: async (menu) => {
      setPublishFor(null);
      const loc =
        locations.data?.find((l) => l.id === menu.locationId)?.name ??
        "selected location";
      setMsg(
        `Published “${menu.title}” for ${loc} (${menu.slot}) today. Open Today (/app) — super admins see all locations.`,
      );
      await utils.menu.listDaily.invalidate();
      await utils.menu.todayForUser.invalidate();
    },
    onError: (e) => setMsg(e.message),
  });

  const items = useMemo(() => {
    const all = catalog.data ?? [];
    return all.filter((c) => (tab === "active" ? c.isActive : !c.isActive));
  }, [catalog.data, tab]);

  const activeCount = catalog.data?.filter((c) => c.isActive).length ?? 0;
  const archivedCount = catalog.data?.filter((c) => !c.isActive).length ?? 0;

  const defaultLocationId = locationId || locations.data?.[0]?.id || "";

  return (
    <div>
      <PageTitle
        title="Meal catalog"
        subtitle="This is a recipe library only. Employees do not see catalog items until you Publish for today (or use Admin → Menu)."
      />

      <Panel className="mb-6 border-leaf/30 bg-leaf/5 py-3 text-sm text-ink-muted">
        <strong className="text-ink">Two steps:</strong> 1) Add/keep meals in this
        catalog → 2){" "}
        <Link href="/admin/menu" className="font-semibold text-leaf-deep underline">
          Admin → Menu
        </Link>{" "}
        (or use Publish for today below) to put one on a location + date.
      </Panel>

      {msg ? (
        <p className="mb-4 rounded-xl bg-leaf/10 px-3 py-2 text-sm text-leaf-deep">
          {msg}
        </p>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel>
          <h2 className="mb-3 font-display text-lg font-semibold">
            {editId ? "Edit catalog item" : "Add item"}
          </h2>
          <form
            className="space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              if (editId) {
                update.mutate({
                  id: editId,
                  name: form.name,
                  description: form.description || null,
                  defaultPrice: form.defaultPrice,
                  imageUrl: form.imageUrl || null,
                });
              } else {
                create.mutate({
                  name: form.name,
                  description: form.description || undefined,
                  defaultPrice: form.defaultPrice,
                  imageUrl: form.imageUrl || undefined,
                });
              }
            }}
          >
            <div>
              <Label>Name</Label>
              <Input
                required
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
              />
            </div>
            <div>
              <Label>Default price ৳</Label>
              <Input
                type="number"
                min={1}
                required
                value={form.defaultPrice}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    defaultPrice: Number(e.target.value),
                  }))
                }
              />
            </div>
            <CloudinaryUpload
              value={form.imageUrl || undefined}
              onUploaded={(url) => setForm((f) => ({ ...f, imageUrl: url }))}
              onClear={() => setForm((f) => ({ ...f, imageUrl: "" }))}
            />
            <div className="flex flex-wrap gap-2">
              <Button
                type="submit"
                disabled={create.isPending || update.isPending}
              >
                {editId
                  ? update.isPending
                    ? "Saving…"
                    : "Update item"
                  : create.isPending
                    ? "Saving…"
                    : "Add to catalog"}
              </Button>
              {editId ? (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    setEditId(null);
                    setForm({
                      name: "",
                      description: "",
                      defaultPrice: 160,
                      imageUrl: "",
                    });
                  }}
                >
                  Cancel
                </Button>
              ) : null}
            </div>
            {create.error ? (
              <p className="text-sm text-red-700">{create.error.message}</p>
            ) : null}
            {update.error ? (
              <p className="text-sm text-red-700">{update.error.message}</p>
            ) : null}
          </form>
        </Panel>

        <div>
          <div className="mb-3 flex gap-2">
            <Button
              type="button"
              variant={tab === "active" ? "secondary" : "ghost"}
              onClick={() => setTab("active")}
            >
              Active ({activeCount})
            </Button>
            <Button
              type="button"
              variant={tab === "archived" ? "secondary" : "ghost"}
              onClick={() => setTab("archived")}
            >
              Archived ({archivedCount})
            </Button>
          </div>

          <ul className="space-y-2">
            {items.map((c) => (
              <Panel key={c.id} className="space-y-2 py-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold">
                      {c.name}{" "}
                      {!c.isActive ? (
                        <Badge tone="warn">Archived</Badge>
                      ) : null}
                    </p>
                    <p className="text-xs text-ink-muted">
                      {formatTaka(c.defaultPrice)} · {c.description}
                    </p>
                  </div>
                  {c.isActive ? (
                    <div className="flex flex-wrap gap-2">
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => {
                          setEditId(c.id);
                          setForm({
                            name: c.name,
                            description: c.description ?? "",
                            defaultPrice: c.defaultPrice,
                            imageUrl: c.imageUrl ?? "",
                          });
                          setPublishFor(null);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() =>
                          update.mutate({ id: c.id, isActive: false })
                        }
                      >
                        Archive
                      </Button>
                    </div>
                  ) : (
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() =>
                        update.mutate({ id: c.id, isActive: true })
                      }
                    >
                      Restore
                    </Button>
                  )}
                </div>

                {c.isActive ? (
                  publishFor === c.id ? (
                    <div className="flex flex-wrap items-end gap-2 border-t border-line/50 pt-3">
                      <div className="min-w-[160px] flex-1">
                        <Label>Location</Label>
                        <Select
                          value={defaultLocationId}
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
                        <Label>Slot</Label>
                        <Select
                          value={slot}
                          onChange={(e) =>
                            setSlot(e.target.value as "LUNCH" | "DINNER")
                          }
                        >
                          <option value="LUNCH">Lunch</option>
                          <option value="DINNER">Dinner</option>
                        </Select>
                      </div>
                      <Button
                        type="button"
                        disabled={publish.isPending || !defaultLocationId}
                        onClick={() =>
                          publish.mutate({
                            locationId: defaultLocationId,
                            date: todayDateString(),
                            slot,
                            title: c.name,
                            description: c.description ?? undefined,
                            price: c.defaultPrice,
                            imageUrl: c.imageUrl,
                            catalogItemId: c.id,
                            isPublished: true,
                          })
                        }
                      >
                        Confirm publish
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => setPublishFor(null)}
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => {
                        setPublishFor(c.id);
                        setMsg("");
                      }}
                    >
                      Publish for today
                    </Button>
                  )
                ) : null}
              </Panel>
            ))}
            {!catalog.isLoading && items.length === 0 ? (
              <Panel>
                <p className="text-sm text-ink-muted">
                  {tab === "archived"
                    ? "No archived meals."
                    : "No active catalog items."}
                </p>
              </Panel>
            ) : null}
          </ul>
        </div>
      </div>
    </div>
  );
}
