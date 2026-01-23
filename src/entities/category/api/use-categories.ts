import { useQuery } from "@apollo/client/react";
import { GET_CATEGORIES } from "@/shared/api/queries/categories";
import {
  CategoryEntity,
  CategoryFilterInput,
} from "@/shared/api/generated/graphql";

export function useCategories(
  filter?: CategoryFilterInput,
  options?: { skip?: boolean }
) {
  const { data, loading, error, refetch } = useQuery<{
    categories: CategoryEntity[];
  }>(GET_CATEGORIES, {
    variables: { filter },
    fetchPolicy: filter?.search ? "cache-and-network" : "cache-first",
    notifyOnNetworkStatusChange: false,
    skip: options?.skip || false,
  });
  return {
    categories: (data?.categories || []) as CategoryEntity[],
    loading,
    error,
    refetch,
  };
}
