"use client";

import { memo, useMemo } from "react";
import { usePrograms } from "../../api/use-programs";
import { useCategories } from "@/entities/category/api/use-categories";
import { ProgramListSkeleton } from "./program-list-skeleton";
import { EmptyState } from "@/shared/ui/empty-state/empty-state";
import { ErrorState } from "@/shared/ui/error-state/error-state";
import { ProgramCard } from "@/widgets/public/program-card/program-card";
import { BackButton } from "@/shared/ui/back-button/back-button";
import { ListHeader } from "@/shared/ui/list-header/list-header";
import type { ProgramListProps } from "./types/program-list.types";
import { PROGRAM_LIST_CLASSES } from "./constants/program-list-constants";
import { CATEGORY_TYPE_LABELS } from "@/shared/constants/categories";
import { BookOpen } from "lucide-react";

export const ProgramList = memo(function ProgramList({
  programs: serverPrograms,
  categoryType,
  categoryId,
  title,
  description,
}: ProgramListProps) {
  const hasServerData = !!serverPrograms;

  const {
    programs: clientPrograms,
    loading: programsLoading,
    error: programsError,
  } = usePrograms(
    hasServerData
      ? undefined
      : { sortBy: "views", sortOrder: "desc" },
    { skip: hasServerData }
  );

  const { categories, loading: categoriesLoading } = useCategories(
    undefined,
    { skip: hasServerData }
  );

  const allPrograms = useMemo(
    () => serverPrograms || clientPrograms,
    [serverPrograms, clientPrograms]
  );

  const isLoading = useMemo(
    () => !hasServerData && (programsLoading || categoriesLoading),
    [hasServerData, programsLoading, categoriesLoading]
  );

  const filteredPrograms = useMemo(() => {
    if (categoryId) {
      return allPrograms.filter(
        (program) => program.category === categoryId
      );
    }

    if (categoryType) {
      const categoryIds = categories
        .filter((cat) => cat.type === categoryType)
        .map((cat) => cat.id);
      if (categoryIds.length === 0) return [];
      return allPrograms.filter((program) =>
        categoryIds.includes(program.category)
      );
    }

    return allPrograms;
  }, [allPrograms, categoryId, categoryType, categories]);

  const sortedPrograms = useMemo(() => {
    return [...filteredPrograms].sort(
      (a, b) => (b.views || 0) - (a.views || 0)
    );
  }, [filteredPrograms]);

  const categoryTypeLabel = useMemo(() => {
    if (!categoryType) return undefined;
    return CATEGORY_TYPE_LABELS[categoryType];
  }, [categoryType]);

  const emptyStateIcon = useMemo(
    () => <BookOpen className="h-10 w-10 text-muted-foreground" />,
    []
  );

  const backButton = useMemo(
    () =>
      categoryId ? (
        <BackButton className={PROGRAM_LIST_CLASSES.backButton} />
      ) : null,
    [categoryId]
  );

  if (isLoading) {
    return <ProgramListSkeleton backButton={backButton} />;
  }

  if (programsError) {
    return (
      <>
        {backButton}
        <ErrorState message={programsError.message} />
      </>
    );
  }

  return (
    <div className={PROGRAM_LIST_CLASSES.container}>
      <ListHeader
        title={title}
        description={description}
        backButton={backButton}
        className={PROGRAM_LIST_CLASSES.header}
        titleClassName={PROGRAM_LIST_CLASSES.title}
        descriptionClassName={PROGRAM_LIST_CLASSES.description}
      />

      {sortedPrograms.length === 0 ? (
        <EmptyState
          title="Программы не найдены"
          description="В этой категории пока нет программ"
          icon={emptyStateIcon}
        />
      ) : (
        <div className={PROGRAM_LIST_CLASSES.grid}>
          {sortedPrograms.map((program) => (
            <ProgramCard
              key={program.id}
              program={program}
              categoryType={categoryTypeLabel}
            />
          ))}
        </div>
      )}
    </div>
  );
});
