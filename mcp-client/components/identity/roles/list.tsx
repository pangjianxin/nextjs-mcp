"use client";
import DataTable from "@/components/data-grid/data-table";
import { VoloAbpIdentityIdentityUserDto } from "@/openapi";
import { FC } from "react";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { createColumns } from "@/components/identity/roles/columns";
import { usePagination } from "@/hooks/use-pagination";
import { useRoles } from "@/hooks/identity/useRoles";
import { PermissionButton } from "@/components/auth/permission-button";

const RoleList: FC = () => {
  const router = useRouter();
  const {
    page,
    pageSize,
    sorting,
    filter,
    handlePaginationChange,
    handleSortingChange,
    handleGlobalFilterChange,
  } = usePagination(0);

  const handleCreate = () => {
    router.push(`/identity/roles/create`);
  };

  const handleUpdate = (v: VoloAbpIdentityIdentityUserDto) => {
    router.push(`/identity/roles/update/${v.id}`);
  };

  const handleDelete = (v: VoloAbpIdentityIdentityUserDto) => {
    router.push(`/identity/roles/delete/${v.id}`);
  };

  const handlePermission = (v: VoloAbpIdentityIdentityUserDto) => {
    router.push(`/identity/roles/permissions/${v.id}`);
  };

  const { data, isError, isLoading } = useRoles({
    pageIndex: page,
    pageSize: pageSize,
    sorting: sorting,
    filter: filter,
  });

  const columns = createColumns(handleUpdate, handleDelete, handlePermission);

  return (
    <>
      <Card className="w-full px-3 pt-5 pb-3">
        <DataTable
          data={data?.items || []}
          total={data?.totalCount || 0}
          pageIndex={page}
          pageSize={pageSize}
          columns={columns}
          onPaginationChange={handlePaginationChange}
          onSortingChange={handleSortingChange}
          onGlobalFilterChange={handleGlobalFilterChange}
        >
          <PermissionButton
            size={"sm"}
            onClick={handleCreate}
            permission="AbpIdentity.Roles.Create"
          >
            新建角色
          </PermissionButton>
        </DataTable>
      </Card>
    </>
  );
};

export default RoleList;
