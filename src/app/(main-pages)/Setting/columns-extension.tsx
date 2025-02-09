"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/components/typography/typography";
import { Delete } from "./actions-extension/delete";
import { Update } from "./actions-extension/update";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Extension = {
  id: string;
  name: string;
  rate: number;
  agentNumber: number;
  customerNumber: number;
};

export const columns: ColumnDef<Extension>[] = [
  {
    accessorKey: "name",
    header: "Extension",
    cell: ({ row }) => {
      const extension = row.original;
      return (
        <Container>
          <Typography>{extension.name}</Typography>
        </Container>
      );
    },
  },
  {
    accessorKey: "rate",
    header: "Taux de commission",
    cell: ({ row }) => {
      const extension = row.original;
      return (
        <Container className="flex">
          <Container className="bg-green-200 flex p-2 rounded-lg">
            <Typography className="text-green-600">
              {extension.rate} %
            </Typography>
          </Container>
        </Container>
      );
    },
  },
  {
    accessorKey: "agentNumber",
    header: "Nombre d'agents",
    cell: ({ row }) => {
      const extension = row.original;
      return (
        <Container>
          <Typography>{extension.agentNumber}</Typography>
        </Container>
      );
    },
  },
  {
    accessorKey: "customerNumber",
    header: "Nombre de clients",
    cell: ({ row }) => {
      const extension = row.original;
      return (
        <Container>
          <Typography>{extension.customerNumber}</Typography>
        </Container>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const extension = row.original;
      return (
        <Container className="flex flex-row gap-2 justify-end">
          <Container>
            <Update extension={extension} />
          </Container>
          <Container>
            <Delete id={extension.id} name={extension.name} />
          </Container>
        </Container>
      );
    },
  },
];
