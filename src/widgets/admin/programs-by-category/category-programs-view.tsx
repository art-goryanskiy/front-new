"use client";

import { useProgramsPage } from "@/entities/program/api/use-programs-page";
import type {
  CategoryType,
  ProgramEntity,
} from "@/shared/api/generated/graphql";
import { useDebounce } from "@/shared/lib/hooks/use-debounce";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";

type PagingState = {
  key: string;
  page: number;
  accumulated: ProgramEntity[];
};
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
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
import { CategoryProgramsViewSkeleton } from "./category-programs-view-skeleton";

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

export const CategoryProgramsView = memo(
  function CategoryProgramsView({
    categoryId,
    categoryType,
  }: {
    categoryId: string;
    categoryType: CategoryType;
  }) {
    const { openCreateProgramModal } = useProgramModalState();

    const [q, setQ] = useState("");
    const debouncedQ = useDebounce(q, 250);

    const [pricing, setPricing] = useState<PricingFilter>("all");
    const [views, setViews] = useState<ViewsFilter>("all");
    const [sort, setSort] = useState<Sort>("updatedDesc");

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
        : { key: requestKey, page: 1, accumulated: [] };

    // Фиксируем изменение ключа в state (для корректного handleLoadMore)
    useEffect(() => {
      if (paging.key !== requestKey) {
        setPaging({ key: requestKey, page: 1, accumulated: [] });
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
    }, [categoryId, debouncedQ, sortBy, sortOrder, effectivePaging.page]);

    const { items, total, loading, error } = useProgramsPage(filter);

    const prevLoadingRef = useRef(false);
    useEffect(() => {
      const wasLoading = prevLoadingRef.current;
      prevLoadingRef.current = loading;

      if (wasLoading && !loading) {
        setPaging((prev) => {
          // Игнорируем устаревший ответ, если ключ уже поменялся
          if (prev.key !== requestKey) return prev;
          return {
            ...prev,
            accumulated:
              prev.page === 1
                ? items
                : [...prev.accumulated, ...items],
          };
        });
      }
    }, [loading, items, requestKey]);

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

    const canLoadMore = effectivePaging.accumulated.length < total;

    const handleLoadMore = useCallback(() => {
      setPaging((prev) => ({ ...prev, page: prev.page + 1 }));
    }, []);

    const handleCreate = useCallback(() => {
      openCreateProgramModal(categoryId, categoryType);
    }, [openCreateProgramModal, categoryId, categoryType]);

    if (loading && effectivePaging.page === 1)
      return <CategoryProgramsViewSkeleton />;
    if (error) return <ErrorState message={error.message} />;

    return (
      <DashboardSection title="Программы">
        <div className="space-y-4">
          <DataToolbar
            searchValue={q}
            onSearchValueChange={setQ}
            searchPlaceholder="Поиск по программам…"
            rightSlot={
              <div className="flex items-center gap-2">
                <Select
                  value={views}
                  onValueChange={(v) => setViews(v as ViewsFilter)}
                >
                  <SelectTrigger className="h-9 w-[150px] bg-background/60">
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
                  onValueChange={(v) => setPricing(v as PricingFilter)}
                >
                  <SelectTrigger className="h-9 w-[150px] bg-background/60">
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
                  <SelectTrigger className="h-9 w-[170px] bg-background/60">
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

                <Button
                  className="font-semibold"
                  onClick={handleCreate}
                >
                  + Программа
                </Button>
              </div>
            }
          />

          {filteredItems.length === 0 ? (
            <EmptyState
              title="Программы не найдены"
              description="Попробуйте изменить фильтры или запрос."
            />
          ) : (
            <>
              <ProgramList
                programs={filteredItems}
                categoryType={categoryType}
                caption={`Показано ${filteredItems.length} из ${total}`}
              />

              {canLoadMore && (
                <div className="mt-6 flex justify-center">
                  <Button
                    variant="outline"
                    size="lg"
                    className="min-w-[200px] rounded-xl border-border/60 bg-background/60 font-semibold shadow-sm transition-all hover:bg-background/80 hover:shadow focus-visible:ring-2 focus-visible:ring-primary/20"
                    onClick={handleLoadMore}
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                        Загрузка…
                      </span>
                    ) : (
                      "Показать ещё"
                    )}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </DashboardSection>
    );
  }
);
