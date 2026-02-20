"use client";

import { MagicCard } from "@/components/ui/magic-card";
import { Button } from "@/components/ui/button";
import { useAdminMetrics } from "@/entities/metrics/api/use-admin-metrics";
import { BlurGlowBackground } from "@/shared/ui/blur-glow-background/blur-glow-background";
import { ErrorState } from "@/shared/ui/error-state/error-state";
import { cn } from "@/lib/utils";
import {
  MessageSquare,
  ShoppingCart,
  TrendingUp,
  Users,
  FileText,
  CreditCard,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
} from "lucide-react";
import { motion } from "framer-motion";
import { memo, useMemo } from "react";
import { formatRevenue } from "./utils/format-metrics";
import { AdminDashboardMetricsSkeleton } from "./admin-dashboard-metrics-skeleton";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export const AdminDashboardMetrics = memo(function AdminDashboardMetrics() {
  const { metrics, loading, error, refetch } = useAdminMetrics();

  const kpiCards = useMemo(() => {
    if (!metrics) return [];
    return [
      {
        key: "revenue",
        label: "Выручка (оплачено)",
        value: `${formatRevenue(metrics.revenuePaid)} ₽`,
        sub: "в рублях",
        icon: TrendingUp,
        gradientFrom: "hsl(var(--primary) / 0.55)",
        gradientTo: "hsl(var(--primary) / 0.12)",
        gradientColor: "hsl(var(--primary) / 0.35)",
      },
      {
        key: "orders",
        label: "Заказов всего",
        value: metrics.ordersTotal,
        sub: "всего заявок",
        icon: FileText,
        gradientFrom: "hsl(142 76% 36% / 0.5)",
        gradientTo: "hsl(142 76% 36% / 0.12)",
        gradientColor: "hsl(142 76% 36% / 0.35)",
      },
      {
        key: "users",
        label: "Пользователей",
        value: metrics.usersTotal,
        sub: `+${metrics.usersNewLast30Days} за 30 дн.`,
        icon: Users,
        gradientFrom: "hsl(221 83% 53% / 0.5)",
        gradientTo: "hsl(221 83% 53% / 0.12)",
        gradientColor: "hsl(221 83% 53% / 0.35)",
      },
      {
        key: "chats",
        label: "Чаты",
        value: metrics.chatCounts.open + metrics.chatCounts.closed,
        sub: `${metrics.chatCounts.open} открыто, ${metrics.chatCounts.openUnassigned} без назначения`,
        icon: MessageSquare,
        gradientFrom: "hsl(262 83% 58% / 0.5)",
        gradientTo: "hsl(262 83% 58% / 0.12)",
        gradientColor: "hsl(262 83% 58% / 0.35)",
      },
    ];
  }, [metrics]);

  if (loading && !metrics) {
    return <AdminDashboardMetricsSkeleton />;
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-border/60 bg-card/50 p-6">
        <ErrorState message={error.message} />
        <div className="mt-4 flex justify-end">
          <Button variant="outline" onClick={() => refetch()} className="font-semibold">
            Повторить
          </Button>
        </div>
      </div>
    );
  }

  if (!metrics) return null;

  return (
    <section className="relative overflow-hidden rounded-3xl border border-border/40 bg-card/50 shadow-2xl shadow-black/6 ring-1 ring-white/10 dark:shadow-black/25 dark:ring-white/5 backdrop-blur-md">
      {/* Акцентная линия сверху */}
      <div className="absolute inset-x-0 top-0 z-10 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent" />
      <BlurGlowBackground
        spots={[
          { position: "top-left", color: "bg-primary/10" },
          { position: "top-right", color: "bg-emerald-500/10" },
          { position: "bottom-right", color: "bg-violet-500/10" },
        ]}
        className="rounded-3xl"
      >
        <div className="bg-grid-black/[0.04] dark:bg-grid-white/[0.05] absolute inset-0 bg-size-[24px_24px] rounded-3xl" />
      </BlurGlowBackground>

      <div className="relative z-10 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex flex-col gap-1 sm:mb-8"
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary/90">
            Ключевые показатели
          </span>
          <h2 className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
            Метрики
          </h2>
          <p className="text-sm text-muted-foreground">
            Заказы, выручка, пользователи и чаты
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
        >
          {kpiCards.map((card, index) => (
            <motion.div key={card.key} variants={item}>
              <MagicCard
                gradientFrom={card.gradientFrom}
                gradientTo={card.gradientTo}
                gradientColor={card.gradientColor}
                gradientSize={280}
                className="border border-border/50 bg-card/90 shadow-xl shadow-black/6 ring-1 ring-white/10 dark:shadow-black/20 dark:ring-white/5"
              >
                <div className="p-5 sm:p-6">
                  <div className="mb-3 flex items-start justify-between gap-2">
                    <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                      {card.label}
                    </span>
                    <span
                      className={cn(
                        "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border/30 bg-linear-to-br from-background/90 to-background/60 shadow-inner backdrop-blur-sm",
                        "text-muted-foreground"
                      )}
                    >
                      <card.icon className="h-5 w-5" />
                    </span>
                  </div>
                  <p className="text-2xl font-bold tabular-nums tracking-tight text-foreground sm:text-3xl">
                    {card.value}
                  </p>
                  <p className="mt-1.5 text-xs text-muted-foreground">{card.sub}</p>
                </div>
              </MagicCard>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6"
        >
          {/* Заказы по статусам */}
          <MagicCard
            gradientFrom="hsl(var(--muted-foreground) / 0.2)"
            gradientTo="hsl(var(--muted-foreground) / 0.05)"
            gradientColor="hsl(var(--muted-foreground) / 0.15)"
            className="border border-border/50 bg-card/90 shadow-lg shadow-black/4 ring-1 ring-white/5 dark:ring-white/5"
          >
            <div className="p-5 sm:p-6">
              <h3 className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-foreground">
                <FileText className="h-4 w-4 text-primary" />
                Заказы по статусам
              </h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {[
                  {
                    key: "awaitingPayment",
                    label: "Ожидают оплаты",
                    value: metrics.orderCounts.awaitingPayment,
                    icon: CreditCard,
                    color: "text-amber-600 dark:text-amber-400",
                  },
                  {
                    key: "paid",
                    label: "Оплачены",
                    value: metrics.orderCounts.paid,
                    icon: CheckCircle2,
                    color: "text-emerald-600 dark:text-emerald-400",
                  },
                  {
                    key: "inProgress",
                    label: "В работе",
                    value: metrics.orderCounts.inProgress,
                    icon: Loader2,
                    color: "text-blue-600 dark:text-blue-400",
                  },
                  {
                    key: "completed",
                    label: "Выполнены",
                    value: metrics.orderCounts.completed,
                    icon: CheckCircle2,
                    color: "text-emerald-700 dark:text-emerald-300",
                  },
                  {
                    key: "cancelled",
                    label: "Отменены",
                    value: metrics.orderCounts.cancelled,
                    icon: XCircle,
                    color: "text-rose-600 dark:text-rose-400",
                  },
                ].map((s) => (
                  <div
                    key={s.key}
                    className="flex items-center gap-2 rounded-xl border border-border/30 bg-background/50 px-3 py-2.5 shadow-sm"
                  >
                    <s.icon className={cn("h-4 w-4 shrink-0", s.color)} />
                    <div className="min-w-0">
                      <p className="truncate text-xs text-muted-foreground">
                        {s.label}
                      </p>
                      <p className="text-sm font-semibold tabular-nums text-foreground">
                        {s.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </MagicCard>

          {/* Чаты и корзины */}
          <MagicCard
            gradientFrom="hsl(var(--muted-foreground) / 0.2)"
            gradientTo="hsl(var(--muted-foreground) / 0.05)"
            gradientColor="hsl(var(--muted-foreground) / 0.15)"
            className="border border-border/50 bg-card/90 shadow-lg shadow-black/4 ring-1 ring-white/5 dark:ring-white/5"
          >
            <div className="p-5 sm:p-6">
              <h3 className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-foreground">
                <MessageSquare className="h-4 w-4 text-primary" />
                Чаты и корзины
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-xl border border-border/30 bg-background/50 px-4 py-3 shadow-sm">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Открытые чаты
                    </span>
                  </div>
                  <span className="text-lg font-bold tabular-nums text-foreground">
                    {metrics.chatCounts.open}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-border/30 bg-background/50 px-4 py-3 shadow-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Без назначения
                    </span>
                  </div>
                  <span className="text-lg font-bold tabular-nums text-foreground">
                    {metrics.chatCounts.openUnassigned}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-border/30 bg-background/50 px-4 py-3 shadow-sm">
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Корзин с товарами
                    </span>
                  </div>
                  <span className="text-lg font-bold tabular-nums text-foreground">
                    {metrics.cartsWithItems}
                  </span>
                </div>
              </div>
            </div>
          </MagicCard>
        </motion.div>
      </div>
    </section>
  );
});
