"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Container } from "@/ui/components/container/container";
import { truncateText } from "@/lib/truncate-text";
import { Update } from "./actions/update";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { FormatNumberWithCurrency } from "@/lib/format-number-with-currency";
import clsx from "clsx";
import Link from "next/link";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export interface Deliveries {
  id: string;
  amount: number | null;
  amountPaid: number | null;
  amountToBeDelivered: number | null;
  voucherPaid: number | null;
  type: "ORDER" | "CASH_SALE" | "CHARGE" | "DONATION" | "DAMAGE";
  typeLabel: string;
  name: string;
  dateOrdered: Date;
  deliveries: {
    id: string;
    amountDelivered: number | null;
    dateDelivered: Date | null;
  }[];
  cardId: string | null;
  cardNumber: number | null;
  customerId: string | null;
  totaldelivered: number;
}

export const columns: ColumnDef<Deliveries>[] = [
  {
    accessorKey: "cardNumber",
    header: "N° carte",
    cell: ({ row }) => {
      const delivery = row.original;
      return (
        <>
          {delivery.cardNumber ? (
            <Link
              href={`Customers/${delivery.customerId}`}
              className="hover:underline underline-offset-2"
            >
              <span className="text-body-base">{delivery.cardNumber!}</span>
            </Link>
          ) : (
            <span className="text-body-base">
              {truncateText(delivery.name, 10)}
            </span>
          )}
        </>
      );
    },
  },
  {
    accessorKey: "typeLabel",
    header: "Type",
    cell: ({ row }) => {
      const delivery = row.original;
      return <span className="text-body-base">{delivery.typeLabel}</span>;
    },
  },
  {
    accessorKey: "dateOrdered",
    header: "Date",
    cell: ({ row }) => {
      const delivery = row.original;
      return (
        <span className="text-body-base">
          {format(delivery.dateOrdered!, "dd-MM-yyyy", { locale: fr })}
        </span>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Commande",
    cell: ({ row }) => {
      const delivery = row.original;
      return (
        <span
          className={clsx(
            "text-body-base px-2 py-1 rounded-lg",
            delivery.type === "ORDER"
              ? delivery.totaldelivered === delivery.amount ||
                delivery.totaldelivered === 0
                ? "bg-emerald-100 text-emerald-800"
                : "bg-red-200 text-red-800"
              : delivery.totaldelivered === delivery.amountToBeDelivered ||
                delivery.totaldelivered === 0
              ? "bg-emerald-100 text-emerald-800"
              : "bg-red-200 text-red-800"
          )}
        >
          {delivery.type === "ORDER"
            ? FormatNumberWithCurrency(delivery.amount || 0)
            : FormatNumberWithCurrency(delivery.amountToBeDelivered || 0)}
        </span>
      );
    },
  },
  {
    accessorKey: "amountPaid",
    header: "Montant payé",
    cell: ({ row }) => {
      const delivery = row.original;
      return (
        <span className="text-body-base px-2 py-1 rounded-lg bg-primary-100 text-primary-800">
          {delivery.type === "ORDER"
            ? FormatNumberWithCurrency(delivery.amountPaid || 0)
            : FormatNumberWithCurrency(delivery.amount || 0)}
        </span>
      );
    },
  },
  {
    accessorKey: "voucherPaid",
    header: "B.P.P.",
    cell: ({ row }) => {
      const delivery = row.original;
      return (
        <span className="text-body-base">
          {FormatNumberWithCurrency(delivery.voucherPaid || 0)}
        </span>
      );
    },
  },
  {
    accessorKey: "deliveries",
    header: "Montant livré",
    cell: ({ row }) => {
      const delivery = row.original;
      return (
        <span className="text-body-base">
          {FormatNumberWithCurrency(
            delivery.deliveries.length > 0
              ? delivery.deliveries.reduce((acc, curr) => {
                  return acc + (curr.amountDelivered || 0);
                }, 0)
              : delivery.type === "ORDER"
              ? delivery.amount || 0
              : delivery.amountToBeDelivered || 0
          )}
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const delivery = row.original;
      return (
        <Container className="flex flex-row gap-2 justify-end">
          <Update delivery={delivery} />
        </Container>
      );
    },
  },
];
