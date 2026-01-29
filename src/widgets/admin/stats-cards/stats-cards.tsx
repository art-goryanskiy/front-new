"use client";

import { useCategories } from "@/entities/category/api/use-categories";
import { usePrograms } from "@/entities/program/api/use-programs";
import { memo, useMemo } from "react";
import {
  createStatIcon,
  type StatCardColor,
} from "./constants/stats-cards-constants";
import { StatCard } from "./stat-card";
import { StatsCardsSkeleton } from "./stats-cards-skeleton";
import {
  calculateTotalViews,
  formatStatValue,
} from "./utils/stats-cards-utils";

export const StatsCards = memo(function StatsCards() {
  const { categories, loading: categoriesLoading } = useCategories();
  const { programs: allPrograms, loading: programsLoading } =
    usePrograms();

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
        icon: createStatIcon("categories", "h-6 w-6"),
      },
      {
        title: "Всего программ",
        value: totalPrograms,
        color: "success" as StatCardColor,
        icon: createStatIcon("programs", "h-6 w-6"),
      },
      {
        title: "Просмотры",
        value: formatStatValue(totalViews),
        color: "warning" as StatCardColor,
        icon: createStatIcon("views", "h-6 w-6"),
      },
      {
        title: "Активных типов",
        value: 3,
        color: "danger" as StatCardColor,
        icon: createStatIcon("types", "h-6 w-6"),
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
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
      {stats.map((stat, index) => (
        <StatCard key={stat.title} {...stat} index={index} />
      ))}
    </div>
  );
});
