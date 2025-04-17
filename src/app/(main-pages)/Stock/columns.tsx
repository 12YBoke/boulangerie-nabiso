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
export type Stock = {
  id: string;
  name: string;
  startingStock: string;
  endingStock: string;
  date: Date;
  dayProduction: string;
  agent: string;
};

export const columns: ColumnDef<Stock>[] = [
  {
    accessorKey: "name",
    header: "Produit",
    cell: ({ row }) => {
      const stock = row.original;
      return (
        <Container className="flex">
          <Typography>{stock.name}</Typography>
        </Container>
      );
    },
  },
  {
    accessorKey: "startingStock",
    header: "Stock de départ",
    cell: ({ row }) => {
      const stock = row.original;
      return (
        <Container className="flex">
          <Typography>{stock.startingStock}</Typography>
        </Container>
      );
    },
  },
  {
    accessorKey: "dayProduction",
    header: "Production du jour",
    cell: ({ row }) => {
      const stock = row.original;
      return (
        <Container className="flex">
          <Typography>{stock.dayProduction}</Typography>
        </Container>
      );
    },
  },
  {
    accessorKey: "endingStock",
    header: "Stock final",
    cell: ({ row }) => {
      const stock = row.original;
      return (
        <Container className="flex">
          <Typography>{stock.endingStock}</Typography>
        </Container>
      );
    },
  },
  {
    id: "seeAction",
    cell: ({ row }) => {
      const stock = row.original;

      return (
        <Container className="flex flex-row gap-2 justify-end">
          <Container>
            <See stock={stock} />
          </Container>
        </Container>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const stock = row.original;

      return (
        <Container className="flex flex-row gap-2 justify-end">
          <Container>
            <Update stock={stock} />
          </Container>
          <Container>
            <Delete id={stock.id} />
          </Container>
        </Container>
      );
    },
  },
];
