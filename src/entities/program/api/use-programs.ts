import { useQuery } from "@apollo/client/react";
import { GET_PROGRAMS } from "@/shared/api/queries/programs";
import {
  ProgramEntity,
  ProgramFilterInput,
} from "@/shared/api/generated/graphql";

export function usePrograms(
  filter?: ProgramFilterInput,
  options?: { skip?: boolean }
) {
  const { data, loading, error, refetch } = useQuery<{
    programs: ProgramEntity[];
  }>(GET_PROGRAMS, {
    variables: { filter },
    fetchPolicy: filter?.search ? "cache-and-network" : "cache-first",
    notifyOnNetworkStatusChange: false,
    skip: options?.skip || false,
  });
  return {
    programs: (data?.programs || []) as ProgramEntity[],
    loading,
    error,
    refetch,
  };
}
