import Image from "next/image";

type BrandLogoProps = {
  /** Visual size of the mark */
  size?: "sm" | "md" | "lg" | "hero";
  /** Show app name beside the mark */
  withName?: boolean;
  /** App display name (from getAppName on the server) */
  name?: string;
  /** Name text class overrides */
  nameClassName?: string;
  className?: string;
  priority?: boolean;
};

const SIZE = {
  sm: 28,
  md: 36,
  lg: 56,
  hero: 120,
} as const;

const NAME_TEXT = {
  sm: "text-base",
  md: "text-lg sm:text-xl",
  lg: "text-xl sm:text-2xl",
  hero: "text-3xl sm:text-4xl",
} as const;

/**
 * Home Flavour Catering circular logo.
 * Prefer this over plain text for brand surfaces.
 */
export function BrandLogo({
  size = "md",
  withName = false,
  name = "Home Flavour Catering",
  nameClassName = "",
  className = "",
  priority = false,
}: BrandLogoProps) {
  const px = SIZE[size];

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Image
        src="/logo.png"
        alt={name}
        width={px}
        height={px}
        priority={priority}
        className="shrink-0 rounded-full object-contain"
      />
      {withName ? (
        <span
          className={`font-display font-bold tracking-tight text-leaf-deep ${NAME_TEXT[size]} ${nameClassName}`}
        >
          {name}
        </span>
      ) : null}
    </span>
  );
}
