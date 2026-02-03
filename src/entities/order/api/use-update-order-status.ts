import { useMutation } from "@apollo/client/react";
import { UPDATE_ORDER_STATUS } from "@/shared/api/mutations/orders";
import { ORDER } from "@/shared/api/queries/orders";
import type { DocumentNode } from "@apollo/client";
import { OrderStatus } from "@/shared/api/generated/graphql";

export type UpdateOrderStatusResult = {
  id: string;
  status: string;
};

type UpdateOrderStatusData = {
  updateOrderStatus: UpdateOrderStatusResult;
};

type UpdateOrderStatusVariables = {
  orderId: string;
  status: OrderStatus;
};

/** Статусы для смены через updateOrderStatus (бэкенд может поддерживать IN_PROGRESS, COMPLETED, CANCELLED). */
export const UPDATEABLE_ORDER_STATUSES: { value: OrderStatus; label: string }[] = [
  { value: OrderStatus.Completed, label: "Завершён" },
  { value: OrderStatus.Cancelled, label: "Отменён" },
];

export function useUpdateOrderStatus() {
  const [updateStatusMutation, { loading, error }] = useMutation<
    UpdateOrderStatusData,
    UpdateOrderStatusVariables
  >(UPDATE_ORDER_STATUS as DocumentNode, {
    refetchQueries: [{ query: ORDER as DocumentNode }],
  });

  const updateOrderStatus = async (
    orderId: string,
    status: OrderStatus
  ): Promise<UpdateOrderStatusResult | null> => {
    const result = await updateStatusMutation({
      variables: { orderId, status },
    });
    return result.data?.updateOrderStatus ?? null;
  };

  return {
    updateOrderStatus,
    loading,
    error,
  };
}
