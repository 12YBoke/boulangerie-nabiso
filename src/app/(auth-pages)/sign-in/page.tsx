import { Container } from "@/ui/components/container/container";
import { SignInForm } from "@/ui/modules/sign-in-form/sign-in-form";
import prisma from "@/lib/prisma";

export default async function Home() {
  const extensions = await prisma.extension.findMany()

  const extensionsForSelect = extensions?.map(record => ({
    label: record.name,
    value: record.id,
  }))

  return (
    <Container className="flex flex-col md:flex-row h-[100dvh] justify-center items-center">
      <Container className="w-[80vw] md:w-[60vw] flex justify-center items-center">
        <SignInForm extensions={extensionsForSelect}/>
      </Container>
    </Container>
  )
}
