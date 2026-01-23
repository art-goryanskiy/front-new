import { ProgramEntity } from "@/shared/api/generated/graphql";
import { DELETE_PROGRAM } from "@/shared/api/mutations/programs";
import { GET_PROGRAMS } from "@/shared/api/queries/programs";
import { useMutation } from "@apollo/client/react";

export function useDeleteProgram() {
  const [deleteProgram, { loading, error }] = useMutation<{
    deleteProgram: ProgramEntity;
  }>(DELETE_PROGRAM, {
    refetchQueries: [
      {
        query: GET_PROGRAMS,
      },
    ],
    awaitRefetchQueries: true,
    update: (cache) => {
      // Очищаем кэш для всех вариантов GET_PROGRAMS
      cache.evict({ fieldName: "programs" });
      cache.gc();
    },
  });

  const handleDelete = async (id: string) => {
    try {
      const result = await deleteProgram({
        variables: { id },
      });
      return result.data?.deleteProgram;
    } catch (error) {
      throw error;
    }
  };

  return {
    deleteProgram: handleDelete,
    loading,
    error,
  };
}
