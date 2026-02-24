import {
  serverGraphQLRequest,
  getServerHeaders,
} from "@/shared/lib/graphql/server-client";
import type { UserRole } from "../generated/graphql";

const ME_MINIMAL_QUERY = `
  query ViewerMe {
    me {
      id
      email
      role
    }
  }
`;

export type ViewerUser = {
  id: string;
  email: string;
  role: UserRole;
};

interface MeMinimalResponse {
  me: ViewerUser | null;
}

/**
 * Запрашивает текущую сессию на сервере по cookie запроса.
 * Использует me { id email role } — минимальный набор полей без лишних JOIN.
 * Полный профиль (аватар, имя) подтягивается через useMe на клиенте.
 */
export async function getViewerServer(
  cookie?: string
): Promise<ViewerUser | null> {
  try {
    const headers = getServerHeaders(cookie);
    const data = await serverGraphQLRequest<MeMinimalResponse>(
      ME_MINIMAL_QUERY,
      undefined,
      headers,
      { skipCache: true }
    );
    return data.me ?? null;
  } catch {
    return null;
  }
}
