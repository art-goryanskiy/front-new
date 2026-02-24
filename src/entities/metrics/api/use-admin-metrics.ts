import { useQuery } from "@apollo/client/react";
import {
  AdminMetricsDocument,
  type AdminMetricsQuery,
} from "@/shared/api/generated/graphql";

export function useAdminMetrics() {
  const { data, loading, error, refetch } =
    useQuery<AdminMetricsQuery>(AdminMetricsDocument, {
      fetchPolicy: "cache-and-network",
    });

  return {
    metrics: data?.adminMetrics ?? null,
    loading,
    error,
    refetch,
  };
}
