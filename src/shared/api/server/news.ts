import { serverGraphQLRequest } from "@/shared/lib/graphql/server-client";
import { gqlToString } from "@/shared/lib/graphql/query-utils";
import { GET_NEWS } from "../queries/news";
import type { NewsItemEntity } from "../generated/graphql";

interface GetNewsResponse {
  news: NewsItemEntity[];
}

const NEWS_REVALIDATE = 300; // 5 минут
const NEWS_TAG = "public:news";

export async function getNewsServer(
  limit = 100
): Promise<NewsItemEntity[]> {
  const data = await serverGraphQLRequest<GetNewsResponse>(
    gqlToString(GET_NEWS),
    { filter: { limit, offset: 0 } },
    undefined,
    { revalidate: NEWS_REVALIDATE, tags: [NEWS_TAG] }
  );
  return data.news ?? [];
}
