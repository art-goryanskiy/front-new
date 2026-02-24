"use client";

import { memo, useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  GraduationCap,
  BookOpen,
  Users,
  Award,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface StatItem {
  id: string;
  value: number;
  suffix: string;
  label: string;
  sublabel?: string;
  icon: React.ReactNode;
  color: string;
}

interface StatsSectionProps {
  programsCount: number;
  categoriesCount: number;
}

function useCountUp(target: number, duration: number, start: boolean) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!start) return;
    if (target === 0) return;

    let startTime: number | null = null;
    const startValue = 0;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const eased =
        progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCurrent(Math.floor(startValue + (target - startValue) * eased));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [target, duration, start]);

  return current;
}

const StatCard = memo(function StatCard({
  item,
  index,
  inView,
}: {
  item: StatItem;
  index: number;
  inView: boolean;
}) {
  const count = useCountUp(item.value, 1400 + index * 150, inView);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="group relative flex flex-col items-center gap-4 rounded-2xl border border-border/60 bg-card/60 p-6 text-center backdrop-blur transition-[border,box-shadow] hover:border-border/80 hover:shadow-md sm:p-7"
    >
      {/* Glow on hover */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -top-12 -right-12 h-32 w-40 rounded-full bg-primary/8 blur-2xl" />
      </div>

      <div
        className={cn(
          "relative z-10 flex h-12 w-12 items-center justify-center rounded-xl border border-border/60 bg-background/80 shadow-sm",
          item.color
        )}
      >
        {item.icon}
      </div>

      <div className="relative z-10 space-y-1">
        <div className="flex items-end justify-center gap-0.5 tabular-nums">
          <span className="text-4xl font-black tracking-tight text-foreground sm:text-5xl">
            {count.toLocaleString("ru-RU")}
          </span>
          <span className="mb-1 text-2xl font-black text-primary sm:text-3xl">
            {item.suffix}
          </span>
        </div>
        <p className="text-sm font-semibold text-foreground sm:text-base">
          {item.label}
        </p>
        {item.sublabel && (
          <p className="text-xs text-muted-foreground">{item.sublabel}</p>
        )}
      </div>
    </motion.div>
  );
});

export const StatsSection = memo(function StatsSection({
  programsCount,
  categoriesCount,
}: StatsSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const currentYear = new Date().getFullYear();

  // Считаем годы с 2015
  const yearsOnMarket = currentYear - 2015;

  // База: 10 000 выпускников к началу 2025 года, +850 в год
  const GRADUATES_BASE_YEAR = 2025;
  const GRADUATES_BASE_COUNT = 10_000;
  const GRADUATES_PER_YEAR = 850;
  const graduatesCount =
    GRADUATES_BASE_COUNT +
    (currentYear - GRADUATES_BASE_YEAR) * GRADUATES_PER_YEAR;

  const stats: StatItem[] = [
    {
      id: "graduates",
      value: graduatesCount,
      suffix: "+",
      label: "Выпускников",
      sublabel: "успешно завершили обучение",
      icon: <GraduationCap className="h-6 w-6" aria-hidden />,
      color: "text-primary",
    },
    {
      id: "programs",
      value: programsCount,
      suffix: "",
      label: "Программ обучения",
      sublabel: "в актуальном каталоге",
      icon: <BookOpen className="h-6 w-6" aria-hidden />,
      color: "text-blue-500",
    },
    {
      id: "categories",
      value: categoriesCount,
      suffix: "",
      label: "Направлений",
      sublabel: "от охраны труда до экологии",
      icon: <Award className="h-6 w-6" aria-hidden />,
      color: "text-emerald-500",
    },
    {
      id: "years",
      value: yearsOnMarket,
      suffix: "",
      label: "Лет на рынке",
      sublabel: "с 2015 года",
      icon: <Users className="h-6 w-6" aria-hidden />,
      color: "text-amber-500",
    },
  ];

  return (
    <section
      ref={ref}
      aria-label="Наши показатели"
      className="relative py-12 sm:py-14 lg:py-16"
    >
      {/* Background ambient */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 h-64 w-[600px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-10 space-y-2 text-center"
        >
          <div className="inline-flex items-center rounded-full border border-border/60 bg-muted/20 px-3 py-1 text-xs font-semibold text-foreground/90 backdrop-blur">
            ЦОК Стандарт Плюс в цифрах
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Нам доверяют профессионалы
          </h2>
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Работаем в сфере дополнительного профессионального образования
            в Республике Крым
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((item, index) => (
            <StatCard
              key={item.id}
              item={item}
              index={index}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
});
