/* eslint-disable react/no-unescaped-entities */
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger, 
} from "@/shadcnui/components/ui/sheet"
import { Typography } from "@/ui/components/typography/typography";
import { Container } from "@/ui/components/container/container"
import { Eye } from "lucide-react";

interface Props {
  customer: {
    name: string,
    phoneNumber: string
    id: string
    customerNumber: number
  }
}

export const See = ({ customer } : Props) => {

  return (
    <Sheet>
      <SheetTrigger asChild className="flex flex-row items-center text-primary-Default cursor-pointer bg-primary-50 hover:bg-primary-100 rounded-full animate">
        <span className="p-2">
          <Eye className="h-5 w-5" />
        </span>
      </SheetTrigger>
      <SheetContent className="bg-white">
        <SheetHeader className="flex flex-col gap-4">
          <SheetTitle>
            <Typography variant="title-lg">Client N° {customer.customerNumber}</Typography>
            <Typography variant="title-lg">{customer.name}</Typography>
          </SheetTitle>
          <SheetDescription className="w-full gap-2 flex flex-col">
            <Container>
              <Typography>Cartes</Typography>
            </Container>
            <Container className="p-4 h-[72vh] bg-primary-50 rounded-lg">
              <Typography>Bonjour</Typography>
            </Container>
            {/* <Sheet>
              <SheetTrigger asChild className="flex flex-row items-center text-primary-Default cursor-pointer bg-primary-50 hover:bg-primary-100 rounded-full animate">
                <span className="p-2">
                  <Eye className="h-5 w-5" /> Enfant
                </span>
              </SheetTrigger>
              <SheetContent className="sm:max-w-[60vw]">
                <SheetHeader>
                  <SheetTitle>
                    Deuxieme Sheet Test 
                  </SheetTitle>
                </SheetHeader>
              </SheetContent>
            </Sheet> */}
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}