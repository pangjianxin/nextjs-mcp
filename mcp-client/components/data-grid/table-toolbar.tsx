"use client";
import type { Table } from "@tanstack/react-table";
import type React from "react";

import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "@/components/data-grid/column-toggle";
import { useDebouncedCallback } from "use-debounce";
import type { ChangeEvent } from "react";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;

  // Replace single children with two separate props
  leftChildren?: React.ReactNode;
  children?: React.ReactNode;
}

export function DataTableToolbar<TData>({
  table,
  leftChildren,
  children,
}: DataTableToolbarProps<TData>) {
  const onFilterChange = useDebouncedCallback(
    (value: ChangeEvent<HTMLInputElement>) => {
      table.setGlobalFilter(value);
    },
    300
  );
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="查询专栏"
          onChange={onFilterChange}
          className="w-[150px] lg:w-[250px]"
        />
        {/* Render leftChildren next to the input */}
        {leftChildren}
      </div>
      <div className="flex gap-1">
        {/* Render rightChildren on the right side */}
        {children}
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
