import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/components/typography/typography";
import { OrderForm } from "@/ui/modules/order-form/order-form";
import { auth } from "@/auth"
import prisma from "@/lib/prisma"

export default async function Home() {
  const customers = await prisma.customer.findMany({
    select : {
      id: true,
      name: true,
      card: {
        where: {
          cardStatus: 'ACTIVE'
        },
        select: {
          id: true,
        }
      }
    },
    orderBy: {
      customerNumber: 'asc'
    },
  })

  const customersForSelect = customers?.map(record => ({
    label: record.name,
    value: record.id,
    currentCard: record.card[0]?.id
  }))

  const session = await auth()
  
  const user = await prisma?.user.findMany({
    where: {
      name: session?.user?.name!
    },
    select: {
      id: true,
      extensionId: true
    }
  })

  return (
    <main>
      <Container className="flex flex-col gap-4 pb-12">
        <Typography variant="title-base" className="text-primary-Default">Commandes</Typography>
      </Container>
      <OrderForm customers={customersForSelect!} users={user!}/>
    </main>
  )
}
