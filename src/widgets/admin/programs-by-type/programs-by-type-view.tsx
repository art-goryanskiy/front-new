"use client";

import { useCategories } from "@/entities/category/api/use-categories";
import { useProgramsPage } from "@/entities/program/api/use-programs-page";
import type {
  CategoryEntity,
  CategoryType,
  ProgramEntity,
} from "@/shared/api/generated/graphql";
import { useDebounce } from "@/shared/lib/hooks/use-debounce";
import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

type PagingState = {
  key: string;
  page: number;
  accumulated: ProgramEntity[];
};
import { Loader2 } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
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

function parsePricing(value: string | null): PricingFilter {
  return value === "withPrice" || value === "noPrice" ? value : "all";
}

function parseViews(value: string | null): ViewsFilter {
  return value === "popular" ? "popular" : "all";
}

function parseSort(value: string | null): Sort {
  return value === "viewsDesc" || value === "titleAsc"
    ? value
    : "updatedDesc";
}

const QUERY_KEYS = {
  q: "p_q",
  category: "p_category",
  pricing: "p_pricing",
  views: "p_views",
  sort: "p_sort",
} as const;

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

import { ADMIN_PAGE_SIZE } from "@/shared/constants/admin";

const PAGE_SIZE = ADMIN_PAGE_SIZE;

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

  const requestKey = useMemo(
    () =>
      `${type}|${categoryId}|${debouncedQ}|${sort}|${categoryIds.join(",")}`,
    [type, categoryId, debouncedQ, sort, categoryIds]
  );

  const [paging, setPaging] = useState<PagingState>({
    key: requestKey,
    page: 1,
    accumulated: [],
  });

  const effectivePaging =
    paging.key === requestKey
      ? paging
      : { ...paging, key: requestKey, page: 1 };

  useEffect(() => {
    if (paging.key !== requestKey) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPaging((prev) => ({
        ...prev,
        key: requestKey,
        page: 1,
      }));
    }
  }, [requestKey, paging.key]);

  const { sortBy, sortOrder } = useMemo(() => mapSort(sort), [sort]);

  const filter = useMemo(() => {
    const search = debouncedQ.trim();
    const offset = (effectivePaging.page - 1) * PAGE_SIZE;

    const base = {
      sortBy,
      sortOrder,
      limit: PAGE_SIZE,
      offset,
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
  }, [
    categoryId,
    categoryIds,
    debouncedQ,
    sortBy,
    sortOrder,
    effectivePaging.page,
  ]);

  const { items, total, loading, error } = useProgramsPage(filter);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Sync accumulated rows from current page payload.
    // Do not rely on loading transitions because cache-first may skip them.
    setPaging((prev) => {
      if (prev.key !== requestKey) return prev;

      if (effectivePaging.page === 1) {
        const prevIds = prev.accumulated.map((p) => p.id).join("|");
        const nextIds = items.map((p) => p.id).join("|");
        if (prevIds === nextIds) return prev;
        return { ...prev, accumulated: items };
      }

      const existing = new Set(prev.accumulated.map((p) => p.id));
      const toAdd = items.filter((p) => !existing.has(p.id));
      if (toAdd.length === 0) return prev;

      return {
        ...prev,
        accumulated: [...prev.accumulated, ...toAdd],
      };
    });
  }, [items, requestKey, effectivePaging.page]);

  const localQuery = useMemo(
    () => debouncedQ.trim().toLowerCase(),
    [debouncedQ]
  );

  const filteredItems = useMemo(() => {
    return effectivePaging.accumulated.filter((p) => {
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

      if (!localQuery) return true;
      const haystack =
        `${p.title} ${p.slug} ${p.description || ""}`.toLowerCase();
      return haystack.includes(localQuery);
    });
  }, [effectivePaging.accumulated, views, pricing, localQuery]);

  const canLoadMore = effectivePaging.accumulated.length < total;
  const isInitialLoading =
    loading &&
    effectivePaging.page === 1 &&
    effectivePaging.accumulated.length === 0;
  const isRefreshing =
    loading &&
    effectivePaging.page === 1 &&
    effectivePaging.accumulated.length > 0;

  const handleLoadMore = useCallback(() => {
    setPaging((prev) => ({ ...prev, page: prev.page + 1 }));
  }, []);

  useEffect(() => {
    const node = loadMoreRef.current;
    if (!node || !canLoadMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (!first?.isIntersecting || loading) return;
        handleLoadMore();
      },
      { rootMargin: "240px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [canLoadMore, loading, handleLoadMore, effectivePaging.page]);

  return (
    <DashboardSection title={title} suppressTitle={suppressTitle}>
      <div
        className={cn(
          "overflow-hidden rounded-2xl border border-border/50",
          GLASS_CLASSES.card
        )}
      >
        <div className="px-4 pt-4 sm:px-5 sm:pt-5">
          <DataToolbar
            searchValue={q}
            onSearchValueChange={setQ}
            searchPlaceholder="Поиск по программам…"
            rightSlot={
              <div className="flex flex-wrap items-center gap-2 rounded-xl border border-border/40 bg-background/50 px-2.5 py-1.5">
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
                    <SelectItem value="popular">
                      Популярные
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={pricing}
                  onValueChange={(v) =>
                    setPricing(v as PricingFilter)
                  }
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
            }
          />
        </div>

        <div className="border-t border-border/40 px-4 pb-4 sm:px-5 sm:pb-5">
          {isRefreshing ? (
            <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
              <Loader2
                className="h-3.5 w-3.5 animate-spin"
                aria-hidden
              />
              Обновляем список…
            </div>
          ) : null}
          {isInitialLoading ? (
            <div className="space-y-2 py-2">
              {Array.from({ length: 6 }, (_, i) => (
                <Skeleton
                  key={i}
                  variant="premium"
                  className="h-14 w-full rounded-xl"
                />
              ))}
            </div>
          ) : error ? (
            <ErrorState message={error.message} />
          ) : filteredItems.length === 0 ? (
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

              {canLoadMore && (
                <div
                  ref={loadMoreRef}
                  className="mt-6 flex min-h-10 items-center justify-center"
                >
                  {loading ? (
                    <span className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Loader2
                        className="h-4 w-4 animate-spin"
                        aria-hidden
                      />
                      Подгружаем программы…
                    </span>
                  ) : null}
                </div>
              )}
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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [q, setQ] = useState(
    () => searchParams.get(QUERY_KEYS.q) ?? ""
  );
  const debouncedQ = useDebounce(q, 250);

  const [categoryId, setCategoryId] = useState<string>(
    () => searchParams.get(QUERY_KEYS.category) ?? "all"
  );
  const [pricing, setPricing] = useState<PricingFilter>(() =>
    parsePricing(searchParams.get(QUERY_KEYS.pricing))
  );
  const [views, setViews] = useState<ViewsFilter>(() =>
    parseViews(searchParams.get(QUERY_KEYS.views))
  );
  const [sort, setSort] = useState<Sort>(() =>
    parseSort(searchParams.get(QUERY_KEYS.sort))
  );

  const categoriesOfType = useMemo(() => {
    return categories.filter(
      (c) => c.type === type
    ) as CategoryEntity[];
  }, [categories, type]);

  const categoryIds = useMemo(
    () => categoriesOfType.map((c) => c.id),
    [categoriesOfType]
  );

  const effectiveCategoryId = useMemo(() => {
    if (
      categoryId !== "all" &&
      categoryIds.length > 0 &&
      !categoryIds.includes(categoryId)
    ) {
      return "all";
    }
    return categoryId;
  }, [categoryId, categoryIds]);

  useEffect(() => {
    const next = new URLSearchParams(searchParams.toString());
    const normalizedSearch = debouncedQ.trim();

    if (normalizedSearch) next.set(QUERY_KEYS.q, normalizedSearch);
    else next.delete(QUERY_KEYS.q);

    if (effectiveCategoryId !== "all")
      next.set(QUERY_KEYS.category, effectiveCategoryId);
    else next.delete(QUERY_KEYS.category);

    if (pricing !== "all") next.set(QUERY_KEYS.pricing, pricing);
    else next.delete(QUERY_KEYS.pricing);

    if (views !== "all") next.set(QUERY_KEYS.views, views);
    else next.delete(QUERY_KEYS.views);

    if (sort !== "updatedDesc") next.set(QUERY_KEYS.sort, sort);
    else next.delete(QUERY_KEYS.sort);

    const current = searchParams.toString();
    const updated = next.toString();

    if (updated !== current) {
      router.replace(updated ? `${pathname}?${updated}` : pathname, {
        scroll: false,
      });
    }
  }, [
    debouncedQ,
    effectiveCategoryId,
    pricing,
    views,
    sort,
    pathname,
    router,
    searchParams,
  ]);

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
      type={type}
      title={title}
      categoriesOfType={categoriesOfType}
      categoryIds={categoryIds}
      suppressTitle={suppressTitle}
      q={q}
      setQ={setQ}
      debouncedQ={debouncedQ}
      categoryId={effectiveCategoryId}
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
