import type { Prisma } from "../../generated/prisma";

type Tx = Omit<
  Prisma.TransactionClient,
  "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"
>;

export function isRegularCustomer(user: { customerType: string }): boolean {
  return user.customerType === "REGULAR";
}

export function isOneTimeCustomer(user: { customerType: string }): boolean {
  return user.customerType === "ONE_TIME";
}

/** @deprecated Prefer customerType; kept for legacy repair helpers. */
export function shouldChargeWallet(user: {
  paymentMode: string;
  balance: number;
}): boolean {
  return user.paymentMode === "WALLET" || user.balance > 0;
}

export async function chargeWalletForOrder(
  tx: Tx,
  input: {
    userId: string;
    amount: number;
    orderId: string;
    note: string;
    createdById?: string;
  },
) {
  const updated = await tx.user.update({
    where: { id: input.userId },
    data: { balance: { decrement: input.amount } },
  });
  await tx.walletTransaction.create({
    data: {
      userId: input.userId,
      type: "CHARGE",
      amount: -input.amount,
      balanceAfter: updated.balance,
      orderId: input.orderId,
      createdById: input.createdById,
      note: input.note,
    },
  });
  return updated;
}
