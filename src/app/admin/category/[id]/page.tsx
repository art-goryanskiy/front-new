"use client";

import type { CategoryEntity } from "@/shared/api/generated/graphql";
import { GET_CATEGORY } from "@/shared/api/queries/categories";
import { ErrorState } from "@/shared/ui/error-state/error-state";
import { LoadingState } from "@/shared/ui/loading-state/loading-state";
import { PageHeaderWithBack } from "@/shared/ui/page-header-with-back/page-header-with-back";
import { useQuery } from "@apollo/client/react";
import { Suspense, lazy, memo, use, useCallback } from "react";

import { useProgramModalState } from "@/shared/store/modal-store";
import { CategoryProgramsView } from "@/widgets/admin/programs-by-category/category-programs-view";

const ProgramModal = lazy(() =>
  import("@/widgets/program/program-modal/program-modal").then(
    (mod) => ({
      default: mod.ProgramModal,
    })
  )
);

const DeleteProgramModal = lazy(() =>
  import("@/widgets/program/delete-program-modal/delete-program-modal").then(
    (mod) => ({ default: mod.DeleteProgramModal })
  )
);

const CategoryProgramsPage = memo(function CategoryProgramsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const { data, loading, error } = useQuery<{
    category: CategoryEntity;
  }>(GET_CATEGORY, {
    variables: { id },
    errorPolicy: "all",
    fetchPolicy: "cache-first",
  });

  const { openCreateProgramModal } = useProgramModalState();

  const category = data?.category;
  const categoryType = category?.type ?? null;

  // ✅ Hook вызывается всегда, не условно
  const handleCreateProgram = useCallback(() => {
    if (!categoryType) return;
    openCreateProgramModal(id, categoryType);
  }, [id, categoryType, openCreateProgramModal]);

  if (loading)
    return <LoadingState message="Загрузка категории..." />;

  if (error || !category) {
    return (
      <ErrorState
        message={error?.message || "Категория не найдена"}
        title="Ошибка загрузки"
      />
    );
  }

  // ✅ Guard: после него categoryType сужается до CategoryType
  if (!categoryType) {
    return (
      <ErrorState
        title="Ошибка данных"
        message="У категории не задан тип (category.type)."
      />
    );
  }

  return (
    <div className="space-y-6">
      <PageHeaderWithBack
        title={category.name}
        description={`Программы категории: ${category.programsCount ?? 0}`}
        actionButton={{
          label: "+ Создать программу",
          onPress: handleCreateProgram,
        }}
      />

      <CategoryProgramsView
        categoryId={id}
        categoryType={categoryType}
      />

      <Suspense fallback={null}>
        <ProgramModal />
        <DeleteProgramModal />
      </Suspense>
    </div>
  );
});

export default CategoryProgramsPage;
