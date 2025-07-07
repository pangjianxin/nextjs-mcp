"use client";

import {
  ColumnDef,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "@/components/data-grid/pagination";
import { DataTableToolbar } from "@/components/data-grid/table-toolbar";
import React, { memo, useState } from "react";
import Loader from "@/components/utils/loader";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  total: number;
  pageSize: number;
  pageIndex: number;
  onGlobalFilterChange?: (filter: string) => void;
  onPaginationChange?: (pageIndex: number, pageSize: number) => void;
  onSortingChange?: (sorting: string) => void;
  children?: React.ReactNode;
  leftChildren?: React.ReactNode;
}

function DataTable<TData, TValue>({
  columns,
  data,
  total,
  pageSize,
  pageIndex,
  onGlobalFilterChange,
  onSortingChange,
  onPaginationChange,
  leftChildren,
  children,
}: DataTableProps<TData, TValue>) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    columns.reduce((acc, column) => {
      acc[(column as { accessorKey: string }).accessorKey] =
        (column.meta as { visible?: boolean }).visible ?? true;
      return acc;
    }, {} as VisibilityState)
  );

  const table = useReactTable({
    data,
    rowCount: total,
    columns,
    meta: columns.find((it) => it.id === "actions")?.meta,
    manualFiltering: true,
    manualPagination: true,
    manualSorting: true,
    state: {
      columnVisibility: columnVisibility,
      //服务端分页没必要记住排序和过滤等参数，因为每次都是从服务端获取数据，table默认是已经处理过的数据了
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: (value) => {
      onGlobalFilterChange?.(value.target.value);
    },
    onSortingChange: (updater) => {
      let sorting = undefined as string | undefined;

      if (typeof updater === "function") {
        //updater can be either a function or a value
        //what a suck design
        const sortState = updater([]);
        sorting = sortState
          .map((it) => `${it.id} ${it.desc ? "desc" : "asc"}`)
          .join(",");
      } else {
        sorting = updater
          .map((it) => `${it.id} ${it.desc ? "desc" : "asc"}`)
          .join(",");
      }
      onSortingChange?.(sorting);
    },
    onPaginationChange: (updater) => {
      if (typeof updater === "function") {
        const pagination = updater(table.getState().pagination);
        onPaginationChange?.(pagination.pageIndex, pagination.pageSize);
      }
    },
  });

  return (
    <div className="space-y-4">
      <DataTableToolbar table={table} leftChildren={leftChildren}>
        {children && children}
      </DataTableToolbar>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
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
                    <TableCell key={cell.id}>
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
                  <Loader />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}

export default memo(DataTable) as typeof DataTable;
