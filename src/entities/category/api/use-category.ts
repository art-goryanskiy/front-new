import { useQuery } from "@apollo/client/react";
import { GET_CATEGORY } from "@/shared/api/queries/categories";
import type { CategoryEntity } from "@/shared/api/generated/graphql";

export function useCategory(id: string) {
  const { data, loading, error, refetch } = useQuery<{
    category: CategoryEntity;
  }>(GET_CATEGORY, {
    variables: { id },
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: false,
  });
  return {
    category: data?.category,
    loading,
    error,
    refetch,
  };
}
