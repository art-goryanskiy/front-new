import { useMutation } from "@apollo/client/react";
import { CREATE_ORDER_CARD_PAYMENT } from "@/shared/api/mutations/orders";
import type { DocumentNode } from "@apollo/client";

export type CreateOrderCardPaymentResult = {
  paymentId: string;
  paymentUrl: string;
  status?: string | null;
};

type CreateOrderCardPaymentData = {
  createOrderCardPayment: CreateOrderCardPaymentResult;
};

type CreateOrderCardPaymentVariables = {
  orderId: string;
};

export function useCreateOrderCardPayment() {
  const [createCardPaymentMutation, { loading, error }] = useMutation<
    CreateOrderCardPaymentData,
    CreateOrderCardPaymentVariables
  >(CREATE_ORDER_CARD_PAYMENT as DocumentNode);

  const createOrderCardPayment = async (
    orderId: string
  ): Promise<{ data: CreateOrderCardPaymentResult | null; error?: string }> => {
    try {
      const result = await createCardPaymentMutation({ variables: { orderId } });
      const data = result.data?.createOrderCardPayment ?? null;
      const err = result.error?.message ?? null;
      if (data) return { data };
      return { data: null, error: err ?? "Не удалось создать платёж" };
    } catch (e) {
      const message = e instanceof Error ? e.message : "Не удалось создать платёж";
      return { data: null, error: message };
    }
  };

  return {
    createOrderCardPayment,
    loading,
    error,
  };
}
