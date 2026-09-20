#!/usr/bin/env node
/**
 * Run `prisma migrate deploy` with retries.
 * Neon + Vercel often hit P1002 when a prior build left an advisory lock
 * or two deploys race for pg_advisory_lock(72707369).
 */
import { spawnSync } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";

const MAX_ATTEMPTS = 5;
const BASE_DELAY_MS = 3000;

function isLockTimeout(output) {
  return (
    output.includes("P1002") ||
    output.includes("advisory lock") ||
    output.includes("pg_advisory_lock")
  );
}

async function main() {
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    console.log(`[migrate-deploy] attempt ${attempt}/${MAX_ATTEMPTS}…`);
    const result = spawnSync("npx", ["prisma", "migrate", "deploy"], {
      encoding: "utf8",
      stdio: ["inherit", "pipe", "pipe"],
      env: process.env,
      shell: process.platform === "win32",
    });

    const stdout = result.stdout ?? "";
    const stderr = result.stderr ?? "";
    if (stdout) process.stdout.write(stdout);
    if (stderr) process.stderr.write(stderr);

    if (result.status === 0) {
      process.exit(0);
    }

    const combined = `${stdout}\n${stderr}`;
    if (!isLockTimeout(combined) || attempt === MAX_ATTEMPTS) {
      process.exit(result.status ?? 1);
    }

    const waitMs = BASE_DELAY_MS * attempt;
    console.warn(
      `[migrate-deploy] advisory lock busy (P1002). Retrying in ${waitMs}ms…`,
    );
    await delay(waitMs);
  }

  process.exit(1);
}

await main();
