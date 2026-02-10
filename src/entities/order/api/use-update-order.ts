import { useMutation } from "@apollo/client/react";
import { UPDATE_ORDER } from "@/shared/api/mutations/orders";
import { ORDER, MY_ORDERS } from "@/shared/api/queries/orders";
import type { DocumentNode } from "@apollo/client";
import type { OrderFieldsFragment } from "@/shared/api/generated/graphql";

export type UpdateOrderInput = {
  contactEmail?: string | null;
  contactPhone?: string | null;
  organizationId?: string | null;
  /** ИНН (10/12 цифр) или название организации — приоритет над organizationId */
  organizationQuery?: string | null;
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
    refetchQueries: (result) => {
      const orderId = result.data?.updateOrder?.id;
      const queries: Array<{ query: DocumentNode; variables?: { id: string } }> = [
        { query: MY_ORDERS as DocumentNode },
      ];
      if (orderId) {
        queries.push({ query: ORDER as DocumentNode, variables: { id: orderId } });
      }
      return queries;
    },
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
