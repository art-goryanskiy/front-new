"use client";

import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import { Surface } from "@/shared/ui/surface/surface";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { memo } from "react";

export const AdminHero = memo(function AdminHero() {
  return (
    <Surface
      variant="floating"
      className="relative overflow-hidden p-5 sm:p-6 lg:p-8"
    >
      {/* Background “shader-lite” (pure CSS, safe for dark/light) */}
      <div className="pointer-events-none absolute inset-0">
        <div className="bg-[radial-gradient(circle_at_center,var(--color-primary),transparent_60%)]/[18] absolute -top-24 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full blur-2xl" />
        <div className="bg-[radial-gradient(circle_at_center,var(--color-emerald-500),transparent_60%)]/[14] absolute right-[-120px] -bottom-32 h-[420px] w-[520px] rounded-full blur-2xl" />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/10 to-background/30" />
      </div>

      <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/50 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
            <Sparkles className="h-4 w-4 text-primary" />
            Панель управления
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
              Добро пожаловать в админ‑панель
            </h1>
            <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
              Управляйте категориями и программами. Используйте
              палитру команд для быстрых переходов и действий.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span className="rounded-full border border-border/60 bg-muted/20 px-3 py-1">
              Открыть палитру:
              <span className="ml-2 inline-flex items-center gap-1">
                <Kbd>⌘</Kbd>
                <Kbd>K</Kbd>
              </span>
            </span>
            <span className="rounded-full border border-border/60 bg-muted/20 px-3 py-1">
              Совет: начинай ввод — откроется поиск
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <Button asChild className="font-semibold">
            <Link href="/admin/qualification-upgrade">
              Категории <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="font-semibold">
            <Link href="/admin/users">Пользователи</Link>
          </Button>
        </div>
      </div>
    </Surface>
  );
});
