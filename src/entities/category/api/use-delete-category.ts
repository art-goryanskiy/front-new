import { CategoryEntity } from "@/shared/api/generated/graphql";
import { DELETE_CATEGORY } from "@/shared/api/mutations/categories";
import { GET_CATEGORIES } from "@/shared/api/queries/categories";
import { revalidatePublicProgramsAndCategories } from "@/shared/lib/revalidate/public-revalidate";
import { useMutation } from "@apollo/client/react";

export function useDeleteCategory() {
  const [deleteCategory, { loading, error }] = useMutation<{
    deleteCategory: CategoryEntity;
  }>(DELETE_CATEGORY, {
    refetchQueries: [{ query: GET_CATEGORIES }],
    awaitRefetchQueries: true,
    update: (cache) => {
      cache.evict({ fieldName: "categories" });
      cache.gc();
    },
  });

  const handleDelete = async (id: string) => {
    try {
      const result = await deleteCategory({
        variables: { id },
      });
      try {
        await revalidatePublicProgramsAndCategories();
      } catch {
        // Do not break admin UX if revalidation fails
      }
      return result.data?.deleteCategory;
    } catch (error) {
      throw error;
    }
  };

  return {
    deleteCategory: handleDelete,
    loading,
    error,
  };
}
