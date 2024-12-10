/* eslint-disable react/no-unescaped-entities */
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shadcnui/components/ui/dialog";
import { Typography } from "@/ui/components/typography/typography";
import { UpdateOrderForm } from "@/ui/modules/update-order-form/update-order-form";

import { Pen } from "lucide-react";

interface Props {
  order: {
    id: string;
    cardId: string | null;
    amount: number | null;
    amountPaid: number | null;
    voucher: number | null;
    voucherPaid: number | null;
    dateOrdered: Date | null;
    CustomerId: string | null;
    userId: string;
    name: string | null;
    amountToBeDelivered: number | null;
    type: "ORDER" | "CASH_SALE" | "CHARGE" | "DONATION" | "DAMAGE" | "BURN";
  };
}

export const Update = ({ order }: Props) => {
  return (
    <Dialog>
      <DialogTrigger
        asChild
        className="cursor-pointer rounded-full bg-amber-50 hover:bg-amber-100 animate flex flex-row items-center text-amber-500"
      >
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
            Vous étes sur le point de mettre à jour les informations de cette
            commade.
          </DialogDescription>
          <UpdateOrderForm order={order} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
