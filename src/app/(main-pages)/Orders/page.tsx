import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/components/typography/typography";
import { OrderForm } from "@/ui/modules/order-form/order-form";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export default async function Home() {
  const customers = await prisma.customer.findMany({
    select: {
      id: true,
      name: true,
      customerNumber: true,
      card: {
        where: {
          cardStatus: "ACTIVE",
        },
        select: {
          id: true,
        },
      },
    },
    orderBy: {
      customerNumber: "asc",
    },
  });

  const customersForSelect = customers?.map((record) => ({
    label: record.customerNumber + " - " + record.name,
    value: record.id,
    currentCard: record.card[0]?.id,
    customerNumber: record.customerNumber,
  }));

  const session = await auth();

  const user = await prisma?.user.findMany({
    where: {
      name: session?.user?.name!,
    },
    select: {
      id: true,
      extensionId: true,
      role: true,
    },
  });

  return (
    <main>
      <Container className="pb-8">
        <Typography variant="title-lg">Commandes</Typography>
      </Container>
      <Container>
        <OrderForm customers={customersForSelect!} users={user!} />
      </Container>
    </main>
  );
}
