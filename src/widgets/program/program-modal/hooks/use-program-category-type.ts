"use client";

import type {
  CategoryEntity,
  CategoryType,
} from "@/shared/api/generated/graphql";
import { GET_CATEGORY } from "@/shared/api/queries/categories";
import { useProgramModalState } from "@/shared/store/modal-store";
import { useQuery } from "@apollo/client/react";
import { useMemo } from "react";

/**
 * Хук для получения типа категории программы
 */
export function useProgramCategoryType() {
  const { editingProgram, programCategoryId, programCategoryType } =
    useProgramModalState();

  // categoryId: либо из редактируемой программы, либо из контекста "создать"
  const categoryId = useMemo(
    () => editingProgram?.category || programCategoryId || "",
    [editingProgram?.category, programCategoryId]
  );

  // Fallback: если тип не передали в store — получаем его из категории
  const shouldFetchType = useMemo(
    () => !programCategoryType && !!categoryId,
    [programCategoryType, categoryId]
  );

  const { data: categoryData } = useQuery<{
    category: CategoryEntity;
  }>(GET_CATEGORY, {
    variables: { id: categoryId },
    skip: !shouldFetchType,
    errorPolicy: "all",
    fetchPolicy: "cache-first",
  });

  const resolvedCategoryType: CategoryType | undefined = useMemo(
    () =>
      programCategoryType ??
      categoryData?.category?.type ??
      undefined,
    [programCategoryType, categoryData?.category?.type]
  );

  return {
    categoryId,
    categoryType: resolvedCategoryType,
  };
}
