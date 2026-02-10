import { useQuery } from "@apollo/client/react";
import { GET_NEWS } from "@/shared/api/queries/news";
import type {
  GetNewsQuery,
  GetNewsQueryVariables,
  NewsEntity,
} from "./news.types";

const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 100;

export function useNews(filter?: GetNewsQueryVariables["filter"]) {
  const limit = Math.min(
    filter?.limit ?? DEFAULT_LIMIT,
    MAX_LIMIT
  );
  const offset = filter?.offset ?? 0;

  const { data, loading, error, refetch } = useQuery<
    GetNewsQuery,
    GetNewsQueryVariables
  >(GET_NEWS, {
    variables: { filter: { limit, offset } },
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
  });

  return {
    news: (data?.news ?? []) as NewsEntity[],
    loading,
    error,
    refetch,
  };
}
