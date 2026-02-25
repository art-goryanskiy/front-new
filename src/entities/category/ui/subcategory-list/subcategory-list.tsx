"use client";

import { memo, useMemo } from "react";
import { useCategories } from "../../api/use-categories";
import { SubcategoryListSkeleton } from "./subcategory-list-skeleton";
import { EmptyState } from "@/shared/ui/empty-state/empty-state";
import { ErrorState } from "@/shared/ui/error-state/error-state";
import { SubcategoryCard } from "@/widgets/public/subcategory-card/subcategory-card";
import { ListHeader } from "@/shared/ui/list-header/list-header";
import { FolderOpen } from "lucide-react";
import type { SubcategoryListProps } from "./types/subcategory-list.types";
import { SUBCATEGORY_LIST_CLASSES } from "./constants/subcategory-list-constants";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CONTACTS_FORM_HREF } from "@/shared/constants/routes";

export const SubcategoryList = memo(function SubcategoryList({
  categoryType,
  title,
  description,
  initialCategories,
}: SubcategoryListProps) {
  const hasInitialData = !!initialCategories?.length;

  // Всегда запрашиваем категории на клиенте (с кукой), чтобы при первой загрузке
  // по URL данные обновились после гидратации
  const {
    categories: clientCategories,
    loading,
    error,
  } = useCategories(undefined);

  const categories = useMemo(
    () =>
      clientCategories.length > 0
        ? clientCategories
        : (initialCategories ?? []),
    [initialCategories, clientCategories]
  );

  const subcategories = useMemo(() => {
    return categories.filter(
      (category) =>
        category.type === categoryType &&
        (!category.parent || category.parent === null)
    );
  }, [categories, categoryType]);

  const emptyStateIcon = useMemo(
    () => <FolderOpen className="h-10 w-10 text-muted-foreground" />,
    []
  );

  const emptyStateActions = useMemo(
    () => (
      <>
        <Button asChild className="rounded-xl font-semibold">
          <Link href={CONTACTS_FORM_HREF}>
            Помогите мне с выбором
          </Link>
        </Button>
        <Button asChild variant="outline" className="rounded-xl">
          <Link href="/">Посмотреть все направления</Link>
        </Button>
      </>
    ),
    []
  );

  if (!hasInitialData && loading) {
    return <SubcategoryListSkeleton />;
  }

  if (error) {
    return <ErrorState message={error.message} />;
  }

  return (
    <div className={SUBCATEGORY_LIST_CLASSES.container}>
      <ListHeader
        title={title}
        description={description}
        className={SUBCATEGORY_LIST_CLASSES.header}
        titleClassName={SUBCATEGORY_LIST_CLASSES.title}
        descriptionClassName={SUBCATEGORY_LIST_CLASSES.description}
      />

      {subcategories.length === 0 ? (
        <EmptyState
          title="Не нашли программу, которая вам откликается?"
          description="Так бывает. Мы с заботой подберем обучение под вашу задачу, сроки и бюджет."
          icon={emptyStateIcon}
          actions={emptyStateActions}
        />
      ) : (
        <div className={SUBCATEGORY_LIST_CLASSES.grid}>
          {subcategories.map((category, index) => (
            <SubcategoryCard
              key={category.id}
              category={category}
              priority={index === 0}
            />
          ))}
        </div>
      )}
    </div>
  );
});
