"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-grid/column-header";
import { VoloAbpIdentityIdentityUserDto } from "@/openapi";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { PermissionButton } from "@/components/auth/permission-button";

export const createColumns = (
  onUpdate: (row: VoloAbpIdentityIdentityUserDto) => void,
  onDelete: (row: VoloAbpIdentityIdentityUserDto) => void,
  onPermission: (row: VoloAbpIdentityIdentityUserDto) => void
): ColumnDef<VoloAbpIdentityIdentityUserDto>[] => {
  return [
    {
      accessorKey: "userName",
      meta: { displayName: "登录用户名" },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="登录用户名" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("userName")}
            </span>
          </div>
        );
      },
    },

    {
      accessorKey: "email",
      meta: { displayName: "邮箱" },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="邮箱" />
      ),
      cell: ({ row }) => {
        return <div className="flex space-x-2">{row.getValue("email")}</div>;
      },
    },
    {
      accessorKey: "name",
      meta: { displayName: "用户名" },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="用户名" />
      ),
      cell: ({ row }) => {
        return <div className="flex space-x-2">{row.getValue("name")}</div>;
      },
    },
    {
      accessorKey: "surName",
      meta: { displayName: "昵称" },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="昵称" />
      ),
      cell: ({ row }) => {
        return <div className="flex space-x-2">{row.getValue("surName")}</div>;
      },
    },
    {
      accessorKey: "creationTime",
      meta: { displayName: "创建日期" },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="创建日期" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <Badge>{format(row.getValue("creationTime"), "yyyy-MM-dd")}</Badge>
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
      cell: ({ row }) => (
        <>
          <div className="flex items-center gap-2">
            <PermissionButton
              size={"sm"}
              onClick={() => onUpdate(row.original)}
              permission="AbpIdentity.Users.Update"
            >
              更新
            </PermissionButton>

            <PermissionButton
              size={"sm"}
              variant={"destructive"}
              onClick={() => onDelete(row.original)}
              permission="AbpIdentity.Users.Delete"
            >
              删除
            </PermissionButton>
            <PermissionButton
              size={"sm"}
              variant={"outline"}
              onClick={() => onPermission(row.original)}
              permission="AbpIdentity.Users.ManagePermissions"
            >
              权限
            </PermissionButton>
          </div>
        </>
      ),
    },
  ];
};
