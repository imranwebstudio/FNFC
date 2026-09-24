"use client";

import { useEffect, useMemo, useState } from "react";
import { BookOpen, PackageX, Plus } from "lucide-react";

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
  formatMenuDateLabel,
  formatTaka,
  getServiceOrderWindow,
  todayDateString,
  WEEKDAY_LABELS,
  WEEKDAYS,
  weekdayFromDateString,
  type WeekdayCode,
} from "~/lib/datetime";
import { confirmAction, showSuccess } from "~/lib/swal";
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

function OfficeTargets({
  locations,
  selectedIds,
  onChange,
  requireDinner,
  primaryId,
}: {
  locations: Array<{
    id: string;
    name: string;
    isActive: boolean;
    dinnerEnabled: boolean;
  }>;
  selectedIds: string[];
  onChange: (ids: string[]) => void;
  requireDinner?: boolean;
  primaryId?: string;
}) {
  const options = locations.filter(
    (l) => l.isActive && (!requireDinner || l.dinnerEnabled),
  );
  const allIds = options.map((l) => l.id);
  const allSelected =
    allIds.length > 0 && allIds.every((id) => selectedIds.includes(id));

  function toggle(id: string) {
    if (selectedIds.includes(id)) {
      const next = selectedIds.filter((x) => x !== id);
      // Always keep at least the primary office
      if (next.length === 0 && primaryId) onChange([primaryId]);
      else onChange(next);
    } else {
      onChange([...selectedIds, id]);
    }
  }

  if (options.length === 0) return null;

  return (
    <div className="sm:col-span-2 rounded-2xl border border-leaf/20 bg-sand/40 p-3">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <Label>Offices for this meal</Label>
        <label className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-leaf">
          <input
            type="checkbox"
            className="h-4 w-4 accent-leaf"
            checked={allSelected}
            onChange={(e) =>
              onChange(
                e.target.checked
                  ? allIds
                  : primaryId
                    ? [primaryId]
                    : selectedIds.slice(0, 1),
              )
            }
          />
          All offices
        </label>
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map((l) => {
          const checked = selectedIds.includes(l.id);
          return (
            <label
              key={l.id}
              className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium transition ${
                checked
                  ? "bg-leaf/20 text-leaf-deep ring-1 ring-leaf/40"
                  : "bg-sand/80 text-ink-muted hover:bg-sand"
              }`}
            >
              <input
                type="checkbox"
                className="sr-only"
                checked={checked}
                onChange={() => toggle(l.id)}
              />
              {l.name}
            </label>
          );
        })}
      </div>
      <p className="mt-2 text-[11px] text-ink-muted">
        Defaults to all offices so today&apos;s menu is available everywhere
        {requireDinner ? " (dinner-enabled only)" : ""}. Uncheck to limit.
      </p>
    </div>
  );
}

export default function AdminMenuPage() {
  const locations = api.location.list.useQuery();
  const catalog = api.menu.catalogList.useQuery({ includeInactive: true });
  const [locationId, setLocationId] = useState("");
  const [date, setDate] = useState(todayDateString());
  const [endDate, setEndDate] = useState(todayDateString());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showDatedForm, setShowDatedForm] = useState(false);
  const [deletingDailyId, setDeletingDailyId] = useState<string | null>(null);
  const [msg, setMsg] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [showArchived, setShowArchived] = useState(false);
  const [lunchCutoffDraft, setLunchCutoffDraft] = useState("");
  const [dinnerCutoffDraft, setDinnerCutoffDraft] = useState("");

  const [weekEdit, setWeekEdit] = useState<{
    weekday: WeekdayCode;
    slot: "LUNCH" | "DINNER";
    id?: string;
  } | null>(null);
  const [weekForm, setWeekForm] = useState(emptyWeekForm);
  /** Offices to create/publish into (defaults to the selected office). */
  const [targetLocationIds, setTargetLocationIds] = useState<string[]>([]);

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
      setLunchCutoffDraft(selectedLoc.defaultCutoffTime);
      setDinnerCutoffDraft(
        selectedLoc.dinnerCutoffTime ?? selectedLoc.defaultCutoffTime,
      );
    }
  }, [
    selectedLoc?.id,
    selectedLoc?.defaultCutoffTime,
    selectedLoc?.dinnerCutoffTime,
  ]);

  const dinnerEnabled = selectedLoc?.dinnerEnabled ?? false;
  const mealSlots = (
    dinnerEnabled ? (["LUNCH", "DINNER"] as const) : (["LUNCH"] as const)
  );

  const orderWindow = useMemo(() => {
    return getServiceOrderWindow(new Date(), {
      defaultCutoffTime: selectedLoc?.defaultCutoffTime ?? "14:00",
      dinnerCutoffTime: selectedLoc?.dinnerCutoffTime,
      dinnerEnabled,
    });
  }, [
    selectedLoc?.defaultCutoffTime,
    selectedLoc?.dinnerCutoffTime,
    dinnerEnabled,
  ]);

  const daily = api.menu.listDaily.useQuery(
    { locationId, date: orderWindow.orderDate },
    { enabled: Boolean(locationId) },
  );

  const setCutoff = api.location.setCutoff.useMutation({
    onSuccess: async () => {
      await utils.location.list.invalidate();
      await utils.menu.listDaily.invalidate();
      await utils.menu.todayForUser.invalidate();
      showSuccess("Order cutoffs updated");
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

  function allActiveLocationIds(requireDinner?: boolean) {
    return (locations.data ?? [])
      .filter(
        (l) => l.isActive && (!requireDinner || l.dinnerEnabled),
      )
      .map((l) => l.id);
  }

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
    onSuccess: async (res) => {
      await utils.menu.weekdayList.invalidate();
      await utils.menu.listDaily.invalidate();
      await utils.menu.todayForUser.invalidate();
      const offices = res.count ?? 1;
      showSuccess(
        weekEdit
          ? weekEdit.id
            ? `Updated ${WEEKDAY_LABELS[weekEdit.weekday]} ${weekEdit.slot.toLowerCase()}`
            : `Added ${WEEKDAY_LABELS[weekEdit.weekday]} ${weekEdit.slot.toLowerCase()} option`
          : "Weekday meal saved",
        !weekEdit?.id && offices > 1
          ? `Saved at ${offices} offices`
          : undefined,
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

  const weekdayCopy = api.menu.weekdayCopyToLocations.useMutation({
    onSuccess: async (res) => {
      await utils.menu.weekdayList.invalidate();
      await utils.menu.listDaily.invalidate();
      await utils.menu.todayForUser.invalidate();
      showSuccess(
        "Copied to other offices",
        `${res.created} new option${res.created === 1 ? "" : "s"} across ${res.officeCount} office${res.officeCount === 1 ? "" : "s"}${
          res.skippedExisting
            ? ` · ${res.skippedExisting} already existed`
            : ""
        }`,
      );
    },
    onError: (e) => setMsg(e.message),
  });

  const dailyCopy = api.menu.dailyCopyToLocations.useMutation({
    onSuccess: async (res) => {
      await utils.menu.listDaily.invalidate();
      await utils.menu.todayForUser.invalidate();
      showSuccess(
        "Copied day's meals",
        `${res.created} meal${res.created === 1 ? "" : "s"} to ${res.officeCount} office${res.officeCount === 1 ? "" : "s"}`,
      );
    },
    onError: (e) => setMsg(e.message),
  });

  const [showCopyWeek, setShowCopyWeek] = useState(false);
  const [copyTargetIds, setCopyTargetIds] = useState<string[]>([]);

  const deleteDaily = api.menu.deleteDaily.useMutation({
    onSuccess: async () => {
      await utils.menu.listDaily.invalidate();
      await utils.menu.todayForUser.invalidate();
      showSuccess("Meal removed");
      if (editingId) resetForm();
    },
    onError: (e) => setMsg(e.message),
    onSettled: () => setDeletingDailyId(null),
  });

  const stockOut = api.menu.stockOut.useMutation({
    onSuccess: async (res) => {
      await utils.menu.listDaily.invalidate();
      await utils.menu.todayForUser.invalidate();
      await utils.menu.optionsForLocation.invalidate();
      showSuccess(
        res.alreadyStockedOut ? "Already stocked out" : "Stocked out",
        `${res.title} · ${formatMenuDateLabel(res.date)}`,
      );
    },
    onError: (e) => setMsg(e.message),
  });

  const liveWeekdayIds = useMemo(() => {
    const ids = new Set<string>();
    for (const m of daily.data ?? []) {
      if (m.sourceWeekdayMenuId) ids.add(m.sourceWeekdayMenuId);
    }
    return ids;
  }, [daily.data]);

  const activeOrderWeekday = useMemo(
    () => weekdayFromDateString(orderWindow.orderDate),
    [orderWindow.orderDate],
  );

  const upsert = api.menu.upsertDaily.useMutation({
    onSuccess: async (res) => {
      await utils.menu.listDaily.invalidate();
      await utils.menu.todayForUser.invalidate();
      await utils.menu.catalogList.invalidate();
      const officeNote =
        !editingId && (res.officeCount ?? 1) > 1
          ? ` · ${res.officeCount} offices`
          : "";
      showSuccess(
        editingId ? "Meal updated" : "Meals published",
        editingId
          ? undefined
          : `${res.count} meal${res.count === 1 ? "" : "s"} (${res.startDate} → ${res.endDate})${officeNote}`,
      );
      setEditingId(null);
      if (!editingId) {
        setForm((f) => ({ ...emptyForm, slot: f.slot }));
        setShowDatedForm(false);
      }
    },
    onError: (e) => setMsg(e.message),
  });

  function openDatedAdd() {
    setWeekEdit(null);
    setEditingId(null);
    setForm(emptyForm);
    setShowDatedForm(true);
    // Today's / dated meals default to every active office
    const all = allActiveLocationIds();
    setTargetLocationIds(
      all.length > 0 ? all : locationId ? [locationId] : [],
    );
    setMsg("");
  }

  function openWeekAdd(weekday: WeekdayCode, slot: "LUNCH" | "DINNER") {
    setWeekEdit({ weekday, slot });
    setWeekForm(emptyWeekForm);
    setEditingId(null);
    setShowDatedForm(false);
    const all = allActiveLocationIds(slot === "DINNER");
    setTargetLocationIds(
      all.length > 0 ? all : locationId ? [locationId] : [],
    );
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
    setShowDatedForm(false);
    setTargetLocationIds(locationId ? [locationId] : []);
    setCopyTargetIds(
      allActiveLocationIds(slot === "DINNER").filter((id) => id !== locationId),
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
    setShowDatedForm(true);
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
    setShowDatedForm(true);
    setTargetLocationIds(locationId ? [locationId] : []);
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
    setShowDatedForm(false);
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

    const offices =
      !editingId && targetLocationIds.length > 0
        ? targetLocationIds
        : [locationId];

    upsert.mutate({
      id: editingId ?? undefined,
      locationId,
      locationIds: editingId ? undefined : offices,
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
    const offices =
      !weekEdit.id && targetLocationIds.length > 0
        ? targetLocationIds
        : [locationId];
    weekdayUpsert.mutate({
      id: weekEdit.id,
      locationId,
      locationIds: weekEdit.id ? undefined : offices,
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
        subtitle="Set weekday templates (every Sunday, etc.) or publish specific dates. Lunch and dinner cutoffs are per office (Asia/Dhaka)."
      />

      {msg ? (
        <p className="mb-4 rounded-xl bg-leaf/10 px-3 py-2 text-sm text-leaf">
          {msg}
        </p>
      ) : null}

      <div className="mb-6 space-y-3">
        <div className="w-full max-w-md">
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
              className="space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                if (!/^([01]\d|2[0-3]):([0-5]\d)$/.test(lunchCutoffDraft)) {
                  setMsg("Lunch cutoff must be HH:mm (24h)");
                  return;
                }
                if (
                  dinnerEnabled &&
                  !/^([01]\d|2[0-3]):([0-5]\d)$/.test(dinnerCutoffDraft)
                ) {
                  setMsg("Dinner cutoff must be HH:mm (24h)");
                  return;
                }
                setCutoff.mutate({
                  locationId,
                  defaultCutoffTime: lunchCutoffDraft,
                  dinnerCutoffTime: dinnerEnabled
                    ? dinnerCutoffDraft
                    : undefined,
                });
              }}
            >
              <div className="flex flex-wrap items-end gap-2">
                <div className="min-w-0 flex-1 sm:flex-none">
                  <Label>Lunch cutoff (Asia/Dhaka)</Label>
                  <Input
                    type="time"
                    required
                    value={lunchCutoffDraft}
                    onChange={(e) => setLunchCutoffDraft(e.target.value)}
                    className="w-full sm:w-[9.5rem]"
                  />
                </div>
                {dinnerEnabled ? (
                  <div className="min-w-0 flex-1 sm:flex-none">
                    <Label>Dinner cutoff (Asia/Dhaka, 24h)</Label>
                    <Input
                      type="time"
                      required
                      value={dinnerCutoffDraft}
                      onChange={(e) => setDinnerCutoffDraft(e.target.value)}
                      className="w-full sm:w-[9.5rem]"
                    />
                  </div>
                ) : null}
                <Button
                  type="submit"
                  variant="secondary"
                  disabled={
                    setCutoff.isPending ||
                    (lunchCutoffDraft === selectedLoc?.defaultCutoffTime &&
                      (!dinnerEnabled ||
                        dinnerCutoffDraft ===
                          (selectedLoc?.dinnerCutoffTime ??
                            selectedLoc?.defaultCutoffTime)))
                  }
                >
                  {setCutoff.isPending ? "Saving…" : "Save cutoffs"}
                </Button>
              </div>
              {dinnerEnabled &&
              /^([01]\d|2[0-3]):([0-5]\d)$/.test(lunchCutoffDraft) &&
              /^([01]\d|2[0-3]):([0-5]\d)$/.test(dinnerCutoffDraft) &&
              dinnerCutoffDraft < lunchCutoffDraft ? (
                <p className="text-xs text-spice">
                  Dinner {dinnerCutoffDraft} is earlier than lunch — that usually
                  means a 12h mistake. Evening 6 PM is{" "}
                  <strong className="text-ink">18:00</strong>, not 06:00. After
                  midnight the calendar day always flips; yesterday never stays
                  open.
                </p>
              ) : dinnerEnabled ? (
                <p className="text-xs text-ink-muted">
                  24-hour time (evening 6 PM ={" "}
                  <strong className="text-ink">18:00</strong>). After midnight
                  Dhaka time, yesterday&apos;s meals are gone.
                </p>
              ) : null}
            </form>
            <label className="flex cursor-pointer items-center gap-2.5 rounded-2xl bg-sand/60 px-3.5 py-2.5 text-sm">
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
          . They repeat every matching day. Everyone picks one option. Highlighted
          day is what employees order for now
          {selectedLoc?.dinnerEnabled || dinnerEnabled
            ? orderWindow.rolledOver
              ? ` (after dinner cutoff ${orderWindow.cutoffTime} — next day)`
              : ` (dinner open until ${orderWindow.cutoffTime}; lunch still closes at lunch cutoff)`
            : orderWindow.rolledOver
              ? ` (after ${orderWindow.cutoffTime} — tomorrow)`
              : ` (before ${orderWindow.cutoffTime} — today)`}
          .
        </p>

        {(locations.data?.filter((l) => l.isActive).length ?? 0) > 1 &&
        (weekdayMenus.data?.length ?? 0) > 0 ? (
          <div className="mb-4">
            {!showCopyWeek ? (
              // <Button
              //   type="button"
              //   variant="secondary"
              //   onClick={() => {
              //     const others = allActiveLocationIds().filter(
              //       (id) => id !== locationId,
              //     );
              //     setCopyTargetIds(others);
              //     setShowCopyWeek(true);
              //   }}
              // >
              //   Copy this office&apos;s week to other offices…
              // </Button>
              <></>
            ) : (
              <Panel className="space-y-3">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="font-display text-base font-semibold">
                      Copy existing weekly menu
                    </h3>
                    <p className="text-xs text-ink-muted">
                      Pushes every weekday option from{" "}
                      <strong className="text-ink">
                        {selectedLoc?.name ?? "this office"}
                      </strong>{" "}
                      onto the offices below (skips duplicates). Also fills in
                      today&apos;s order day at those offices.
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setShowCopyWeek(false)}
                  >
                    Close
                  </Button>
                </div>
                <OfficeTargets
                  locations={(locations.data ?? []).filter(
                    (l) => l.id !== locationId,
                  )}
                  selectedIds={copyTargetIds}
                  onChange={setCopyTargetIds}
                />
                <Button
                  type="button"
                  disabled={
                    weekdayCopy.isPending || copyTargetIds.length === 0
                  }
                  onClick={() => {
                    if (!locationId || copyTargetIds.length === 0) return;
                    weekdayCopy.mutate({
                      sourceLocationId: locationId,
                      locationIds: copyTargetIds,
                    });
                  }}
                >
                  {weekdayCopy.isPending
                    ? "Copying…"
                    : `Copy week to ${copyTargetIds.length} office${copyTargetIds.length === 1 ? "" : "s"}`}
                </Button>
              </Panel>
            )}
          </div>
        ) : null}

        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
          {WEEKDAYS.map((day) => {
            const isActiveOrderDay = day === activeOrderWeekday;
            return (
              <Panel
                key={day}
                className={`p-3 ${
                  isActiveOrderDay
                    ? "!border-2 !border-leaf bg-leaf/10"
                    : ""
                }`}
              >
                <div className="mb-2 flex flex-col items-center gap-1.5">
                  <p
                    className={`text-xs font-bold uppercase tracking-wide ${
                      isActiveOrderDay ? "text-leaf" : "text-ink-muted"
                    }`}
                  >
                    {WEEKDAY_LABELS[day].slice(0, 3)}
                  </p>
                  {isActiveOrderDay ? (
                    <Badge tone="good">
                      {orderWindow.rolledOver ? "Ordering now" : "Today"}
                    </Badge>
                  ) : null}
                </div>
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
                          {meals.map((meal) => {
                            const stockedOut =
                              isActiveOrderDay &&
                              daily.isSuccess &&
                              !liveWeekdayIds.has(meal.id);
                            return (
                              <li
                                key={meal.id}
                                className="flex items-start gap-0.5"
                              >
                                <button
                                  type="button"
                                  onClick={() =>
                                    openWeekEdit(day, slot, meal)
                                  }
                                  className={`min-w-0 flex-1 rounded-lg px-1.5 py-1 text-left transition hover:bg-sand ${
                                    weekEdit?.id === meal.id
                                      ? "bg-leaf/25"
                                      : ""
                                  } ${stockedOut ? "opacity-55" : ""}`}
                                >
                                  <p className="line-clamp-2 text-xs font-semibold text-ink">
                                    {meal.title}
                                  </p>
                                  <p className="text-[10px] text-ink-muted">
                                    {stockedOut
                                      ? "Stocked out"
                                      : formatTaka(meal.price)}
                                  </p>
                                </button>
                                {isActiveOrderDay ? (
                                  <button
                                    type="button"
                                    title={
                                      stockedOut
                                        ? "Already stocked out for today"
                                        : "Stock out for today"
                                    }
                                    aria-label={
                                      stockedOut
                                        ? `${meal.title} already stocked out`
                                        : `Stock out ${meal.title}`
                                    }
                                    disabled={
                                      stockedOut || stockOut.isPending
                                    }
                                    className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-red-500/30 bg-red-600/15 text-red-300 transition hover:bg-red-600/25 disabled:cursor-not-allowed disabled:opacity-40"
                                    onClick={async (e) => {
                                      e.stopPropagation();
                                      if (!locationId || stockedOut) return;
                                      const ok = await confirmAction({
                                        title: `Stock out “${meal.title}”?`,
                                        text: `This hides the option for ${formatMenuDateLabel(orderWindow.orderDate)} only. Existing orders stay — use Stock-out swap on Orders to move them. The weekly template is unchanged.`,
                                        confirmText: "Yes, stock out",
                                      });
                                      if (!ok) return;
                                      stockOut.mutate({
                                        locationId,
                                        weekdayMenuId: meal.id,
                                        date: orderWindow.orderDate,
                                      });
                                    }}
                                  >
                                    <PackageX
                                      className="h-3.5 w-3.5"
                                      strokeWidth={2.25}
                                    />
                                  </button>
                                ) : null}
                              </li>
                            );
                          })}
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

        <div className="mt-4">
          <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="font-display text-base font-semibold">
              Live · {formatMenuDateLabel(orderWindow.orderDate)}
            </h3>
            <p className="text-[11px] text-ink-muted">
              Stock-out hides an option for this day only
            </p>
          </div>
          {daily.isLoading ? (
            <FoodPlateLoader size="inline" label="Loading live meals…" />
          ) : null}
          {!daily.isLoading &&
          (daily.data?.filter((m) => dinnerEnabled || m.slot !== "DINNER")
            .length ?? 0) === 0 ? (
            <Panel className="py-3">
              <p className="text-sm text-ink-muted">
                No live options for this day yet.
              </p>
            </Panel>
          ) : (
            <ul className="space-y-2">
              {daily.data
                ?.filter((m) => dinnerEnabled || m.slot !== "DINNER")
                .map((m) => (
                  <Panel
                    key={m.id}
                    className="flex items-center justify-between gap-3 py-2.5"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-ink">
                        {m.slot}: {m.title}
                      </p>
                      <p className="text-xs text-ink-muted">
                        {formatTaka(m.price)}
                        {m.isPublished ? " · Live" : " · Draft"}
                        {m._count.orders > 0
                          ? ` · ${m._count.orders} order${m._count.orders === 1 ? "" : "s"}`
                          : ""}
                      </p>
                    </div>
                    <button
                      type="button"
                      title="Stock out for today"
                      aria-label={`Stock out ${m.title}`}
                      disabled={stockOut.isPending}
                      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-red-500/30 bg-red-600/15 text-red-300 transition hover:bg-red-600/25 disabled:opacity-50"
                      onClick={async () => {
                        if (!locationId) return;
                        const ok = await confirmAction({
                          title: `Stock out “${m.title}”?`,
                          text: `This hides the option for ${formatMenuDateLabel(orderWindow.orderDate)} only. Existing orders stay — use Stock-out swap on Orders to move them.`,
                          confirmText: "Yes, stock out",
                        });
                        if (!ok) return;
                        stockOut.mutate({
                          locationId,
                          dailyMenuId: m.id,
                          date: orderWindow.orderDate,
                        });
                      }}
                    >
                      <PackageX className="h-4 w-4" strokeWidth={2.25} />
                    </button>
                  </Panel>
                ))}
            </ul>
          )}
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
              {!weekEdit.id ? (
                <OfficeTargets
                  locations={locations.data ?? []}
                  primaryId={locationId}
                  selectedIds={
                    targetLocationIds.length
                      ? targetLocationIds
                      : locationId
                        ? [locationId]
                        : []
                  }
                  onChange={setTargetLocationIds}
                  requireDinner={weekEdit.slot === "DINNER"}
                />
              ) : (
                <>
                  <OfficeTargets
                    locations={(locations.data ?? []).filter(
                      (l) => l.id !== locationId,
                    )}
                    selectedIds={copyTargetIds}
                    onChange={setCopyTargetIds}
                    requireDinner={weekEdit.slot === "DINNER"}
                  />
                  {(locations.data?.filter((l) => l.isActive && l.id !== locationId)
                    .length ?? 0) > 0 ? (
                    <div className="sm:col-span-2">
                      <Button
                        type="button"
                        variant="secondary"
                        disabled={
                          weekdayCopy.isPending ||
                          copyTargetIds.length === 0 ||
                          !weekEdit.id
                        }
                        onClick={() => {
                          if (!locationId || !weekEdit.id) return;
                          const targets =
                            copyTargetIds.length > 0
                              ? copyTargetIds
                              : allActiveLocationIds(
                                  weekEdit.slot === "DINNER",
                                ).filter((id) => id !== locationId);
                          weekdayCopy.mutate({
                            sourceLocationId: locationId,
                            locationIds: targets,
                            weekdayMenuId: weekEdit.id,
                          });
                        }}
                      >
                        {weekdayCopy.isPending
                          ? "Copying…"
                          : "Copy this option to selected offices"}
                      </Button>
                    </div>
                  ) : null}
                </>
              )}
              <div className="flex flex-wrap gap-2 sm:col-span-2">
                <Button type="submit" disabled={weekdayUpsert.isPending}>
                  {weekdayUpsert.isPending
                    ? "Saving…"
                    : weekEdit.id
                      ? "Update option"
                      : targetLocationIds.length > 1
                        ? `Add to ${targetLocationIds.length} offices`
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
      {/* <section>
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

        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h3 className="font-display text-lg font-semibold">
            On {date}
            {selectedLoc ? (
              <span className="text-sm font-normal text-ink-muted">
                {" "}
                · {selectedLoc.name}
              </span>
            ) : null}
          </h3>
          <div className="flex flex-wrap gap-2">
            {(locations.data?.filter((l) => l.isActive).length ?? 0) > 1 &&
            (daily.data?.length ?? 0) > 0 ? (
              <Button
                type="button"
                variant="secondary"
                disabled={dailyCopy.isPending}
                onClick={() => {
                  if (!locationId) return;
                  const targets = allActiveLocationIds().filter(
                    (id) => id !== locationId,
                  );
                  if (targets.length === 0) return;
                  dailyCopy.mutate({
                    sourceLocationId: locationId,
                    locationIds: targets,
                    date,
                  });
                }}
              >
                {dailyCopy.isPending
                  ? "Copying…"
                  : "Copy this day to all offices"}
              </Button>
            ) : null}
            {!showDatedForm ? (
              <Button type="button" variant="secondary" onClick={openDatedAdd}>
                <Plus className="h-4 w-4" />
                Add option
              </Button>
            ) : null}
          </div>
        </div>

        {showDatedForm ? (
          <Panel className="mb-6">
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
                Daily close: lunch {selectedLoc?.defaultCutoffTime ?? "—"}
                {dinnerEnabled
                  ? ` · dinner ${selectedLoc?.dinnerCutoffTime ?? "—"}`
                  : ""}{" "}
                Asia/Dhaka
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
              {!editingId ? (
                <OfficeTargets
                  locations={locations.data ?? []}
                  primaryId={locationId}
                  selectedIds={
                    targetLocationIds.length
                      ? targetLocationIds
                      : locationId
                        ? [locationId]
                        : []
                  }
                  onChange={setTargetLocationIds}
                  requireDinner={form.slot === "DINNER"}
                />
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
                      : targetLocationIds.length > 1
                        ? `Publish to ${targetLocationIds.length} offices`
                        : "Publish"}
                </Button>
                <Button type="button" variant="ghost" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </Panel>
        ) : null}

        <div>
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
                      disabled={deletingDailyId === m.id}
                      onClick={() => {
                        setDeletingDailyId(m.id);
                        deleteDaily.mutate({ id: m.id, locationId });
                      }}
                    >
                      {deletingDailyId === m.id ? "Removing…" : "Remove"}
                    </Button>
                  </div>
                </Panel>
              ))
                : null}
            </ul>
        </div>
      </section> */}

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
