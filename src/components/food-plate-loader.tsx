"use client";

import { motion } from "framer-motion";

type FoodPlateLoaderProps = {
  label?: string;
  /** full = centered page area; inline = compact for panels / forms */
  size?: "full" | "inline" | "sm";
  className?: string;
};

function PlateArt({ scale }: { scale: number }) {
  return (
    <div
      className="relative mx-auto"
      style={{ width: 120 * scale, height: 120 * scale }}
      aria-hidden
    >
      {/* Soft glow */}
      <motion.div
        className="absolute inset-[18%] rounded-full bg-leaf/20 blur-xl"
        animate={{ opacity: [0.35, 0.7, 0.35], scale: [0.95, 1.08, 0.95] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Plate rim */}
      <motion.div
        className="absolute inset-0 rounded-full border-[3px] border-line/80 bg-gradient-to-b from-sand to-rice shadow-[0_12px_40px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.06)]"
        animate={{ rotate: [0, 2, 0, -2, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Inner plate well */}
        <div className="absolute inset-[12%] rounded-full border border-line/60 bg-gradient-to-br from-[#1f2b27] to-[#0c1210]" />

        {/* Curry / meal mound */}
        <motion.div
          className="absolute left-1/2 top-[38%] h-[28%] w-[42%] -translate-x-1/2 rounded-[45%] bg-gradient-to-br from-spice to-spice-deep shadow-[0_4px_12px_rgba(255,122,69,0.35)]"
          animate={{ scale: [1, 1.04, 1], y: [0, -1, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Rice */}
        <div className="absolute left-[28%] top-[48%] h-[18%] w-[22%] rounded-[40%] bg-ink/90 opacity-90" />
        <div className="absolute right-[26%] top-[50%] h-[14%] w-[18%] rounded-[40%] bg-ink/80 opacity-80" />
        {/* Greens / salad accent */}
        <div className="absolute bottom-[28%] left-[38%] h-[10%] w-[24%] rounded-full bg-leaf/70" />
      </motion.div>

      {/* Steam */}
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="absolute left-1/2 top-[12%] h-5 w-1 -translate-x-1/2 rounded-full bg-leaf-deep/40"
          style={{ marginLeft: (i - 1) * 10 * scale }}
          animate={{
            y: [0, -18 * scale, -28 * scale],
            opacity: [0, 0.7, 0],
            scaleX: [1, 1.4, 0.6],
          }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            delay: i * 0.35,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Fork */}
      <motion.div
        className="absolute -left-[6%] top-[22%] origin-bottom"
        style={{ width: 14 * scale, height: 56 * scale }}
        animate={{ rotate: [-18, -8, -18] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="mx-auto flex h-[38%] w-full justify-center gap-[2px]">
          <span className="h-full w-[2px] rounded-full bg-leaf/80" />
          <span className="h-full w-[2px] rounded-full bg-leaf/80" />
          <span className="h-full w-[2px] rounded-full bg-leaf/80" />
        </div>
        <div className="mx-auto mt-[2px] h-[58%] w-[3px] rounded-full bg-leaf/70" />
      </motion.div>

      {/* Knife */}
      <motion.div
        className="absolute -right-[4%] top-[20%] origin-bottom"
        style={{ width: 10 * scale, height: 56 * scale }}
        animate={{ rotate: [18, 8, 18] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="mx-auto h-[42%] w-[5px] rounded-t-full bg-gradient-to-b from-ink to-leaf/50" />
        <div className="mx-auto mt-[2px] h-[52%] w-[3px] rounded-full bg-leaf/70" />
      </motion.div>
    </div>
  );
}

export function FoodPlateLoader({
  label = "Serving up…",
  size = "full",
  className = "",
}: FoodPlateLoaderProps) {
  const scale = size === "sm" ? 0.55 : size === "inline" ? 0.75 : 1;
  const padding =
    size === "full"
      ? "min-h-[220px] py-12"
      : size === "inline"
        ? "py-8"
        : "py-4";

  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className={`flex flex-col items-center justify-center gap-4 ${padding} ${className}`}
    >
      <PlateArt scale={scale} />
      <motion.p
        className={`font-medium text-ink-muted ${
          size === "sm" ? "text-xs" : "text-sm"
        }`}
        animate={{ opacity: [0.45, 1, 0.45] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        {label}
      </motion.p>
      <span className="sr-only">Loading</span>
    </div>
  );
}

/** Route-level fallback for Next.js loading.tsx (no client props needed). */
export function FoodPlateLoaderPage({ label }: { label?: string }) {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <FoodPlateLoader label={label ?? "Plating your lunch…"} size="full" />
    </div>
  );
}
