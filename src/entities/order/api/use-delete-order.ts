import { useMutation } from "@apollo/client/react";
import { DELETE_ORDER } from "@/shared/api/mutations/orders";
import { MY_ORDERS } from "@/shared/api/queries/orders";
import type { DocumentNode } from "@apollo/client";

type DeleteOrderData = {
  deleteOrder: boolean;
};

type DeleteOrderVariables = {
  orderId: string;
};

export function useDeleteOrder() {
  const [deleteOrderMutation, { loading, error }] = useMutation<
    DeleteOrderData,
    DeleteOrderVariables
  >(DELETE_ORDER as DocumentNode, {
    refetchQueries: [{ query: MY_ORDERS as DocumentNode }],
  });

  const deleteOrder = async (orderId: string): Promise<boolean> => {
    const result = await deleteOrderMutation({
      variables: { orderId },
    });
    return result.data?.deleteOrder ?? false;
  };

  return {
    deleteOrder,
    loading,
    error,
  };
}
