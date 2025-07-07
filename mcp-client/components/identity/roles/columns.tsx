"use client";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-grid/column-header";
import { VoloAbpIdentityIdentityRoleDto } from "@/openapi";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PermissionButton } from "@/components/auth/permission-button";

export const createColumns = (
  onUpdate: (blog: VoloAbpIdentityIdentityRoleDto) => void,
  onDelete: (blog: VoloAbpIdentityIdentityRoleDto) => void,
  onPermission: (blog: VoloAbpIdentityIdentityRoleDto) => void
): ColumnDef<VoloAbpIdentityIdentityRoleDto>[] => {
  return [
    {
      accessorKey: "name",
      meta: { displayName: "角色名称" },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="角色名称" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("name")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "isDefault",
      meta: { displayName: "是否默认" },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="是否默认" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <Badge>{row.getValue("isDefault") ? "默认" : "非默认"}</Badge>
          </div>
        );
      },
    },
    {
      accessorKey: "isPublic",
      meta: { displayName: "是否公开" },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="是否公开" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <Badge>{row.getValue("isPublic") ? "公开" : "不公开"}</Badge>
          </div>
        );
      },
    },
    {
      accessorKey: "isStatic",
      meta: { displayName: "是否静态" },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="是否静态" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <Badge>
              {row.getValue("isStatic") ? "静态(不可删除)" : "非静态"}
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
      cell: ({ row }) => (
        <>
          <div className="flex items-center gap-2">
            <PermissionButton
              size={"sm"}
              onClick={() => onUpdate?.(row.original)}
              permission="AbpIdentity.Roles.Update"
            >
              更新
            </PermissionButton>
            <PermissionButton
              size={"sm"}
              onClick={() => onDelete?.(row.original)}
              variant={"destructive"}
              permission="AbpIdentity.Roles.Delete"
            >
              删除
            </PermissionButton>
            <PermissionButton
              size={"sm"}
              variant={"outline"}
              onClick={() => onPermission(row.original)}
              permission="AbpIdentity.Roles.ManagePermissions"
            >
              权限
            </PermissionButton>
          </div>
        </>
      ),
    },
  ];
};
