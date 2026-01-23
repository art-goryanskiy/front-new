import { useQuery } from "@apollo/client/react";
import { GET_USERS } from "@/shared/api/queries/users";
import {
  UserEntity,
  AdminUserFilterInput,
} from "@/shared/api/generated/graphql";

export function useUsers(filter?: AdminUserFilterInput) {
  const { data, loading, error, refetch } = useQuery<{
    adminUsers: UserEntity[];
  }>(GET_USERS, {
    variables: { filter },
    fetchPolicy: filter?.search ? "cache-and-network" : "cache-first",
    notifyOnNetworkStatusChange: false,
  });
  return {
    users: (data?.adminUsers || []) as UserEntity[],
    loading,
    error,
    refetch,
  };
}
