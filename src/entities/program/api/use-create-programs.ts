import {
  ProgramEntity,
  CreateProgramInput,
} from "@/shared/api/generated/graphql";
import { CREATE_PROGRAM } from "@/shared/api/mutations/programs";
import {
  GET_PROGRAMS,
  GET_PROGRAMS_PAGE,
} from "@/shared/api/queries/programs";
import { GET_CATEGORIES } from "@/shared/api/queries/categories";
import { useMutation } from "@apollo/client/react";

export function useCreateProgram() {
  const [createProgram, { loading, error }] = useMutation<{
    createProgram: ProgramEntity;
  }>(CREATE_PROGRAM, {
    refetchQueries: [
      {
        query: GET_PROGRAMS,
      },
      {
        query: GET_PROGRAMS_PAGE,
      },
      // update category cards/table counters (programsCount)
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
      cache.gc(); // Очистка неиспользуемых данных
    },
  });

  const handleCreate = async (input: CreateProgramInput) => {
    try {
      const result = await createProgram({ variables: { input } });
      return result.data?.createProgram;
    } catch (error) {
      throw error;
    }
  };

  return {
    createProgram: handleCreate,
    loading,
    error,
  };
}
