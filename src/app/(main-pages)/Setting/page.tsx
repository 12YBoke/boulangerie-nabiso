/* eslint-disable react/no-unescaped-entities */
import prisma from "@/lib/prisma";
import { Extension, columns as columnsExtension } from "./columns-extension";
import { User, columns as columnsUser } from "./columns-user";
import { DataTable as DataTableExtension } from "./data-table-extension";
import { DataTable as DataTableUser } from "./data-table-user";
import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/components/typography/typography";
import { auth } from "@/auth";

async function getExtension(): Promise<Extension[]> {
  const extensions = await prisma?.extension.findMany({
    select: {
      id: true,
      name: true,
      rate: true,
      _count: {
        select: {
          User: true,
          customer: true,
        },
      },
    },
  });

  return extensions.map((extension) => ({
    id: extension.id,
    name: extension.name,
    rate: extension.rate,
    agentNumber: extension._count.User,
    customerNumber: extension._count.customer,
  }));
}

async function getUser(xtensionId: string): Promise<User[]> {
  const users = await prisma.user.findMany({
    where: {
      extensionId: xtensionId,
    },
    select: {
      id: true,
      name: true,
      role: true,
      createdAt: true,
    },
  });

  return users;
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

  const dataExtension = await getExtension();

  const dataUser = await getUser(userData[0].extensionId!);

  return (
    <main className="w-full flex flex-col gap-16">
      <Container className="w-full h-full flex flex-col gap-8 rounded">
        <Typography variant="title-lg">Liste des extensions</Typography>
        <Container className="flex flex-row gap-8 w-full">
          <Container className="w-full">
            <DataTableExtension
              columns={columnsExtension}
              data={dataExtension}
            />
          </Container>
        </Container>
      </Container>
      <Container className="w-full h-full flex flex-col gap-8 rounded">
        <Typography variant="title-lg">Liste des agents</Typography>
        <Container className="flex flex-row gap-8 w-full">
          <Container className="w-full">
            <DataTableUser
              columns={columnsUser}
              data={dataUser}
              userData={userData}
            />
          </Container>
        </Container>
      </Container>
    </main>
  );
}
