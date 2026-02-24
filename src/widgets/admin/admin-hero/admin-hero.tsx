"use client";

import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import { MagicCard } from "@/components/ui/magic-card";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { memo } from "react";
import { motion } from "framer-motion";

export const AdminHero = memo(function AdminHero() {
  return (
    <MagicCard
      gradientFrom="hsl(var(--primary) / 0.4)"
      gradientTo="hsl(var(--primary) / 0.06)"
      gradientColor="hsl(var(--primary) / 0.25)"
      gradientSize={380}
      className="relative overflow-hidden border border-border/40 bg-card/70 shadow-2xl ring-1 shadow-black/[0.07] ring-white/20 dark:shadow-black/30 dark:ring-white/5"
    >
      {/* Тонкая акцентная полоска сверху */}
      <div className="absolute inset-x-0 top-0 z-10 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent" />
      <div className="relative overflow-hidden rounded-2xl p-5 sm:p-6 lg:p-8">
        {/* Background glow — усиленный */}
        <div className="pointer-events-none absolute inset-0">
          <div className="bg-[radial-gradient(circle_at_30%_20%,var(--color-primary),transparent_50%)]/[0.18] absolute -top-24 left-0 h-[480px] w-[900px] rounded-full blur-3xl" />
          <div className="bg-[radial-gradient(circle_at_85%_80%,var(--color-emerald-500),transparent_50%)]/[0.14] absolute right-0 -bottom-32 h-[480px] w-[560px] rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-background/25" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/[0.07] px-3.5 py-2 text-xs font-semibold tracking-wide text-foreground shadow-sm backdrop-blur-md">
              <Sparkles className="h-4 w-4 text-primary" />
              Панель управления
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl lg:tracking-tight">
                Добро пожаловать в админ‑панель
              </h1>
              <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                Управляйте категориями и программами. Используйте
                палитру команд для быстрых переходов и действий.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span className="rounded-full border border-border/40 bg-background/70 px-3.5 py-2 shadow-sm backdrop-blur-sm">
                Открыть палитру:
                <span className="ml-2 inline-flex items-center gap-1">
                  <Kbd>⌘</Kbd>
                  <Kbd>K</Kbd>
                </span>
              </span>
              <span className="rounded-full border border-border/40 bg-background/70 px-3.5 py-2 shadow-sm backdrop-blur-sm">
                Совет: начинай ввод — откроется поиск
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <Button
              asChild
              className="font-semibold shadow-lg ring-1 shadow-primary/20 ring-primary/20 transition-shadow hover:shadow-xl hover:shadow-primary/25"
            >
              <Link href="/admin/qualification-upgrade">
                Категории <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-border/60 bg-background/50 font-semibold backdrop-blur-sm"
            >
              <Link href="/admin/users">Пользователи</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </MagicCard>
  );
});
