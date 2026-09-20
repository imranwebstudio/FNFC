import { formatInTimeZone, fromZonedTime } from "date-fns-tz";
import { addDays, differenceInCalendarDays, parseISO } from "date-fns";
import { APP_TIMEZONE } from "~/lib/constants";

/** Fallback when a location has no cutoff set */
export const DEFAULT_CUTOFF_TIME = "14:00";
export const DEFAULT_DINNER_CUTOFF_TIME = "20:00";
/** @deprecated use DEFAULT_CUTOFF_TIME */
export const ORDER_ROLLOVER_TIME = DEFAULT_CUTOFF_TIME;
export const ORDER_ROLLOVER_HOUR = 14;

const CUTOFF_HM = /^([01]\d|2[0-3]):([0-5]\d)$/;

export function normalizeCutoffTime(hhmm: string | null | undefined): string {
  if (hhmm && CUTOFF_HM.test(hhmm)) return hhmm;
  return DEFAULT_CUTOFF_TIME;
}

export function normalizeDinnerCutoffTime(
  hhmm: string | null | undefined,
): string {
  if (hhmm && CUTOFF_HM.test(hhmm)) return hhmm;
  return DEFAULT_DINNER_CUTOFF_TIME;
}

/** Lunch vs dinner cutoff for a location */
export function locationCutoffForSlot(
  location: {
    defaultCutoffTime: string;
    dinnerCutoffTime?: string | null;
  },
  slot: "LUNCH" | "DINNER",
): string {
  if (slot === "DINNER") {
    return normalizeDinnerCutoffTime(
      location.dinnerCutoffTime ?? location.defaultCutoffTime,
    );
  }
  return normalizeCutoffTime(location.defaultCutoffTime);
}

function cutoffHourMinute(hhmm: string): { hour: number; minute: number } {
  const normalized = normalizeCutoffTime(hhmm);
  const [h, m] = normalized.split(":").map(Number);
  return { hour: h ?? ORDER_ROLLOVER_HOUR, minute: m ?? 0 };
}

function toMinutes(hhmm: string): number {
  const { hour, minute } = cutoffHourMinute(hhmm);
  return hour * 60 + minute;
}

/**
 * Dinner closes next calendar morning when its HH:mm is earlier than lunch
 * (e.g. lunch 11:59, dinner 06:00 → Sunday dinner stays open until Monday 06:00).
 */
export function isOvernightDinnerCutoff(
  lunchHm: string,
  dinnerHm: string,
): boolean {
  return (
    toMinutes(normalizeDinnerCutoffTime(dinnerHm)) <
    toMinutes(normalizeCutoffTime(lunchHm))
  );
}

export type LocationCutoffs = {
  defaultCutoffTime: string;
  dinnerCutoffTime?: string | null;
  dinnerEnabled?: boolean | null;
};

/**
 * Menu calendar date employees may order for a given slot right now.
 * Lunch rolls at lunch cutoff; dinner rolls at dinner cutoff (overnight-aware).
 */
export function orderableDateForSlot(
  now: Date,
  opts: LocationCutoffs & { slot: "LUNCH" | "DINNER" },
): string {
  const lunchHm = normalizeCutoffTime(opts.defaultCutoffTime);
  if (opts.slot === "LUNCH" || !opts.dinnerEnabled) {
    return orderableDateString(now, lunchHm);
  }

  const dinnerHm = normalizeDinnerCutoffTime(opts.dinnerCutoffTime);
  const today = todayDateString(now);

  if (isOvernightDinnerCutoff(lunchHm, dinnerHm)) {
    const nowM =
      Number(formatInTimeZone(now, APP_TIMEZONE, "H")) * 60 +
      Number(formatInTimeZone(now, APP_TIMEZONE, "m"));
    // Early morning before overnight close → still previous service day's dinner
    if (nowM < toMinutes(dinnerHm)) {
      return addDaysToDateString(today, -1);
    }
    return today;
  }

  return orderableDateString(now, dinnerHm);
}

/**
 * Absolute order-close instant for a menu on its service date.
 * Overnight dinner on date D closes at dinnerCutoff on D+1.
 */
export function slotCutoffAt(
  menuDateStr: string,
  slot: "LUNCH" | "DINNER",
  location: LocationCutoffs,
): Date {
  const lunchHm = normalizeCutoffTime(location.defaultCutoffTime);
  if (slot === "LUNCH") {
    return cutoffFromTime(menuDateStr, lunchHm);
  }
  const dinnerHm = normalizeDinnerCutoffTime(
    location.dinnerCutoffTime ?? location.defaultCutoffTime,
  );
  if (isOvernightDinnerCutoff(lunchHm, dinnerHm)) {
    return cutoffFromTime(addDaysToDateString(menuDateStr, 1), dinnerHm);
  }
  return cutoffFromTime(menuDateStr, dinnerHm);
}

/**
 * Service day for "Ordering now" / employee banner.
 * With dinner enabled, the day does not jump until dinner cutoff (not lunch).
 */
export function getServiceOrderWindow(
  now: Date,
  location: LocationCutoffs,
) {
  const lunchHm = normalizeCutoffTime(location.defaultCutoffTime);
  if (!location.dinnerEnabled) {
    return getOrderWindow(now, lunchHm);
  }

  const dinnerHm = normalizeDinnerCutoffTime(location.dinnerCutoffTime);
  const calendarToday = todayDateString(now);
  const orderDate = orderableDateForSlot(now, {
    ...location,
    defaultCutoffTime: lunchHm,
    dinnerCutoffTime: dinnerHm,
    dinnerEnabled: true,
    slot: "DINNER",
  });
  const rolledOver = orderDate !== calendarToday;
  const cutoffAt = slotCutoffAt(orderDate, "DINNER", {
    defaultCutoffTime: lunchHm,
    dinnerCutoffTime: dinnerHm,
    dinnerEnabled: true,
  });
  const { hour } = cutoffHourMinute(dinnerHm);
  return {
    calendarToday,
    orderDate,
    rolledOver,
    cutoffAt,
    cutoffTime: dinnerHm,
    rolloverHour: hour,
  };
}

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
 * Date employees order for: today before location cutoff (Dhaka), tomorrow after.
 */
export function orderableDateString(
  now = new Date(),
  cutoffHm: string = DEFAULT_CUTOFF_TIME,
): string {
  const { hour: cutoffH, minute: cutoffM } = cutoffHourMinute(cutoffHm);
  const hour = Number(formatInTimeZone(now, APP_TIMEZONE, "H"));
  const minute = Number(formatInTimeZone(now, APP_TIMEZONE, "m"));
  const today = todayDateString(now);
  const pastCutoff =
    hour > cutoffH || (hour === cutoffH && minute >= cutoffM);
  if (pastCutoff) {
    return addDaysToDateString(today, 1);
  }
  return today;
}

export function getOrderWindow(
  now = new Date(),
  cutoffHm: string = DEFAULT_CUTOFF_TIME,
) {
  const cutoffTime = normalizeCutoffTime(cutoffHm);
  const calendarToday = todayDateString(now);
  const orderDate = orderableDateString(now, cutoffTime);
  const rolledOver = orderDate !== calendarToday;
  const cutoffAt = cutoffFromTime(calendarToday, cutoffTime);
  const { hour } = cutoffHourMinute(cutoffTime);
  return {
    calendarToday,
    orderDate,
    rolledOver,
    cutoffAt,
    cutoffTime,
    rolloverHour: hour,
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
  const cutoffTime = normalizeCutoffTime(hhmm);
  const [h, m] = cutoffTime.split(":").map((n) => Number(n));
  const hours = Number.isFinite(h) ? h! : ORDER_ROLLOVER_HOUR;
  const mins = Number.isFinite(m) ? m! : 0;
  const padded = `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
  return fromZonedTime(`${dateStr}T${padded}:00`, APP_TIMEZONE);
}

/** Archive / order-close time for a menu day at the given location cutoff */
export function dayArchiveAt(
  dateStr: string,
  cutoffHm: string = DEFAULT_CUTOFF_TIME,
): Date {
  return cutoffFromTime(dateStr, cutoffHm);
}

export function formatTaka(amount: number): string {
  return `৳${amount.toLocaleString("en-BD")}`;
}

export function dueFromBalance(balance: number): number {
  return Math.max(0, -balance);
}

export function formatBalanceLabel(balance: number): {
  text: string;
  isDue: boolean;
} {
  if (balance < 0) {
    return { text: `Due ${formatTaka(-balance)}`, isDue: true };
  }
  return { text: formatTaka(balance), isDue: false };
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
