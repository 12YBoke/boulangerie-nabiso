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
import { UpdateOrderForm } from "@/ui/modules/update-order-form/update-order-form";

import { Pen } from "lucide-react";

interface Props {
  order: {
    id: string,
    cardId: string | null,
    amount: number | null,
    amountPaid: number | null,
    voucher: number | null,
    voucherPaid: number | null,
    dateOrdered: Date | null,
    CustomerId: string | null,
    userId: string,
    name: string | null,
    amountToBeDelivered: number | null,
    type: "ORDER" | "CASH_SALE" | "CHARGE" | "DONATION" | "DAMAGE",
  }
}

export const Update = ({ order } : Props) => {

  return (
    <Dialog>
      <DialogTrigger asChild className="cursor-pointer animate flex flex-row items-center text-emerald-500">
        <Pen className="h-4 w-4" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="flex flex-col gap-4">
          <DialogTitle>
            <Typography variant="title-lg">Modifier</Typography>
          </DialogTitle>
          <DialogDescription className="h-full w-full">
            <UpdateOrderForm order={order} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}