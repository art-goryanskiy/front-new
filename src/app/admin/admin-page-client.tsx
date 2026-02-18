"use client";

import {
  BookOpen,
  Briefcase,
  Folder,
  GraduationCap,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { Suspense, lazy, memo, useCallback, useMemo } from "react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCategories } from "@/entities/category/api/use-categories";
import { CategoryType } from "@/shared/api/generated/graphql";
import { formatProgramsCount } from "@/shared/lib/helpers/plural";
import { useCategoryModalState } from "@/shared/store/modal-store";
import { DashboardSection } from "@/shared/ui/dashboard-section/dashboard-section";
import { ErrorState } from "@/shared/ui/error-state/error-state";
import { Surface } from "@/shared/ui/surface/surface";

const CategoryModal = lazy(() =>
  import("@/widgets/category/category-modal/category-modal").then(
    (mod) => ({
      default: mod.CategoryModal,
    })
  )
);

type Tile = {
  type: CategoryType;
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
};

export const AdminPageClient = memo(function AdminPageClient() {
  const { categories, loading, error, refetch } = useCategories();
  const { openCreateCategoryModal } = useCategoryModalState();

  const tiles: Tile[] = useMemo(
    () => [
      {
        type: CategoryType.QualificationUpgrade,
        title: "Повышение квалификации",
        description: "Категории и программы повышения квалификации",
        href: "/admin/qualification-upgrade",
        icon: <BookOpen className="h-5 w-5 text-primary" />,
      },
      {
        type: CategoryType.ProfessionalRetraining,
        title: "Проф. переподготовка",
        description:
          "Категории и программы профессиональной переподготовки",
        href: "/admin/professional-retraining",
        icon: <GraduationCap className="h-5 w-5 text-primary" />,
      },
      {
        type: CategoryType.ProfessionalEducation,
        title: "Проф. обучение",
        description:
          "Категории и программы профессионального обучения",
        href: "/admin/professional-education",
        icon: <Briefcase className="h-5 w-5 text-primary" />,
      },
    ],
    []
  );

  const countsByType = useMemo(() => {
    const res: Record<
      CategoryType,
      { categories: number; programsSum: number }
    > = {
      QUALIFICATION_UPGRADE: { categories: 0, programsSum: 0 },
      PROFESSIONAL_RETRAINING: { categories: 0, programsSum: 0 },
      PROFESSIONAL_EDUCATION: { categories: 0, programsSum: 0 },
    };

    for (const c of categories) {
      if (!c.type) continue;
      res[c.type].categories += 1;
      res[c.type].programsSum += c.programsCount ?? 0;
    }

    return res;
  }, [categories]);

  const handleCreate = useCallback(
    (type: CategoryType) => {
      openCreateCategoryModal(type);
    },
    [openCreateCategoryModal]
  );

  const headerActions = useMemo(
    () => (
      <div className="hidden items-center gap-2 sm:flex">
        <Surface variant="inset" className="px-3 py-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Folder className="h-4 w-4" />
            {loading
              ? "Загрузка…"
              : error
                ? "Ошибка"
                : `${categories.length} шт.`}
          </div>
        </Surface>
      </div>
    ),
    [loading, error, categories.length]
  );

  return (
    <DashboardSection
      title="Категории"
      description="Быстрый доступ к типам категорий и созданию"
      actions={headerActions}
    >
      {error ? (
        <div className="space-y-3">
          <ErrorState message={error.message} />
          <div className="flex justify-end">
            <Button
              type="button"
              variant="outline"
              className="font-semibold"
              onClick={() => refetch()}
            >
              Повторить
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {tiles.map((t) => {
            const stats = countsByType[t.type];

            return (
              <Surface
                key={t.href}
                variant="floating"
                className="p-4 sm:p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 space-y-2">
                    <div className="flex items-center gap-2">
                      {loading ? (
                        <>
                          <Skeleton className="h-5 w-5 rounded-md" />
                          <Skeleton className="h-5 w-44" />
                        </>
                      ) : (
                        <>
                          {t.icon}
                          <div className="min-w-0">
                            <div className="truncate font-semibold text-foreground">
                              {t.title}
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    <div className="text-sm text-muted-foreground">
                      {loading ? (
                        <Skeleton className="h-4 w-full max-w-[18rem]" />
                      ) : (
                        t.description
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <span className="inline-flex items-center rounded-full border border-border/60 bg-muted/20 px-2 py-1 text-[11px] text-muted-foreground">
                        {loading
                          ? "…"
                          : `${stats?.categories ?? 0} катег.`}
                      </span>
                      <span className="inline-flex items-center rounded-full border border-border/60 bg-muted/20 px-2 py-1 text-[11px] text-muted-foreground">
                        {loading
                          ? "…"
                          : formatProgramsCount(stats?.programsSum ?? 0)}
                      </span>
                    </div>
                  </div>

                  <div className="flex shrink-0 flex-col gap-2">
                    {loading ? (
                      <>
                        <Skeleton className="h-9 w-24 rounded-md" />
                        <Skeleton className="h-9 w-28 rounded-md" />
                      </>
                    ) : (
                      <>
                        <Button
                          asChild
                          size="sm"
                          className="font-semibold"
                        >
                          <Link href={t.href}>Открыть</Link>
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleCreate(t.type)}
                          className="font-semibold"
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Создать
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </Surface>
            );
          })}
        </div>
      )}

      <Suspense fallback={null}>
        <CategoryModal />
      </Suspense>
    </DashboardSection>
  );
});
