"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCategoryModalState } from "@/shared/store/modal-store";
import { AdminPageHeader } from "@/shared/ui/admin-page-header/admin-page-header";
import { DashboardSection } from "@/shared/ui/dashboard-section/dashboard-section";
import { DataToolbar } from "@/shared/ui/data-toolbar/data-toolbar";
import { CategoryTable } from "@/widgets/admin/category-table/category-table";
import { Suspense, lazy, memo, useCallback, useState } from "react";
import type { CategoryPageProps } from "./types/category-page.types";

const CategoryModal = lazy(() =>
  import("@/widgets/category/category-modal/category-modal").then(
    (mod) => ({
      default: mod.CategoryModal,
    })
  )
);

const DeleteCategoryModal = lazy(() =>
  import("@/widgets/category/delete-category-modal/delete-category-modal").then(
    (mod) => ({
      default: mod.DeleteCategoryModal,
    })
  )
);

type ProgramsFilter = "all" | "withPrograms" | "empty";

export const CategoryPage = memo(function CategoryPage({
  type,
  title,
  description,
}: CategoryPageProps) {
  const { openCreateCategoryModal } = useCategoryModalState();

  const [q, setQ] = useState("");
  const [programsFilter, setProgramsFilter] =
    useState<ProgramsFilter>("all");
  const [counts, setCounts] = useState({ shown: 0, total: 0 });

  const handleCreateCategory = useCallback(() => {
    openCreateCategoryModal(type);
  }, [openCreateCategoryModal, type]);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title={title}
        description={description}
        variant="default"
        actionButton={{
          label: "+ Создать категорию",
          mobileLabel: "+ Создать",
          onPress: handleCreateCategory,
        }}
      />

      <DashboardSection
        title="Список категорий"
        actions={
          <span className="hidden rounded-full border border-border/60 bg-muted/20 px-2.5 py-1 text-xs text-muted-foreground sm:inline-flex">
            {counts.shown} / {counts.total}
          </span>
        }
      >
        <DataToolbar
          searchValue={q}
          onSearchValueChange={setQ}
          searchPlaceholder="Поиск по названию / slug / описанию…"
          rightSlot={
            <Select
              value={programsFilter}
              onValueChange={(v) =>
                setProgramsFilter(v as ProgramsFilter)
              }
            >
              <SelectTrigger className="h-9 w-[190px] bg-background/60">
                <SelectValue placeholder="Программы" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все категории</SelectItem>
                <SelectItem value="withPrograms">
                  С программами
                </SelectItem>
                <SelectItem value="empty">Без программ</SelectItem>
              </SelectContent>
            </Select>
          }
        />

        <CategoryTable
          type={type}
          searchQuery={q}
          programsFilter={programsFilter}
          onCountsChange={setCounts}
        />
      </DashboardSection>

      <Suspense fallback={null}>
        <CategoryModal />
        <DeleteCategoryModal />
      </Suspense>
    </div>
  );
});
