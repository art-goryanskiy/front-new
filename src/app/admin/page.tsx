import { AdminHero } from "@/widgets/admin/admin-hero/admin-hero";
import { StatsCardsSkeleton } from "@/widgets/admin/stats-cards/stats-cards-skeleton";
import { AdminCategoriesSkeleton } from "./admin-categories-skeleton";
import { lazy, Suspense } from "react";
import { AdminPageClient } from "./admin-page-client";

const StatsCards = lazy(() =>
  import("@/widgets/admin/stats-cards/stats-cards").then((mod) => ({
    default: mod.StatsCards,
  }))
);

export default function AdminPage() {
  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      <AdminHero />

      <Suspense fallback={<StatsCardsSkeleton />}>
        <StatsCards />
      </Suspense>

      <Suspense fallback={<AdminCategoriesSkeleton />}>
        <AdminPageClient />
      </Suspense>
    </div>
  );
}
