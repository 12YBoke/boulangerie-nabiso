/* eslint-disable react/no-unescaped-entities */
import prisma from "@/lib/prisma";
import { Stock } from "./columns";
import { Container } from "@/ui/components/container/container";
import { auth } from "@/auth";
import { Filter } from "./filter";

async function getData(extensionId: string): Promise<Stock[]> {
  const stock = await prisma?.stock.findMany({
    where: { extensionId: extensionId },
    select: {
      id: true,
      name: true,
      startingStock: true,
      endingStock: true,
      date: true,
      dayProduction: true,
      income: true,
      user: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      date: "desc",
    },
  });

  return stock.map((s) => ({
    id: s.id,
    name: s.name,
    startingStock: s.startingStock,
    date: s.date,
    endingStock: s.endingStock,
    agent: s.user.name,
    income: s.income,
    dayProduction: s.dayProduction,
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

  return (
    <main className="w-full flex flex-col">
      <Container className="w-full">
        <Filter data={data} userData={userData} />
      </Container>
    </main>
  );
}
