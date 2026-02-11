"use client";

import { Button } from "@/components/ui/button";
import { useCategories } from "@/entities/category/api/use-categories";
import { usePrograms } from "@/entities/program/api/use-programs";
import { useAuthStatus } from "@/shared/store/auth-store";
import { CategoryType } from "@/shared/api/generated/graphql";
import { CATEGORY_TYPE_LABELS } from "@/shared/constants/categories";
import { EmptyState } from "@/shared/ui/empty-state/empty-state";
import { ErrorState } from "@/shared/ui/error-state/error-state";
import { LoadingState } from "@/shared/ui/loading-state/loading-state";
import { BookOpen } from "lucide-react";
import { memo, useCallback, useEffect, useRef, useMemo, useState } from "react";
import { ProgramCard } from "../program-card/program-card";
import {
  TOP_PROGRAMS_CLASSES,
  TOP_PROGRAMS_TABS,
  TOP_PROGRAMS_TEXTS,
} from "./constants/top-programs-constants";
import type { TopProgramsSectionProps } from "./types/top-programs.types";

export const TopProgramsSection = memo(function TopProgramsSection({
  initialTopPrograms,
  initialAllPrograms,
  initialCategories,
}: TopProgramsSectionProps = {}) {
  const [activeTab, setActiveTab] = useState<CategoryType>(
    CategoryType.QualificationUpgrade
  );

  const hasInitialData = !!initialAllPrograms?.length && !!initialCategories?.length;
  const { isAuthenticated } = useAuthStatus();
  const wasAuthenticatedRef = useRef(false);

  // Для гостя с initial-данными не дергаем API (экономия запросов). После логина — refetch для цен.
  const skipClientFetch = !isAuthenticated && hasInitialData;

  const {
    programs: allProgramsClient,
    loading: programsLoading,
    error: programsError,
    refetch: refetchPrograms,
  } = usePrograms(undefined, { skip: skipClientFetch });

  const {
    categories: categoriesClient,
    loading: categoriesLoading,
    refetch: refetchCategories,
  } = useCategories(undefined, { skip: skipClientFetch });

  // После логина без перезагрузки — перезапросить программы и категории с кукой (чтобы подтянуть цены)
  useEffect(() => {
    if (isAuthenticated && !wasAuthenticatedRef.current) {
      wasAuthenticatedRef.current = true;
      refetchPrograms({ fetchPolicy: "network-only" });
      refetchCategories({ fetchPolicy: "network-only" });
    }
    if (!isAuthenticated) {
      wasAuthenticatedRef.current = false;
    }
  }, [isAuthenticated, refetchPrograms, refetchCategories]);

  // Приоритет у клиентских данных (с кукой); пока не пришли — показываем initial
  const allPrograms = useMemo(
    () =>
      allProgramsClient.length > 0
        ? allProgramsClient
        : (initialAllPrograms ?? []),
    [initialAllPrograms, allProgramsClient]
  );

  const categories = useMemo(
    () =>
      categoriesClient.length > 0 ? categoriesClient : (initialCategories ?? []),
    [initialCategories, categoriesClient]
  );

  // Фильтруем категории по типу
  const categoryIds = useMemo(
    () =>
      categories
        .filter((cat) => cat.type === activeTab)
        .map((cat) => cat.id),
    [activeTab, categories]
  );

  // Фильтруем программы на клиенте для конкретных категорий
  const filteredPrograms = useMemo(() => {
    if (!categoryIds || categoryIds.length === 0) return [];
    return allPrograms.filter((program) =>
      categoryIds.includes(program.category)
    );
  }, [allPrograms, categoryIds]);

  // Сортируем по просмотрам
  const sortedPrograms = useMemo(
    () =>
      [...filteredPrograms].sort((a, b) => (b.views || 0) - (a.views || 0)),
    [filteredPrograms]
  );

  const displayedPrograms = useMemo(() => {
    return sortedPrograms.slice(0, 9);
  }, [sortedPrograms]);

  const categoryLabel = CATEGORY_TYPE_LABELS[activeTab];

  // Мемоизируем обработчик переключения табов
  const handleTabChange = useCallback((tab: CategoryType) => {
    setActiveTab(tab);
  }, []);

  // Мемоизируем обработчик кнопки "Показать больше"
  const handleShowMore = useCallback(() => {
    const categoryPath = `/${activeTab.toLowerCase().replace(/_/g, "-")}`;
    window.location.href = categoryPath;
  }, [activeTab]);

  const loading =
    !hasInitialData && (programsLoading || categoriesLoading);
  const error = programsError;

  if (error) {
    return (
      <section id="programs" className={TOP_PROGRAMS_CLASSES.section}>
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -left-24 h-[320px] w-[420px] rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -right-24 -bottom-24 h-[360px] w-[520px] rounded-full bg-emerald-500/10 blur-3xl" />
        </div>
        <div className={TOP_PROGRAMS_CLASSES.container}>
          <ErrorState message={error.message} />
        </div>
      </section>
    );
  }

  return (
    <section id="programs" className={TOP_PROGRAMS_CLASSES.section}>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-28 -right-28 h-[360px] w-[520px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-28 -left-28 h-[420px] w-[520px] rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/10 to-background/60" />
      </div>
      <div className={TOP_PROGRAMS_CLASSES.container}>
        {/* Header */}
        <div className={TOP_PROGRAMS_CLASSES.header}>
          <h2 className={TOP_PROGRAMS_CLASSES.title}>
            {TOP_PROGRAMS_TEXTS.title}
          </h2>
          <p className={TOP_PROGRAMS_CLASSES.subtitle}>
            {TOP_PROGRAMS_TEXTS.subtitle}
          </p>
        </div>

        {/* Tabs — CSS transition для производительности */}
        <div className={TOP_PROGRAMS_CLASSES.tabs}>
          {TOP_PROGRAMS_TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => handleTabChange(tab.key)}
              className={`${TOP_PROGRAMS_CLASSES.tab} ${
                activeTab === tab.key
                  ? TOP_PROGRAMS_CLASSES.tabActive
                  : TOP_PROGRAMS_CLASSES.tabInactive
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Programs Grid */}
        {loading ? (
          <LoadingState message={TOP_PROGRAMS_TEXTS.loading} />
        ) : displayedPrograms.length === 0 ? (
          <EmptyState
            title={TOP_PROGRAMS_TEXTS.noPrograms}
            icon={
              <BookOpen className="h-16 w-16 text-muted-foreground" />
            }
          />
        ) : (
          <>
            <div className={TOP_PROGRAMS_CLASSES.grid}>
              {displayedPrograms.map((program) => (
                <ProgramCard
                  key={program.id}
                  program={program}
                  categoryType={categoryLabel}
                />
              ))}
            </div>

            {/* Show More Button */}
            {sortedPrograms.length > 9 && (
              <div className={TOP_PROGRAMS_CLASSES.showMore}>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-primary text-primary hover:bg-primary/10 hover:text-primary"
                  onClick={handleShowMore}
                >
                  {TOP_PROGRAMS_TEXTS.showMore}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
});
