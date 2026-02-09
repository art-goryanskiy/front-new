import { useMutation } from "@apollo/client/react";
import { UPDATE_ORDER } from "@/shared/api/mutations/orders";
import { ORDER, MY_ORDERS } from "@/shared/api/queries/orders";
import type { DocumentNode } from "@apollo/client";
import type { OrderFieldsFragment } from "@/shared/api/generated/graphql";

export type UpdateOrderInput = {
  contactEmail?: string | null;
  contactPhone?: string | null;
  organizationId?: string | null;
};

type UpdateOrderData = {
  updateOrder: OrderFieldsFragment;
};

type UpdateOrderVariables = {
  orderId: string;
  input: UpdateOrderInput;
};

export function useUpdateOrder() {
  const [updateOrderMutation, { loading, error }] = useMutation<
    UpdateOrderData,
    UpdateOrderVariables
  >(UPDATE_ORDER as DocumentNode, {
    refetchQueries: [{ query: ORDER as DocumentNode }, { query: MY_ORDERS as DocumentNode }],
  });

  const updateOrder = async (
    orderId: string,
    input: UpdateOrderInput
  ): Promise<OrderFieldsFragment | null> => {
    const result = await updateOrderMutation({
      variables: { orderId, input },
    });
    return result.data?.updateOrder ?? null;
  };

  return {
    updateOrder,
    loading,
    error,
  };
}
