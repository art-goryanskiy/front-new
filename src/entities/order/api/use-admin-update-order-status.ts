import { useMutation } from "@apollo/client/react";
import {
  AdminUpdateOrderStatusDocument,
  type AdminUpdateOrderStatusMutation,
  type AdminUpdateOrderStatusMutationVariables,
  type OrderStatus,
} from "@/shared/api/generated/graphql";
import { ADMIN_ORDERS } from "@/shared/api/queries/orders";

export function useAdminUpdateOrderStatus() {
  const [mutate, { loading, error }] = useMutation<
    AdminUpdateOrderStatusMutation,
    AdminUpdateOrderStatusMutationVariables
  >(AdminUpdateOrderStatusDocument, {
    refetchQueries: [{ query: ADMIN_ORDERS }],
  });

  const adminUpdateOrderStatus = async (
    orderId: string,
    status: OrderStatus
  ) => {
    const result = await mutate({ variables: { orderId, status } });
    return result.data?.adminUpdateOrderStatus ?? null;
  };

  return {
    adminUpdateOrderStatus,
    loading,
    error,
  };
}
