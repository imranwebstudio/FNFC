import { formatInTimeZone, fromZonedTime } from "date-fns-tz";
import { addDays, differenceInCalendarDays, parseISO } from "date-fns";
import { APP_TIMEZONE } from "~/lib/constants";

/** After this hour (Asia/Dhaka), today's lunch is archived; orders target the next day */
export const ORDER_ROLLOVER_HOUR = 14;
export const ORDER_ROLLOVER_TIME = `${String(ORDER_ROLLOVER_HOUR).padStart(2, "0")}:00`;

/** BD week order for admin UI */
export const WEEKDAYS = [
  "SAT",
  "SUN",
  "MON",
  "TUE",
  "WED",
  "THU",
  "FRI",
] as const;

export type WeekdayCode = (typeof WEEKDAYS)[number];

export const WEEKDAY_LABELS: Record<WeekdayCode, string> = {
  SAT: "Saturday",
  SUN: "Sunday",
  MON: "Monday",
  TUE: "Tuesday",
  WED: "Wednesday",
  THU: "Thursday",
  FRI: "Friday",
};

const EEE_TO_WEEKDAY: Record<string, WeekdayCode> = {
  Sat: "SAT",
  Sun: "SUN",
  Mon: "MON",
  Tue: "TUE",
  Wed: "WED",
  Thu: "THU",
  Fri: "FRI",
};

/** Weekday for a YYYY-MM-DD calendar date in Asia/Dhaka */
export function weekdayFromDateString(dateStr: string): WeekdayCode {
  const [y, m, d] = dateStr.split("-").map(Number);
  const utcNoon = new Date(Date.UTC(y!, m! - 1, d!, 12, 0, 0));
  // Date is calendar day; use UTC weekday of that calendar date
  const eee = formatInTimeZone(utcNoon, "UTC", "EEE");
  const code = EEE_TO_WEEKDAY[eee];
  if (!code) throw new Error(`Unknown weekday for ${dateStr}`);
  return code;
}

/** Today's calendar date string YYYY-MM-DD in Asia/Dhaka */
export function todayDateString(now = new Date()): string {
  return formatInTimeZone(now, APP_TIMEZONE, "yyyy-MM-dd");
}

export function addDaysToDateString(dateStr: string, days: number): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  const base = new Date(Date.UTC(y!, m! - 1, d!, 12, 0, 0));
  const next = addDays(base, days);
  return formatInTimeZone(next, "UTC", "yyyy-MM-dd");
}

/**
 * Date employees order for: today before 14:00 Dhaka, tomorrow after.
 */
export function orderableDateString(now = new Date()): string {
  const hour = Number(formatInTimeZone(now, APP_TIMEZONE, "H"));
  const today = todayDateString(now);
  if (hour >= ORDER_ROLLOVER_HOUR) {
    return addDaysToDateString(today, 1);
  }
  return today;
}

export function getOrderWindow(now = new Date()) {
  const calendarToday = todayDateString(now);
  const orderDate = orderableDateString(now);
  const rolledOver = orderDate !== calendarToday;
  const cutoffAt = cutoffFromTime(calendarToday, ORDER_ROLLOVER_TIME);
  return {
    calendarToday,
    orderDate,
    rolledOver,
    cutoffAt,
    rolloverHour: ORDER_ROLLOVER_HOUR,
  };
}

/** Inclusive list of YYYY-MM-DD from start to end (max 62 days) */
export function enumerateDateRange(start: string, end: string): string[] {
  const startD = parseISO(`${start}T12:00:00`);
  const endD = parseISO(`${end}T12:00:00`);
  if (endD < startD) return [];
  const span = differenceInCalendarDays(endD, startD);
  if (span > 61) {
    throw new Error("Date range cannot exceed 62 days");
  }
  const out: string[] = [];
  for (let i = 0; i <= span; i++) {
    out.push(formatInTimeZone(addDays(startD, i), "UTC", "yyyy-MM-dd"));
  }
  return out;
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
  const hours = Number.isFinite(h) ? h! : ORDER_ROLLOVER_HOUR;
  const mins = Number.isFinite(m) ? m! : 0;
  const padded = `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
  return fromZonedTime(`${dateStr}T${padded}:00`, APP_TIMEZONE);
}

/** Hard archive time for a menu day (14:00 Dhaka that day) */
export function dayArchiveAt(dateStr: string): Date {
  return cutoffFromTime(dateStr, ORDER_ROLLOVER_TIME);
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

export function formatMenuDateLabel(dateStr: string): string {
  const d = parseISO(`${dateStr}T12:00:00`);
  return formatInTimeZone(d, "UTC", "EEE, d MMM");
}
