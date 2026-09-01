import type { Prisma } from "../../generated/prisma";

type Tx = Omit<
  Prisma.TransactionClient,
  "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"
>;

type OrderToDelete = {
  id: string;
  userId: string;
  amount: number;
  paymentStatus: string;
};

export async function deleteOrderRecord(tx: Tx, order: OrderToDelete) {
  if (order.paymentStatus === "WALLET_CHARGED") {
    await tx.user.update({
      where: { id: order.userId },
      data: { balance: { increment: order.amount } },
    });
  }

  await tx.walletTransaction.deleteMany({
    where: { orderId: order.id },
  });

  await tx.order.delete({
    where: { id: order.id },
  });
}
