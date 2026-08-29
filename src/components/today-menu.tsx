"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Clock3,
  MapPin,
  Moon,
  ShoppingBag,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { useState } from "react";

import { Badge, Button, PageTitle, Panel, Textarea } from "~/components/ui";
import { cloudinaryDisplayUrl } from "~/lib/cloudinary-url";
import {
  formatMenuDateLabel,
  formatTaka,
} from "~/lib/datetime";
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
  const window = today.data?.window;
  const cutoffLabel = window?.cutoffTime ?? "—";
  const showLocation =
    today.data?.scope === "all" || today.data?.scope === "admin";

  return (
    <div>
      <PageTitle
        icon={<UtensilsCrossed className="h-5 w-5" strokeWidth={2.25} />}
        title="Today's meal"
        subtitle={
          today.data?.locationName
            ? `Your office: ${today.data.locationName}`
            : "One-click order. Cash on delivery or wallet."
        }
      />

      {window ? (
        <Panel className="mb-6 flex flex-wrap items-center gap-3 py-3.5">
          {window.rolledOver ? (
            <>
              <Badge tone="warn">
                <Moon className="h-3 w-3" />
                After {cutoffLabel}
              </Badge>
              <p className="text-sm text-ink-muted">
                Today&apos;s lunch is closed. Ordering for{" "}
                <span className="font-semibold text-ink">
                  {formatMenuDateLabel(window.orderDate)}
                </span>
                .
              </p>
            </>
          ) : (
            <>
              <Badge tone="good">
                <Clock3 className="h-3 w-3" />
                Open until {cutoffLabel}
              </Badge>
              <p className="text-sm text-ink-muted">
                Ordering for{" "}
                <span className="font-semibold text-ink">
                  {formatMenuDateLabel(window.orderDate)}
                </span>
                . After {cutoffLabel}, only tomorrow opens.
              </p>
            </>
          )}
        </Panel>
      ) : null}

      {today.isLoading ? (
        <p className="text-sm text-ink-muted">Loading menu…</p>
      ) : null}

      {!today.isLoading && menus.length === 0 ? (
        <Panel>
          <p className="text-sm text-ink-muted">
            No published set meal for{" "}
            {window ? formatMenuDateLabel(window.orderDate) : "this day"}
            {today.data?.locationName
              ? ` at ${today.data.locationName}`
              : ""}
            . Admins can publish a date range from Admin → Menu.
          </p>
        </Panel>
      ) : null}

      <div
        className={
          menus.length <= 1
            ? "flex justify-center"
            : "grid justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3"
        }
      >
        <AnimatePresence mode="popLayout">
          {menus.map((menu, i) => {
            const photo = cloudinaryDisplayUrl(menu.imageUrl, {
              width: 800,
              height: 600,
            });
            return (
              <motion.article
                key={menu.id}
                layout
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="food-card w-full max-w-[22rem]"
              >
                <div className="food-card-media">
                  {photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={photo} alt={menu.title} />
                  ) : (
                    <div
                      className="h-full w-full"
                      style={{
                        backgroundImage:
                          "linear-gradient(135deg, #ff7a45 0%, #2dd4bf 100%)",
                      }}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070b0a] via-[#070b0a]/45 to-transparent" />
                  <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
                    <Badge tone="neutral">{menu.slot}</Badge>
                    {showLocation ? (
                      <Badge tone="good">
                        <MapPin className="h-3 w-3" />
                        {menu.location.name}
                      </Badge>
                    ) : null}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-xs font-medium text-ink-muted">
                      {formatMenuDateLabel(menu.menuDate)}
                    </p>
                    <div className="mt-1 flex items-end justify-between gap-3">
                      <h2 className="font-display text-xl font-bold leading-tight text-ink">
                        {menu.title}
                      </h2>
                      <p className="shrink-0 text-lg font-bold tabular-nums text-spice">
                        {formatTaka(menu.price)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 p-4 pt-3">
                  {menu.description ? (
                    <p className="line-clamp-2 text-sm leading-relaxed text-ink-muted">
                      {menu.description}
                    </p>
                  ) : null}
                  <p className="inline-flex items-center gap-1.5 text-xs text-ink-muted">
                    <Clock3 className="h-3.5 w-3.5 text-leaf" strokeWidth={2.25} />
                    Closes {menu.cutoffTime ?? cutoffLabel}
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
                          <X className="h-4 w-4" />
                          Cancel
                        </Button>
                      ) : (
                        <Badge tone="neutral">{menu.myOrder.status}</Badge>
                      )}
                    </div>
                  ) : menu.orderedOtherOptionId ? (
                    <p className="text-xs text-ink-muted">
                      You already ordered another {menu.slot.toLowerCase()}{" "}
                      option. Cancel that order to switch.
                    </p>
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
                              <ShoppingBag className="h-4 w-4" />
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
                            <p className="mt-2 text-sm text-red-300">
                              {create.error.message}
                            </p>
                          ) : null}
                        </motion.div>
                      ) : (
                        <Button
                          type="button"
                          className="w-full"
                          onClick={() => setOrderedId(menu.id)}
                        >
                          <ShoppingBag className="h-4 w-4" />
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
