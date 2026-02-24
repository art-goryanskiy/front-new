import { useMutation } from "@apollo/client/react";
import {
  AdminUpdateOrderStatusDocument,
  AdminOrdersDocument,
  type AdminUpdateOrderStatusMutation,
  type AdminUpdateOrderStatusMutationVariables,
  type OrderStatus,
} from "@/shared/api/generated/graphql";

export function useAdminUpdateOrderStatus() {
  const [mutate, { loading, error }] = useMutation<
    AdminUpdateOrderStatusMutation,
    AdminUpdateOrderStatusMutationVariables
  >(AdminUpdateOrderStatusDocument, {
    refetchQueries: [{ query: AdminOrdersDocument }],
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
