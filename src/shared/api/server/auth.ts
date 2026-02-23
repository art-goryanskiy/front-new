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

export type ViewerUser = {
  id: string;
  email: string;
  role: UserRole;
};

interface ViewerResponse {
  viewer: ViewerUser | null;
}

/**
 * Запрашивает текущую сессию на сервере по cookie запроса.
 * Только Viewer — лёгкий запрос из контекста (id, email, role), без доп. запросов в БД.
 * Для стабильного первого экрана и гидрации стора при каждой загрузке/перезагрузке.
 * Полный профиль (Me) запрашивается только на страницах кабинета/профиля/оформления.
 */
export async function getViewerServer(cookie?: string): Promise<ViewerUser | null> {
  try {
    const headers = getServerHeaders(cookie);
    const data = await serverGraphQLRequest<ViewerResponse>(VIEWER_QUERY, undefined, headers, {
      skipCache: true,
    });
    return data.viewer ?? null;
  } catch {
    return null;
  }
}
