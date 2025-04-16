"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/components/typography/typography";
import { See } from "./actions/see";
import { Delete } from "./actions/delete";
import { Update } from "./actions/update";
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
  agentSalary: {
    id: string;
    dailySalary: number | null;
    missingTotal: number | null;
    missingRemoved: number | null;
    missingRemaining: number | null;
  } | null;
  cardPayment: {
    id: string;
    customerNumber: number;
  } | null;
};

export const columns: ColumnDef<FinancialFlow>[] = [
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
              {!financialFlow.agentSalary
                ? financialFlow.flowType === "INCOME"
                  ? "Revenu"
                  : "Dépense"
                : "Salaire"}
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
    accessorKey: "reason",
    header: "Raison",
    cell: ({ row }) => {
      const financialFlow = row.original;

      return (
        <Container>
          <Typography className="line-clamp-1 text-neutral-500 w-[24rem]">
            {financialFlow.reason}
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
          <Typography className="line-clamp-2">
            {financialFlow.agent}
          </Typography>
        </Container>
      );
    },
  },
  {
    id: "seeAction",
    cell: ({ row }) => {
      const financialFlow = row.original;

      return (
        <Container className="flex flex-row gap-2 justify-end">
          <Container>
            <See financialFlow={financialFlow} />
          </Container>
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
