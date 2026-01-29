import type {
  ProgramEntity,
  ProgramFilterInput,
} from "@/shared/api/generated/graphql";
import { GET_PROGRAMS_PAGE } from "@/shared/api/queries/programs";
import { useQuery } from "@apollo/client/react";

type ProgramsPageResponse = {
  programsPage: {
    total: number;
    items: ProgramEntity[];
  };
};

export function useProgramsPage(
  filter?: ProgramFilterInput,
  options?: { skip?: boolean }
) {
  const { data, loading, error, refetch } =
    useQuery<ProgramsPageResponse>(GET_PROGRAMS_PAGE, {
      variables: { filter },
      fetchPolicy: filter?.search
        ? "cache-and-network"
        : "cache-first",
      notifyOnNetworkStatusChange: false,
      skip: options?.skip || false,
    });

  return {
    total: data?.programsPage?.total ?? 0,
    items: (data?.programsPage?.items ?? []) as ProgramEntity[],
    loading,
    error,
    refetch,
  };
}
