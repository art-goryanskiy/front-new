import { useQuery } from "@apollo/client/react";
import {
  type OrderDocumentsQuery,
  type OrderDocumentsQueryVariables,
} from "@/shared/api/generated/graphql";
import { ORDER_DOCUMENTS } from "@/shared/api/queries/orders";

export function useOrderDocuments(orderId: string | null, options?: { skip?: boolean }) {
  const { data, loading, error, refetch } = useQuery<
    OrderDocumentsQuery,
    OrderDocumentsQueryVariables
  >(ORDER_DOCUMENTS, {
    variables: { orderId: orderId ?? "" },
    fetchPolicy: "cache-and-network",
    skip: options?.skip ?? !orderId,
  });

  return {
    documents: data?.orderDocuments ?? [],
    loading,
    error,
    refetch,
  };
}
