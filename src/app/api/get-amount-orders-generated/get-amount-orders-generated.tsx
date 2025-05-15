import prisma from "@/lib/prisma";
export const getAmountOrdersGenerated = async (extensionId: string) => {
  const where = {
    user: { extensionId: extensionId! },
  };

  const ordersData = await prisma?.orders.findMany({
    where,
    select: {
      amount: true,
      amountPaid: true,
      voucherPaid: true,
      dateOrdered: true,
      type: true,
    },
    orderBy: {
      dateOrdered: "desc",
    },
  });

  const orders = ordersData.map((order) => ({
    amount: order.amount,
    amountPaid: order.amountPaid,
    voucherPaid: order.voucherPaid,
    dateOrdered: order.dateOrdered,
    type: order.type,
    typeLabel:
      order.type === "ORDER"
        ? "Commande"
        : order.type === "CASH_SALE"
        ? "Vente cash"
        : order.type === "CHARGE"
        ? "Charge"
        : order.type === "DONATION"
        ? "Don"
        : order.type === "DAMAGE"
        ? "Foutu"
        : "Brulé",
    isDate: false,
  }));

  return orders;
};
