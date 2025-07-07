"use client";
import { Card } from "@/components/ui/card";
import { createColumns } from "@/components/settings/audit-logs/columns";
import DataTable from "@/components/data-grid/data-table";
import { WalleeMcpAuditLogsDtosAuditLogDto } from "@/openapi";
import { usePagination } from "@/hooks/use-pagination";
import { useRouter } from "next/navigation";
import { useAuditLogs } from "@/hooks/settings/useAuditLogs";

const AuditLogs = () => {
  const router = useRouter();

  const handleDetail = (v: WalleeMcpAuditLogsDtosAuditLogDto) => {
    router.push(`/settings/audit-logs/${v.id}`);
  };

  const columns = createColumns(handleDetail);

  const {
    page,
    pageSize,
    sorting,
    filter,
    handlePaginationChange,
    handleSortingChange,
    handleGlobalFilterChange,
  } = usePagination(0);

  const { data, isError, isLoading } = useAuditLogs({
    pageIndex: page,
    pageSize,
    sorting,
  });

  return (
    <>
      <Card className="w-full p-5  border-none shadow-none transition-all ease-in-out duration-100 hover:shadow-lg">
        <DataTable
          data={data?.items || []}
          total={data?.totalCount || 0}
          pageIndex={page!}
          pageSize={pageSize!}
          columns={columns}
          onPaginationChange={handlePaginationChange}
          onSortingChange={handleSortingChange}
          onGlobalFilterChange={handleGlobalFilterChange}
        ></DataTable>
      </Card>
    </>
  );
};

export default AuditLogs;
