"use client";

import { Label, Select } from "~/components/ui";

export function FloorFilter({
  value,
  floors,
  onChange,
  disabled,
}: {
  value: string;
  floors: string[];
  onChange: (floor: string) => void;
  disabled?: boolean;
}) {
  return (
    <div>
      <Label>Floor</Label>
      <Select
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">All floors</option>
        {floors.map((floor) => (
          <option key={floor} value={floor}>
            Floor {floor}
          </option>
        ))}
      </Select>
    </div>
  );
}
