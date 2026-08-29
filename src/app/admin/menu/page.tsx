"use client";

import { useEffect, useMemo, useState } from "react";
import { BookOpen, Plus } from "lucide-react";

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
import {
  formatCutoffHm,
  formatTaka,
  ORDER_ROLLOVER_TIME,
  todayDateString,
  WEEKDAY_LABELS,
  WEEKDAYS,
  type WeekdayCode,
} from "~/lib/datetime";
import { api } from "~/trpc/react";

const emptyForm = {
  slot: "LUNCH" as "LUNCH" | "DINNER",
  title: "",
  description: "",
  price: 160,
  imageUrl: "",
  catalogItemId: "",
  isPublished: true,
  saveAsReusable: true,
};

const emptyWeekForm = {
  title: "",
  description: "",
  price: 160,
  imageUrl: "",
  catalogItemId: "",
};

export default function AdminMenuPage() {
  const locations = api.location.list.useQuery();
  const catalog = api.menu.catalogList.useQuery({ includeInactive: true });
  const [locationId, setLocationId] = useState("");
  const [date, setDate] = useState(todayDateString());
  const [endDate, setEndDate] = useState(todayDateString());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [msg, setMsg] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [showArchived, setShowArchived] = useState(false);

  const [weekEdit, setWeekEdit] = useState<{
    weekday: WeekdayCode;
    slot: "LUNCH" | "DINNER";
  } | null>(null);
  const [weekForm, setWeekForm] = useState(emptyWeekForm);

  const daily = api.menu.listDaily.useQuery(
    { locationId, date },
    { enabled: Boolean(locationId) },
  );
  const weekdayMenus = api.menu.weekdayList.useQuery(
    { locationId },
    { enabled: Boolean(locationId) },
  );
  const utils = api.useUtils();

  useEffect(() => {
    if (!locationId && locations.data?.[0]) {
      setLocationId(locations.data[0].id);
    }
  }, [locations.data, locationId]);

  const selectedLoc = locations.data?.find((l) => l.id === locationId);

  const savedMeals = useMemo(() => {
    const all = catalog.data ?? [];
    return all.filter((c) => (showArchived ? !c.isActive : c.isActive));
  }, [catalog.data, showArchived]);

  const weekByKey = useMemo(() => {
    const map = new Map<string, NonNullable<typeof weekdayMenus.data>[number]>();
    for (const w of weekdayMenus.data ?? []) {
      map.set(`${w.weekday}:${w.slot}`, w);
    }
    return map;
  }, [weekdayMenus.data]);

  const createTemplate = api.menu.catalogCreate.useMutation();
  const updateTemplate = api.menu.catalogUpdate.useMutation({
    onSuccess: async () => {
      await utils.menu.catalogList.invalidate();
      setMsg("Saved meal updated");
    },
  });

  const weekdayUpsert = api.menu.weekdayUpsert.useMutation({
    onSuccess: async () => {
      await utils.menu.weekdayList.invalidate();
      await utils.menu.listDaily.invalidate();
      await utils.menu.todayForUser.invalidate();
      setMsg(
        weekEdit
          ? `Saved ${WEEKDAY_LABELS[weekEdit.weekday]} ${weekEdit.slot.toLowerCase()} — repeats every week`
          : "Weekday meal saved",
      );
      setWeekEdit(null);
      setWeekForm(emptyWeekForm);
    },
    onError: (e) => setMsg(e.message),
  });

  const weekdayClear = api.menu.weekdayClear.useMutation({
    onSuccess: async () => {
      await utils.menu.weekdayList.invalidate();
      await utils.menu.listDaily.invalidate();
      await utils.menu.todayForUser.invalidate();
      setMsg("Weekday meal cleared");
      setWeekEdit(null);
      setWeekForm(emptyWeekForm);
    },
    onError: (e) => setMsg(e.message),
  });

  const upsert = api.menu.upsertDaily.useMutation({
    onSuccess: async (res) => {
      await utils.menu.listDaily.invalidate();
      await utils.menu.todayForUser.invalidate();
      await utils.menu.catalogList.invalidate();
      setMsg(
        editingId
          ? "Meal updated"
          : `Published for ${res.count} day${res.count === 1 ? "" : "s"} (${res.startDate} → ${res.endDate})`,
      );
      setEditingId(null);
      if (!editingId) {
        setForm((f) => ({ ...emptyForm, slot: f.slot }));
      }
    },
    onError: (e) => setMsg(e.message),
  });

  function openWeekSlot(weekday: WeekdayCode, slot: "LUNCH" | "DINNER") {
    const existing = weekByKey.get(`${weekday}:${slot}`);
    setWeekEdit({ weekday, slot });
    setWeekForm(
      existing
        ? {
            title: existing.title,
            description: existing.description ?? "",
            price: existing.price,
            imageUrl: existing.imageUrl ?? "",
            catalogItemId: existing.catalogItemId ?? "",
          }
        : emptyWeekForm,
    );
    setMsg("");
  }

  function useSavedForWeek(c: {
    id: string;
    name: string;
    description: string | null;
    defaultPrice: number;
    imageUrl: string | null;
  }) {
    setWeekForm({
      title: c.name,
      description: c.description ?? "",
      price: c.defaultPrice,
      imageUrl: c.imageUrl ?? "",
      catalogItemId: c.id,
    });
  }

  function useSavedMeal(c: {
    id: string;
    name: string;
    description: string | null;
    defaultPrice: number;
    imageUrl: string | null;
  }) {
    if (weekEdit) {
      useSavedForWeek(c);
      setMsg(`Loaded “${c.name}” into weekday form`);
      return;
    }
    setEditingId(null);
    setForm((f) => ({
      ...f,
      catalogItemId: c.id,
      title: c.name,
      description: c.description ?? "",
      price: c.defaultPrice,
      imageUrl: c.imageUrl ?? "",
      saveAsReusable: false,
    }));
    setMsg(`Loaded “${c.name}” — set dates and publish`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function startEdit(m: NonNullable<typeof daily.data>[number]) {
    setWeekEdit(null);
    setEditingId(m.id);
    setForm({
      slot: m.slot,
      title: m.title,
      description: m.description ?? "",
      price: m.price,
      imageUrl: m.imageUrl ?? "",
      catalogItemId: m.catalogItemId ?? "",
      isPublished: m.isPublished,
      saveAsReusable: false,
    });
    setMsg(`Editing ${m.slot} for ${date}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm);
    setMsg("");
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!locationId) return;

    let catalogItemId = form.catalogItemId || null;

    if (!editingId && form.saveAsReusable && !catalogItemId && form.title) {
      try {
        const created = await createTemplate.mutateAsync({
          name: form.title,
          description: form.description || undefined,
          defaultPrice: Number(form.price),
          imageUrl: form.imageUrl || undefined,
        });
        catalogItemId = created.id;
      } catch {
        // Still publish even if template save fails
      }
    }

    upsert.mutate({
      locationId,
      date,
      endDate: editingId ? date : endDate,
      slot: form.slot,
      title: form.title,
      description: form.description || undefined,
      price: Number(form.price),
      imageUrl: form.imageUrl || null,
      catalogItemId,
      isPublished: form.isPublished,
    });
  }

  function onWeekSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!locationId || !weekEdit) return;
    weekdayUpsert.mutate({
      locationId,
      weekday: weekEdit.weekday,
      slot: weekEdit.slot,
      title: weekForm.title,
      description: weekForm.description || null,
      price: Number(weekForm.price),
      imageUrl: weekForm.imageUrl || null,
      catalogItemId: weekForm.catalogItemId || null,
      isActive: true,
    });
  }

  return (
    <div>
      <PageTitle
        icon={<BookOpen className="h-5 w-5" strokeWidth={2.25} />}
        title="Menu"
        subtitle={`Set weekday templates (every Sunday, etc.) or publish specific dates. Closes at ${ORDER_ROLLOVER_TIME} Asia/Dhaka each day.`}
      />

      {msg ? (
        <p className="mb-4 rounded-xl bg-leaf/10 px-3 py-2 text-sm text-leaf">
          {msg}
        </p>
      ) : null}

      <div className="mb-6 max-w-xs">
        <Label>Office</Label>
        <Select
          value={locationId}
          onChange={(e) => {
            setLocationId(e.target.value);
            resetForm();
            setWeekEdit(null);
          }}
        >
          {locations.data?.map((l) => (
            <option key={l.id} value={l.id}>
              {l.name}
            </option>
          ))}
        </Select>
      </div>

      {/* Weekly schedule */}
      <section className="mb-10">
        <h2 className="font-display mb-1 text-lg font-bold tracking-tight">
          Weekly schedule
        </h2>
        <p className="mb-4 text-xs text-ink-muted">
          Assign meals to weekdays for{" "}
          <strong className="text-ink">{selectedLoc?.name ?? "this office"}</strong>
          . They repeat every matching day. A one-off dated publish overrides that
          day.
        </p>

        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
          {WEEKDAYS.map((day) => {
            const lunch = weekByKey.get(`${day}:LUNCH`);
            const dinner = weekByKey.get(`${day}:DINNER`);
            const active =
              weekEdit?.weekday === day
                ? weekEdit.slot
                : null;
            return (
              <Panel key={day} className="p-3">
                <p className="mb-2 text-center text-xs font-bold uppercase tracking-wide text-leaf">
                  {WEEKDAY_LABELS[day].slice(0, 3)}
                </p>
                <div className="space-y-1.5">
                  {(["LUNCH", "DINNER"] as const).map((slot) => {
                    const meal = slot === "LUNCH" ? lunch : dinner;
                    const isActive = active === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => openWeekSlot(day, slot)}
                        className={`w-full rounded-xl px-2 py-2 text-left transition ${
                          isActive
                            ? "bg-leaf/20 ring-1 ring-leaf/40"
                            : "bg-sand/60 hover:bg-sand"
                        }`}
                      >
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-ink-muted">
                          {slot}
                        </p>
                        {meal ? (
                          <>
                            <p className="mt-0.5 line-clamp-2 text-xs font-semibold text-ink">
                              {meal.title}
                            </p>
                            <p className="text-[10px] text-ink-muted">
                              {formatTaka(meal.price)}
                            </p>
                          </>
                        ) : (
                          <p className="mt-0.5 inline-flex items-center gap-1 text-[11px] text-ink-muted">
                            <Plus className="h-3 w-3" /> Add
                          </p>
                        )}
                      </button>
                    );
                  })}
                </div>
              </Panel>
            );
          })}
        </div>

        {weekEdit ? (
          <Panel className="mt-4">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-display text-base font-semibold">
                {WEEKDAY_LABELS[weekEdit.weekday]} · {weekEdit.slot}
              </h3>
              <Badge tone="good">Every {WEEKDAY_LABELS[weekEdit.weekday]}</Badge>
            </div>
            <form className="grid gap-3 sm:grid-cols-2" onSubmit={onWeekSubmit}>
              <div className="sm:col-span-2">
                <Label>Title</Label>
                <Input
                  required
                  value={weekForm.title}
                  onChange={(e) =>
                    setWeekForm((f) => ({ ...f, title: e.target.value }))
                  }
                />
              </div>
              <div className="sm:col-span-2">
                <Label>Description</Label>
                <Textarea
                  value={weekForm.description}
                  onChange={(e) =>
                    setWeekForm((f) => ({ ...f, description: e.target.value }))
                  }
                  rows={2}
                />
              </div>
              <div>
                <Label>Price (৳)</Label>
                <Input
                  type="number"
                  required
                  min={1}
                  value={weekForm.price}
                  onChange={(e) =>
                    setWeekForm((f) => ({
                      ...f,
                      price: Number(e.target.value),
                    }))
                  }
                />
              </div>
              <div className="sm:col-span-2">
                <CloudinaryUpload
                  value={weekForm.imageUrl || undefined}
                  onUploaded={(url) =>
                    setWeekForm((f) => ({ ...f, imageUrl: url }))
                  }
                  onClear={() =>
                    setWeekForm((f) => ({ ...f, imageUrl: "" }))
                  }
                />
              </div>
              <div className="flex flex-wrap gap-2 sm:col-span-2">
                <Button type="submit" disabled={weekdayUpsert.isPending}>
                  {weekdayUpsert.isPending ? "Saving…" : "Save weekday meal"}
                </Button>
                {weekByKey.has(`${weekEdit.weekday}:${weekEdit.slot}`) ? (
                  <Button
                    type="button"
                    variant="danger"
                    disabled={weekdayClear.isPending}
                    onClick={() =>
                      weekdayClear.mutate({
                        locationId,
                        weekday: weekEdit.weekday,
                        slot: weekEdit.slot,
                      })
                    }
                  >
                    Clear
                  </Button>
                ) : null}
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    setWeekEdit(null);
                    setWeekForm(emptyWeekForm);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Panel>
        ) : null}
      </section>

      {/* Dated publish */}
      <section>
        <h2 className="font-display mb-1 text-lg font-bold tracking-tight">
          One-off / date range
        </h2>
        <p className="mb-4 text-xs text-ink-muted">
          Publish for specific dates. Overrides the weekday template for those
          days only.
        </p>

        <div className="mb-4 grid gap-3 sm:grid-cols-2">
          <div>
            <Label>Start date</Label>
            <Input
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                if (e.target.value > endDate) setEndDate(e.target.value);
              }}
            />
          </div>
          <div>
            <Label>End date</Label>
            <Input
              type="date"
              value={endDate}
              min={date}
              disabled={Boolean(editingId)}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
        {!editingId && endDate !== date ? (
          <p className="mb-4 text-xs text-ink-muted">
            Publishes the same meal every day from {date} to {endDate}.
          </p>
        ) : null}

        <div className="grid gap-6 lg:grid-cols-2">
          <Panel>
            <div className="mb-4 flex items-center justify-between gap-2">
              <h3 className="font-display text-lg font-semibold">
                {editingId ? "Edit scheduled meal" : "New dated meal"}
              </h3>
              {editingId ? <Badge tone="warn">Editing</Badge> : null}
            </div>

            <form className="space-y-3" onSubmit={onSubmit}>
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
              <CloudinaryUpload
                value={form.imageUrl || undefined}
                onUploaded={(url) =>
                  setForm((f) => ({ ...f, imageUrl: url }))
                }
                onClear={() => setForm((f) => ({ ...f, imageUrl: "" }))}
              />
              <p className="text-[11px] text-ink-muted">
                Daily close: {ORDER_ROLLOVER_TIME} Asia/Dhaka (fixed)
              </p>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.isPublished}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, isPublished: e.target.checked }))
                  }
                />
                Visible on Today
              </label>
              {!editingId ? (
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={form.saveAsReusable}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        saveAsReusable: e.target.checked,
                      }))
                    }
                  />
                  Also keep in saved meals
                </label>
              ) : null}
              <div className="flex flex-wrap gap-2">
                <Button
                  type="submit"
                  disabled={upsert.isPending || createTemplate.isPending}
                >
                  {upsert.isPending || createTemplate.isPending
                    ? "Saving…"
                    : editingId
                      ? "Update"
                      : "Publish"}
                </Button>
                {editingId ? (
                  <Button type="button" variant="ghost" onClick={resetForm}>
                    Cancel
                  </Button>
                ) : null}
              </div>
            </form>
          </Panel>

          <div>
            <h3 className="mb-3 font-display text-lg font-semibold">
              On {date}
              {selectedLoc ? (
                <span className="text-sm font-normal text-ink-muted">
                  {" "}
                  · {selectedLoc.name}
                </span>
              ) : null}
            </h3>
            {!daily.isLoading && (!daily.data || daily.data.length === 0) ? (
              <Panel className="mb-3 py-3">
                <p className="text-sm text-ink-muted">
                  Nothing for this day yet (no dated publish and no weekday
                  template).
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
                    {formatTaka(m.price)} · {m.isPublished ? "Live" : "Draft"} ·{" "}
                    {m._count.orders} orders · closes{" "}
                    {formatCutoffHm(m.cutoffAt) || ORDER_ROLLOVER_TIME}
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
      </section>

      <div className="mt-10">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-display text-lg font-semibold">Saved meals</h2>
          <Button
            type="button"
            variant="ghost"
            className="text-xs"
            onClick={() => setShowArchived((v) => !v)}
          >
            {showArchived ? "Show active" : "Show archived"}
          </Button>
        </div>
        <p className="mb-3 text-xs text-ink-muted">
          Tap Use to fill the weekday or dated form.
        </p>
        <ul className="grid gap-2 sm:grid-cols-2">
          {savedMeals.map((c) => (
            <Panel key={c.id} className="py-3">
              <p className="font-semibold">{c.name}</p>
              <p className="text-xs text-ink-muted">
                {formatTaka(c.defaultPrice)}
                {c.description ? ` · ${c.description}` : ""}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {c.isActive ? (
                  <>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => useSavedMeal(c)}
                    >
                      Use
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      disabled={updateTemplate.isPending}
                      onClick={() =>
                        updateTemplate.mutate({ id: c.id, isActive: false })
                      }
                    >
                      Archive
                    </Button>
                  </>
                ) : (
                  <Button
                    type="button"
                    variant="secondary"
                    disabled={updateTemplate.isPending}
                    onClick={() =>
                      updateTemplate.mutate({ id: c.id, isActive: true })
                    }
                  >
                    Restore
                  </Button>
                )}
              </div>
            </Panel>
          ))}
        </ul>
        {!catalog.isLoading && savedMeals.length === 0 ? (
          <Panel className="mt-2 py-3">
            <p className="text-sm text-ink-muted">
              {showArchived
                ? "No archived meals."
                : "No saved meals yet — publish with “Also keep in saved meals” checked."}
            </p>
          </Panel>
        ) : null}
      </div>
    </div>
  );
}
