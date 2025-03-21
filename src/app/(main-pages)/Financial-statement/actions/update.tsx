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
import { UpdateFinancialFlowForm } from "@/ui/modules/update-financial-flow-form/update-financial-flow-form";

import { Pen, Trash } from "lucide-react";

interface Props {
  financialFlow: {
    id: string;
    amount: number;
    reason: string;
    date: Date;
    flowType: "INCOME" | "EXPENSE";
    agent: string;
  };
}

export const Update = ({ financialFlow }: Props) => {
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
          <UpdateFinancialFlowForm financialFlow={financialFlow} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
