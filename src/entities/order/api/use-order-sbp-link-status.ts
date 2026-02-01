import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client/react";
import type { OrderSbpLinkStatusQuery } from "@/shared/api/generated/graphql";
import { ORDER_SBP_LINK_STATUS } from "@/shared/api/queries/orders";

/** Статус СБП, при котором считаем оплату полученной (T-Bank) */
const SBP_STATUS_PAID = "Ready";

export function useOrderSbpLinkStatus(
  orderId: string | null,
  options?: {
    /** Не вызывать запрос до создания ссылки (рекомендуется true) */
    skip?: boolean;
    /** Интервал опроса в мс (5–10 с достаточно; при оплате опрос останавливается) */
    pollInterval?: number;
  }
) {
  const [stopPolling, setStopPolling] = useState(false);

  const { data, loading, error, refetch } = useQuery<OrderSbpLinkStatusQuery>(
    ORDER_SBP_LINK_STATUS,
    {
      variables: { orderId: orderId ?? "" },
      skip: options?.skip ?? !orderId,
      pollInterval: stopPolling ? 0 : (options?.pollInterval ?? 10_000),
    }
  );

  const status = data?.orderSbpLinkStatus?.status;
  useEffect(() => {
    if (status === SBP_STATUS_PAID) {
      setStopPolling(true);
    }
  }, [status]);

  return {
    sbpLinkStatus: data?.orderSbpLinkStatus ?? null,
    loading,
    error,
    refetch,
  };
}
