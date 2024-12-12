import prisma from "@/lib/prisma";
import { Deliveries } from "./columns";
import { Container } from "@/ui/components/container/container";
import { auth } from "@/auth";
import { Filter } from "./filter";

async function getData(extensionId: string): Promise<Deliveries[]> {
  const ordersData = await prisma?.orders.findMany({
    where: { user: { extensionId: extensionId! } },
    select: {
      id: true,
      amount: true,
      amountPaid: true,
      amountToBeDelivered: true,
      voucher: true,
      voucherPaid: true,
      dateOrdered: true,
      type: true,
      name: true,
      CustomerId: true,
      deliveries: {
        select: {
          id: true,
          amountDelivered: true,
          dateDelivered: true,
        },
      },
      card: {
        select: {
          id: true,
        },
      },
      customer: {
        select: {
          id: true,
          customerNumber: true,
        },
      },
      user: {
        select: {
          id: true,
        },
      },
    },
    orderBy: {
      dateOrdered: "desc",
    },
  });

  const orders = ordersData.map((order) => ({
    id: order.id,
    amount: order.amount,
    amountPaid: order.amountPaid,
    amountToBeDelivered: order.amountToBeDelivered,
    voucher: order.voucher,
    CustomerId: order.CustomerId,
    voucherPaid: order.voucherPaid,
    dateOrdered: order.dateOrdered,
    type: order.type,
    name: order.name || "",
    typeLabel:
      order.type === "ORDER"
        ? "Commande"
        : order.type === "CASH_SALE"
        ? "Ventre cash"
        : order.type === "CHARGE"
        ? "Charge"
        : order.type === "DONATION"
        ? "Don"
        : order.type === "DAMAGE"
        ? "Foutu"
        : "Brulé",
    deliveries: order.deliveries,
    arraydeliveries: order.deliveries,
    totaldelivered: order.deliveries.reduce(
      (acc, delivery) => acc + (delivery.amountDelivered || 0),
      0
    ),
    cardId: order.card ? order.card.id : null,
    cardNumber: order.customer ? order.customer.customerNumber : null,
    customerId: order.customer ? order.customer.id : null,
    userId: order.user.id,
    isDate: false,
  }));

  return orders;
}

export default async function Home() {
  const session = await auth();

  const userData = await prisma.user.findMany({
    where: {
      id: session!.user!.id,
    },
    select: {
      id: true,
      extensionId: true,
    },
  });

  const data = await getData(userData[0].extensionId!);

  return (
    <main className="w-full flex flex-col">
      <Container className="w-full h-full flex flex-col gap-4 rounded">
        <Filter data={data} />
      </Container>
    </main>
  );
}
