import { userGetAssignableRoles } from "@/openapi";
import { userGetAssignableRolesQueryKey } from "@/openapi/@tanstack/react-query.gen";
import { useQuery } from "@tanstack/react-query";

/**
 * Custom hook to fetch assignable roles using a query.
 *
 * This hook uses the `useQuery` hook from the `react-query` library to fetch
 * the assignable roles. The query key used is `QueryNames.GetAssignableRoles`.
 *
 * @returns {object} The result of the `useQuery` hook, which includes the data,
 * status, and other properties related to the query.
 */
export const useAssignableRoles = () => {
  return useQuery({
    queryKey: userGetAssignableRolesQueryKey(),
    queryFn: async () => {
      const { data } = await userGetAssignableRoles();
      return data ?? null;
    },
  });
};
