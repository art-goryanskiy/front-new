import { useQuery } from "@apollo/client/react";
import { GET_TOP_PROGRAMS } from "@/shared/api/queries/programs";
import type { ProgramEntity } from "@/shared/api/generated/graphql";

export function useTopPrograms(
  limit?: number,
  options?: { skip?: boolean }
) {
  const { data, loading, error, refetch } = useQuery<{
    topPrograms: ProgramEntity[];
  }>(GET_TOP_PROGRAMS, {
    variables: { limit },
    fetchPolicy: "cache-first",
    notifyOnNetworkStatusChange: false,
    skip: options?.skip || false,
  });
  return {
    programs: (data?.topPrograms || []) as ProgramEntity[],
    loading,
    error,
    refetch,
  };
}
