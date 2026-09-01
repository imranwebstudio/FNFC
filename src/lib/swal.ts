import Swal from "sweetalert2";

import { isValidPhoneNumber } from "~/lib/phone";

const baseOptions = {
  background: "#1a2421",
  color: "#eef3f0",
  confirmButtonColor: "#dc2626",
  cancelButtonColor: "#2a3732",
  reverseButtons: true,
  focusCancel: true,
} as const;

const successToast = Swal.mixin({
  toast: true,
  position: "top-end",
  icon: "success",
  background: "#1a2421",
  color: "#eef3f0",
  showConfirmButton: false,
  timer: 3200,
  timerProgressBar: true,
});

/** Toast-style success alert for API actions */
export function showSuccess(title: string, text?: string) {
  void successToast.fire({ title, text });
}

export async function confirmAction(options: {
  title: string;
  text: string;
  confirmText?: string;
  cancelText?: string;
}): Promise<boolean> {
  const result = await Swal.fire({
    ...baseOptions,
    title: options.title,
    text: options.text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: options.confirmText ?? "Yes, continue",
    cancelButtonText: options.cancelText ?? "Cancel",
  });

  return result.isConfirmed;
}

export async function promptBalanceEdit(options: {
  title: string;
  text: string;
  currentBalance: number;
}): Promise<number | null> {
  const result = await Swal.fire({
    ...baseOptions,
    title: options.title,
    text: options.text,
    icon: "question",
    input: "number",
    inputValue: options.currentBalance,
    inputLabel: "New balance (৳)",
    inputAttributes: {
      step: "1",
    },
    showCancelButton: true,
    confirmButtonText: "Save balance",
    cancelButtonText: "Cancel",
    confirmButtonColor: "#2dd4bf",
    preConfirm: (value) => {
      if (value === "" || value === null) {
        Swal.showValidationMessage("Enter a balance amount");
        return;
      }
      const parsed = Number(value);
      if (!Number.isFinite(parsed) || !Number.isInteger(parsed)) {
        Swal.showValidationMessage("Balance must be a whole number");
        return;
      }
      return parsed;
    },
  });

  if (!result.isConfirmed || typeof result.value !== "number") {
    return null;
  }

  return result.value;
}

export async function promptPhoneEdit(options: {
  title: string;
  text: string;
  currentPhone?: string;
}): Promise<string | null> {
  const result = await Swal.fire({
    ...baseOptions,
    title: options.title,
    text: options.text,
    icon: "question",
    input: "tel",
    inputValue: options.currentPhone ?? "",
    inputLabel: "Phone number",
    inputPlaceholder: "01712345678",
    showCancelButton: true,
    confirmButtonText: "Save phone",
    cancelButtonText: "Cancel",
    confirmButtonColor: "#2dd4bf",
    preConfirm: (value) => {
      if (value === "" || value === null) {
        Swal.showValidationMessage("Enter a phone number");
        return;
      }
      const trimmed = String(value).trim();
      if (!isValidPhoneNumber(trimmed)) {
        Swal.showValidationMessage(
          "Enter a valid Bangladesh mobile number (e.g. 01712345678)",
        );
        return;
      }
      return trimmed;
    },
  });

  if (!result.isConfirmed || typeof result.value !== "string") {
    return null;
  }

  return result.value;
}
