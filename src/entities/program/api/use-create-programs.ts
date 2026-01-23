import {
  ProgramEntity,
  CreateProgramInput,
} from "@/shared/api/generated/graphql";
import { CREATE_PROGRAM } from "@/shared/api/mutations/programs";
import { GET_PROGRAMS } from "@/shared/api/queries/programs";
import { useMutation } from "@apollo/client/react";

export function useCreateProgram() {
  const [createProgram, { loading, error }] = useMutation<{
    createProgram: ProgramEntity;
  }>(CREATE_PROGRAM, {
    refetchQueries: [
      {
        query: GET_PROGRAMS,
      },
    ],
    awaitRefetchQueries: true,
    update: (cache) => {
      // Очищаем кэш для всех вариантов GET_PROGRAMS
      cache.evict({ fieldName: "programs" });
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
