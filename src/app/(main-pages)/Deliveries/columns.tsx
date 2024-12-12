"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Container } from "@/ui/components/container/container";
import { truncateText } from "@/lib/truncate-text";
import { See } from "./actions/see";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { FormatNumberWithCurrency } from "@/lib/format-number-with-currency";
import clsx from "clsx";
import Link from "next/link";
import { Update } from "./actions/update";
import { Delete } from "./actions/delete";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export interface Deliveries {
  id: string;
  amount: number | null;
  amountPaid: number | null;
  amountToBeDelivered: number | null;
  voucherPaid: number | null;
  type: "ORDER" | "CASH_SALE" | "CHARGE" | "DONATION" | "DAMAGE" | "BURN";
  typeLabel: string;
  CustomerId: string | null;
  name: string;
  dateOrdered: Date;
  deliveries: {
    id: string;
    amountDelivered: number | null;
    dateDelivered: Date | null;
  }[];
  arraydeliveries: {
    id: string;
    amountDelivered: number | null;
    dateDelivered: Date | null;
  }[];
  cardId: string | null;
  cardNumber: number | null;
  customerId: string | null;
  totaldelivered: number;
  isDate: boolean;
  userId: string;
  voucher: number | null;
}

export const columns: ColumnDef<Deliveries>[] = [
  {
    accessorKey: "cardNumber",
    filterFn: (row, columnId, filterValue: string) => {
      const search = filterValue.toLowerCase();
      let value = row.getValue(columnId) as string | null;

      // Rejeter les valeurs null
      if (value === null) return false;

      // Convertir les valeurs numériques en chaînes
      if (typeof value === "number") value = String(value);

      return value.toLowerCase().includes(search);
    },
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
            <span className="text-body-base">-</span>
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
            delivery.isDate
              ? delivery.type === "ORDER"
                ? delivery.totaldelivered === delivery.amount ||
                  delivery.totaldelivered === 0
                  ? "bg-amber-100 text-amber-800"
                  : "bg-red-200 text-red-800"
                : delivery.totaldelivered === delivery.amountToBeDelivered ||
                  delivery.totaldelivered === 0
                ? "bg-amber-100 text-amber-800"
                : "bg-red-200 text-red-800"
              : delivery.type === "ORDER"
              ? delivery.totaldelivered === delivery.amount ||
                delivery.totaldelivered === 0
                ? "text-amber-500"
                : "text-red-500"
              : delivery.totaldelivered === delivery.amountToBeDelivered ||
                delivery.totaldelivered === 0
              ? "text-amber-500"
              : "text-red-500"
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
        <span className="text-body-base">
          {delivery.isDate
            ? delivery.type === "ORDER"
              ? FormatNumberWithCurrency(delivery.amountPaid || 0)
              : FormatNumberWithCurrency(delivery.amount || 0)
            : "-"}
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
          {delivery.isDate
            ? FormatNumberWithCurrency(delivery.voucherPaid || 0)
            : "-"}
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
          <See delivery={delivery} />
          <Update order={delivery} />
          <Delete id={delivery.id} />
        </Container>
      );
    },
  },
];
