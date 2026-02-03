import { useQuery } from "@apollo/client/react";
import { ORDER_PAYMENT_SYNC } from "@/shared/api/queries/orders";
import type { DocumentNode } from "@apollo/client";

export type OrderPaymentSyncPayment = {
  paymentId: string;
  status: string;
};

export type OrderPaymentSyncResult = {
  status: string;
  updated: boolean;
  payments: OrderPaymentSyncPayment[];
};

type OrderPaymentSyncData = {
  orderPaymentSync: OrderPaymentSyncResult;
};

type OrderPaymentSyncVariables = {
  orderId: string;
};

export function useOrderPaymentSync(orderId: string | null, options?: { skip?: boolean }) {
  const { data, loading, error, refetch } = useQuery<
    OrderPaymentSyncData,
    OrderPaymentSyncVariables
  >(ORDER_PAYMENT_SYNC as DocumentNode, {
    variables: { orderId: orderId ?? "" },
    fetchPolicy: "network-only",
    errorPolicy: "all",
    skip: options?.skip ?? !orderId,
  });

  const sync = data?.orderPaymentSync ?? null;

  return {
    sync,
    loading,
    error,
    refetch,
  };
}
