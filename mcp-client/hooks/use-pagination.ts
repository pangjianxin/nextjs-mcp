import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
export function usePagination(initialPage = 0, initialPageSize = 10) {
  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [sorting, setSorting] = useState<string | undefined>(undefined);
  const [filter, setFilter] = useState<string | undefined>(undefined);

  const handlePaginationChange = (pageIndex: number, pageSize: number) => {
    setPage(pageIndex);
    setPageSize(pageSize);
  };
  const handleSortingChange = (sorting: string | undefined) => {
    setSorting(sorting);
  };

  const handleGlobalFilterChange = useDebouncedCallback(
    (filter: string | undefined) => {
      setFilter(filter);
    },
    500
  );
  return {
    page,
    pageSize,
    sorting,
    filter,
    handlePaginationChange,
    handleSortingChange,
    handleGlobalFilterChange,
  };
}
