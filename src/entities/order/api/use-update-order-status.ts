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

/** Отмена заявки (только для AWAITING_PAYMENT). */
export const CANCELLED_STATUS_OPTION: { value: OrderStatus; label: string } = {
  value: OrderStatus.Cancelled,
  label: "Отменён",
};

/** Статусы для оплаченных заявок (PAID / IN_PROGRESS → IN_PROGRESS, COMPLETED). */
export const PROGRESS_ORDER_STATUS_OPTIONS: { value: OrderStatus; label: string }[] = [
  { value: OrderStatus.InProgress, label: "В работе" },
  { value: OrderStatus.Completed, label: "Завершён" },
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
