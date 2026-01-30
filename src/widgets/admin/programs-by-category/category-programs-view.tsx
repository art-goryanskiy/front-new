"use client";

import { useProgramsPage } from "@/entities/program/api/use-programs-page";
import type { CategoryType } from "@/shared/api/generated/graphql";
import { useDebounce } from "@/shared/lib/hooks/use-debounce";
import { memo, useCallback, useMemo, useState } from "react";

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
import { LoadingState } from "@/shared/ui/loading-state/loading-state";

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

    const [page, setPage] = useState(1);
    const limit = PAGE_SIZE * page;

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
        limit,
        offset: 0,
      };
      return search ? { ...base, search } : base;
    }, [categoryId, debouncedQ, sortBy, sortOrder, limit]);

    const { items, total, loading, error } = useProgramsPage(filter);

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

        return true;
      });
    }, [items, pricing, views]);

    const countsText = useMemo(
      () => `${filteredItems.length} / ${total}`,
      [filteredItems.length, total]
    );

    const canLoadMore = useMemo(
      () => items.length < total,
      [items.length, total]
    );

    const handleLoadMore = useCallback(
      () => setPage((p) => p + 1),
      []
    );

    const handleCreate = useCallback(() => {
      openCreateProgramModal(categoryId, categoryType);
    }, [openCreateProgramModal, categoryId, categoryType]);

    if (loading && page === 1)
      return <LoadingState message="Загрузка программ…" />;
    if (error) return <ErrorState message={error.message} />;

    return (
      <DashboardSection
        title="Программы"
        actions={
          <span className="hidden rounded-full border border-border/60 bg-muted/20 px-2.5 py-1 text-xs text-muted-foreground sm:inline-flex">
            {countsText}
          </span>
        }
      >
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

              <div className="flex justify-center">
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
      </DashboardSection>
    );
  }
);
