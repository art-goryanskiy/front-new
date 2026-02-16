import { useQuery } from "@apollo/client/react";
import {
  AdminOrderDocumentsDocument,
  type AdminOrderDocumentsQuery,
  type AdminOrderDocumentsQueryVariables,
} from "@/shared/api/generated/graphql";

export function useAdminOrderDocuments(
  orderId: string | null,
  options?: { skip?: boolean }
) {
  const { data, loading, error, refetch } = useQuery<
    AdminOrderDocumentsQuery,
    AdminOrderDocumentsQueryVariables
  >(AdminOrderDocumentsDocument, {
    variables: { orderId: orderId ?? "" },
    fetchPolicy: "cache-and-network",
    skip: options?.skip ?? !orderId,
  });

  return {
    documents: data?.adminOrderDocuments ?? [],
    loading,
    error,
    refetch,
  };
}
