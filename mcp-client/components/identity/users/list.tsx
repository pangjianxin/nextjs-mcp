"use client";
import DataTable from "@/components/data-grid/data-table";
import { createColumns } from "@/components/identity/users/columns";
import { VoloAbpIdentityIdentityUserDto } from "@/openapi";
import { FC } from "react";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useUsers } from "@/hooks/identity/useUsers";
import { usePagination } from "@/hooks/use-pagination";
import { PermissionButton } from "@/components/auth/permission-button";
const UserList: FC = () => {
  const {
    page,
    pageSize,
    sorting,
    filter,
    handlePaginationChange,
    handleSortingChange,
    handleGlobalFilterChange,
  } = usePagination(0);

  const { data, isError, isLoading } = useUsers({
    pageIndex: page,
    pageSize: pageSize,
    sorting: sorting,
    filter: filter,
  });
  const router = useRouter();

  const handleCreate = () => {
    router.push("/identity/users/create");
  };

  const handleUpdate = (v: VoloAbpIdentityIdentityUserDto) => {
    router.push(`/identity/users/update/${v.id}`);
  };

  const handleDelete = (v: VoloAbpIdentityIdentityUserDto) => {
    router.push(`/identity/users/delete/${v.id}`);
  };

  const handlePermission = (v: VoloAbpIdentityIdentityUserDto) => {
    router.push(`/identity/users/permissions/${v.id}`);
  };

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
            permission="AbpIdentity.Users.Create"
            size="sm"
            onClick={handleCreate}
          >
            新建用户
          </PermissionButton>
        </DataTable>
      </Card>
    </>
  );
};

export default UserList;
