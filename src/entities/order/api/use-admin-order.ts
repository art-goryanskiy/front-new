import { useQuery } from "@apollo/client/react";
import { useFragment } from "@/shared/api/generated/fragment-masking";
import {
  AdminOrderDocument,
  OrderFieldsFragmentDoc,
  type AdminOrderQuery,
  type AdminOrderQueryVariables,
  type OrderFieldsFragment,
} from "@/shared/api/generated/graphql";

export function useAdminOrder(
  id: string | null,
  options?: { skip?: boolean }
) {
  const { data, loading, error, refetch } = useQuery<
    AdminOrderQuery,
    AdminOrderQueryVariables
  >(AdminOrderDocument, {
    variables: { id: id ?? "" },
    fetchPolicy: "cache-and-network",
    skip: options?.skip ?? !id,
  });

  const rawOrder = data?.adminOrder ?? null;
  const order = useFragment(OrderFieldsFragmentDoc, rawOrder) as
    | OrderFieldsFragment
    | null
    | undefined;

  return {
    order: order ?? null,
    loading,
    error,
    refetch,
  };
}
