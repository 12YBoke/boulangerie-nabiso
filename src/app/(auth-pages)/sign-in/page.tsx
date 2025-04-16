import { Container } from "@/ui/components/container/container";
import { SignInForm } from "@/ui/modules/sign-in-form/sign-in-form";
import prisma from "@/lib/prisma";
import { BgImg } from "@/ui/components/bg-img/bg-img";
import Bread from "../../../../public/bread.jpg";

export default async function Home() {
  const extensions = await prisma.extension.findMany();
  console.log(extensions);
  return (
    <Container className="flex flex-col md:flex-row h-[100dvh] justify-center items-center">
      <Container className="basis-1/2 flex justify-center items-center h-full">
        <BgImg src={Bread} alt={"bread"} className="w-full h-full" />
      </Container>
      <Container className="basis-1/2 flex justify-center items-center">
        <SignInForm extensions={extensions} />
      </Container>
    </Container>
  );
}
