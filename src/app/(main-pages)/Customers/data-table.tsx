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
import { useEffect } from "react";

import { Button } from "@/ui/components/button/button";
import { MoveLeft, MoveRight, Plus, UserPlus } from "lucide-react";
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
import { AddCustomerForm } from "@/ui/modules/add-customer-form/add-customer-form";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  userData: {
    id: string;
    extensionId: string;
    role: "ADMIN" | "USER";
  };
}

export function DataTable<TData, TValue>({
  columns,
  data,
  userData,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  useEffect(() => {
    if (userData && userData.role) {
      setColumnVisibility({
        actions: userData.role === "USER" ? false : true,
      });
    }
  }, [userData]);
  const table = useReactTable({
    data,
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
              placeholder="Filtrez par N° du client"
              value={
                (table
                  .getColumn("customerNumber")
                  ?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table
                  .getColumn("customerNumber")
                  ?.setFilterValue(event.target.value)
              }
              className="w-full lg:w-auto rounded-lg focus:ring-primary-500"
              type="number"
            />
            <Input
              placeholder="Filtrez par nom du client"
              value={
                (table.getColumn("name")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
              className="w-full lg:w-auto rounded-lg focus:ring-primary-500"
            />
          </div>
          <DialogTrigger asChild>
            <span className="flex flex-row py-2 px-4 cursor-pointer justify-center items-center bg-primary-100 animate rounded-lg hover:bg-primary-200 w-full md:w-auto text-primary-800">
              <UserPlus className="mr-2 h-6 w-6" />
              Ajouter un client
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
                    Aucun client trouvé
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
            <Typography variant="title-lg">Ajouter un client</Typography>
          </DialogTitle>
          <DialogDescription className="h-full w-full">
            Ajoutez un client à votre liste
          </DialogDescription>
          <AddCustomerForm userData={userData!} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
