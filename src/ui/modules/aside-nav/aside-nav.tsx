import { Container } from "@/ui/components/container/container";
import { AsideActiveLink } from "../../components/aside-active-link/aside-active-link";
import { AsideRoutes } from "@/routes/routes";
import { Typography } from "@/ui/components/typography/typography";
import {
  SignOutButton,
  UserCard,
} from "@/ui/components/auth-button/auth-button";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export const AsideNav = async () => {
  const session = await auth();

  const extensions = await prisma.extension.findMany({});

  return (
    <Container className="h-full w-full flex flex-col justify-between">
      <Container className="flex flex-col gap-4">
        <Container className="w-full px-6 py-4">
          <Typography variant="title-lg">BOULANGERIE</Typography>
          <Typography variant="title-lg">NA BISO</Typography>
        </Container>
        <Container className="px-4">
          {AsideRoutes.map(({ children }) =>
            children!.map(({ title, baseUrl, Icon }) => (
              <Container key={title}>
                <Typography
                  variant="body-base"
                  className="w-full text-black/60"
                >
                  <AsideActiveLink href={baseUrl!}>
                    {Icon ? (
                      <span className="flex flex-row items-center">
                        <Icon className="mr-4 h-5 w-5" />
                        {title}
                      </span>
                    ) : (
                      <>{title}</>
                    )}
                  </AsideActiveLink>
                </Typography>
              </Container>
            ))
          )}
        </Container>
      </Container>
      <Container className="p-4 flex flex-col items-center gap-4">
        <UserCard name={session?.user?.name!} extensions={extensions} />
        <SignOutButton className="w-full bg-red-200 hover:bg-red-300 text-red-800 hover:text-red-900" />
      </Container>
    </Container>
  );
};
