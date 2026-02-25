import { useMutation } from "@apollo/client/react";
import {
  AdminDeleteOrderDocument,
  type AdminDeleteOrderMutation,
  type AdminDeleteOrderMutationVariables,
} from "@/shared/api/generated/graphql";
import { ADMIN_ORDERS } from "@/shared/api/queries/orders";

export function useAdminDeleteOrder() {
  const [mutate, { loading, error }] = useMutation<
    AdminDeleteOrderMutation,
    AdminDeleteOrderMutationVariables
  >(AdminDeleteOrderDocument, {
    refetchQueries: [{ query: ADMIN_ORDERS }],
  });

  const adminDeleteOrder = async (
    orderId: string
  ): Promise<boolean> => {
    const result = await mutate({ variables: { orderId } });
    return result.data?.adminDeleteOrder ?? false;
  };

  return {
    adminDeleteOrder,
    loading,
    error,
  };
}
