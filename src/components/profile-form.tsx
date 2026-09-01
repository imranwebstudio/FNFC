"use client";

import { useEffect, useState } from "react";

import { Combobox } from "~/components/combobox";
import { Button } from "~/components/ui";
import { showSuccess } from "~/lib/swal";
import { api } from "~/trpc/react";

export type ProfileFormValues = {
  employeeId: string;
  phoneNumber: string;
  deskNumber: string;
  buildingNumber: string;
  floorNumber: string;
  locationName: string;
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
  const options = api.user.onboardingOptions.useQuery();
  const utils = api.useUtils();
  const save = api.user.completeProfile.useMutation({
    onSuccess: async () => {
      showSuccess("Profile saved", "Your details were updated successfully.");
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
    buildingNumber: initial?.buildingNumber ?? "",
    floorNumber: initial?.floorNumber ?? "",
    locationName: initial?.locationName ?? "",
  });

  useEffect(() => {
    if (!initial) return;
    setForm({
      employeeId: initial.employeeId ?? "",
      phoneNumber: initial.phoneNumber ?? "",
      deskNumber: initial.deskNumber ?? "",
      buildingNumber: initial.buildingNumber ?? "",
      floorNumber: initial.floorNumber ?? "",
      locationName: initial.locationName ?? "",
    });
  }, [
    initial?.employeeId,
    initial?.phoneNumber,
    initial?.deskNumber,
    initial?.buildingNumber,
    initial?.floorNumber,
    initial?.locationName,
  ]);

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
        <Combobox
          id="building"
          label="Building"
          required
          placeholder="e.g. Tower A"
          value={form.buildingNumber}
          options={options.data?.buildingNumbers ?? []}
          onChange={(buildingNumber) =>
            setForm((f) => ({ ...f, buildingNumber }))
          }
        />
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
        label="Office location"
        required
        placeholder="e.g. Gulshan Office"
        value={form.locationName}
        options={options.data?.locations ?? []}
        allowCustomHint="New office? Type the name — we’ll add it."
        onChange={(locationName) => setForm((f) => ({ ...f, locationName }))}
      />
      {save.error ? (
        <p className="text-sm text-red-700">{save.error.message}</p>
      ) : null}
      <Button type="submit" disabled={save.isPending} className="w-full">
        {save.isPending ? "Saving…" : submitLabel}
      </Button>
    </form>
  );
}
