import { useQuery } from "@tanstack/react-query";
import { roleGetListQueryKey } from "@/openapi/@tanstack/react-query.gen";
import { roleGetList } from "@/openapi";

/**
 * Custom hook to fetch a list of roles.
 *
 * This hook uses the `useQuery` hook from `react-query` to fetch the role data
 * asynchronously. The query key used is `QueryNames.GetRoles` along with pagination,
 * filter, and sorting parameters.
 *
 * @param {number} pageIndex - The current page index.
 * @param {number} pageSize - The number of items per page.
 * @param {string} [filter] - Optional filter string.
 * @param {string} [sorting] - Optional sorting string.
 * @returns {UseQueryResult} The result of the query, which includes the role data and query status.
 */
export const useRoles = ({
  pageIndex,
  pageSize,
  filter,
  sorting,
}: {
  pageIndex: number;
  pageSize: number;
  filter?: string | undefined;
  sorting?: string | undefined;
}) => {
  return useQuery({
    queryKey: [roleGetListQueryKey(), pageIndex, pageSize, filter, sorting],
    queryFn: async () => {
      let skip = 0;
      if (pageIndex > 0) {
        skip = pageIndex * pageSize;
      }
      const { data } = await roleGetList({
        query: {
          MaxResultCount: pageSize,
          SkipCount: pageIndex > 0 ? pageIndex * pageSize : 0,
          Filter: filter,
          Sorting: sorting,
        },
      });
      return data ?? null;
    },
  });
};
