"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { Combobox } from "~/components/combobox";
import { Button, Label, Select } from "~/components/ui";
import { showSuccess } from "~/lib/swal";
import { api } from "~/trpc/react";

export type ProfileFormValues = {
  employeeId: string;
  phoneNumber: string;
  deskNumber: string;
  /** Active Staff location id — also becomes catering zone */
  locationId: string;
  floorNumber: string;
  locationName: string;
  /** Legacy building label — used only to pre-select office if locationId is empty */
  buildingNumber?: string;
};

export function ProfileForm({
  initial,
  submitLabel,
  onSuccess,
}: {
  initial?: Partial<ProfileFormValues>;
  submitLabel: string;
  onSuccess?: () => void;
}) {
  const { update } = useSession();
  const options = api.user.onboardingOptions.useQuery();
  const staffLocations = api.user.listLocationsPublic.useQuery();
  const utils = api.useUtils();
  const save = api.user.completeProfile.useMutation({
    onSuccess: async () => {
      showSuccess("Profile saved", "Your details were updated successfully.");
      await update();
      await Promise.all([
        utils.user.me.invalidate(),
        utils.menu.todayForUser.invalidate(),
      ]);
      onSuccess?.();
    },
  });

  const [form, setForm] = useState<ProfileFormValues>({
    employeeId: initial?.employeeId ?? "",
    phoneNumber: initial?.phoneNumber ?? "",
    deskNumber: initial?.deskNumber ?? "",
    locationId: initial?.locationId ?? "",
    floorNumber: initial?.floorNumber ?? "",
    locationName: initial?.locationName ?? "",
  });

  useEffect(() => {
    if (!initial) return;
    setForm({
      employeeId: initial.employeeId ?? "",
      phoneNumber: initial.phoneNumber ?? "",
      deskNumber: initial.deskNumber ?? "",
      locationId: initial.locationId ?? "",
      floorNumber: initial.floorNumber ?? "",
      locationName: initial.locationName ?? "",
    });
  }, [
    initial?.employeeId,
    initial?.phoneNumber,
    initial?.deskNumber,
    initial?.locationId,
    initial?.floorNumber,
    initial?.locationName,
  ]);

  // Pre-select office when zone was never set but building name matches a Staff location.
  useEffect(() => {
    if (form.locationId || !staffLocations.data?.length) return;
    const hint = initial?.buildingNumber?.trim();
    if (!hint) return;
    const match = staffLocations.data.find(
      (l) => l.name.toLowerCase() === hint.toLowerCase(),
    );
    if (match) {
      setForm((f) => (f.locationId ? f : { ...f, locationId: match.id }));
    }
  }, [form.locationId, staffLocations.data, initial?.buildingNumber]);

  const selectedOffice = staffLocations.data?.find(
    (l) => l.id === form.locationId,
  );

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        save.mutate(form);
      }}
    >
      <Combobox
        id="employeeId"
        label="Employee ID"
        required
        placeholder="e.g. EMP-1042"
        value={form.employeeId}
        options={options.data?.employeeIds ?? []}
        onChange={(employeeId) => setForm((f) => ({ ...f, employeeId }))}
      />
      <Combobox
        id="phoneNumber"
        label="Phone number"
        required
        placeholder="e.g. 01712345678"
        value={form.phoneNumber}
        options={options.data?.phoneNumbers ?? []}
        allowCustomHint="Bkash number is preferred (01XXXXXXXXX)."
        onChange={(phoneNumber) => setForm((f) => ({ ...f, phoneNumber }))}
      />
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="building">Office / Building</Label>
          <Select
            id="building"
            required
            value={form.locationId}
            disabled={staffLocations.isLoading}
            onChange={(e) =>
              setForm((f) => ({ ...f, locationId: e.target.value }))
            }
          >
            <option value="">
              {staffLocations.isLoading ? "Loading…" : "Select office…"}
            </option>
            {staffLocations.data?.map((l) => (
              <option key={l.id} value={l.id}>
                {l.name}
              </option>
            ))}
          </Select>
          <p className="mt-1 text-[11px] text-ink-muted">
            This also sets your catering zone for menus and orders.
          </p>
        </div>
        <Combobox
          id="floor"
          label="Floor"
          required
          placeholder="e.g. 5"
          value={form.floorNumber}
          options={options.data?.floorNumbers ?? []}
          onChange={(floorNumber) => setForm((f) => ({ ...f, floorNumber }))}
        />
      </div>
      <Combobox
        id="desk"
        label="Desk number"
        required
        placeholder="e.g. D-12"
        value={form.deskNumber}
        options={options.data?.deskNumbers ?? []}
        onChange={(deskNumber) => setForm((f) => ({ ...f, deskNumber }))}
      />
      <Combobox
        id="location"
        label="Address"
        required
        placeholder="e.g. Ambon Complex, Dhaka 1212"
        value={form.locationName}
        options={options.data?.locations ?? []}
        allowCustomHint="Full address or landmark for delivery."
        onChange={(locationName) => setForm((f) => ({ ...f, locationName }))}
      />
      {save.error ? (
        <p className="text-sm text-red-700">{save.error.message}</p>
      ) : null}
      <Button type="submit" disabled={save.isPending} className="w-full">
        {save.isPending ? "Saving…" : submitLabel}
      </Button>
      {selectedOffice ? (
        <p className="text-xs text-ink-muted">
          Catering zone:{" "}
          <span className="font-semibold text-ink">{selectedOffice.name}</span>
        </p>
      ) : null}
    </form>
  );
}
