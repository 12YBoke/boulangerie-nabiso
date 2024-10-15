"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Typography } from "@/ui/components/typography/typography"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { FormatNumberWithCurrency } from "@/lib/format-number-with-currency"
// import { Delete } from "./actions/delete"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Order = {
  id: string
  cardId: string | null
  amount: number | null
  amountPaid: number | null
  voucher: number | null
  voucherPaid: number | null
  dateOrdered: Date | null
  CustomerId: string | null
  userId: string
}

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "dateOrdered",
    header: "Date",
    cell: ({ row }) => {
      const order = row.original
      return (
        <Typography>
          {format(order.dateOrdered!, "dd-MM-yyyy", { locale: fr })}
        </Typography>
      )
    }
  },
  {
    accessorKey: "amount",
    header: "Commande",
    cell: ({ row }) => {
      const order = row.original
      return (
        <Typography>
          {FormatNumberWithCurrency(order.amount!)}
        </Typography>
      )
    }
  },
  {
    accessorKey: "amountPaid",
    header: "Payé",
    cell: ({ row }) => {
      const order = row.original
      return (
        <Typography>
          {FormatNumberWithCurrency(order.amountPaid!)}
        </Typography>
      )
    }
  },
  {
    accessorKey: "voucher",
    header: "B.P.",
    cell: ({ row }) => {
      const order = row.original
      return (
        <Typography>
          {FormatNumberWithCurrency(order.voucher!)}
        </Typography>
      )
    }
  },
  {
    accessorKey: "voucherPaid",
    header: "B.P.P.",
    cell: ({ row }) => {
      const order = row.original
      return (
        <Typography>
          {FormatNumberWithCurrency(order.voucherPaid!)}
        </Typography>
      )
    }
  }
  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     const order = row.original
 
  //     return (
  //       <Container className="flex flex-row gap-2 justify-end">
  //         <Container>
  //           <Delete id={order.id} name={order.name} />
  //         </Container>
  //       </Container>
  //     )
  //   },
  // },
]
