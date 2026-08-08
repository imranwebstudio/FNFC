import { formatInTimeZone, fromZonedTime } from "date-fns-tz";
import { APP_TIMEZONE } from "~/lib/constants";

/** Today's calendar date string YYYY-MM-DD in Asia/Dhaka */
export function todayDateString(now = new Date()): string {
  return formatInTimeZone(now, APP_TIMEZONE, "yyyy-MM-dd");
}

/** Calendar date for Prisma @db.Date (UTC noon avoids timezone day-shift bugs) */
export function dhakaDateOnly(dateStr: string): Date {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(Date.UTC(y!, m! - 1, d!, 12, 0, 0));
}

/**
 * Build cutoff DateTime from a calendar date (YYYY-MM-DD) and "HH:mm" in Dhaka.
 */
export function cutoffFromTime(dateStr: string, hhmm: string): Date {
  const [h, m] = hhmm.split(":").map((n) => Number(n));
  const hours = Number.isFinite(h) ? h! : 11;
  const mins = Number.isFinite(m) ? m! : 0;
  const padded = `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
  return fromZonedTime(`${dateStr}T${padded}:00`, APP_TIMEZONE);
}

export function formatTaka(amount: number): string {
  return `৳${amount.toLocaleString("en-BD")}`;
}

export function dueFromBalance(balance: number): number {
  return Math.max(0, -balance);
}

/** Format a Date as HH:mm in Asia/Dhaka (for cutoff inputs) */
export function formatCutoffHm(date: Date | string | null | undefined): string {
  if (!date) return "";
  return formatInTimeZone(new Date(date), APP_TIMEZONE, "HH:mm");
}
