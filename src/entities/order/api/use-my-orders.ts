import { useQuery } from "@apollo/client/react";
import { useFragment } from "@/shared/api/generated/fragment-masking";
import {
  OrderFieldsFragmentDoc,
  type MyOrdersQuery,
  type OrderFieldsFragment,
} from "@/shared/api/generated/graphql";
import { MY_ORDERS } from "@/shared/api/queries/orders";

export function useMyOrders(options?: {
  skip?: boolean;
  filter?: { status?: string; limit?: number; offset?: number };
}) {
  const { data, loading, error, refetch } = useQuery<MyOrdersQuery>(MY_ORDERS, {
    variables: { filter: options?.filter ?? undefined },
    fetchPolicy: "cache-and-network",
    errorPolicy: "all",
    skip: options?.skip ?? false,
  });

  const rawOrders = data?.myOrders ?? [];
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
