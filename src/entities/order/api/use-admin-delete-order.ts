import { useMutation } from "@apollo/client/react";
import {
  AdminDeleteOrderDocument,
  AdminOrdersDocument,
  type AdminDeleteOrderMutation,
  type AdminDeleteOrderMutationVariables,
} from "@/shared/api/generated/graphql";

export function useAdminDeleteOrder() {
  const [mutate, { loading, error }] = useMutation<
    AdminDeleteOrderMutation,
    AdminDeleteOrderMutationVariables
  >(AdminDeleteOrderDocument, {
    refetchQueries: [{ query: AdminOrdersDocument }],
  });

  const adminDeleteOrder = async (orderId: string): Promise<boolean> => {
    const result = await mutate({ variables: { orderId } });
    return result.data?.adminDeleteOrder ?? false;
  };

  return {
    adminDeleteOrder,
    loading,
    error,
  };
}
