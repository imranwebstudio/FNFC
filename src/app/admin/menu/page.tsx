"use client";

import { useEffect, useState } from "react";

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
import { formatCutoffHm, todayDateString } from "~/lib/datetime";
import { api } from "~/trpc/react";

const emptyForm = {
  slot: "LUNCH" as "LUNCH" | "DINNER",
  title: "",
  description: "",
  price: 160,
  imageUrl: "",
  catalogItemId: "",
  cutoffTime: "",
  isPublished: true,
};

export default function AdminMenuPage() {
  const locations = api.location.list.useQuery();
  const catalog = api.menu.catalogList.useQuery();
  const [locationId, setLocationId] = useState("");
  const [date, setDate] = useState(todayDateString());
  const [cutoffDraft, setCutoffDraft] = useState("11:00");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [msg, setMsg] = useState("");
  const [form, setForm] = useState(emptyForm);

  const daily = api.menu.listDaily.useQuery(
    { locationId, date },
    { enabled: Boolean(locationId) },
  );
  const utils = api.useUtils();

  useEffect(() => {
    if (!locationId && locations.data?.[0]) {
      setLocationId(locations.data[0].id);
    }
  }, [locations.data, locationId]);

  const selectedLoc = locations.data?.find((l) => l.id === locationId);

  useEffect(() => {
    if (selectedLoc) {
      setCutoffDraft(selectedLoc.defaultCutoffTime);
    }
  }, [selectedLoc?.id, selectedLoc?.defaultCutoffTime]);

  const upsert = api.menu.upsertDaily.useMutation({
    onSuccess: async () => {
      await utils.menu.listDaily.invalidate();
      await utils.menu.todayForUser.invalidate();
      setMsg(editingId ? "Meal updated" : "Meal published");
      setEditingId(null);
    },
    onError: (e) => setMsg(e.message),
  });

  const setCutoff = api.location.setCutoff.useMutation({
    onSuccess: async () => {
      await utils.location.list.invalidate();
      setMsg(`Office cutoff saved: ${cutoffDraft}`);
    },
    onError: (e) => setMsg(e.message),
  });

  function startEdit(m: NonNullable<typeof daily.data>[number]) {
    setEditingId(m.id);
    setForm({
      slot: m.slot,
      title: m.title,
      description: m.description ?? "",
      price: m.price,
      imageUrl: m.imageUrl ?? "",
      catalogItemId: m.catalogItemId ?? "",
      cutoffTime: formatCutoffHm(m.cutoffAt),
      isPublished: m.isPublished,
    });
    setMsg(`Editing ${m.slot} — change fields and click Update meal`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetForm() {
    setEditingId(null);
    setForm({
      ...emptyForm,
      cutoffTime: selectedLoc?.defaultCutoffTime ?? "11:00",
    });
    setMsg("");
  }

  return (
    <div>
      <PageTitle
        title="Daily set meal"
        subtitle="Publish or edit today's lunch/dinner, and set the ordering cutoff for this office."
      />

      {msg ? (
        <p className="mb-4 rounded-xl bg-leaf/10 px-3 py-2 text-sm text-leaf-deep">
          {msg}
        </p>
      ) : null}

      <Panel className="mb-6">
        <h2 className="mb-3 font-display text-lg font-semibold">
          Office cutoff time
        </h2>
        <p className="mb-3 text-xs text-ink-muted">
          Default deadline for ordering at this location (Asia/Dhaka). You can
          still override per meal in the form below.
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          <div>
            <Label>Location</Label>
            <Select
              value={locationId}
              onChange={(e) => {
                setLocationId(e.target.value);
                resetForm();
              }}
            >
              {locations.data?.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.name}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label>Cutoff (HH:mm)</Label>
            <Input
              value={cutoffDraft}
              onChange={(e) => setCutoffDraft(e.target.value)}
              placeholder="11:00"
              pattern="([01]\d|2[0-3]):([0-5]\d)"
            />
          </div>
          <div className="flex items-end">
            <Button
              type="button"
              variant="secondary"
              className="w-full"
              disabled={!locationId || setCutoff.isPending}
              onClick={() => {
                if (!locationId) return;
                setCutoff.mutate({
                  locationId,
                  defaultCutoffTime: cutoffDraft,
                });
              }}
            >
              {setCutoff.isPending ? "Saving…" : "Save cutoff"}
            </Button>
          </div>
        </div>
      </Panel>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel>
          <div className="mb-4 flex items-center justify-between gap-2">
            <h2 className="font-display text-lg font-semibold">
              {editingId ? "Edit meal" : "Publish meal"}
            </h2>
            {editingId ? <Badge tone="warn">Editing</Badge> : null}
          </div>

          <div className="mb-3">
            <Label>Date</Label>
            <Input
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                resetForm();
              }}
            />
          </div>

          <form
            className="space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              if (!locationId) return;
              upsert.mutate({
                locationId,
                date,
                slot: form.slot,
                title: form.title,
                description: form.description || undefined,
                price: Number(form.price),
                imageUrl: form.imageUrl || null,
                catalogItemId: form.catalogItemId || null,
                cutoffTime: form.cutoffTime || null,
                isPublished: form.isPublished,
              });
            }}
          >
            <div>
              <Label>Slot</Label>
              <Select
                value={form.slot}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    slot: e.target.value as "LUNCH" | "DINNER",
                  }))
                }
              >
                <option value="LUNCH">Lunch</option>
                <option value="DINNER">Dinner</option>
              </Select>
            </div>
            <div>
              <Label>From catalog (optional)</Label>
              <Select
                value={form.catalogItemId}
                onChange={(e) => {
                  const item = catalog.data?.find(
                    (c) => c.id === e.target.value,
                  );
                  setForm((f) => ({
                    ...f,
                    catalogItemId: e.target.value,
                    title: item?.name ?? f.title,
                    description: item?.description ?? f.description,
                    price: item?.defaultPrice ?? f.price,
                    imageUrl: item?.imageUrl ?? f.imageUrl,
                  }));
                }}
              >
                <option value="">Custom</option>
                {catalog.data?.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} — ৳{c.defaultPrice}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Label>Title</Label>
              <Input
                required
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
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
                rows={2}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Price (৳)</Label>
                <Input
                  type="number"
                  required
                  min={1}
                  value={form.price}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, price: Number(e.target.value) }))
                  }
                />
              </div>
              <div>
                <Label>Meal cutoff override</Label>
                <Input
                  placeholder={selectedLoc?.defaultCutoffTime ?? "11:00"}
                  value={form.cutoffTime}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, cutoffTime: e.target.value }))
                  }
                />
                <p className="mt-1 text-[11px] text-ink-muted">
                  Leave blank to use office cutoff ({selectedLoc?.defaultCutoffTime})
                </p>
              </div>
            </div>
            <CloudinaryUpload
              value={form.imageUrl || undefined}
              onUploaded={(url) => setForm((f) => ({ ...f, imageUrl: url }))}
              onClear={() => setForm((f) => ({ ...f, imageUrl: "" }))}
            />
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.isPublished}
                onChange={(e) =>
                  setForm((f) => ({ ...f, isPublished: e.target.checked }))
                }
              />
              Published (visible on Today)
            </label>
            <div className="flex flex-wrap gap-2">
              <Button type="submit" disabled={upsert.isPending}>
                {upsert.isPending
                  ? "Saving…"
                  : editingId
                    ? "Update meal"
                    : form.isPublished
                      ? "Publish meal"
                      : "Save as draft"}
              </Button>
              {editingId ? (
                <Button type="button" variant="ghost" onClick={resetForm}>
                  Cancel edit
                </Button>
              ) : null}
            </div>
          </form>
        </Panel>

        <div>
          <h2 className="mb-3 font-display text-lg font-semibold">
            Menus for {date}
          </h2>
          <p className="mb-3 text-xs text-ink-muted">
            Cutoff for {selectedLoc?.name ?? "office"}:{" "}
            <strong>{selectedLoc?.defaultCutoffTime ?? "—"}</strong>
          </p>
          {!daily.isLoading && (!daily.data || daily.data.length === 0) ? (
            <Panel className="mb-3 py-3">
              <p className="text-sm text-ink-muted">
                No meal for this location/date. Use the form to publish one.
              </p>
            </Panel>
          ) : null}
          <ul className="space-y-2">
            {daily.data?.map((m) => (
              <Panel
                key={m.id}
                className={`py-3 ${editingId === m.id ? "ring-2 ring-leaf/40" : ""}`}
              >
                <p className="font-semibold">
                  {m.slot}: {m.title}
                </p>
                <p className="text-xs text-ink-muted">
                  ৳{m.price} · {m.isPublished ? "Published" : "Draft"} ·{" "}
                  {m._count.orders} orders · cutoff{" "}
                  {formatCutoffHm(m.cutoffAt) ||
                    selectedLoc?.defaultCutoffTime ||
                    "—"}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => startEdit(m)}
                  >
                    Edit
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    disabled={upsert.isPending}
                    onClick={() => {
                      setEditingId(m.id);
                      upsert.mutate({
                        locationId,
                        date,
                        slot: m.slot,
                        title: m.title,
                        description: m.description ?? undefined,
                        price: m.price,
                        imageUrl: m.imageUrl,
                        catalogItemId: m.catalogItemId,
                        cutoffTime: formatCutoffHm(m.cutoffAt) || null,
                        isPublished: !m.isPublished,
                      });
                    }}
                  >
                    {m.isPublished ? "Unpublish" : "Publish"}
                  </Button>
                </div>
              </Panel>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
