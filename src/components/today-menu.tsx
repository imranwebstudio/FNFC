"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

import { Badge, Button, PageTitle, Panel, Textarea } from "~/components/ui";
import { cloudinaryDisplayUrl } from "~/lib/cloudinary-url";
import { formatTaka } from "~/lib/datetime";
import { api } from "~/trpc/react";

export function TodayMenu() {
  const utils = api.useUtils();
  const today = api.menu.todayForUser.useQuery();
  const create = api.order.create.useMutation({
    onSuccess: async () => {
      setOrderedId(null);
      setNote("");
      await utils.menu.todayForUser.invalidate();
      await utils.order.listMine.invalidate();
      await utils.wallet.summary.invalidate();
    },
  });
  const cancel = api.order.cancel.useMutation({
    onSuccess: async () => {
      await utils.menu.todayForUser.invalidate();
      await utils.order.listMine.invalidate();
      await utils.wallet.summary.invalidate();
    },
  });

  const [note, setNote] = useState("");
  const [orderedId, setOrderedId] = useState<string | null>(null);

  const menus = today.data?.menus ?? [];
  const showLocation =
    today.data?.scope === "all" || today.data?.scope === "admin";

  return (
    <div>
      <PageTitle
        title="Today's meal"
        subtitle={
          today.data?.locationName
            ? `Your office: ${today.data.locationName}. One-click order — cash on delivery or wallet.`
            : "One-click order. Pay cash on delivery or use your wallet deposit."
        }
      />

      {today.isLoading ? (
        <p className="text-sm text-ink-muted">Loading menu…</p>
      ) : null}

      {!today.isLoading && menus.length === 0 ? (
        <Panel>
          <p className="text-sm text-ink-muted">
            No published set meal
            {today.data?.locationName
              ? ` for ${today.data.locationName}`
              : ""}{" "}
            today. Publish from <strong>Admin → Menu</strong> or{" "}
            <strong>Admin → Catalog → Publish for today</strong> for that same
            office location.
          </p>
        </Panel>
      ) : null}

      <div
        className={
          menus.length <= 1
            ? "flex justify-center"
            : "grid justify-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3"
        }
      >
        <AnimatePresence mode="popLayout">
          {menus.map((menu, i) => {
            const photo = cloudinaryDisplayUrl(menu.imageUrl, {
              width: 640,
              height: 360,
            });
            return (
              <motion.article
                key={menu.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.35 }}
                className="w-full max-w-[22rem] overflow-hidden rounded-2xl border border-line/70 bg-rice/80 shadow-sm"
              >
                <div className="relative h-36 w-full overflow-hidden bg-sand sm:h-40">
                  {photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={photo}
                      alt={menu.title}
                      className="absolute inset-0 h-full w-full object-cover object-center"
                    />
                  ) : (
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage:
                          "linear-gradient(135deg, #c45c26 0%, #2f5d3a 100%)",
                      }}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/15 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 z-10 flex items-end justify-between gap-3 text-rice">
                    <div>
                      <div className="flex flex-wrap gap-1">
                        <Badge tone="neutral">{menu.slot}</Badge>
                        {showLocation ? (
                          <Badge tone="good">{menu.location.name}</Badge>
                        ) : null}
                      </div>
                      <h2 className="font-display mt-1 text-lg font-semibold sm:text-xl">
                        {menu.title}
                      </h2>
                    </div>
                    <p className="text-base font-semibold">
                      {formatTaka(menu.price)}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 p-4">
                  {menu.description ? (
                    <p className="text-sm text-ink-muted">{menu.description}</p>
                  ) : null}
                  <p className="text-xs text-ink-muted">
                    Cutoff{" "}
                    {new Date(menu.effectiveCutoffAt).toLocaleTimeString(
                      "en-BD",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                        timeZone: "Asia/Dhaka",
                      },
                    )}
                    {menu.isPastCutoff ? " · closed" : ""}
                  </p>

                  {menu.myOrder ? (
                    <div className="flex flex-wrap items-center gap-3">
                      <Badge tone="good">Ordered</Badge>
                      {menu.myOrder.status === "PLACED" &&
                      !menu.isPastCutoff ? (
                        <Button
                          variant="ghost"
                          type="button"
                          disabled={cancel.isPending}
                          onClick={() =>
                            cancel.mutate({ orderId: menu.myOrder!.id })
                          }
                        >
                          Cancel order
                        </Button>
                      ) : (
                        <Badge tone="neutral">{menu.myOrder.status}</Badge>
                      )}
                    </div>
                  ) : menu.isPastCutoff ? (
                    <Badge tone="warn">Ordering closed</Badge>
                  ) : (
                    <div className="space-y-3">
                      {orderedId === menu.id ? (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                        >
                          <Textarea
                            placeholder="Optional note (extra spicy, no onion…)"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            rows={2}
                          />
                          <div className="mt-3 flex gap-2">
                            <Button
                              type="button"
                              disabled={create.isPending}
                              onClick={() =>
                                create.mutate({
                                  dailyMenuId: menu.id,
                                  note: note || undefined,
                                })
                              }
                            >
                              {create.isPending
                                ? "Ordering…"
                                : "Confirm order"}
                            </Button>
                            <Button
                              variant="ghost"
                              type="button"
                              onClick={() => setOrderedId(null)}
                            >
                              Back
                            </Button>
                          </div>
                          {create.error ? (
                            <p className="mt-2 text-sm text-red-700">
                              {create.error.message}
                            </p>
                          ) : null}
                        </motion.div>
                      ) : (
                        <Button
                          type="button"
                          onClick={() => setOrderedId(menu.id)}
                        >
                          Order this meal
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
