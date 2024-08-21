"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Container } from "@/ui/components/container/container"
import { Typography } from "@/ui/components/typography/typography"
import { truncateText } from "@/lib/truncate-text"
import { ArrowUpDown } from "lucide-react"
import { See } from "./actions/see"
import { Delete } from "./actions/delete"
import { Update } from "./actions/update"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Customer = {
  id: string
  customerNumber: number
  name: string
  phoneNumber: string
  createdAt: Date
}

export const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: "customerNumber",
    filterFn: (row, columnId, filterValue: string) => {
      const search = filterValue.toLowerCase();
      let value = row.getValue(columnId) as string;
      if (typeof value === "number") value = String(value);
      return value?.toLowerCase().includes(search);
    },
    header: ({ column }) => {
      return (
        <span
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex flex-row items-center"
        >
          <ArrowUpDown strokeWidth={1.5} className="h-5 w-5 mr-2" />
          N° client
        </span>
      )
    },
    cell: ({ row }) => {
      const customer = row.original
      return (
        <span>
          {customer.customerNumber}
        </span>
      )
    }
  },
  {
    accessorKey: "name",
    header: "Nom",
  },
  {
    accessorKey: "phoneNumber",
    header: "Téléphone",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const customer = row.original
 
      return (
        <Container className="flex flex-row gap-2 justify-end">
          <Container>
            <See customer={customer} />
          </Container>
          <Container>
            <Update customer={customer} />
          </Container>
          <Container>
            <Delete id={customer.id} name={customer.name} />
          </Container>
        </Container>
      )
    },
  },
]
