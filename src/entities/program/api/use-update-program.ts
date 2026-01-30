import {
  ProgramEntity,
  UpdateProgramInput,
} from "@/shared/api/generated/graphql";
import { UPDATE_PROGRAM } from "@/shared/api/mutations/programs";
import {
  GET_PROGRAMS,
  GET_PROGRAMS_PAGE,
} from "@/shared/api/queries/programs";
import { GET_CATEGORIES } from "@/shared/api/queries/categories";
import { revalidatePublicProgramsAndCategories } from "@/shared/lib/revalidate/public-revalidate";
import { useMutation } from "@apollo/client/react";

export function useUpdateProgram() {
  const [updateProgram, { loading, error }] = useMutation<{
    updateProgram: ProgramEntity;
  }>(UPDATE_PROGRAM, {
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

  const handleUpdate = async (
    id: string,
    input: UpdateProgramInput
  ) => {
    try {
      const result = await updateProgram({
        variables: { id, input },
      });
      try {
        await revalidatePublicProgramsAndCategories();
      } catch {
        // Do not break admin UX if revalidation fails
      }
      return result.data?.updateProgram;
    } catch (error) {
      throw error;
    }
  };

  return {
    updateProgram: handleUpdate,
    loading,
    error,
  };
}
