import { Container } from "@/ui/components/container/container"
import { NewUserForm } from "@/ui/modules/new-user-form/new-user-form"
import prisma from "@/lib/prisma"

export default async function Home() {
  const extensions = await prisma.extension.findMany()

  return(
    <Container className="flex flex-col md:flex-row h-[100dvh] justify-center items-center">
      <Container className="w-[60vw] flex justify-center items-center">
        <NewUserForm extensions={extensions}/>
      </Container>
    </Container>
  )
}