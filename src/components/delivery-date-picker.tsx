"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

import { formatMenuDateLabel } from "~/lib/datetime";

function parseYmd(ymd: string): Date {
  const [y, m, d] = ymd.split("-").map(Number);
  return new Date(y!, (m ?? 1) - 1, d ?? 1);
}

function toYmd(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function DeliveryDatePicker({
  value,
  min,
  max,
  badgeDay,
  badgeMon,
  open,
  onOpenChange,
  onChange,
}: {
  value?: string;
  min?: string;
  max?: string;
  badgeDay: string;
  badgeMon: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onChange: (ymd: string) => void;
}) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(
    null,
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useLayoutEffect(() => {
    if (!open || !triggerRef.current) return;
    function place() {
      const rect = triggerRef.current!.getBoundingClientRect();
      const width = 300;
      const left = Math.min(
        Math.max(12, rect.right - width),
        window.innerWidth - width - 12,
      );
      const top = rect.bottom + 8;
      setCoords({ top, left });
    }
    place();
    window.addEventListener("resize", place);
    window.addEventListener("scroll", place, true);
    return () => {
      window.removeEventListener("resize", place);
      window.removeEventListener("scroll", place, true);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) {
      const t = e.target as Node;
      if (triggerRef.current?.contains(t)) return;
      if (popoverRef.current?.contains(t)) return;
      onOpenChange(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onOpenChange(false);
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onOpenChange]);

  const selected = value ? parseYmd(value) : undefined;
  const fromDate = min ? parseYmd(min) : undefined;
  const toDate = max ? parseYmd(max) : undefined;

  const popover =
    open && coords && mounted
      ? createPortal(
          <AnimatePresence>
            <motion.div
              ref={popoverRef}
              initial={{ opacity: 0, y: 6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.98 }}
              transition={{ duration: 0.16 }}
              style={{ top: coords.top, left: coords.left }}
              className="delivery-day-picker fixed z-[80] w-[300px] rounded-2xl border border-leaf/25 bg-rice p-3 shadow-[0_24px_60px_rgba(0,0,0,0.55)]"
            >
              <p className="mb-1 px-1 text-[11px] font-semibold uppercase tracking-wide text-ink-muted">
                Delivery date
              </p>
              <DayPicker
                mode="single"
                selected={selected}
                defaultMonth={selected}
                onSelect={(day) => {
                  if (!day) return;
                  onChange(toYmd(day));
                  onOpenChange(false);
                }}
                disabled={[
                  ...(fromDate ? [{ before: fromDate }] : []),
                  ...(toDate ? [{ after: toDate }] : []),
                ]}
                showOutsideDays
                components={{
                  Chevron: ({ orientation, ...props }) =>
                    orientation === "left" ? (
                      <ChevronLeft
                        {...props}
                        className="h-4 w-4"
                        strokeWidth={2.25}
                      />
                    ) : (
                      <ChevronRight
                        {...props}
                        className="h-4 w-4"
                        strokeWidth={2.25}
                      />
                    ),
                }}
              />
              {value ? (
                <p className="mt-1 border-t border-line/60 pt-2 text-center text-xs text-ink-muted">
                  Selected{" "}
                  <span className="font-semibold text-leaf">
                    {formatMenuDateLabel(value)}
                  </span>
                </p>
              ) : null}
            </motion.div>
          </AnimatePresence>,
          document.body,
        )
      : null;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => onOpenChange(!open)}
        title="Change delivery date"
        aria-label="Change delivery date"
        aria-expanded={open}
        className={`flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl border text-center transition ${
          open
            ? "border-leaf bg-leaf/15"
            : "border-leaf/35 bg-rice hover:border-leaf hover:bg-leaf/10"
        }`}
      >
        <span className="text-base font-bold leading-none tabular-nums text-ink">
          {badgeDay}
        </span>
        <span className="mt-0.5 text-[9px] font-bold uppercase tracking-wide text-ink-muted">
          {badgeMon}
        </span>
      </button>
      {popover}
    </>
  );
}
