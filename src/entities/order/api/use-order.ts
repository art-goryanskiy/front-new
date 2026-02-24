import { useQuery } from "@apollo/client/react";
import { useFragment } from "@/shared/api/generated/fragment-masking";
import {
  OrderFieldsFragmentDoc,
  type OrderQuery,
  type OrderFieldsFragment,
} from "@/shared/api/generated/graphql";
import { ORDER } from "@/shared/api/queries/orders";

export function useOrder(
  id: string | null,
  options?: { skip?: boolean }
) {
  const { data, loading, error, refetch } = useQuery<OrderQuery>(
    ORDER,
    {
      variables: { id: id ?? "" },
      fetchPolicy: "cache-and-network",
      errorPolicy: "all",
      skip: options?.skip ?? !id,
    }
  );

  const rawOrder = data?.order ?? null;
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
