"use client";

import Link from "next/link";
import { memo } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NewsEntity } from "@/entities/news/api/news.types";

function formatNewsDate(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

function getFirstPhotoUrl(news: NewsEntity): string | null {
  const att = news.attachments?.find((a) => a.type === "photo" && a.url);
  return att?.url ?? null;
}

function truncateText(text: string, maxLength: number): string {
  const trimmed = text.trim();
  if (trimmed.length <= maxLength) return trimmed;
  return trimmed.slice(0, maxLength).trimEnd() + "…";
}

export type NewsCardVariant = "featured" | "default" | "wide";

interface NewsCardProps {
  news: NewsEntity;
  index?: number;
  variant?: NewsCardVariant;
}

export const NewsCard = memo(function NewsCard({
  news,
  index = 0,
  variant = "default",
}: NewsCardProps) {
  const photoUrl = getFirstPhotoUrl(news);
  const dateStr = formatNewsDate(news.date);
  const excerpt =
    variant === "featured"
      ? truncateText(news.text, 280)
      : truncateText(news.text, 120);

  const isFeatured = variant === "featured";
  const isWide = variant === "wide";

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.06, 0.35) }}
      className="group h-full"
    >
      <Link
        href={`/news/${encodeURIComponent(news.id)}`}
        className={cn(
          "relative flex h-full overflow-hidden rounded-2xl border bg-background/95 shadow-lg transition-all duration-300",
          "border-border/40 hover:border-border hover:shadow-xl hover:shadow-primary/5",
          "dark:border-white/10 dark:bg-muted/5 dark:hover:border-white/20 dark:hover:shadow-white/5",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          isFeatured && "rounded-3xl border-border/50 shadow-xl dark:border-white/15"
        )}
      >
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(0,0,0,0.03),transparent_50%)] dark:bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.03),transparent_50%)]" />
        </div>

        {isFeatured ? (
          <div className="relative z-10 flex w-full min-w-0 flex-col">
            {photoUrl && (
              <div className="relative aspect-21/9 w-full overflow-hidden sm:aspect-3/1">
                <img
                  src={photoUrl}
                  alt=""
                  className="h-full w-full object-cover saturate-[0.88] transition-[transform,filter] duration-700 group-hover:saturate-100 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-linear-to-t from-background/90 via-background/20 to-transparent" />
              </div>
            )}
            <div className="flex min-w-0 flex-1 flex-col justify-end gap-4 p-6 sm:p-8">
              <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                <Calendar className="h-3.5 w-3.5 shrink-0" aria-hidden />
                {dateStr}
              </p>
              <p className="line-clamp-4 text-base leading-relaxed text-foreground sm:text-lg">
                {excerpt}
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors group-hover:text-primary/90">
                Читать
                <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </span>
            </div>
          </div>
        ) : (
          <div
            className={cn(
              "relative z-10 flex w-full min-w-0 flex-col",
              (isWide || photoUrl) ? "sm:flex-row" : ""
            )}
          >
            {photoUrl && (
              <div
                className={cn(
                  "relative shrink-0 overflow-hidden",
                  isWide ? "h-36 w-full sm:h-auto sm:w-48" : "h-36 w-full sm:h-auto sm:w-40"
                )}
              >
                <img
                  src={photoUrl}
                  alt=""
                  className="h-full w-full object-cover saturate-[0.88] transition-[transform,filter] duration-500 group-hover:saturate-100 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-r from-background/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:from-transparent sm:to-background/50" />
              </div>
            )}
            <div className="flex min-w-0 flex-1 flex-col justify-between gap-3 p-4 sm:p-5">
              <div className="space-y-1.5">
                <p className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5 shrink-0" aria-hidden />
                  {dateStr}
                </p>
                <p className="line-clamp-3 text-sm leading-relaxed text-foreground">
                  {excerpt}
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors group-hover:text-primary/90">
                Читать
                <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </span>
            </div>
          </div>
        )}
      </Link>
    </motion.article>
  );
});
