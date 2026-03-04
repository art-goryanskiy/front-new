const GRAPHQL_URL =
  process.env.NEXT_PUBLIC_GRAPHQL_URL ||
  "https://standart82.ru/graphql";

interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{ message: string }>;
}

interface ServerGraphQLOptions {
  revalidate?: number; // Время кэширования в секундах
  tags?: string[]; // Next.js cache tags for on-demand invalidation
  /** Не кэшировать ответ (для авторизованных запросов, чтобы не отдавать гостевой кэш) */
  skipCache?: boolean;
}

export async function serverGraphQLRequest<T>(
  query: string,
  variables?: Record<string, unknown>,
  headers?: HeadersInit,
  options?: ServerGraphQLOptions
): Promise<T> {
  const response = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apollo-require-preflight": "true",
      ...headers,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
    credentials: "include",
    ...(options?.skipCache
      ? { cache: "no-store" as RequestCache }
      : {
          next: {
            revalidate: options?.revalidate ?? 60,
            tags: options?.tags,
          },
        }),
  });

  if (!response.ok) {
    throw new Error(`GraphQL request failed: ${response.statusText}`);
  }

  const result: GraphQLResponse<T> = await response.json();

  if (result.errors) {
    throw new Error(result.errors.map((e) => e.message).join(", "));
  }

  if (!result.data) {
    throw new Error("No data returned from GraphQL query");
  }

  return result.data;
}

/**
 * Создает headers с куками из Next.js запроса
 */
export function getServerHeaders(cookie?: string): HeadersInit {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (cookie) {
    headers["Cookie"] = cookie;
  }

  return headers;
}
