import { useQuery } from "@apollo/client/react";
import { useFragment } from "@/shared/api/generated/fragment-masking";
import {
  OrderFieldsFragmentDoc,
  type OrderFieldsFragment,
} from "@/shared/api/generated/graphql";
import { ADMIN_ORDER } from "@/shared/api/queries/orders";

type AdminOrderCompatData = {
  adminOrder: {
    " $fragmentRefs"?: {
      OrderFieldsFragment: OrderFieldsFragment;
    };
  } | null;
};

type AdminOrderCompatVariables = {
  id: string;
};

export function useAdminOrder(
  id: string | null,
  options?: { skip?: boolean }
) {
  const { data, loading, error, refetch } = useQuery<
    AdminOrderCompatData,
    AdminOrderCompatVariables
  >(ADMIN_ORDER, {
    variables: { id: id ?? "" },
    fetchPolicy: "cache-and-network",
    errorPolicy: "all",
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
