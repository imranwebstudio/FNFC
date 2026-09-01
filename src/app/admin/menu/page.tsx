"use client";

import { useEffect, useMemo, useState } from "react";
import { BookOpen, Plus } from "lucide-react";

import { CloudinaryUpload } from "~/components/cloudinary-upload";
import { FoodPlateLoader } from "~/components/food-plate-loader";
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
  todayDateString,
  WEEKDAY_LABELS,
  WEEKDAYS,
  type WeekdayCode,
} from "~/lib/datetime";
import { showSuccess } from "~/lib/swal";
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
  const [cutoffDraft, setCutoffDraft] = useState("");

  const [weekEdit, setWeekEdit] = useState<{
    weekday: WeekdayCode;
    slot: "LUNCH" | "DINNER";
    id?: string;
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

  useEffect(() => {
    if (selectedLoc) {
      setCutoffDraft(selectedLoc.defaultCutoffTime);
    }
  }, [selectedLoc?.id, selectedLoc?.defaultCutoffTime]);

  const setCutoff = api.location.setCutoff.useMutation({
    onSuccess: async () => {
      await utils.location.list.invalidate();
      await utils.menu.listDaily.invalidate();
      await utils.menu.todayForUser.invalidate();
      showSuccess("Order cutoff updated");
    },
  });

  const setDinner = api.location.setDinnerEnabled.useMutation({
    onSuccess: async (loc) => {
      await utils.location.list.invalidate();
      await utils.menu.listDaily.invalidate();
      await utils.menu.weekdayList.invalidate();
      await utils.menu.todayForUser.invalidate();
      showSuccess(
        loc.dinnerEnabled ? "Dinner enabled" : "Dinner disabled",
        loc.dinnerEnabled
          ? "You can add dinner options for this office."
          : "Dinner is hidden for this office.",
      );
      if (!loc.dinnerEnabled && weekEdit?.slot === "DINNER") {
        setWeekEdit(null);
        setWeekForm(emptyWeekForm);
      }
      if (!loc.dinnerEnabled && form.slot === "DINNER") {
        setForm((f) => ({ ...f, slot: "LUNCH" }));
      }
    },
  });

  const dinnerEnabled = selectedLoc?.dinnerEnabled ?? false;
  const mealSlots = (
    dinnerEnabled ? (["LUNCH", "DINNER"] as const) : (["LUNCH"] as const)
  );

  const savedMeals = useMemo(() => {
    const all = catalog.data ?? [];
    return all.filter((c) => (showArchived ? !c.isActive : c.isActive));
  }, [catalog.data, showArchived]);

  const weekBySlot = useMemo(() => {
    const map = new Map<
      string,
      NonNullable<typeof weekdayMenus.data>
    >();
    for (const w of weekdayMenus.data ?? []) {
      const key = `${w.weekday}:${w.slot}`;
      const list = map.get(key) ?? [];
      list.push(w);
      map.set(key, list);
    }
    return map;
  }, [weekdayMenus.data]);

  const createTemplate = api.menu.catalogCreate.useMutation();
  const updateTemplate = api.menu.catalogUpdate.useMutation({
    onSuccess: async () => {
      await utils.menu.catalogList.invalidate();
      showSuccess("Saved meal updated");
    },
  });

  const weekdayUpsert = api.menu.weekdayUpsert.useMutation({
    onSuccess: async () => {
      await utils.menu.weekdayList.invalidate();
      await utils.menu.listDaily.invalidate();
      await utils.menu.todayForUser.invalidate();
      showSuccess(
        weekEdit
          ? weekEdit.id
            ? `Updated ${WEEKDAY_LABELS[weekEdit.weekday]} ${weekEdit.slot.toLowerCase()}`
            : `Added ${WEEKDAY_LABELS[weekEdit.weekday]} ${weekEdit.slot.toLowerCase()} option`
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
      showSuccess("Weekday meal removed");
      setWeekEdit(null);
      setWeekForm(emptyWeekForm);
    },
    onError: (e) => setMsg(e.message),
  });

  const deleteDaily = api.menu.deleteDaily.useMutation({
    onSuccess: async () => {
      await utils.menu.listDaily.invalidate();
      await utils.menu.todayForUser.invalidate();
      showSuccess("Meal removed");
      if (editingId) resetForm();
    },
    onError: (e) => setMsg(e.message),
  });

  const upsert = api.menu.upsertDaily.useMutation({
    onSuccess: async (res) => {
      await utils.menu.listDaily.invalidate();
      await utils.menu.todayForUser.invalidate();
      await utils.menu.catalogList.invalidate();
      showSuccess(
        editingId ? "Meal updated" : "Meals published",
        editingId
          ? undefined
          : `${res.count} day${res.count === 1 ? "" : "s"} (${res.startDate} → ${res.endDate})`,
      );
      setEditingId(null);
      if (!editingId) {
        setForm((f) => ({ ...emptyForm, slot: f.slot }));
      }
    },
    onError: (e) => setMsg(e.message),
  });

  function openWeekAdd(weekday: WeekdayCode, slot: "LUNCH" | "DINNER") {
    setWeekEdit({ weekday, slot });
    setWeekForm(emptyWeekForm);
    setEditingId(null);
    setMsg("");
  }

  function openWeekEdit(
    weekday: WeekdayCode,
    slot: "LUNCH" | "DINNER",
    meal: NonNullable<typeof weekdayMenus.data>[number],
  ) {
    setWeekEdit({ weekday, slot, id: meal.id });
    setWeekForm({
      title: meal.title,
      description: meal.description ?? "",
      price: meal.price,
      imageUrl: meal.imageUrl ?? "",
      catalogItemId: meal.catalogItemId ?? "",
    });
    setEditingId(null);
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
      id: editingId ?? undefined,
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
      id: weekEdit.id,
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
        subtitle="Set weekday templates (every Sunday, etc.) or publish specific dates. Order cutoff is per office (Asia/Dhaka)."
      />

      {msg ? (
        <p className="mb-4 rounded-xl bg-leaf/10 px-3 py-2 text-sm text-leaf">
          {msg}
        </p>
      ) : null}

      <div className="mb-6 flex flex-wrap items-end gap-4">
        <div className="max-w-xs flex-1">
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
        {locationId ? (
          <>
            <form
              className="flex flex-wrap items-end gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                if (!/^([01]\d|2[0-3]):([0-5]\d)$/.test(cutoffDraft)) {
                  setMsg("Cutoff must be HH:mm (24h)");
                  return;
                }
                setCutoff.mutate({
                  locationId,
                  defaultCutoffTime: cutoffDraft,
                });
              }}
            >
              <div>
                <Label>Order cutoff (Asia/Dhaka)</Label>
                <Input
                  type="time"
                  required
                  value={cutoffDraft}
                  onChange={(e) => setCutoffDraft(e.target.value)}
                  className="w-[9.5rem]"
                />
              </div>
              <Button
                type="submit"
                variant="secondary"
                disabled={
                  setCutoff.isPending ||
                  cutoffDraft === selectedLoc?.defaultCutoffTime
                }
              >
                {setCutoff.isPending ? "Saving…" : "Save cutoff"}
              </Button>
            </form>
            <label className="mb-0.5 flex cursor-pointer items-center gap-2.5 rounded-2xl bg-sand/60 px-3.5 py-2.5 text-sm">
              <input
                type="checkbox"
                className="h-4 w-4 accent-leaf"
                checked={dinnerEnabled}
                disabled={setDinner.isPending}
                onChange={(e) =>
                  setDinner.mutate({
                    locationId,
                    dinnerEnabled: e.target.checked,
                  })
                }
              />
              <span>
                <span className="font-semibold text-ink">Offer dinner</span>
                <span className="mt-0.5 block text-xs text-ink-muted">
                  Off by default — turn on when dinner is available
                </span>
              </span>
            </label>
          </>
        ) : null}
      </div>

      {/* Weekly schedule */}
      <section className="mb-10">
        <h2 className="font-display mb-1 text-lg font-bold tracking-tight">
          Weekly schedule
        </h2>
        <p className="mb-4 text-xs text-ink-muted">
          Add several lunch (or dinner) options per weekday for{" "}
          <strong className="text-ink">{selectedLoc?.name ?? "this office"}</strong>
          . They repeat every matching day. Everyone picks one option.
        </p>

        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
          {WEEKDAYS.map((day) => {
            return (
              <Panel key={day} className="p-3">
                <p className="mb-2 text-center text-xs font-bold uppercase tracking-wide text-leaf">
                  {WEEKDAY_LABELS[day].slice(0, 3)}
                </p>
                <div className="space-y-2">
                  {mealSlots.map((slot) => {
                    const meals = weekBySlot.get(`${day}:${slot}`) ?? [];
                    const isEditingSlot =
                      weekEdit?.weekday === day && weekEdit.slot === slot;
                    return (
                      <div
                        key={slot}
                        className={`rounded-xl px-2 py-2 ${
                          isEditingSlot
                            ? "bg-leaf/20 ring-1 ring-leaf/40"
                            : "bg-sand/60"
                        }`}
                      >
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-ink-muted">
                          {slot}
                          {meals.length > 0 ? (
                            <span className="ml-1 font-normal">
                              · {meals.length}
                            </span>
                          ) : null}
                        </p>
                        <ul className="mt-1 space-y-1">
                          {meals.map((meal) => (
                            <li key={meal.id}>
                              <button
                                type="button"
                                onClick={() => openWeekEdit(day, slot, meal)}
                                className={`w-full rounded-lg px-1.5 py-1 text-left transition hover:bg-sand ${
                                  weekEdit?.id === meal.id
                                    ? "bg-leaf/25"
                                    : ""
                                }`}
                              >
                                <p className="line-clamp-2 text-xs font-semibold text-ink">
                                  {meal.title}
                                </p>
                                <p className="text-[10px] text-ink-muted">
                                  {formatTaka(meal.price)}
                                </p>
                              </button>
                            </li>
                          ))}
                        </ul>
                        <button
                          type="button"
                          onClick={() => openWeekAdd(day, slot)}
                          className="mt-1 inline-flex w-full items-center justify-center gap-1 rounded-lg py-1 text-[11px] font-medium text-leaf hover:bg-leaf/10"
                        >
                          <Plus className="h-3 w-3" />
                          Add option
                        </button>
                      </div>
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
                {weekEdit.id ? "Edit" : "Add"} ·{" "}
                {WEEKDAY_LABELS[weekEdit.weekday]} · {weekEdit.slot}
              </h3>
              <Badge tone="good">
                Every {WEEKDAY_LABELS[weekEdit.weekday]}
              </Badge>
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
                  {weekdayUpsert.isPending
                    ? "Saving…"
                    : weekEdit.id
                      ? "Update option"
                      : "Add option"}
                </Button>
                {weekEdit.id ? (
                  <Button
                    type="button"
                    variant="danger"
                    disabled={weekdayClear.isPending}
                    onClick={() =>
                      weekdayClear.mutate({
                        id: weekEdit.id,
                        locationId,
                      })
                    }
                  >
                    Remove
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
          Publish extra meal options for specific dates (in addition to the
          weekday schedule).
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
                  {dinnerEnabled ? (
                    <option value="DINNER">Dinner</option>
                  ) : null}
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
                Daily close: {selectedLoc?.defaultCutoffTime ?? "—"} Asia/Dhaka
                (edit above)
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
            {daily.isLoading ? (
              <FoodPlateLoader size="inline" label="Loading day's meals…" />
            ) : null}
            {!daily.isLoading && (!daily.data || daily.data.length === 0) ? (
              <Panel className="mb-3 py-3">
                <p className="text-sm text-ink-muted">
                  Nothing for this day yet (no dated publish and no weekday
                  template).
                </p>
              </Panel>
            ) : null}
            <ul className="space-y-2">
              {!daily.isLoading
                ? daily.data
                ?.filter((m) => dinnerEnabled || m.slot !== "DINNER")
                .map((m) => (
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
                        upsert.mutate({
                          id: m.id,
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
                    <Button
                      type="button"
                      variant="danger"
                      disabled={deleteDaily.isPending}
                      onClick={() =>
                        deleteDaily.mutate({ id: m.id, locationId })
                      }
                    >
                      Remove
                    </Button>
                  </div>
                </Panel>
              ))
                : null}
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
        {catalog.isLoading ? (
          <FoodPlateLoader size="inline" label="Loading saved meals…" />
        ) : null}
        <ul className="grid gap-2 sm:grid-cols-2">
          {!catalog.isLoading
            ? savedMeals.map((c) => (
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
          ))
            : null}
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
