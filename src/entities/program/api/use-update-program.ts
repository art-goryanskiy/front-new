import {
  ProgramEntity,
  UpdateProgramInput,
} from "@/shared/api/generated/graphql";
import { UPDATE_PROGRAM } from "@/shared/api/mutations/programs";
import { GET_PROGRAMS } from "@/shared/api/queries/programs";
import { useMutation } from "@apollo/client/react";

export function useUpdateProgram() {
  const [updateProgram, { loading, error }] = useMutation<{
    updateProgram: ProgramEntity;
  }>(UPDATE_PROGRAM, {
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

  const handleUpdate = async (
    id: string,
    input: UpdateProgramInput
  ) => {
    try {
      const result = await updateProgram({
        variables: { id, input },
      });
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
