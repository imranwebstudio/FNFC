import Swal from "sweetalert2";

const baseOptions = {
  background: "#1a2421",
  color: "#eef3f0",
  confirmButtonColor: "#dc2626",
  cancelButtonColor: "#2a3732",
  reverseButtons: true,
  focusCancel: true,
} as const;

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
