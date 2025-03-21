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

import { Typography } from "@/ui/components/typography/typography";
import { Input } from "@/shadcnui/components/ui/input";
import { Dialog } from "@/shadcnui/components/ui/dialog";
import { Button } from "@/ui/components/button/button";
import { useEffect } from "react";
import { MoveLeft, MoveRight } from "lucide-react";

interface DataTableProps<TData, TValue> {
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
        <div className="flex py-4 flex-col gap-4 md:flex-row justify-between">
          <div className="flex gap-4 flex-row">
            <Input
              placeholder="Filtrez par N° du client"
              value={
                (table.getColumn("cardNumber")?.getFilterValue() as string) ??
                ""
              }
              onChange={(event) =>
                table
                  .getColumn("cardNumber")
                  ?.setFilterValue(event.target.value)
              }
              className="w-full lg:w-auto rounded-lg focus:ring-primary-500"
              type="number"
            />
            <Input
              placeholder="Filtrez par type"
              value={
                (table.getColumn("typeLabel")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("typeLabel")?.setFilterValue(event.target.value)
              }
              className="w-full lg:w-auto rounded-lg focus:ring-primary-500"
            />
          </div>
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
                    Aucune commande trouvée
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
    </Dialog>
  );
}
