import {
  UserEntity,
  AdminCreateUserInput,
} from "@/shared/api/generated/graphql";
import { CREATE_USER } from "@/shared/api/mutations/users";
import { GET_USERS } from "@/shared/api/queries/users";
import { useMutation } from "@apollo/client/react";

export function useCreateUser() {
  const [createUser, { loading, error }] = useMutation<{
    adminCreateUser: UserEntity;
  }>(CREATE_USER, {
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

  const handleCreate = async (input: AdminCreateUserInput) => {
    try {
      const result = await createUser({ variables: { input } });
      return result.data?.adminCreateUser;
    } catch (error) {
      throw error;
    }
  };

  return {
    createUser: handleCreate,
    loading,
    error,
  };
}
