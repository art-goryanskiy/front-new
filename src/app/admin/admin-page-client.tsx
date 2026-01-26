"use client";

import { lazy, Suspense } from "react";
import { CategoryList } from "@/entities/category/ui/category-list";

// Динамический импорт модалки - загружается только при открытии
const CategoryModal = lazy(() =>
  import("@/widgets/category/category-modal/category-modal").then(
    (mod) => ({
      default: mod.CategoryModal,
    })
  )
);

export function AdminPageClient() {
  return (
    <>
      <div>
        <h2 className="text-xl font-bold text-foreground sm:text-2xl">
          Все категории
        </h2>
      </div>
      <CategoryList />
      <Suspense fallback={null}>
        <CategoryModal />
      </Suspense>
    </>
  );
}
