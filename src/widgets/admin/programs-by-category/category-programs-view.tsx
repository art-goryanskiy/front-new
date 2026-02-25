"use client";

import { useProgramsPage } from "@/entities/program/api/use-programs-page";
import type {
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

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProgramModalState } from "@/shared/store/modal-store";
import { DashboardSection } from "@/shared/ui/dashboard-section/dashboard-section";
import { DataToolbar } from "@/shared/ui/data-toolbar/data-toolbar";
import { EmptyState } from "@/shared/ui/empty-state/empty-state";
import { ErrorState } from "@/shared/ui/error-state/error-state";

import { POPULAR_VIEWS_THRESHOLD } from "@/widgets/admin/program-table/constants/program-table-constants";
import { BulkUpdateProgramsDialog } from "@/widgets/admin/program-table/bulk-update-programs-dialog";
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
  q: "cp_q",
  pricing: "cp_pricing",
  views: "cp_views",
  sort: "cp_sort",
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

export const CategoryProgramsView = memo(
  function CategoryProgramsView({
    categoryId,
    categoryType,
  }: {
    categoryId: string;
    categoryType: CategoryType;
  }) {
    const { openCreateProgramModal } = useProgramModalState();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [q, setQ] = useState(
      () => searchParams.get(QUERY_KEYS.q) ?? ""
    );
    const debouncedQ = useDebounce(q, 250);

    const [pricing, setPricing] = useState<PricingFilter>(() =>
      parsePricing(searchParams.get(QUERY_KEYS.pricing))
    );
    const [views, setViews] = useState<ViewsFilter>(() =>
      parseViews(searchParams.get(QUERY_KEYS.views))
    );
    const [sort, setSort] = useState<Sort>(() =>
      parseSort(searchParams.get(QUERY_KEYS.sort))
    );
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [isBulkDialogOpen, setBulkDialogOpen] = useState(false);

    useEffect(() => {
      const next = new URLSearchParams(searchParams.toString());
      const normalizedSearch = debouncedQ.trim();

      if (normalizedSearch) next.set(QUERY_KEYS.q, normalizedSearch);
      else next.delete(QUERY_KEYS.q);

      if (pricing !== "all") next.set(QUERY_KEYS.pricing, pricing);
      else next.delete(QUERY_KEYS.pricing);

      if (views !== "all") next.set(QUERY_KEYS.views, views);
      else next.delete(QUERY_KEYS.views);

      if (sort !== "updatedDesc") next.set(QUERY_KEYS.sort, sort);
      else next.delete(QUERY_KEYS.sort);

      const current = searchParams.toString();
      const updated = next.toString();

      if (updated !== current) {
        router.replace(
          updated ? `${pathname}?${updated}` : pathname,
          { scroll: false }
        );
      }
    }, [
      debouncedQ,
      pricing,
      views,
      sort,
      pathname,
      router,
      searchParams,
    ]);

    const requestKey = useMemo(
      () => `${categoryId}|${debouncedQ}|${sort}`,
      [categoryId, debouncedQ, sort]
    );

    // Объединяем key + page + accumulated в одном объекте, чтобы избежать
    // рассинхронизации состояния и устранить render-time side effect keyJustChanged.
    const [paging, setPaging] = useState<PagingState>({
      key: requestKey,
      page: 1,
      accumulated: [],
    });

    // Производное состояние: если requestKey изменился, сразу применяем page=1
    // без дополнительного рендера — нет мутаций в теле рендера.
    const effectivePaging =
      paging.key === requestKey
        ? paging
        : { ...paging, key: requestKey, page: 1 };

    // Фиксируем изменение ключа в state (для корректного handleLoadMore)
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

    const { sortBy, sortOrder } = useMemo(
      () => mapSort(sort),
      [sort]
    );

    const filter = useMemo(() => {
      const search = debouncedQ.trim();
      const base = {
        category: categoryId,
        sortBy,
        sortOrder,
        limit: PAGE_SIZE,
        offset: (effectivePaging.page - 1) * PAGE_SIZE,
      };
      return search ? { ...base, search } : base;
    }, [
      categoryId,
      debouncedQ,
      sortBy,
      sortOrder,
      effectivePaging.page,
    ]);

    const { items, total, loading, error } = useProgramsPage(filter);

    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      // Keep accumulated rows in sync even when Apollo serves cache without loading transition.
      // eslint-disable-next-line react-hooks/set-state-in-effect
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

        return true;
      });
    }, [effectivePaging.accumulated, pricing, views]);
    const selectedIdsSet = useMemo(
      () => new Set(selectedIds),
      [selectedIds]
    );
    const selectedVisibleCount = useMemo(
      () =>
        filteredItems.filter((program) =>
          selectedIdsSet.has(program.id)
        ).length,
      [filteredItems, selectedIdsSet]
    );

    const canLoadMore = effectivePaging.accumulated.length < total;
    const hasClientFilters = views !== "all" || pricing !== "all";
    const hiddenByClientFilters = Math.max(
      0,
      effectivePaging.accumulated.length - filteredItems.length
    );
    const displayTotal =
      hasClientFilters && !canLoadMore ? filteredItems.length : total;
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

    const handleCreate = useCallback(() => {
      openCreateProgramModal(categoryId, categoryType);
    }, [openCreateProgramModal, categoryId, categoryType]);
    const handleSelectProgram = useCallback(
      (id: string, selected: boolean) => {
        setSelectedIds((prev) => {
          const next = new Set(prev);
          if (selected) next.add(id);
          else next.delete(id);
          return Array.from(next);
        });
      },
      []
    );
    const handleSelectAllVisible = useCallback(
      (ids: string[], selected: boolean) => {
        setSelectedIds((prev) => {
          const next = new Set(prev);
          ids.forEach((id) => {
            if (selected) next.add(id);
            else next.delete(id);
          });
          return Array.from(next);
        });
      },
      []
    );

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
    useEffect(() => {
      const allowed = new Set(filteredItems.map((item) => item.id));
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedIds((prev) => prev.filter((id) => allowed.has(id)));
    }, [filteredItems]);

    return (
      <DashboardSection title="Программы">
        <div className="overflow-hidden rounded-2xl border border-border/50 bg-background/30">
          <div className="px-4 pt-4 sm:px-5 sm:pt-5">
            <DataToolbar
              searchValue={q}
              onSearchValueChange={setQ}
              searchPlaceholder="Поиск по программам…"
              rightSlot={
                <div className="flex flex-wrap items-center gap-2">
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

                  <Button size="sm" className="font-semibold" onClick={handleCreate}>
                    + Программа
                  </Button>
                </div>
              }
            />
          </div>
          {selectedVisibleCount > 0 ? (
            <div className="mx-4 mb-3 flex flex-wrap items-center gap-2 rounded-xl border border-border/50 bg-background/40 px-3 py-2 sm:mx-5">
              <span className="text-sm text-muted-foreground">
                Выбрано: {selectedVisibleCount}
              </span>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() =>
                  handleSelectAllVisible(
                    filteredItems.map((program) => program.id),
                    true
                  )
                }
              >
                Выбрать все видимые
              </Button>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => setSelectedIds([])}
              >
                Сбросить выбор
              </Button>
              <Button
                type="button"
                size="sm"
                onClick={() => setBulkDialogOpen(true)}
              >
                Открыть массовое обновление
              </Button>
            </div>
          ) : null}
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
                description="Попробуйте изменить фильтры или запрос."
              />
            ) : (
              <>
                <ProgramList
                  programs={filteredItems}
                  categoryType={categoryType}
                  selectedProgramIds={selectedIdsSet}
                  onSelectProgram={handleSelectProgram}
                  onSelectAllPrograms={handleSelectAllVisible}
                  onOpenBulkUpdate={() => setBulkDialogOpen(true)}
                  onClearSelection={() => setSelectedIds([])}
                  caption={`Показано ${filteredItems.length} из ${displayTotal}${
                    hasClientFilters &&
                    !canLoadMore &&
                    hiddenByClientFilters > 0
                      ? ` • скрыто фильтрами: ${hiddenByClientFilters}`
                      : ""
                  }`}
                />

                {canLoadMore && (
                  <div
                    ref={loadMoreRef}
                    className="mt-6 flex min-h-10 flex-col items-center justify-center gap-2"
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
                    {!loading ? (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleLoadMore}
                      >
                        Показать еще
                      </Button>
                    ) : null}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <BulkUpdateProgramsDialog
          open={isBulkDialogOpen}
          onOpenChange={setBulkDialogOpen}
          selectedIds={selectedIds}
          onApplied={() => setSelectedIds([])}
          categoryType={categoryType}
        />
      </DashboardSection>
    );
  }
);
