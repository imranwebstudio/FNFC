"use client";

import Link from "next/link";
import { use, useState } from "react";
import { ArrowLeft, Loader2, UserRound } from "lucide-react";

import {
  AccountStatementHeader,
  AccountStatementView,
} from "~/components/account-statement";
import { FoodPlateLoader } from "~/components/food-plate-loader";
import { Badge, Button, PageTitle, Panel } from "~/components/ui";
import { formatTaka } from "~/lib/datetime";
import { confirmAction, promptBalanceEdit } from "~/lib/swal";
import { api } from "~/trpc/react";

export default function AdminUserStatementPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = use(params);
  const [balanceError, setBalanceError] = useState<string | null>(null);
  const [orderError, setOrderError] = useState<string | null>(null);
  const utils = api.useUtils();
  const statement = api.account.userStatement.useQuery({ userId });

  const invalidateStatement = async () => {
    await utils.account.userStatement.invalidate({ userId });
    await utils.admin.listUsers.invalidate();
    await utils.order.listForAdmin.invalidate();
  };

  const setBalance = api.wallet.setBalance.useMutation({
    onSuccess: async () => {
      setBalanceError(null);
      await invalidateStatement();
    },
    onError: (err) => {
      setBalanceError(err.message || "Could not update balance");
    },
  });

  const deleteOrder = api.order.deleteByAdmin.useMutation({
    onSuccess: async () => {
      setOrderError(null);
      await invalidateStatement();
    },
    onError: (err) => {
      setOrderError(err.message || "Could not delete order");
    },
  });

  const deleteUserHistory = api.order.deleteUserHistory.useMutation({
    onSuccess: async () => {
      setOrderError(null);
      await invalidateStatement();
    },
    onError: (err) => {
      setOrderError(err.message || "Could not clear order history");
    },
  });

  const user = statement.data?.user;
  const orderCount = statement.data?.summary.orderCount ?? 0;

  return (
    <div>
      <div className="mb-4">
        <Link
          href="/admin/users"
          className="inline-flex items-center gap-2 rounded-2xl px-3 py-2 text-sm font-semibold text-ink-muted transition hover:bg-sand hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to users
        </Link>
      </div>

      <PageTitle
        icon={<UserRound className="h-5 w-5" strokeWidth={2.25} />}
        title="Member account"
        subtitle="Full order and payment history for this person."
      />

      {statement.isLoading ? (
        <FoodPlateLoader label="Opening member account…" />
      ) : statement.isError ? (
        <Panel>
          <p className="text-sm text-red-400">{statement.error.message}</p>
        </Panel>
      ) : statement.data ? (
        <>
          {balanceError ? (
            <p className="mb-4 rounded-xl bg-red-500/10 px-3 py-2 text-sm text-red-400">
              {balanceError}
            </p>
          ) : null}
          {orderError ? (
            <p className="mb-4 rounded-xl bg-red-500/10 px-3 py-2 text-sm text-red-400">
              {orderError}
            </p>
          ) : null}
          <Panel className="mb-6">
            <AccountStatementHeader
              name={statement.data.user.name ?? statement.data.user.email}
              subtitle={[
                statement.data.user.employeeId,
                statement.data.user.location?.name,
                statement.data.user.email,
              ]
                .filter(Boolean)
                .join(" · ")}
            />
            <div className="flex flex-wrap items-center gap-2">
              <Badge>{statement.data.user.paymentMode}</Badge>
              <Badge tone="neutral">
                Bal {formatTaka(statement.data.user.balance)}
              </Badge>
              {user ? (
                <Button
                  type="button"
                  variant="secondary"
                  disabled={setBalance.isPending}
                  aria-busy={setBalance.isPending}
                  onClick={async () => {
                    const newBalance = await promptBalanceEdit({
                      title: "Edit balance",
                      text: `Current balance: ${formatTaka(user.balance)}. Enter the new wallet balance.`,
                      currentBalance: user.balance,
                    });
                    if (newBalance === null || newBalance === user.balance) return;
                    setBalance.mutate({ userId, balance: newBalance });
                  }}
                >
                  {setBalance.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Saving…
                    </>
                  ) : (
                    "Edit balance"
                  )}
                </Button>
              ) : null}
              {orderCount > 0 ? (
                <Button
                  type="button"
                  variant="danger"
                  disabled={deleteUserHistory.isPending}
                  aria-busy={deleteUserHistory.isPending}
                  onClick={async () => {
                    const confirmed = await confirmAction({
                      title: "Clear order history?",
                      text: `Delete all ${orderCount} order(s) for ${statement.data!.user.name ?? statement.data!.user.email}. Wallet charges will be refunded where applicable. Deposits and adjustments are kept.`,
                      confirmText: "Yes, delete all orders",
                    });
                    if (!confirmed) return;
                    deleteUserHistory.mutate({ userId });
                  }}
                >
                  {deleteUserHistory.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Clearing…
                    </>
                  ) : (
                    "Clear order history"
                  )}
                </Button>
              ) : null}
            </div>
          </Panel>
          <AccountStatementView
            summary={statement.data.summary}
            entries={statement.data.entries}
            title="Full history"
            adminActions={{
              onDeleteOrder: async (orderId) => {
                const confirmed = await confirmAction({
                  title: "Delete order?",
                  text: "Remove this order from history. Wallet charges will be refunded if applicable.",
                  confirmText: "Yes, delete order",
                });
                if (!confirmed) return;
                deleteOrder.mutate({ orderId });
              },
              deletingOrderId: deleteOrder.isPending
                ? deleteOrder.variables?.orderId
                : undefined,
            }}
          />
        </>
      ) : null}
    </div>
  );
}
