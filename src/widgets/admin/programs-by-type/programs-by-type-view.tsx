"use client";

import { useCategories } from "@/entities/category/api/use-categories";
import { useProgramsPage } from "@/entities/program/api/use-programs-page";
import type {
  CategoryEntity,
  CategoryType,
} from "@/shared/api/generated/graphql";
import { useDebounce } from "@/shared/lib/hooks/use-debounce";
import { memo, useCallback, useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProgramsByTypeHeaderStore } from "@/widgets/admin/programs-by-type/programs-by-type-header-store";
import { DashboardSection } from "@/shared/ui/dashboard-section/dashboard-section";
import { DataToolbar } from "@/shared/ui/data-toolbar/data-toolbar";
import { EmptyState } from "@/shared/ui/empty-state/empty-state";
import { GLASS_CLASSES } from "@/shared/ui/glass/glass-constants";
import { cn } from "@/lib/utils";
import { ErrorState } from "@/shared/ui/error-state/error-state";
import { CategoryProgramsViewSkeleton } from "@/widgets/admin/programs-by-category/category-programs-view-skeleton";

import { POPULAR_VIEWS_THRESHOLD } from "@/widgets/admin/program-table/constants/program-table-constants";
import { ProgramList } from "@/widgets/admin/program-table/program-list";
import { hasValidPricing } from "@/widgets/admin/program-table/utils/program-table-utils";

type PricingFilter = "all" | "withPrice" | "noPrice";
type ViewsFilter = "all" | "popular";
type Sort = "updatedDesc" | "viewsDesc" | "titleAsc";

function mapSort(sort: Sort): {
  sortBy: string;
  sortOrder: "asc" | "desc";
} {
  if (sort === "viewsDesc")
    return { sortBy: "views", sortOrder: "desc" };
  if (sort === "titleAsc")
    return { sortBy: "title", sortOrder: "asc" };
  return { sortBy: "updatedAt", sortOrder: "desc" };
}

const PAGE_SIZE = 30;

const ProgramsByTypeResults = memo(function ProgramsByTypeResults({
  type,
  title,
  categoriesOfType,
  categoryIds,
  suppressTitle,

  q,
  setQ,
  debouncedQ,

  categoryId,
  setCategoryId,

  pricing,
  setPricing,
  views,
  setViews,
  sort,
  setSort,
}: {
  type: CategoryType;
  title: string;
  categoriesOfType: CategoryEntity[];
  categoryIds: string[];
  suppressTitle?: boolean;

  q: string;
  setQ: (v: string) => void;
  debouncedQ: string;

  categoryId: string;
  setCategoryId: (v: string) => void;

  pricing: PricingFilter;
  setPricing: (v: PricingFilter) => void;
  views: ViewsFilter;
  setViews: (v: ViewsFilter) => void;
  sort: Sort;
  setSort: (v: Sort) => void;
}) {
  const setHeaderState = useProgramsByTypeHeaderStore(
    (s) => s.setState
  );
  useEffect(() => {
    setHeaderState(categoryId, type);
  }, [categoryId, type, setHeaderState]);

  // pagination: increase limit, offset always 0
  const [page, setPage] = useState(1);
  const limit = PAGE_SIZE * page;

  const { sortBy, sortOrder } = useMemo(() => mapSort(sort), [sort]);

  const filter = useMemo(() => {
    const search = debouncedQ.trim();

    const base = {
      sortBy,
      sortOrder,
      limit,
      offset: 0,
    };

    if (categoryId !== "all") {
      return search
        ? { ...base, category: categoryId, search }
        : { ...base, category: categoryId };
    }

    if (categoryIds.length === 0) return undefined;

    return search
      ? { ...base, categoryIds, search }
      : { ...base, categoryIds };
  }, [categoryId, categoryIds, debouncedQ, sortBy, sortOrder, limit]);

  const { items, total, loading, error } = useProgramsPage(filter);

  const localQuery = useMemo(() => q.trim().toLowerCase(), [q]);

  const filteredItems = useMemo(() => {
    return items.filter((p) => {
      if (
        views === "popular" &&
        (p.views || 0) <= POPULAR_VIEWS_THRESHOLD
      )
        return false;

      if (pricing !== "all") {
        const hasPrice = hasValidPricing(p.pricing);
        if (pricing === "withPrice" && !hasPrice) return false;
        if (pricing === "noPrice" && hasPrice) return false;
      }

      // local search (instant), while debouncedQ used for server
      if (!localQuery) return true;
      const haystack =
        `${p.title} ${p.slug} ${p.description || ""}`.toLowerCase();
      return haystack.includes(localQuery);
    });
  }, [items, views, pricing, localQuery]);

  const countsText = useMemo(
    () => `${filteredItems.length} / ${total}`,
    [filteredItems.length, total]
  );

  const canLoadMore = useMemo(
    () => items.length < total,
    [items.length, total]
  );

  const handleLoadMore = useCallback(() => {
    setPage((p) => p + 1);
  }, []);

  if (loading && page === 1) return <CategoryProgramsViewSkeleton />;
  if (error) return <ErrorState message={error.message} />;

  const countsBadge = (
    <span className="hidden rounded-full border border-border/60 bg-muted/20 px-2.5 py-1 text-xs text-muted-foreground sm:inline-flex">
      {countsText}
    </span>
  );

  return (
    <DashboardSection
      title={title}
      actions={suppressTitle ? undefined : countsBadge}
      suppressTitle={suppressTitle}
    >
      <div
        className={cn(
          "rounded-2xl border border-border/50 overflow-hidden",
          GLASS_CLASSES.card
        )}
      >
        <div className="px-4 pt-4 sm:px-5 sm:pt-5">
          <DataToolbar
            searchValue={q}
            onSearchValueChange={setQ}
            searchPlaceholder="Поиск по программам…"
            leftSlot={
              <div className="flex items-center gap-2">
                {suppressTitle ? countsBadge : null}
              </div>
            }
            rightSlot={
              <div className="flex flex-wrap items-center gap-2">
                <span className="hidden text-[11px] font-medium uppercase tracking-wider text-muted-foreground sm:inline">
                  Фильтры
                </span>
                <div className="flex items-center gap-2 rounded-lg border border-border/40 bg-background/40 px-2 py-1.5">
                  <Select
                    value={categoryId}
                    onValueChange={setCategoryId}
                  >
                    <SelectTrigger className="h-8 w-[200px] border-0 bg-transparent shadow-none focus:ring-0 sm:w-[220px]">
                      <SelectValue placeholder="Категория" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">
                        Все категории типа
                      </SelectItem>
                      {categoriesOfType.map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    value={views}
                    onValueChange={(v) => setViews(v as ViewsFilter)}
                  >
                    <SelectTrigger className="h-8 w-[120px] border-0 bg-transparent shadow-none focus:ring-0 sm:w-[140px]">
                      <SelectValue placeholder="Просмотры" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все</SelectItem>
                      <SelectItem value="popular">Популярные</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    value={pricing}
                    onValueChange={(v) => setPricing(v as PricingFilter)}
                  >
                    <SelectTrigger className="h-8 w-[110px] border-0 bg-transparent shadow-none focus:ring-0 sm:w-[130px]">
                      <SelectValue placeholder="Цена" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Любая</SelectItem>
                      <SelectItem value="withPrice">С ценой</SelectItem>
                      <SelectItem value="noPrice">Без цены</SelectItem>
                    </SelectContent>
                  </Select>
                    <Select
                    value={sort}
                    onValueChange={(v) => setSort(v as Sort)}
                  >
                    <SelectTrigger className="h-8 w-[150px] border-0 bg-transparent shadow-none focus:ring-0 sm:w-[170px]">
                      <SelectValue placeholder="Сортировка" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="updatedDesc">
                        Сначала новые
                      </SelectItem>
                      <SelectItem value="viewsDesc">
                        По просмотрам
                      </SelectItem>
                      <SelectItem value="titleAsc">
                        По названию
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            }
          />
        </div>

        <div className="border-t border-border/40 px-4 pb-4 sm:px-5 sm:pb-5">
          {filteredItems.length === 0 ? (
            <EmptyState
              title="Программы не найдены"
              description="Попробуйте изменить фильтры или выберите другую категорию."
            />
          ) : (
            <>
              <ProgramList
                programs={filteredItems}
                categoryType={type}
                caption={`Показано ${filteredItems.length} из ${total}`}
              />

              <div className="mt-4 flex justify-center">
                <Button
                  variant="outline"
                  className="font-semibold"
                  onClick={handleLoadMore}
                  disabled={!canLoadMore || loading}
                >
                  {loading ? "Загрузка…" : "Показать ещё"}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </DashboardSection>
  );
});

export const ProgramsByTypeView = memo(function ProgramsByTypeView({
  type,
  title,
  suppressTitle,
}: {
  type: CategoryType;
  title: string;
  /** Заголовок вынесен в sticky на странице — не дублировать */
  suppressTitle?: boolean;
}) {
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useCategories();

  const [q, setQ] = useState("");
  const debouncedQ = useDebounce(q, 250);

  const [categoryId, setCategoryId] = useState<string>("all");
  const [pricing, setPricing] = useState<PricingFilter>("all");
  const [views, setViews] = useState<ViewsFilter>("all");
  const [sort, setSort] = useState<Sort>("updatedDesc");

  const categoriesOfType = useMemo(() => {
    return categories.filter(
      (c) => c.type === type
    ) as CategoryEntity[];
  }, [categories, type]);

  const categoryIds = useMemo(
    () => categoriesOfType.map((c) => c.id),
    [categoriesOfType]
  );

  const paginationKey = useMemo(
    () =>
      `${type}|${categoryId}|${debouncedQ}|${pricing}|${views}|${sort}`,
    [type, categoryId, debouncedQ, pricing, views, sort]
  );

  if (categoriesLoading) return <CategoryProgramsViewSkeleton />;
  if (categoriesError)
    return <ErrorState message={categoriesError.message} />;

  if (categoriesOfType.length === 0) {
    return (
      <EmptyState
        title="Нет категорий этого типа"
        description="Сначала создайте категорию, затем добавляйте программы."
      />
    );
  }

  return (
    <ProgramsByTypeResults
      key={paginationKey}
      type={type}
      title={title}
      categoriesOfType={categoriesOfType}
      categoryIds={categoryIds}
      suppressTitle={suppressTitle}
      q={q}
      setQ={setQ}
      debouncedQ={debouncedQ}
      categoryId={categoryId}
      setCategoryId={setCategoryId}
      pricing={pricing}
      setPricing={setPricing}
      views={views}
      setViews={setViews}
      sort={sort}
      setSort={setSort}
    />
  );
});
