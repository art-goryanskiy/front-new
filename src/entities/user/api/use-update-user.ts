import {
  UserEntity,
  AdminUpdateUserInput,
} from "@/shared/api/generated/graphql";
import { UPDATE_USER } from "@/shared/api/mutations/users";
import { GET_USERS } from "@/shared/api/queries/users";
import { useMutation } from "@apollo/client/react";

export function useUpdateUser() {
  const [updateUser, { loading, error }] = useMutation<{
    adminUpdateUser: UserEntity;
  }>(UPDATE_USER, {
    refetchQueries: [
      {
        query: GET_USERS,
      },
    ],
    awaitRefetchQueries: true,
    update: (cache) => {
      cache.evict({ fieldName: "adminUsers" });
      cache.gc();
    },
  });

  const handleUpdate = async (
    id: string,
    input: AdminUpdateUserInput
  ) => {
    try {
      const result = await updateUser({
        variables: { id, input },
      });
      return result.data?.adminUpdateUser;
    } catch (error) {
      throw error;
    }
  };

  return {
    updateUser: handleUpdate,
    loading,
    error,
  };
}
