"use client";

import { memo, useMemo } from "react";
import { useCategories } from "@/entities/category/api/use-categories";
import { usePrograms } from "@/entities/program/api/use-programs";
import { StatsCardsSkeleton } from "./stats-cards-skeleton";
import { StatCard } from "./stat-card";
import {
  createStatIcon,
  type StatCardColor,
} from "./constants/stats-cards-constants";
import {
  calculateTotalViews,
  formatStatValue,
} from "./utils/stats-cards-utils";

export const StatsCards = memo(function StatsCards() {
  const { categories, loading: categoriesLoading } = useCategories();
  const { programs: allPrograms, loading: programsLoading } = usePrograms();

  const stats = useMemo(() => {
    if (categoriesLoading || programsLoading) {
      return null;
    }

    const totalCategories = categories.length;
    const totalPrograms = allPrograms.length;
    const totalViews = calculateTotalViews(allPrograms);

    return [
      {
        title: "Всего категорий",
        value: totalCategories,
        color: "primary" as StatCardColor,
        icon: createStatIcon("categories", "w-8 h-8"),
      },
      {
        title: "Всего программ",
        value: totalPrograms,
        color: "success" as StatCardColor,
        icon: createStatIcon("programs", "w-8 h-8"),
      },
      {
        title: "Просмотры",
        value: formatStatValue(totalViews),
        color: "warning" as StatCardColor,
        icon: createStatIcon("views", "w-8 h-8"),
      },
      {
        title: "Активных типов",
        value: 3,
        color: "danger" as StatCardColor,
        icon: createStatIcon("types", "w-8 h-8"),
      },
    ];
  }, [categories, allPrograms, categoriesLoading, programsLoading]);

  if (categoriesLoading || programsLoading) {
    return <StatsCardsSkeleton />;
  }

  if (!stats) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
      {stats.map((stat, index) => (
        <StatCard key={stat.title} {...stat} index={index} />
      ))}
    </div>
  );
});
