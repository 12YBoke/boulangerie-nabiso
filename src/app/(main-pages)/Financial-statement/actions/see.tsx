/* eslint-disable react/no-unescaped-entities */
import { Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shadcnui/components/ui/dialog";
import { Typography } from "@/ui/components/typography/typography";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import clsx from "clsx";
import { FormatNumberWithCurrency } from "@/lib/format-number-with-currency";
import { Container } from "@/ui/components/container/container";
import { ScrollArea } from "@/shadcnui/components/ui/scroll-area";

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

export const See = ({ financialFlow }: Props) => {
  return (
    <Dialog>
      <DialogTrigger
        asChild
        className="p-2 flex flex-row items-center text-primary-500 cursor-pointer bg-primary-50 hover:bg-primary-100 rounded-full animate"
      >
        <span className="p-2">
          <Eye className="h-5 w-5" />
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="flex flex-col gap-4">
          <DialogTitle>
            <Typography variant="title-lg">Transaction</Typography>
          </DialogTitle>
          <DialogDescription className="h-full w-full">
            Détails de la transaction sélectionnée
          </DialogDescription>
          <Container className="flex flex-col gap-4">
            <Container className="flex flex-row gap-4 items-center">
              <Container
                className={clsx(
                  "p-2 rounded-lg",
                  financialFlow.flowType === "INCOME" && "bg-green-200",
                  financialFlow.flowType === "EXPENSE" && "bg-red-200"
                )}
              >
                <Typography
                  className={clsx(
                    financialFlow.flowType === "INCOME" && "text-green-600",
                    financialFlow.flowType === "EXPENSE" && "text-red-600"
                  )}
                >
                  {financialFlow.flowType === "INCOME" ? "Revenu" : "Dépense"}
                </Typography>
              </Container>
              <Typography>
                {format(financialFlow.date, "dd-MM-yyyy", { locale: fr })}
              </Typography>
            </Container>
            <Container className="flex flex-row gap-4">
              <Container className="flex flex-col gap-1">
                <Typography variant="body-sm" className="text-black/50">
                  Montant
                </Typography>
                <Typography variant="title-base">
                  {FormatNumberWithCurrency(financialFlow.amount || 0)}
                </Typography>
              </Container>
              <Container className="flex flex-col gap-1">
                <Typography variant="body-sm" className="text-black/50">
                  Agent
                </Typography>
                <Typography variant="title-base">
                  {financialFlow.agent}
                </Typography>
              </Container>
            </Container>
            <Container className="flex flex-col gap-1">
              <Typography variant="body-sm" className="text-black/50">
                Raison
              </Typography>
              <ScrollArea className="rounded-lg h-40 overflow-hidden">
                <Container className="">
                  <Typography className="whitespace-pre-wrap">
                    {financialFlow.reason}
                  </Typography>
                </Container>
              </ScrollArea>
            </Container>
          </Container>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
