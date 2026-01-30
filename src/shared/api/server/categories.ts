import { serverGraphQLRequest } from "@/shared/lib/graphql/server-client";
import { gqlToString } from "@/shared/lib/graphql/query-utils";
import { GET_CATEGORIES, GET_CATEGORY } from "../queries/categories";
import type { CategoryEntity } from "../generated/graphql";

interface GetCategoriesResponse {
  categories: CategoryEntity[];
}

interface GetCategoryResponse {
  category: CategoryEntity;
}

// Категории кэшируются на 1 час, так как они редко меняются
const CATEGORIES_REVALIDATE = 3600;
const CATEGORIES_TAG = "public:categories";

export async function getCategoriesServer(): Promise<
  CategoryEntity[]
> {
  const data = await serverGraphQLRequest<GetCategoriesResponse>(
    gqlToString(GET_CATEGORIES),
    undefined,
    undefined,
    { revalidate: CATEGORIES_REVALIDATE, tags: [CATEGORIES_TAG] }
  );
  return data.categories;
}

export async function getCategoryServer(
  id: string
): Promise<CategoryEntity> {
  const data = await serverGraphQLRequest<GetCategoryResponse>(
    gqlToString(GET_CATEGORY),
    { id },
    undefined,
    {
      revalidate: CATEGORIES_REVALIDATE,
      tags: [CATEGORIES_TAG, `public:category:${id}`],
    }
  );
  return data.category;
}
