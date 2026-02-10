"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, ExternalLink, Image, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNewsItem } from "@/entities/news/api/use-news-item";
import { LoadingState } from "@/shared/ui/loading-state/loading-state";
import { ErrorState } from "@/shared/ui/error-state/error-state";
import { cn } from "@/lib/utils";

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

export function NewsDetailContent() {
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : null;
  const { newsItem, loading, error, refetch } = useNewsItem(id);

  if (!id) {
    return (
      <div className="space-y-3">
        <ErrorState
          title="Новость не указана"
          message="Перейдите к списку новостей."
        />
        <Button variant="outline" size="sm" asChild>
          <Link href="/news">К списку новостей</Link>
        </Button>
      </div>
    );
  }

  if (loading && !newsItem) {
    return (
      <div className="flex justify-center py-16">
        <LoadingState />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-3">
        <ErrorState
          title="Не удалось загрузить новость"
          message={error.message}
        />
        <Button variant="outline" size="sm" onClick={() => refetch()}>
          Повторить
        </Button>
      </div>
    );
  }

  if (!newsItem) {
    return (
      <div className="rounded-2xl border border-border/50 bg-muted/10 px-6 py-12 text-center">
        <p className="font-medium text-foreground">Новость не найдена</p>
        <Button variant="link" className="mt-2" asChild>
          <Link href="/news">К списку новостей</Link>
        </Button>
      </div>
    );
  }

  const dateStr = formatNewsDate(newsItem.date);
  const photos = newsItem.attachments?.filter((a) => a.type === "photo") ?? [];
  const links = newsItem.attachments?.filter((a) => a.type === "link") ?? [];

  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative"
    >
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <Button variant="ghost" size="sm" className="gap-2" asChild>
          <Link href="/news">
            <ArrowLeft className="h-4 w-4" aria-hidden />
            К новостям
          </Link>
        </Button>
      </div>

      <div
        className={cn(
          "overflow-hidden rounded-2xl border border-border/50 bg-background/95 shadow-lg",
          "dark:border-white/10 dark:bg-muted/5"
        )}
      >
        <div className="border-b border-border/40 bg-muted/5 px-6 py-4 dark:bg-muted/10">
          <p className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Calendar className="h-4 w-4 shrink-0" aria-hidden />
            {dateStr}
          </p>
        </div>

        <div className="space-y-6 p-6 sm:p-8">
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <div className="whitespace-pre-wrap text-foreground leading-relaxed">
              {newsItem.text}
            </div>
          </div>

          {photos.length > 0 && (
            <div className="space-y-3">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Image className="h-4 w-4" aria-hidden />
                Фотографии
              </h3>
              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {photos.map((att, i) =>
                  att.url ? (
                    <li key={i}>
                      <a
                        href={att.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block overflow-hidden rounded-xl border border-border/50 transition hover:border-primary/30 hover:shadow-md"
                      >
                        <img
                          src={att.url}
                          alt=""
                          className="h-48 w-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </a>
                    </li>
                  ) : null
                )}
              </ul>
            </div>
          )}

          {links.length > 0 && (
            <div className="space-y-3">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Link2 className="h-4 w-4" aria-hidden />
                Ссылки
              </h3>
              <ul className="space-y-2">
                {links.map((att, i) =>
                  att.url ? (
                    <li key={i}>
                      <a
                        href={att.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary underline decoration-primary/40 underline-offset-2 transition hover:decoration-primary"
                      >
                        {att.title ?? att.url}
                        <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden />
                      </a>
                    </li>
                  ) : null
                )}
              </ul>
            </div>
          )}

          {newsItem.vkUrl && (
            <div className="pt-2">
              <a
                href={newsItem.vkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "inline-flex items-center gap-2 rounded-xl border border-border/60 bg-muted/20 px-4 py-2.5 text-sm font-medium transition",
                  "hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                )}
              >
                <ExternalLink className="h-4 w-4 shrink-0" aria-hidden />
                Открыть во ВКонтакте
              </a>
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}
