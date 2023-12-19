/* eslint-disable react/no-unescaped-entities */
import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/shadcnui/ui/sheet"
import { Button } from "@/ui/components/buttons/button"
import { Container } from "@/ui/components/container/container"
import { Typography } from "@/ui/components/typography/typography"

interface Props {
  type: "cash-in" | "disburse"
}

export const AddCashFlow = ({
  type
}: Props) => {
  return(
    <SheetContent className="bg-white w-80 flex flex-col gap-8">
      <SheetHeader>
        { 
          type === 'cash-in' ?
          <SheetTitle>
            <Typography className="text-green-500" component="h3" variant="title-base">Ajouter une entrée d'argent</Typography>
          </SheetTitle>
          :
          <SheetTitle>
            <Typography className="text-red-500" component="h3" variant="title-base">Ajouter une sortie d'argent</Typography>
          </SheetTitle>
        }
      </SheetHeader>
      <Container>
        contenue
      </Container>
      <SheetFooter>
        <SheetClose asChild>
        { 
          type === 'cash-in' ?
          <Button className="bg-green-400 hover:bg-green-500 w-full">Ajouter une entrée d'argent</Button>
          :
          <Button className="bg-red-400 hover:bg-red-500 w-full">Ajouter une sortie d'argent</Button>

        }
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  )
}