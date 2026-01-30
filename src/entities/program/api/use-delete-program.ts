import { ProgramEntity } from "@/shared/api/generated/graphql";
import { DELETE_PROGRAM } from "@/shared/api/mutations/programs";
import { GET_CATEGORIES } from "@/shared/api/queries/categories";
import {
  GET_PROGRAMS,
  GET_PROGRAMS_PAGE,
} from "@/shared/api/queries/programs";
import { useMutation } from "@apollo/client/react";

export function useDeleteProgram() {
  const [deleteProgram, { loading, error }] = useMutation<{
    deleteProgram: ProgramEntity;
  }>(DELETE_PROGRAM, {
    refetchQueries: [
      {
        query: GET_PROGRAMS,
      },
      {
        query: GET_PROGRAMS_PAGE,
      },
      {
        query: GET_CATEGORIES,
      },
    ],
    awaitRefetchQueries: true,
    update: (cache) => {
      // Invalidate all list variants (different filters/pagination)
      cache.evict({ fieldName: "programs" });
      cache.evict({ fieldName: "programsPage" });
      cache.evict({ fieldName: "categories" });
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
