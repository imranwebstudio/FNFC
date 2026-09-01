import { z } from "zod";

/** Strip spaces/dashes for validation and storage. */
export function normalizePhoneNumber(phone: string): string {
  return phone.replace(/[\s-]/g, "").trim();
}

/** Bangladesh mobile: 01XXXXXXXXX or +8801XXXXXXXXX */
export function isValidPhoneNumber(phone: string): boolean {
  const n = normalizePhoneNumber(phone);
  return /^(?:\+?880)?01\d{9}$/.test(n);
}

export function formatPhoneForStorage(phone: string): string {
  const n = normalizePhoneNumber(phone);
  if (n.startsWith("+880")) return n;
  if (n.startsWith("880")) return `+${n}`;
  if (n.startsWith("01")) return n;
  return n;
}

export const phoneNumberSchema = z
  .string()
  .min(1, "Phone number is required")
  .max(20)
  .refine((v) => isValidPhoneNumber(v), {
    message: "Enter a valid Bangladesh mobile number (e.g. 01712345678)",
  });

export function parsePhoneForStorage(input: string): string {
  return formatPhoneForStorage(normalizePhoneNumber(input));
}
