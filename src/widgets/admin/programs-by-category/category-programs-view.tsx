"use client";

import { useProgramsPage } from "@/entities/program/api/use-programs-page";
import type {
  CategoryType,
  ProgramEntity,
} from "@/shared/api/generated/graphql";
import { useDebounce } from "@/shared/lib/hooks/use-debounce";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
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

    const requestKeyRef = useRef(requestKey);
    const keyJustChanged = requestKeyRef.current !== requestKey;
    if (keyJustChanged) requestKeyRef.current = requestKey;

    const [page, setPage] = useState(1);
    const [accumulated, setAccumulated] = useState<ProgramEntity[]>([]);
    const prevLoadingRef = useRef(false);

    const { sortBy, sortOrder } = useMemo(
      () => mapSort(sort),
      [sort]
    );

    useEffect(() => {
      setPage(1);
      setAccumulated([]);
    }, [requestKey]);

    const filter = useMemo(() => {
      const search = debouncedQ.trim();
      const offset = keyJustChanged ? 0 : (page - 1) * PAGE_SIZE;
      const base = {
        category: categoryId,
        sortBy,
        sortOrder,
        limit: PAGE_SIZE,
        offset,
      };
      return search ? { ...base, search } : base;
    }, [categoryId, debouncedQ, sortBy, sortOrder, page, keyJustChanged]);

    const { items, total, loading, error } = useProgramsPage(filter);

    useEffect(() => {
      if (!loading && page === 1 && items.length > 0 && accumulated.length === 0) {
        setAccumulated(items);
      } else if (prevLoadingRef.current && !loading) {
        if (page === 1) {
          setAccumulated(items);
        } else {
          setAccumulated((prev) => [...prev, ...items]);
        }
      }
      prevLoadingRef.current = loading;
    }, [loading, page, items, accumulated.length]);

    const filteredItems = useMemo(() => {
      return accumulated.filter((p) => {
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
    }, [accumulated, pricing, views]);

    const canLoadMore = useMemo(
      () => accumulated.length < total,
      [accumulated.length, total]
    );

    const handleLoadMore = useCallback(
      () => setPage((p) => p + 1),
      []
    );

    const handleCreate = useCallback(() => {
      openCreateProgramModal(categoryId, categoryType);
    }, [openCreateProgramModal, categoryId, categoryType]);

    if (loading && page === 1)
      return <CategoryProgramsViewSkeleton />;
    if (error) return <ErrorState message={error.message} />;

    return (
      <DashboardSection title="Программы">
        <div className="space-y-4">
          <DataToolbar
            searchValue={q}
            onSearchValueChange={(v) => {
              setQ(v);
              setPage(1);
            }}
            searchPlaceholder="Поиск по программам…"
            rightSlot={
              <div className="flex items-center gap-2">
                <Select
                  value={views}
                  onValueChange={(v) => {
                    setViews(v as ViewsFilter);
                    setPage(1);
                  }}
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
                  onValueChange={(v) => {
                    setPricing(v as PricingFilter);
                    setPage(1);
                  }}
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
                  onValueChange={(v) => {
                    setSort(v as Sort);
                    setPage(1);
                  }}
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
