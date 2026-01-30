import {
  CategoryEntity,
  CreateCategoryInput,
} from "@/shared/api/generated/graphql";
import { CREATE_CATEGORY } from "@/shared/api/mutations/categories";
import { GET_CATEGORIES } from "@/shared/api/queries/categories";
import { revalidatePublicProgramsAndCategories } from "@/shared/lib/revalidate/public-revalidate";
import { useMutation } from "@apollo/client/react";

export function useCreateCategory() {
  const [createCategory, { loading, error }] = useMutation<{
    createCategory: CategoryEntity;
  }>(CREATE_CATEGORY, {
    refetchQueries: [{ query: GET_CATEGORIES }],
    awaitRefetchQueries: true,
    update: (cache) => {
      cache.evict({ fieldName: "categories" });
      cache.gc();
    },
  });

  const handleCreate = async (input: CreateCategoryInput) => {
    const result = await createCategory({ variables: { input } });
    try {
      await revalidatePublicProgramsAndCategories();
    } catch {
      // Do not break admin UX if revalidation fails
    }
    return result.data?.createCategory;
  };

  return {
    createCategory: handleCreate,
    loading,
    error,
  };
}
