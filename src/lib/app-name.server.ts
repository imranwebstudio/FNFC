import "server-only";

const DEFAULT_APP_NAME = "Fresh & Fast Catering";

/** Server-only — read NEXT_APP_NAME from env (no NEXT_PUBLIC_ prefix). */
export function getAppName(): string {
  const name = process.env.NEXT_APP_NAME?.trim();
  return name || DEFAULT_APP_NAME;
}
