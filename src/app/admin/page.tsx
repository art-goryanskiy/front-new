import { AdminHero } from "@/widgets/admin/admin-hero/admin-hero";
import { AdminDashboardMetricsSkeleton } from "@/widgets/admin/admin-dashboard-metrics/admin-dashboard-metrics-skeleton";
import { AdminCategoriesSkeleton } from "./admin-categories-skeleton";
import { lazy, Suspense } from "react";
import { AdminPageClient } from "./admin-page-client";

const AdminDashboardMetrics = lazy(() =>
  import("@/widgets/admin/admin-dashboard-metrics/admin-dashboard-metrics").then(
    (mod) => ({ default: mod.AdminDashboardMetrics })
  )
);

export default function AdminPage() {
  return (
    <div className="space-y-6 sm:space-y-8 lg:space-y-10">
      <AdminHero />

      <Suspense fallback={<AdminDashboardMetricsSkeleton />}>
        <AdminDashboardMetrics />
      </Suspense>

      <Suspense fallback={<AdminCategoriesSkeleton />}>
        <AdminPageClient />
      </Suspense>
    </div>
  );
}
