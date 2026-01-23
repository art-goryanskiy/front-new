// src/app/admin/category/[id]/page.tsx
"use client";

import {
  lazy,
  Suspense,
  use,
  memo,
  useCallback,
  useMemo,
} from "react";
import { useQuery } from "@apollo/client/react";
import { GET_CATEGORY } from "@/shared/api/queries/categories";
import { ProgramTable } from "@/widgets/admin/program-table/program-table";
import type { CategoryEntity } from "@/shared/api/generated/graphql";
import { useProgramModalState } from "@/shared/store/ui-store";
import { LoadingState } from "@/shared/ui/loading-state/loading-state";
import { ErrorState } from "@/shared/ui/error-state/error-state";
import { PageHeaderWithBack } from "@/shared/ui/page-header-with-back/page-header-with-back";

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

  const categoryType = useMemo(
    () => data?.category?.type,
    [data?.category?.type]
  );

  const handleCreateProgram = useCallback(() => {
    if (categoryType) {
      openCreateProgramModal(id, categoryType);
    }
  }, [id, categoryType, openCreateProgramModal]);

  if (loading) {
    return <LoadingState message="Загрузка категории..." />;
  }

  if (error || !data?.category) {
    return (
      <ErrorState
        message={error?.message || "Категория не найдена"}
        title="Ошибка загрузки"
      />
    );
  }

  const category = data.category;

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

      <ProgramTable categoryId={id} categoryType={category.type} />
      <Suspense fallback={null}>
        <ProgramModal />
        <DeleteProgramModal />
      </Suspense>
    </div>
  );
});

export default CategoryProgramsPage;
