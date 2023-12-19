'use client'
import { Sheet, SheetTrigger } from "@/shadcnui/ui/sheet"
import { Container } from "@/ui/components/container/container"
import { Typography } from "@/ui/components/typography/typography"
import { ArrowUpRight, Plus } from "lucide-react"
import { AddCashFlow } from "../add-cash-flow/add-cash-flow"

export const CashIn = () => {
  return(
    <Container className="w-full h-full bg-white rounded p-4">
      <Container className="flex flex-row justify-between">
        <Container className="flex flex-row gap-2 items-center">
          <Container className="h-8 w-8 bg-green-500 rounded-full flex justify-center items-center">
            <ArrowUpRight className="text-white"/>
          </Container>
          <Typography variant="title-sm" component="h4">Entrées</Typography>
        </Container>
        <Sheet>
          <SheetTrigger className="bg-primary-Default px-4 py-2 hover:bg-primary-600 flex flex-row text-white gap-2 items-center rounded">
            <Plus className="h-5 w-5"/>
            <Typography component="p" variant="body-base">Ajouter une entrée</Typography>
          </SheetTrigger>
          <AddCashFlow type="cash-in"/>
        </Sheet>
      </Container>
    </Container>
  )
}