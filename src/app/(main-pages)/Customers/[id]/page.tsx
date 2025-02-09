import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/components/typography/typography";
import prisma from "@/lib/prisma";
import { CardView } from "./card-view";

export default async function Home({ params }: { params: { id: string } }) {
  const id = decodeURIComponent(params.id);
  const customer = await prisma.customer.findUnique({
    where: {
      id,
    },
    include: {
      card: {
        select: {
          id: true,
          cardStatus: true,
          paymentStatus: true,
          cardNumber: true,
          customerId: true,
          extensionId: true,
          orders: {
            select: {
              id: true,
              cardId: true,
              amount: true,
              amountPaid: true,
              voucher: true,
              voucherPaid: true,
              dateOrdered: true,
              userId: true,
              CustomerId: true,
              name: true,
              amountToBeDelivered: true,
              type: true,
            },
            orderBy: {
              dateOrdered: "desc",
            },
          },
        },
        orderBy: {
          cardNumber: "desc",
        },
      },
    },
  });

  return (
    <main className="w-full flex flex-col">
      <Container className="w-full flex flex-col gap-8 rounded">
        <Container className="flex flex-row gap-4 items-center">
          <Typography variant="title-lg">{customer?.name}</Typography>
        </Container>
        <CardView card={customer?.card!} />
      </Container>
    </main>
  );
}
