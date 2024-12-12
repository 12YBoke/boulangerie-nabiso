import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { Container } from "@/ui/components/container/container";
import { AsideNav } from "@/ui/modules/aside-nav/aside-nav";
import prisma from "@/lib/prisma";

export default async function MainRoutesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/sign-in");
  }

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
    <Container className="h-[100vh] flex flex-row">
      <Container className="basis-1/5 overflow-hidden bg-white p-4">
        <AsideNav user={user!} />
      </Container>
      <Container className="basis-4/5 overflow-auto border-l">
        <Container className="min-h-[95vh] bg-white rounded-lg p-8">
          {children}
        </Container>
      </Container>
    </Container>
  );
}
