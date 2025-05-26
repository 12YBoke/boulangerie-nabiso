"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Typography } from "@/ui/components/typography/typography";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { FormatNumberWithCurrency } from "@/lib/format-number-with-currency";
import { Container } from "@/ui/components/container/container";
import { Update } from "./actions/update";
import { Delete } from "./actions/delete";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shadcnui/components/ui/popover";
import { IdCard } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Order = {
  id: string;
  cardId: string | null;
  amount: number | null;
  amountPaid: number | null;
  voucher: number | null;
  voucherPaid: number | null;
  dateOrdered: Date | null;
  CustomerId: string | null;
  userId: string;
  user: {
    name: string;
  };
  name: string | null;
  amountToBeDelivered: number | null;
  type: "ORDER" | "CASH_SALE" | "CHARGE" | "DONATION" | "DAMAGE" | "BURN";
};

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "dateOrdered",
    header: "Date",
    cell: ({ row }) => {
      const order = row.original;
      return (
        <Typography>
          {format(order.dateOrdered!, "dd-MM-yyyy", { locale: fr })}
        </Typography>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Commande",
    cell: ({ row }) => {
      const order = row.original;
      return <Typography>{FormatNumberWithCurrency(order.amount!)}</Typography>;
    },
  },
  {
    accessorKey: "amountPaid",
    header: "Payé",
    cell: ({ row }) => {
      const order = row.original;
      return (
        <Typography>{FormatNumberWithCurrency(order.amountPaid!)}</Typography>
      );
    },
  },
  {
    accessorKey: "voucher",
    header: "B.P.",
    cell: ({ row }) => {
      const order = row.original;
      return (
        <Typography>{FormatNumberWithCurrency(order.voucher!)}</Typography>
      );
    },
  },
  {
    accessorKey: "voucherPaid",
    header: "B.P.P.",
    cell: ({ row }) => {
      const order = row.original;
      return (
        <Typography>{FormatNumberWithCurrency(order.voucherPaid!)}</Typography>
      );
    },
  },
  {
    id: "seeAction",
    cell: ({ row }) => {
      const delivery = row.original;
      return (
        <Container className="flex flex-row gap-2 justify-end">
          <Popover>
            <PopoverTrigger
              asChild
              className="cursor-pointer rounded-full bg-amber-50 hover:bg-amber-100 animate flex flex-row items-center text-amber-500"
            >
              <span className="p-2">
                <IdCard className="h-5 w-5" />
              </span>
            </PopoverTrigger>
            <PopoverContent className="max-w-80">
              <Typography>{delivery.user.name}</Typography>
            </PopoverContent>
          </Popover>
        </Container>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original;

      return (
        <Container className="flex flex-row gap-2 justify-end">
          <Container>
            <Update order={order!} />
          </Container>
          <Container>
            <Delete id={order.id} />
          </Container>
        </Container>
      );
    },
  },
];
