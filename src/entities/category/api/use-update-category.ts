import {
  CategoryEntity,
  UpdateCategoryInput,
} from "@/shared/api/generated/graphql";
import { UPDATE_CATEGORY } from "@/shared/api/mutations/categories";
import { GET_CATEGORIES } from "@/shared/api/queries/categories";
import { revalidatePublicProgramsAndCategories } from "@/shared/lib/revalidate/public-revalidate";
import { useMutation } from "@apollo/client/react";

export function useUpdateCategory() {
  const [updateCategory, { loading, error }] = useMutation<{
    updateCategory: CategoryEntity;
  }>(UPDATE_CATEGORY, {
    refetchQueries: [{ query: GET_CATEGORIES }],
    awaitRefetchQueries: true,
    update: (cache) => {
      cache.evict({ fieldName: "categories" });
      cache.gc();
    },
  });

  const handleUpdate = async (
    id: string,
    input: UpdateCategoryInput
  ) => {
    try {
      const result = await updateCategory({
        variables: { id, input },
      });
      try {
        await revalidatePublicProgramsAndCategories();
      } catch {
        // Do not break admin UX if revalidation fails
      }
      return result.data?.updateCategory;
    } catch (error) {
      throw error;
    }
  };

  return {
    updateCategory: handleUpdate,
    loading,
    error,
  };
}
