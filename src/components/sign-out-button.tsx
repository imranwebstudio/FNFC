"use client";

import { signOutAction } from "~/server/actions/auth";
import { Button } from "~/components/ui";

export function SignOutButton() {
  return (
    <form action={signOutAction}>
      <Button variant="ghost" type="submit">
        Out
      </Button>
    </form>
  );
}
