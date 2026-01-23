import { useQuery } from "@apollo/client/react";
import { GET_USER } from "@/shared/api/queries/users";
import type { UserEntity } from "@/shared/api/generated/graphql";

export function useUser(id: string) {
  const { data, loading, error, refetch } = useQuery<{
    adminUser?: UserEntity;
  }>(GET_USER, {
    variables: { id },
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: false,
  });
  return {
    user: data?.adminUser,
    loading,
    error,
    refetch,
  };
}
