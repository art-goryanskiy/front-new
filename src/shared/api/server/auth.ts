import {
  serverGraphQLRequest,
  getServerHeaders,
} from "@/shared/lib/graphql/server-client";
import type { UserRole } from "../generated/graphql";

const VIEWER_QUERY = `
  query Viewer {
    viewer {
      id
      email
      role
    }
  }
`;

/** Fallback, если в API пока нет поля viewer */
const ME_MINIMAL_QUERY = `
  query Viewer {
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

interface ViewerResponse {
  viewer: ViewerUser | null;
}

interface MeMinimalResponse {
  me: ViewerUser | null;
}

/**
 * Запрашивает текущего пользователя на сервере с cookie запроса.
 * Сначала viewer; при ошибке (нет viewer в API) — me с теми же полями.
 * Для стабильного первого экрана: карточки и цены отрисовываются сразу без ожидания me на клиенте.
 */
export async function getViewerServer(cookie?: string): Promise<ViewerUser | null> {
  const headers = getServerHeaders(cookie);
  const options = { skipCache: true as const };

  try {
    const data = await serverGraphQLRequest<ViewerResponse>(VIEWER_QUERY, undefined, headers, options);
    if (data.viewer != null) return data.viewer;
  } catch {
    // viewer может отсутствовать в схеме — пробуем me
  }

  try {
    const data = await serverGraphQLRequest<MeMinimalResponse>(ME_MINIMAL_QUERY, undefined, headers, options);
    return data.me ?? null;
  } catch {
    return null;
  }
}
