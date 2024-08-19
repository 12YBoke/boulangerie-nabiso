import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/components/typography/typography";
import { OrderForm } from "@/ui/modules/order-form/order-form";

export default function Home() {
  return (
    <main>
      <Container className="flex flex-col gap-4 pb-12">
        <Typography variant="title-base" className="text-primary-Default">Commandes</Typography>
      </Container>
      <OrderForm customers={[]} />
    </main>
  )
}
