"use client";

import { useEffect, useState } from "react";
import { Phone } from "lucide-react";

import { Button, Input, Label, Panel } from "~/components/ui";
import { isValidPhoneNumber } from "~/lib/phone";
import { showSuccess } from "~/lib/swal";
import { api } from "~/trpc/react";

const DISMISS_KEY = "phonePromptDismissed";

function isDismissed(userId: string): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(DISMISS_KEY) === userId;
}

function dismissForSession(userId: string) {
  sessionStorage.setItem(DISMISS_KEY, userId);
}

export function PhoneNumberPrompt() {
  const utils = api.useUtils();
  const me = api.user.me.useQuery();
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState("");

  const updatePhone = api.user.updatePhone.useMutation({
    onSuccess: async () => {
      showSuccess("Phone number saved");
      await utils.user.me.invalidate();
      setOpen(false);
      setPhone("");
    },
  });

  useEffect(() => {
    if (!me.data) return;
    const missing =
      me.data.profileComplete && !me.data.phoneNumber?.trim();
    const dismissed = isDismissed(me.data.id);
    setOpen(Boolean(missing && !dismissed));
  }, [me.data]);

  if (!open || !me.data) return null;

  const valid = isValidPhoneNumber(phone);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="phone-prompt-title"
    >
      <Panel className="w-full max-w-md">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-leaf/15 text-leaf">
            <Phone className="h-5 w-5" strokeWidth={2.25} />
          </div>
          <div>
            <h2
              id="phone-prompt-title"
              className="font-display text-lg font-bold tracking-tight text-ink"
            >
              Phone number needed
            </h2>
            <p className="mt-0.5 text-sm text-ink-muted">
              Looks like you didn&apos;t update your phone number.
            </p>
          </div>
        </div>

        <div className="mb-5">
          <Label htmlFor="phone-prompt-input">Mobile number</Label>
          <Input
            id="phone-prompt-input"
            type="tel"
            placeholder="e.g. 01712345678"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            autoComplete="tel"
          />
          <p className="mt-1.5 text-xs text-ink-muted">
            Bangladesh mobile (01XXXXXXXXX)
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            className="flex-1"
            disabled={!valid || updatePhone.isPending}
            aria-busy={updatePhone.isPending}
            onClick={() => updatePhone.mutate({ phoneNumber: phone })}
          >
            {updatePhone.isPending ? "Saving…" : "Update now"}
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="flex-1"
            disabled={updatePhone.isPending}
            onClick={() => {
              dismissForSession(me.data.id);
              setOpen(false);
            }}
          >
            Update later
          </Button>
        </div>

        {updatePhone.error ? (
          <p className="mt-3 text-sm text-red-400">{updatePhone.error.message}</p>
        ) : null}
      </Panel>
    </div>
  );
}
