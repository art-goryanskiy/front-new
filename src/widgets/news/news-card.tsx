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

interface NewsCardProps {
  news: NewsEntity;
  index?: number;
}

export const NewsCard = memo(function NewsCard({ news, index = 0 }: NewsCardProps) {
  const photoUrl = getFirstPhotoUrl(news);
  const dateStr = formatNewsDate(news.date);
  const excerpt = truncateText(news.text, 160);

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="group"
    >
      <Link
        href={`/news/${encodeURIComponent(news.id)}`}
        className={cn(
          "relative flex overflow-hidden rounded-2xl border bg-background/95 shadow-lg transition-all duration-300",
          "border-border/50 hover:border-border hover:shadow-xl hover:shadow-border/10",
          "dark:border-white/10 dark:bg-muted/5 dark:hover:border-white/20 dark:hover:shadow-white/5",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        )}
      >
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(0,0,0,0.04),transparent_50%)] dark:bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.04),transparent_50%)]" />
        </div>

        <div className="relative z-10 flex w-full min-w-0 flex-col sm:flex-row">
          {photoUrl && (
            <div className="relative h-44 w-full shrink-0 overflow-hidden sm:h-auto sm:w-56">
              <img
                src={photoUrl}
                alt=""
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-r from-background/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:from-transparent sm:to-background/60" />
            </div>
          )}
          <div className="flex min-w-0 flex-1 flex-col justify-between gap-3 p-5 sm:p-6">
            <div className="space-y-2">
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
      </Link>
    </motion.article>
  );
});
