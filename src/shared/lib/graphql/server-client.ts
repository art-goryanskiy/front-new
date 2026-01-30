const GRAPHQL_URL =
  process.env.NEXT_PUBLIC_GRAPHQL_URL ||
  "http://localhost:4200/graphql";

interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{ message: string }>;
}

interface ServerGraphQLOptions {
  revalidate?: number; // Время кэширования в секундах
  tags?: string[]; // Next.js cache tags for on-demand invalidation
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
      ...headers,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
    // Для серверных запросов можно использовать cache
    next: {
      revalidate: options?.revalidate ?? 60, // По умолчанию 60 секунд
      tags: options?.tags,
    },
    // Передаем куки для авторизации
    credentials: "include",
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
