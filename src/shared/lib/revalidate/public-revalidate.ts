"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import {
  serverGraphQLRequest,
  getServerHeaders,
} from "@/shared/lib/graphql/server-client";
import { gqlToString } from "@/shared/lib/graphql/query-utils";
import { ME } from "@/shared/api/queries/auth";
import type { UserEntity } from "@/shared/api/generated/graphql";

const TAGS = {
  categories: "public:categories",
  programs: "public:programs",
} as const;

type MeResponse = { me: UserEntity | null };

async function assertAdmin() {
  const cookieStore = await cookies();
  const cookie = cookieStore.toString();

  const data = await serverGraphQLRequest<MeResponse>(
    gqlToString(ME),
    undefined,
    getServerHeaders(cookie),
    // Avoid caching auth check
    { revalidate: 0 }
  );

  if (data.me?.role !== "ADMIN") {
    throw new Error("Forbidden");
  }
}

export async function revalidatePublicProgramsAndCategories() {
  await assertAdmin();
  revalidateTag(TAGS.programs, { expire: 0 });
  revalidateTag(TAGS.categories, { expire: 0 });
}

export async function revalidatePublicCategories() {
  await assertAdmin();
  revalidateTag(TAGS.categories, { expire: 0 });
}
