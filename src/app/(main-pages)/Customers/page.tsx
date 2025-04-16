/* eslint-disable react/no-unescaped-entities */
import prisma from "@/lib/prisma";
import { Customer, columns } from "./columns";
import { DataTable } from "./data-table";
import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/components/typography/typography";
import { auth } from "@/auth";

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
      extension: true,
    },
  });

  const data = await getData(session?.user.extensionId!);

  return (
    <main className="w-full flex flex-col">
      <Container className="w-full h-full flex flex-col gap-8 rounded">
        <Typography variant="title-lg">Liste des clients</Typography>
        <Container className="flex flex-row gap-8 w-full">
          <Container className="flex flex-col gap-4 w-[24%]">
            <Container className="bg-primary-100 p-4 gap-4 flex flex-col rounded-lg">
              <Typography className="text-primary-800">
                Nom de l'extension
              </Typography>
              <Typography variant="title-lg" className="text-primary-800">
                {userData[0].extension.name}
              </Typography>
            </Container>
            <Container className="bg-primary-100 p-4 gap-4 flex flex-col rounded-lg">
              <Typography className="text-primary-800">
                Nombre de cartes
              </Typography>
              <Typography variant="title-lg" className="text-primary-800">
                {data.length}
              </Typography>
            </Container>
          </Container>
          <Container className="w-[76%]">
            <DataTable columns={columns} data={data} userData={userData} />
          </Container>
        </Container>
      </Container>
    </main>
  );
}
