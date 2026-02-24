import { useQuery } from "@apollo/client/react";
import { GET_NEWS } from "@/shared/api/queries/news";
import type { GetNewsQuery, NewsEntity } from "./news.types";

/** Загружает список новостей (до 100) и находит запись по id. Когда бэк добавит newsItem(id), можно перейти на отдельный запрос. */
export function useNewsItem(id: string | null) {
  const { data, loading, error, refetch } = useQuery<GetNewsQuery>(
    GET_NEWS,
    {
      variables: { filter: { limit: 100, offset: 0 } },
      fetchPolicy: "cache-and-network",
      skip: !id,
    }
  );

  const news = data?.news ?? [];
  const item = id
    ? (news.find((n) => n.id === id) as NewsEntity | undefined)
    : undefined;

  return {
    newsItem: item,
    loading,
    error,
    refetch,
  };
}
