/* eslint-disable react/no-unescaped-entities */
import prisma from "@/lib/prisma";
import { FinancialFlow } from "./columns";
import { Container } from "@/ui/components/container/container";
import { auth } from "@/auth";
import { Filter } from "./filter";
import { getAmountOrdersGenerated } from "@/app/api/get-amount-orders-generated/get-amount-orders-generated";

async function getData(extensionId: string): Promise<FinancialFlow[]> {
  const financialFlow = await prisma?.financialFlow.findMany({
    where: { extensionId: extensionId },
    select: {
      id: true,
      amount: true,
      reason: true,
      date: true,
      flowType: true,
      agent: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      date: "desc",
    },
  });

  return financialFlow.map((flow) => ({
    id: flow.id,
    amount: flow.amount,
    reason: flow.reason,
    date: flow.date,
    flowType: flow.flowType,
    agent: flow.agent.name,
  }));
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
      extension: true,
      role: true,
    },
  });

  const data = await getData(userData[0].extensionId!);

  const amountOrdersGenerated = await getAmountOrdersGenerated(
    userData[0].extensionId!
  );

  return (
    <main className="w-full flex flex-col">
      <Container className="w-full">
        <Filter
          data={data}
          userData={userData}
          amountOrdersGenerated={amountOrdersGenerated}
        />
      </Container>
    </main>
  );
}
