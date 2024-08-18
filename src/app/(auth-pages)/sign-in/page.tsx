import { Container } from "@/ui/components/container/container";
import { SignInForm } from "@/ui/modules/sign-in-form/sign-in-form";
import prisma from "@/lib/prisma";

export default async function Home() {
  const extensions = await prisma.extension.findMany()

  return (
    <Container className="flex flex-col md:flex-row h-[100dvh] justify-center items-center">
      <Container className="w-[80vw] md:w-[60vw] flex justify-center items-center">
        <SignInForm extensions={extensions}/>
      </Container>
    </Container>
  )
}
