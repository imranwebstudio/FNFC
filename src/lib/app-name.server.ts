import "server-only";

import { env } from "~/env";

const DEFAULT_APP_NAME = "Fresh & Fast Catering";

export function getAppName(): string {
  return env.NEXT_APP_NAME ?? DEFAULT_APP_NAME;
}
