/* eslint-disable react/no-unescaped-entities */
import prisma from "@/lib/prisma";
import { FinancialFlow, columns } from "./columns";
import { DataTable } from "./data-table";
import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/components/typography/typography";
import { auth } from "@/auth";

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
    },
  });

  const data = await getData(userData[0].extensionId!);

  return (
    <main className="w-full flex flex-col">
      <Container className="w-full h-full flex flex-col gap-8 rounded">
        <Typography variant="title-lg">Liste des transactions</Typography>
        <Container className="flex flex-row gap-8 w-full">
          <Container className="w-full">
            <DataTable columns={columns} data={data} userData={userData} />
          </Container>
        </Container>
      </Container>
    </main>
  );
}
