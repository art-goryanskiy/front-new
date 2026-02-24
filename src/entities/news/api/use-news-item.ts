import { useQuery, useApolloClient } from "@apollo/client/react";
import { GET_NEWS } from "@/shared/api/queries/news";
import type { GetNewsQuery, NewsEntity } from "./news.types";

/**
 * Загружает новость по id.
 * Сначала ищет в Apollo cache (заполняется при просмотре списка),
 * и только если не нашёл — делает сетевой запрос на 100 записей.
 * Когда бэк добавит newsItem(id), заменить на отдельный запрос.
 */
export function useNewsItem(id: string | null) {
  const client = useApolloClient();

  const cachedItem = id
    ? (() => {
        try {
          const cached = client.readQuery<GetNewsQuery>({
            query: GET_NEWS,
            variables: { filter: { limit: 10, offset: 0 } },
          });
          return cached?.news?.find((n) => n.id === id) ?? null;
        } catch {
          return null;
        }
      })()
    : null;

  const skip = !id || !!cachedItem;

  const { data, loading, error, refetch } = useQuery<GetNewsQuery>(GET_NEWS, {
    variables: { filter: { limit: 100, offset: 0 } },
    fetchPolicy: "cache-first",
    skip,
  });

  const newsItem: NewsEntity | undefined =
    cachedItem ??
    (id ? (data?.news?.find((n) => n.id === id) as NewsEntity | undefined) : undefined);

  return {
    newsItem,
    loading: skip ? false : loading,
    error,
    refetch,
  };
}
