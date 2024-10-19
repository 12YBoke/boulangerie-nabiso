/* eslint-disable react/no-unescaped-entities */
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger, 
} from "@/shadcnui/components/ui/dialog"
import { Typography } from "@/ui/components/typography/typography";
import { UpdateCustomerForm } from "@/ui/modules/update-customer-form/update-customer-form";

import { Pen, Trash } from "lucide-react";

interface Props {
  customer: {
    name: string,
    phoneNumber: string
    id: string
    customerNumber: number
  }
}

export const Update = ({ customer } : Props) => {

  return (
    <Dialog>
      <DialogTrigger asChild className="cursor-pointer rounded-full bg-emerald-50 hover:bg-emerald-100 animate flex flex-row items-center text-emerald-500">
        <span className="p-2">
          <Pen className="h-5 w-5" />
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="flex flex-col gap-4">
          <DialogTitle>
            <Typography variant="title-lg">Modifier</Typography>
          </DialogTitle>
          <DialogDescription className="h-full w-full">
            <UpdateCustomerForm customer={customer} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}