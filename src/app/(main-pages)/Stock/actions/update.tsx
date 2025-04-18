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
import { UpdateStockForm } from "@/ui/modules/update-stock-form/update-stock-form";

import { Pen, Trash } from "lucide-react";

interface Props {
  stock: {
    id: string;
    name: string;
    startingStock: string;
    endingStock: string;
    date: Date;
    dayProduction: string;
    income?: string | null;
    agent: string;
  };
}

export const Update = ({ stock }: Props) => {
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
            <Typography variant="title-lg">Modifier la transaction</Typography>
          </DialogTitle>
          <DialogDescription className="h-full w-full">
            Vous étes sur le point de mettre à jour les informations de cette
            transaction.
          </DialogDescription>
          <UpdateStockForm stock={stock} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
