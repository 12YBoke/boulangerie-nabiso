"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shadcnui/components/ui/table";

import { Button } from "@/ui/components/button/button";
import { BadgePlus, MoveLeft, MoveRight } from "lucide-react";
import { Typography } from "@/ui/components/typography/typography";
import { Input } from "@/shadcnui/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shadcnui/components/ui/dialog";
import { useEffect } from "react";
import { AddSalaryPaymentForm } from "@/ui/modules/add-salary-payment-form/add-salary-payment-form";

interface DataTableProps<
  TData extends { flowType: "INCOME" | "EXPENSE" },
  TValue
> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  userData:
    | {
        id: string;
        extensionId: string;
        role: "ADMIN" | "USER";
      }
    | undefined;
}

export function DataTableAgent<
  TData extends { flowType: "INCOME" | "EXPENSE" },
  TValue
>({ columns, data, userData }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  // Add this effect to update columnVisibility when userData changes
  useEffect(() => {
    if (userData && userData.role) {
      setColumnVisibility({
        actions: userData.role === "USER" ? false : true,
      });
    }
  }, [userData]);

  const [dataFiltered, setDataFiltered] = React.useState<TData[]>(data);
  const [type, setType] = React.useState<"INCOME" | "EXPENSE" | null>(null);

  useEffect(() => {
    if (type) {
      setDataFiltered(data.filter((d) => d.flowType === type));
    } else {
      setDataFiltered(data);
    }
  }, [type, data]);

  const table = useReactTable({
    data: dataFiltered,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  return (
    <Dialog>
      <div>
        <div className="flex pb-4 flex-col gap-4 md:flex-row justify-between">
          <div className="flex gap-4 flex-row">
            <Input
              placeholder="Filtrez par agent"
              value={
                (table.getColumn("reason")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("reason")?.setFilterValue(event.target.value)
              }
              className="w-full lg:w-auto rounded-lg focus:ring-primary-500"
            />
          </div>

          <DialogTrigger asChild>
            <span className="flex flex-row py-2 px-4 cursor-pointer justify-center items-center bg-primary-100 animate rounded-lg hover:bg-primary-200 w-full md:w-auto text-primary-800">
              <BadgePlus className="mr-2 h-6 w-6" />
              Ajouter un paiement
            </span>
          </DialogTrigger>
        </div>
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        <Typography variant="title-sm">
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </Typography>
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="text-body-base">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    Aucune transaction trouvée
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="ghost"
            outline="outline"
            buttonType="action"
            action={async () => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="text-black rounded-lg cursor-pointer"
            Icon={MoveLeft}
          />
          <Button
            variant="ghost"
            outline="outline"
            buttonType="action"
            action={async () => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="text-black rounded-lg cursor-pointer"
            Icon={MoveRight}
          />
        </div>
      </div>
      <DialogContent>
        <DialogHeader className="flex flex-col gap-4">
          <DialogTitle>
            <Typography variant="title-lg">
              Ajouter un paiement salaire
            </Typography>
          </DialogTitle>
          <DialogDescription className="h-full w-full text-gray-600">
            Ajoutez un paiement salaire opéré durant la journée. Veuillez
            remplir tous les champs requis pour ajouter une nouvelle
            transaction.
          </DialogDescription>
          <AddSalaryPaymentForm userData={userData} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
