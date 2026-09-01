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
