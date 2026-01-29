"use client";

import { cn } from "@/lib/utils";
import { Surface } from "@/shared/ui/surface/surface";
import { motion } from "framer-motion";
import { memo, useMemo } from "react";
import {
  ACCENT_GRADIENT,
  ICON_BADGE_CLASSES,
  type StatCardColor,
} from "./constants/stats-cards-constants";

export interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: StatCardColor;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  index: number;
}

export const StatCard = memo(function StatCard({
  title,
  value,
  icon,
  color,
  trend,
  index,
}: StatCardProps) {
  const transitionDelay = useMemo(() => index * 0.06, [index]);

  const trendClassName = useMemo(
    () =>
      trend?.isPositive
        ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
        : "border-rose-500/20 bg-rose-500/10 text-rose-700 dark:text-rose-400",
    [trend?.isPositive]
  );

  const trendValue = useMemo(
    () => (trend ? Math.abs(trend.value) : null),
    [trend]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: transitionDelay, duration: 0.25 }}
      whileHover={{ y: -2, transition: { duration: 0.15 } }}
    >
      <Surface
        variant="floating"
        className={cn(
          "relative overflow-hidden p-4 sm:p-5 lg:p-6",
          "transition-colors"
        )}
      >
        {/* мягкий градиент-акцент */}
        <div
          className={cn(
            "pointer-events-none absolute inset-0 opacity-70",
            "bg-linear-to-br",
            ACCENT_GRADIENT[color]
          )}
        />

        <div className="relative z-10 flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="mb-1 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              {title}
            </p>

            <motion.p
              key={value}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold text-foreground sm:text-3xl"
            >
              {value}
            </motion.p>

            {trend && trendValue !== null && (
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[11px] font-semibold",
                    trendClassName
                  )}
                >
                  {trend.isPositive ? "↑" : "↓"} {trendValue}%
                </span>
                <span className="text-xs text-muted-foreground">
                  за месяц
                </span>
              </div>
            )}
          </div>

          {/* glass badge для иконки */}
          <motion.div
            whileHover={{ rotate: [0, -6, 6, -6, 0], scale: 1.03 }}
            transition={{ duration: 0.45 }}
            className={cn(
              "grid h-12 w-12 shrink-0 place-items-center rounded-2xl border backdrop-blur-sm",
              "shadow-sm",
              ICON_BADGE_CLASSES[color]
            )}
          >
            <div className="text-[0px] [&_svg]:h-6 [&_svg]:w-6">
              {icon}
            </div>
          </motion.div>
        </div>
      </Surface>
    </motion.div>
  );
});
