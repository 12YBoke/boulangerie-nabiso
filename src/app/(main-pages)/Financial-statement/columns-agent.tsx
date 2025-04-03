"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/components/typography/typography";
import { FormatNumberWithCurrency } from "@/lib/format-number-with-currency";
import { UpdateAgent } from "./actions/update-agent";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type FinancialFlow = {
  id: string;
  amount: number;
  reason: string;
  date: Date;
  flowType: "INCOME" | "EXPENSE";
  agent: string;
  agentSalary?: {
    id: string;
    dailySalary: number | null;
    missingTotal: number | null;
    missingRemoved: number | null;
    missingRemaining: number | null;
  } | null;
  cardPayment?: {
    id: string;
    customerNumber: number;
  } | null;
};

const mapFinancialFlowToSalaryPayment = (financialFlow: {
  id: string;
  amount: number;
  reason: string;
  date: Date;
  flowType: "INCOME" | "EXPENSE";
  agent: string;
  agentSalary?: {
    id: string;
    dailySalary: number | null;
    missingTotal: number | null;
    missingRemoved: number | null;
    missingRemaining: number | null;
  } | null;
}) => {
  return {
    amount: financialFlow.amount,
    reason: financialFlow.reason,
    date: financialFlow.date,
    id: financialFlow.id,
    dailySalary: financialFlow.agentSalary?.dailySalary ?? 0,
    missingTotal: financialFlow.agentSalary?.missingTotal ?? 0,
    missingRemoved: financialFlow.agentSalary?.missingRemoved ?? 0,
    missingRemaining: financialFlow.agentSalary?.missingRemaining ?? 0,
  };
};

export const columnsAgent: ColumnDef<FinancialFlow>[] = [
  {
    accessorKey: "reason",
    header: "Nom",
    cell: ({ row }) => {
      const financialFlow = row.original;

      return (
        <Container>
          <Typography>{financialFlow.reason}</Typography>
        </Container>
      );
    },
  },
  {
    header: "Salaire du jour",
    cell: ({ row }) => {
      const financialFlow = row.original;

      return (
        <Container>
          <Typography>
            {FormatNumberWithCurrency(
              financialFlow.agentSalary?.dailySalary || 0
            )}
          </Typography>
        </Container>
      );
    },
  },
  {
    header: "Total manquant",
    cell: ({ row }) => {
      const financialFlow = row.original;

      return (
        <Container>
          <Typography>
            {FormatNumberWithCurrency(
              financialFlow.agentSalary?.missingTotal || 0
            )}
          </Typography>
        </Container>
      );
    },
  },
  {
    header: "Manquant retranché",
    cell: ({ row }) => {
      const financialFlow = row.original;

      return (
        <Container>
          <Typography>
            {FormatNumberWithCurrency(
              financialFlow.agentSalary?.missingRemoved || 0
            )}
          </Typography>
        </Container>
      );
    },
  },
  {
    header: "Manquant restant",
    cell: ({ row }) => {
      const financialFlow = row.original;

      return (
        <Container>
          <Typography>
            {FormatNumberWithCurrency(
              financialFlow.agentSalary?.missingRemaining || 0
            )}
          </Typography>
        </Container>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Net à payer",
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
    id: "actions",
    cell: ({ row }) => {
      const financialFlow = row.original;

      return (
        <Container className="flex flex-row gap-2 justify-end">
          <Container>
            <UpdateAgent
              salaryPayment={mapFinancialFlowToSalaryPayment(financialFlow)}
            />
          </Container>
        </Container>
      );
    },
  },
];
