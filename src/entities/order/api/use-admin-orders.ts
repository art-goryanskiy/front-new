import { useQuery } from "@apollo/client/react";
import { useFragment } from "@/shared/api/generated/fragment-masking";
import {
  AdminOrdersDocument,
  OrderFieldsFragmentDoc,
  type AdminOrdersQuery,
  type AdminOrdersQueryVariables,
  type OrderFieldsFragment,
} from "@/shared/api/generated/graphql";

export function useAdminOrders(filter?: AdminOrdersQueryVariables["filter"]) {
  const { data, loading, error, refetch } = useQuery<
    AdminOrdersQuery,
    AdminOrdersQueryVariables
  >(AdminOrdersDocument, {
    variables: { filter: filter ?? undefined },
    fetchPolicy: "cache-and-network",
  });

  const rawOrders = data?.adminOrders ?? [];
  const orders = useFragment(
    OrderFieldsFragmentDoc,
    rawOrders
  ) as OrderFieldsFragment[] | null | undefined;
  const list = orders ?? [];

  return {
    orders: list,
    loading,
    error,
    refetch,
  };
}
