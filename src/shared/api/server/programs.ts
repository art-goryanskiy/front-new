import {
  serverGraphQLRequest,
  getServerHeaders,
} from "@/shared/lib/graphql/server-client";
import { gqlToString } from "@/shared/lib/graphql/query-utils";
import {
  GET_PROGRAMS,
  GET_TOP_PROGRAMS,
  GET_PROGRAM,
} from "../queries/programs";
import type { ProgramEntity } from "../generated/graphql";

interface GetProgramsResponse {
  programs: ProgramEntity[];
}

interface GetTopProgramsResponse {
  topPrograms: ProgramEntity[];
}

interface GetProgramResponse {
  program: ProgramEntity;
}

interface ProgramFilterVariables {
  sortBy?: string;
  sortOrder?: string;
  limit?: number;
  category?: string;
}

const PROGRAMS_TAG = "public:programs";

export async function getProgramsServer(
  filter?: {
    sortBy?: string;
    sortOrder?: string;
    limit?: number;
    category?: string;
  },
  cookie?: string
): Promise<ProgramEntity[]> {
  const variables: ProgramFilterVariables = {};

  if (filter?.sortBy) {
    variables.sortBy = filter.sortBy;
  }
  if (filter?.sortOrder) {
    variables.sortOrder = filter.sortOrder;
  }
  if (filter?.limit) {
    variables.limit = filter.limit;
  }
  if (filter?.category) {
    variables.category = filter.category;
  }

  const headers = getServerHeaders(cookie);
  const data = await serverGraphQLRequest<GetProgramsResponse>(
    gqlToString(GET_PROGRAMS),
    Object.keys(variables).length > 0
      ? { filter: variables }
      : undefined,
    headers,
    { revalidate: 60, tags: [PROGRAMS_TAG] }
  );

  return data.programs;
}

export async function getTopProgramsServer(
  limit: number = 6,
  cookie?: string
): Promise<ProgramEntity[]> {
  const headers = getServerHeaders(cookie);
  const data = await serverGraphQLRequest<GetTopProgramsResponse>(
    gqlToString(GET_TOP_PROGRAMS),
    { limit },
    headers,
    { revalidate: 60, tags: [PROGRAMS_TAG] }
  );

  return data.topPrograms;
}

export async function getProgramServer(
  id: string,
  cookie?: string
): Promise<ProgramEntity> {
  const headers = getServerHeaders(cookie);
  const data = await serverGraphQLRequest<GetProgramResponse>(
    gqlToString(GET_PROGRAM),
    { id },
    headers,
    { revalidate: 60, tags: [PROGRAMS_TAG, `public:program:${id}`] }
  );

  return data.program;
}
