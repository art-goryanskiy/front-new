import { useQuery } from "@apollo/client/react";
import { GET_PROGRAM } from "@/shared/api/queries/programs";
import type { ProgramEntity } from "@/shared/api/generated/graphql";

export function useProgram(id: string) {
  const { data, loading, error, refetch } = useQuery<{
    program: ProgramEntity;
  }>(GET_PROGRAM, {
    variables: { id },
    fetchPolicy: "cache-and-network", // Всегда получаем свежие данные для обновления просмотров
    notifyOnNetworkStatusChange: false,
  });
  return {
    program: data?.program,
    loading,
    error,
    refetch,
  };
}
