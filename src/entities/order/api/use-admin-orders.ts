import { useQuery } from "@apollo/client/react";
import { useFragment } from "@/shared/api/generated/fragment-masking";
import {
  OrderFieldsFragmentDoc,
  type OrderFieldsFragment,
} from "@/shared/api/generated/graphql";
import { ADMIN_ORDERS } from "@/shared/api/queries/orders";

type AdminOrdersCompatData = {
  adminOrders: Array<{
    " $fragmentRefs"?: {
      OrderFieldsFragment: OrderFieldsFragment;
    };
  }>;
};

type AdminOrdersCompatVariables = {
  filter?: { status?: string; limit?: number; offset?: number };
};

export function useAdminOrders(
  filter?: { status?: string; limit?: number; offset?: number }
) {
  const { data, loading, error, refetch } = useQuery<
    AdminOrdersCompatData,
    AdminOrdersCompatVariables
  >(ADMIN_ORDERS, {
    variables: { filter: filter ?? undefined },
    fetchPolicy: "cache-and-network",
    errorPolicy: "all",
  });

  const rawOrders = data?.adminOrders ?? [];
  const orders = useFragment(OrderFieldsFragmentDoc, rawOrders) as
    | OrderFieldsFragment[]
    | null
    | undefined;
  const list = orders ?? [];

  return {
    orders: list,
    loading,
    error,
    refetch,
  };
}
