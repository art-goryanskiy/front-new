"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  ExternalLink,
  Image as ImageIcon,
  Link2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNewsItem } from "@/entities/news/api/use-news-item";
import { NewsDetailSkeleton } from "./news-detail-skeleton";
import { ErrorState } from "@/shared/ui/error-state/error-state";
import { cn } from "@/lib/utils";

const ALLOWED_IMAGE_HOSTS = [
  "standart-images.storage.yandexcloud.net",
];

function isOptimizableImageSrc(src: string): boolean {
  if (src.startsWith("data:")) return false;
  try {
    const u = new URL(src);
    return (
      u.protocol === "https:" &&
      ALLOWED_IMAGE_HOSTS.some((h) => u.hostname === h)
    );
  } catch {
    return false;
  }
}

function truncateText(text: string, maxLength: number): string {
  const trimmed = text.trim();
  if (trimmed.length <= maxLength) return trimmed;
  return trimmed.slice(0, maxLength).trimEnd() + "…";
}

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
      <div className="py-8">
        <NewsDetailSkeleton />
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
        <p className="font-medium text-foreground">
          Новость не найдена
        </p>
        <Button variant="link" className="mt-2" asChild>
          <Link href="/news">К списку новостей</Link>
        </Button>
      </div>
    );
  }

  const dateStr = formatNewsDate(newsItem.date);
  const photos =
    newsItem.attachments?.filter((a) => a.type === "photo") ?? [];
  const links =
    newsItem.attachments?.filter((a) => a.type === "link") ?? [];
  const firstPhoto = photos[0]?.url ?? null;
  const restPhotos = firstPhoto ? photos.slice(1) : photos;

  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="relative"
    >
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <Button variant="ghost" size="sm" className="gap-2" asChild>
          <Link href="/news">
            <ArrowLeft className="h-4 w-4" aria-hidden />К новостям
          </Link>
        </Button>
      </div>

      {/* Hero: full-bleed first photo */}
      {firstPhoto && (
        <div className="-mx-4 mb-8 overflow-hidden rounded-2xl sm:-mx-6 sm:rounded-3xl lg:-mx-8">
          <div className="relative aspect-video w-full">
            {isOptimizableImageSrc(firstPhoto) ? (
              <Image
                src={firstPhoto}
                alt={truncateText(newsItem.text, 80)}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
                className="object-cover object-top"
              />
            ) : (
              <Image
                src={firstPhoto}
                alt={truncateText(newsItem.text, 80)}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
                unoptimized
                className="h-full w-full object-cover object-top"
              />
            )}
            <div className="absolute inset-0 bg-linear-to-t from-background/80 via-background/20 to-transparent" />
            <div className="absolute right-0 bottom-0 left-0 p-6 sm:p-8">
              <p className="flex items-center gap-2 text-sm font-medium tracking-wider text-white uppercase drop-shadow-md">
                <Calendar className="h-4 w-4 shrink-0" aria-hidden />
                {dateStr}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Editorial column: prose + media */}
      <div className="mx-auto max-w-prose">
        {!firstPhoto && (
          <p className="mb-6 flex items-center gap-2 text-sm font-medium tracking-wider text-muted-foreground uppercase">
            <Calendar className="h-4 w-4 shrink-0" aria-hidden />
            {dateStr}
          </p>
        )}

        <div className="prose prose-neutral dark:prose-invert prose-p:leading-relaxed prose-p:text-foreground max-w-none">
          <div className="leading-relaxed whitespace-pre-wrap text-foreground">
            {newsItem.text}
          </div>
        </div>

        {restPhotos.length > 0 && (
          <div className="mt-10 space-y-4">
            <h3 className="flex items-center gap-2 text-sm font-semibold tracking-wider text-foreground uppercase">
              <ImageIcon className="h-4 w-4" aria-hidden />
              Фотографии
            </h3>
            <ul className="grid gap-3 sm:grid-cols-2">
              {restPhotos.map((att, i) =>
                att.url ? (
                  <li key={i}>
                    <a
                      href={att.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative block aspect-4/3 overflow-hidden rounded-xl border border-border/40 transition hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                    >
                      {isOptimizableImageSrc(att.url) ? (
                        <Image
                          src={att.url}
                          alt={`Фото ${i + 2} к новости`}
                          fill
                          sizes="(max-width: 640px) 100vw, 50vw"
                          className="object-cover object-top transition-transform duration-300 hover:scale-[1.02]"
                        />
                      ) : (
                        <Image
                          src={att.url}
                          alt={`Фото ${i + 2} к новости`}
                          fill
                          sizes="(max-width: 640px) 100vw, 50vw"
                          unoptimized
                          className="object-cover object-top transition-transform duration-300 hover:scale-[1.02]"
                        />
                      )}
                    </a>
                  </li>
                ) : null
              )}
            </ul>
          </div>
        )}

        {links.length > 0 && (
          <div className="mt-10 space-y-3">
            <h3 className="flex items-center gap-2 text-sm font-semibold tracking-wider text-foreground uppercase">
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
                      <ExternalLink
                        className="h-3.5 w-3.5 shrink-0"
                        aria-hidden
                      />
                    </a>
                  </li>
                ) : null
              )}
            </ul>
          </div>
        )}

        {newsItem.vkUrl && (
          <div className="mt-10 border-t border-border/40 pt-6">
            <a
              href={newsItem.vkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center gap-2 rounded-xl border border-border/60 bg-muted/20 px-5 py-2.5 text-sm font-medium transition",
                "hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
              )}
            >
              <ExternalLink
                className="h-4 w-4 shrink-0"
                aria-hidden
              />
              Открыть во ВКонтакте
            </a>
          </div>
        )}
      </div>
    </motion.article>
  );
}
