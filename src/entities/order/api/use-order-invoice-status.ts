import { useQuery } from "@apollo/client/react";
import type { OrderInvoiceStatusQuery } from "@/shared/api/generated/graphql";
import { ORDER_INVOICE_STATUS } from "@/shared/api/queries/orders";

export function useOrderInvoiceStatus(
  orderId: string | null,
  options?: { skip?: boolean }
) {
  const { data, loading, error, refetch } = useQuery<OrderInvoiceStatusQuery>(
    ORDER_INVOICE_STATUS,
    {
      variables: { orderId: orderId ?? "" },
      skip: options?.skip ?? !orderId,
    }
  );

  return {
    invoiceStatus: data?.orderInvoiceStatus?.status ?? null,
    loading,
    error,
    refetch,
  };
}
