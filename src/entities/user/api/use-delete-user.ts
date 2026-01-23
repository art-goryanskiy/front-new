import { DELETE_USER } from "@/shared/api/mutations/users";
import { GET_USERS } from "@/shared/api/queries/users";
import { useMutation } from "@apollo/client/react";

export function useDeleteUser() {
  const [deleteUser, { loading, error }] = useMutation<{
    adminDeleteUser: boolean;
  }>(DELETE_USER, {
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

  const handleDelete = async (id: string) => {
    try {
      const result = await deleteUser({
        variables: { id },
      });
      return result.data?.adminDeleteUser;
    } catch (error) {
      throw error;
    }
  };

  return {
    deleteUser: handleDelete,
    loading,
    error,
  };
}
