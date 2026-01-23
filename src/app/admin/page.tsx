// src/app/admin/page.tsx
import { lazy, Suspense } from "react";
import { AdminPageClient } from "./admin-page-client";
import { StatsCardsSkeleton } from "@/widgets/admin/stats-cards/stats-cards-skeleton";
import { AdminPageHeader } from "@/shared/ui/admin-page-header/admin-page-header";

const StatsCards = lazy(() =>
  import("@/widgets/admin/stats-cards/stats-cards").then((mod) => ({
    default: mod.StatsCards,
  }))
);

export default function AdminPage() {
  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      <AdminPageHeader
        title="Добро пожаловать в админ панель"
        description="Управляйте категориями и образовательными программами"
      />

      <Suspense fallback={<StatsCardsSkeleton />}>
        <StatsCards />
      </Suspense>

      <Suspense fallback={<div>Загрузка категорий...</div>}>
        <AdminPageClient />
      </Suspense>
    </div>
  );
}
