"use client";

import { memo, useMemo } from "react";
import { Card, CardBody } from "@heroui/react";
import { motion } from "framer-motion";
import {
  COLOR_CLASSES,
  SHADOW_COLORS,
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
  const colorClass = useMemo(() => COLOR_CLASSES[color], [color]);
  const shadowColor = useMemo(() => SHADOW_COLORS[color], [color]);

  const transitionDelay = useMemo(() => index * 0.1, [index]);

  const trendClassName = useMemo(
    () =>
      trend?.isPositive
        ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
        : "bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400",
    [trend?.isPositive]
  );

  const trendValue = useMemo(
    () => (trend ? Math.abs(trend.value) : null),
    [trend]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: transitionDelay, duration: 0.3 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <Card className="group overflow-hidden border-none bg-white/80 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-2xl dark:bg-slate-800/80">
        <CardBody className="relative p-4 sm:p-5 lg:p-6">
          <div
            className={`absolute inset-0 bg-linear-to-br ${colorClass} opacity-0 transition-opacity duration-300 group-hover:opacity-5`}
          />

          <div className="relative z-10 flex items-center justify-between gap-3 sm:gap-4">
            <div className="min-w-0 flex-1">
              <p className="mb-1 truncate text-xs font-medium tracking-wide text-slate-500 uppercase sm:mb-2 sm:text-sm dark:text-slate-400">
                {title}
              </p>
              <motion.p
                key={value}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="mb-2 bg-linear-to-r from-slate-900 to-slate-700 bg-clip-text text-2xl font-bold text-transparent sm:mb-3 sm:text-3xl lg:text-4xl dark:from-slate-100 dark:to-slate-300"
              >
                {value}
              </motion.p>
              {trend && trendValue !== null && (
                <div className="flex flex-wrap items-center gap-2">
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold ${trendClassName}`}
                  >
                    {trend.isPositive ? "↑" : "↓"} {trendValue}%
                  </motion.span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    за месяц
                  </span>
                </div>
              )}
            </div>
            <motion.div
              whileHover={{
                rotate: [0, -10, 10, -10, 0],
                scale: 1.1,
              }}
              transition={{ duration: 0.5 }}
              className={`h-12 w-12 rounded-xl bg-linear-to-br sm:h-14 sm:w-14 sm:rounded-2xl lg:h-16 lg:w-16 ${colorClass} flex items-center justify-center shadow-xl ${shadowColor} shrink-0 transition-shadow group-hover:shadow-2xl`}
            >
              <div className="text-lg text-white sm:text-xl lg:text-2xl">
                {icon}
              </div>
            </motion.div>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
});
