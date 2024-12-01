import prisma from "@/lib/prisma";
import { Customer, columns } from "./columns";
import { DataTable } from "./data-table";
import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/components/typography/typography";
import { auth } from "@/auth";
import { useCurrentExtension } from "@/hooks/use-current-extension";

async function getData(extensionId: string): Promise<Customer[]> {
  const customers = await prisma?.customer.findMany({
    where: { extensionId: extensionId },
    select: {
      id: true,
      customerNumber: true,
      name: true,
      phoneNumber: true,
      createdAt: true,
    },
    orderBy: {
      customerNumber: "asc",
    },
  });

  return customers;
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
        <Typography variant="title-lg">Liste des clients</Typography>
        <DataTable columns={columns} data={data} userData={userData} />
      </Container>
    </main>
  );
}
