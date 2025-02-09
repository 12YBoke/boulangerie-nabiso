"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/components/typography/typography";
import { See } from "./actions/see";
import { Delete } from "./actions/delete";
import { Update } from "./actions/update";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import clsx from "clsx";
import { FormatNumberWithCurrency } from "@/lib/format-number-with-currency";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type FinancialFlow = {
  id: string;
  amount: number;
  reason: string;
  date: Date;
  flowType: "INCOME" | "EXPENSE";
  agent: string;
};

export const columns: ColumnDef<FinancialFlow>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const financialFlow = row.original;

      return (
        <Container>
          <Typography>
            {format(financialFlow.date, "dd-MM-yyyy", { locale: fr })}
          </Typography>
        </Container>
      );
    },
  },
  {
    accessorKey: "flowType",
    header: "Type",
    cell: ({ row }) => {
      const financialFlow = row.original;

      return (
        <Container className="flex">
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
        </Container>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Montant",
    cell: ({ row }) => {
      const financialFlow = row.original;

      return (
        <Container>
          <Typography>
            {FormatNumberWithCurrency(financialFlow.amount || 0)}
          </Typography>
        </Container>
      );
    },
  },
  {
    accessorKey: "agent",
    header: "Agent",
    cell: ({ row }) => {
      const financialFlow = row.original;

      return (
        <Container>
          <Typography>{financialFlow.agent}</Typography>
        </Container>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const financialFlow = row.original;

      return (
        <Container className="flex flex-row gap-2 justify-end">
          <Container>
            <See financialFlow={financialFlow} />
          </Container>
          <Container>
            <Update financialFlow={financialFlow} />
          </Container>
          <Container>
            <Delete id={financialFlow.id} />
          </Container>
        </Container>
      );
    },
  },
];
