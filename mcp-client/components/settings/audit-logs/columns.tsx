"use client";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-grid/column-header";
import { WalleeMcpAuditLogsDtosAuditLogDto } from "@/openapi";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import {
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
  Tooltip,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
export const createColumns = (
  onDetail: (v: WalleeMcpAuditLogsDtosAuditLogDto) => void | Promise<void>
): ColumnDef<WalleeMcpAuditLogsDtosAuditLogDto>[] => [
  {
    accessorKey: "userName",
    meta: { displayName: "用户名" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="用户名" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2 w-full">
          <span className="truncate font-medium">
            {row.getValue("userName")}
          </span>
        </div>
      );
    },
  },
  //   {
  //     accessorKey: "tenantName",
  //     meta: { displayName: "租户名称" },
  //     header: ({ column }) => (
  //       <DataTableColumnHeader column={column} title="租户名称" />
  //     ),
  //     cell: ({ row }) => {
  //       return (
  //         <div className="flex space-x-2">
  //           <span className="max-w-[500px] truncate font-medium">
  //             {row.getValue("tenantName")}
  //           </span>
  //         </div>
  //       );
  //     },
  //   },
  {
    accessorKey: "executionTime",
    meta: { displayName: "执行日期" },
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="截至日期"
        className="max-w-[200px]"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex max-w-[100px] space-x-2">
          <span className="max-w-[300px] truncate font-medium">
            {format(row.getValue("executionTime"), "yyyy-MM-dd")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "executionDuration",
    meta: { displayName: "消耗时间" },
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="消耗时间(毫秒)"
        className="max-w-[200px]"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex max-w-[100px] space-x-2">
          <span className="max-w-[300px] truncate font-medium">
            {row.getValue("executionDuration")}毫秒
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "clientIpAddress",
    meta: { displayName: "源IP" },
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="源IP"
        className="max-w-[200px]"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex max-w-[100px] space-x-2">
          <span className="max-w-[300px] truncate font-medium">
            {row.getValue("clientIpAddress")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "clientName",
    meta: { displayName: "客户端名称" },
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="客户端名称"
        className="max-w-[200px]"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex max-w-[100px] space-x-2">
          <span className="max-w-[300px] truncate font-medium">
            {row.getValue("clientName")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "clientId",
    meta: { displayName: "客户端ID" },
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="客户端ID"
        className="max-w-[200px]"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex max-w-[100px] space-x-2">
          <span className="max-w-[300px] truncate font-medium">
            {row.getValue("clientId")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "browserInfo",
    meta: { displayName: "浏览器信息" },
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="浏览器信息"
        className="max-w-[200px]"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex max-w-[100px] space-x-2">
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="w-full truncate font-medium">
                  {row.getValue("browserInfo")}
                </span>
              </TooltipTrigger>
              <TooltipContent>{row.getValue("browserInfo")}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },
  },
  {
    accessorKey: "httpMethod",
    meta: { displayName: "HTTP METHOD" },
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="HTTP METHOD"
        className="max-w-[200px]"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex max-w-[100px] space-x-2">
          <span className="max-w-[300px] truncate font-medium">
            {row.getValue("httpMethod")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "url",
    meta: { displayName: "访问路径" },
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="访问路径"
        className="max-w-[200px]"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex max-w-[100px] space-x-2">
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="w-full truncate font-medium">
                  {row.getValue("url")}
                </span>
              </TooltipTrigger>
              <TooltipContent>{row.getValue("url")}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },
  },
  {
    accessorKey: "exceptions",
    meta: { displayName: "异常(若有)" },
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="异常(若有)"
        className="max-w-[100px]"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex max-w-[100px] space-x-2">
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="w-full truncate font-medium">
                  {row.getValue("exceptions")}
                </span>
              </TooltipTrigger>
              <TooltipContent>{row.getValue("exceptions")}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },
  },
  {
    accessorKey: "comments",
    meta: { displayName: "备注" },
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="备注"
        className="max-w-[200px]"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex max-w-[100px] space-x-2">
          <span className="max-w-[300px] truncate font-medium">
            {row.getValue("comments")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "httpStatusCode",
    meta: { displayName: "HTTP返回码" },
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="HTTP返回码"
        className="max-w-[200px]"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex max-w-[100px] space-x-2">
          <Badge
            variant={
              row.getValue<string>("httpStatusCode").toString().startsWith("2")
                ? "default"
                : "destructive"
            }
          >
            {row.getValue("httpStatusCode")}
          </Badge>
        </div>
      );
    },
  },
  {
    id: "actions",
    meta: { displayName: "操作" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="操作" />
    ),
    enableSorting: false,
    cell: ({ row }) => {
      return (
        <div className="flex flex-row gap-2">
          <Button size={"sm"} onClick={() => onDetail(row.original)}>
            详情
          </Button>
        </div>
      );
    },
  },
];
