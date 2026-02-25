"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  ChevronRight,
  ExternalLink,
  Image as ImageIcon,
  Link2,
  X,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { useNewsItem } from "@/entities/news/api/use-news-item";
import {
  isOptimizableImageSrc,
  truncateText,
  formatNewsDate,
  formatRelativeTime,
} from "@/entities/news/lib/news-utils";
import { NewsDetailSkeleton } from "./news-detail-skeleton";
import { ErrorState } from "@/shared/ui/error-state/error-state";
import { cn } from "@/lib/utils";

function DateLine({ iso }: { iso: string }) {
  const absolute = formatNewsDate(iso);
  const relative = formatRelativeTime(iso);
  return (
    <p
      className="flex items-center gap-2 text-sm font-medium tracking-wider text-muted-foreground uppercase"
      title={absolute}
    >
      <Calendar className="h-4 w-4 shrink-0" aria-hidden />
      {relative ? (
        <>
          {relative}
          <span className="font-normal normal-case opacity-60">
            · {absolute}
          </span>
        </>
      ) : (
        absolute
      )}
    </p>
  );
}

function Breadcrumbs({ title }: { title: string }) {
  return (
    <nav aria-label="Хлебные крошки">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
        <li>
          <Link
            href="/"
            className="transition-colors hover:text-foreground"
          >
            Главная
          </Link>
        </li>
        <li aria-hidden>
          <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-50" />
        </li>
        <li>
          <Link
            href="/news"
            className="transition-colors hover:text-foreground"
          >
            Новости
          </Link>
        </li>
        <li aria-hidden>
          <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-50" />
        </li>
        <li
          className="max-w-[200px] truncate font-medium text-foreground sm:max-w-xs"
          aria-current="page"
        >
          {title}
        </li>
      </ol>
    </nav>
  );
}

interface LightboxProps {
  photos: string[];
  initialIndex: number;
  onClose: () => void;
}

function Lightbox({ photos, initialIndex, onClose }: LightboxProps) {
  const [current, setCurrent] = useState(initialIndex);

  const prev = () =>
    setCurrent((i) => (i - 1 + photos.length) % photos.length);
  const next = () => setCurrent((i) => (i + 1) % photos.length);

  const src = photos[current];

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogTitle className="sr-only">
        Фото {current + 1} из {photos.length}
      </DialogTitle>
      <DialogContent
        className="flex max-h-[90vh] w-full max-w-5xl items-center justify-center border-0 bg-black/95 p-2 sm:p-4"
        showClose={false}
        overlayClassName="bg-black/90 backdrop-blur-md"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 rounded-full bg-white/10 p-1.5 text-white transition hover:bg-white/20"
          aria-label="Закрыть"
        >
          <X className="h-5 w-5" />
        </button>

        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="relative w-full"
          >
            <div className="relative aspect-video w-full overflow-hidden rounded-xl">
              {isOptimizableImageSrc(src) ? (
                <Image
                  src={src}
                  alt={`Фото ${current + 1}`}
                  fill
                  sizes="90vw"
                  className="object-contain"
                  priority
                />
              ) : (
                <Image
                  src={src}
                  alt={`Фото ${current + 1}`}
                  fill
                  sizes="90vw"
                  unoptimized
                  className="object-contain"
                  priority
                />
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {photos.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute top-1/2 left-3 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
              aria-label="Предыдущее фото"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={next}
              className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
              aria-label="Следующее фото"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <p className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-xs text-white">
              {current + 1} / {photos.length}
            </p>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export function NewsDetailContent() {
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : null;
  const { newsItem, loading, error, refetch } = useNewsItem(id);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(
    null
  );

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

  const photos =
    newsItem.attachments?.filter(
      (a) => a.type === "photo" && a.url
    ) ?? [];
  const links =
    newsItem.attachments?.filter((a) => a.type === "link") ?? [];
  const firstPhoto = photos[0]?.url ?? null;
  const allPhotoUrls = photos.map((p) => p.url!);

  const breadcrumbTitle = truncateText(newsItem.text, 50);

  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="relative"
    >
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <Breadcrumbs title={breadcrumbTitle} />
        <Button
          variant="ghost"
          size="sm"
          className="gap-1.5 text-muted-foreground hover:text-foreground"
          asChild
        >
          <Link href="/news">
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Назад
          </Link>
        </Button>
      </div>

      {/* Hero: full-bleed first photo */}
      {firstPhoto && (
        <div
          className="-mx-4 mb-8 cursor-zoom-in overflow-hidden rounded-2xl sm:-mx-6 sm:rounded-3xl lg:-mx-8"
          onClick={() => setLightboxIndex(0)}
        >
          <div className="relative aspect-video w-full">
            {isOptimizableImageSrc(firstPhoto) ? (
              <Image
                src={firstPhoto}
                alt={truncateText(newsItem.text, 80)}
                fill
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
                className="object-cover object-top"
              />
            ) : (
              <Image
                src={firstPhoto}
                alt={truncateText(newsItem.text, 80)}
                fill
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
                unoptimized
                className="h-full w-full object-cover object-top"
              />
            )}
            <div className="absolute inset-0 bg-linear-to-t from-background/80 via-background/20 to-transparent" />
            <div className="absolute right-0 bottom-0 left-0 p-6 sm:p-8">
              <DateLine iso={newsItem.date} />
            </div>
          </div>
        </div>
      )}

      {/* Editorial column */}
      <div className="mx-auto max-w-prose">
        {!firstPhoto && <DateLine iso={newsItem.date} />}

        <div
          className={cn(
            "prose prose-neutral dark:prose-invert prose-p:leading-relaxed prose-p:text-foreground max-w-none",
            !firstPhoto && "mt-6"
          )}
        >
          <div className="leading-relaxed whitespace-pre-wrap text-foreground">
            {newsItem.text}
          </div>
        </div>

        {photos.length > 1 && (
          <div className="mt-10 space-y-4">
            <h3 className="flex items-center gap-2 text-sm font-semibold tracking-wider text-foreground uppercase">
              <ImageIcon className="h-4 w-4" aria-hidden />
              Фотографии
            </h3>
            <ul className="grid gap-3 sm:grid-cols-2">
              {photos.slice(1).map((att, i) =>
                att.url ? (
                  <li key={i}>
                    <button
                      type="button"
                      onClick={() => setLightboxIndex(i + 1)}
                      className="relative block aspect-4/3 w-full cursor-zoom-in overflow-hidden rounded-xl border border-border/40 transition hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
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
                    </button>
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
                "inline-flex items-center gap-2.5 rounded-xl border border-border/60 bg-muted/20 px-5 py-2.5 text-sm font-medium transition",
                "hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
              )}
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 shrink-0 fill-current"
                aria-hidden
              >
                <path d="M21.547 7h-3.29a.743.743 0 0 0-.655.392s-1.312 2.416-1.734 3.23C14.734 12.813 14 12.126 14 11.11V7.603A1.104 1.104 0 0 0 12.896 6.5h-2.474a1.982 1.982 0 0 0-1.75.813s1.255-.204 1.255 1.49c0 .42.022 1.626.04 2.64a.73.73 0 0 1-1.272.503 21.54 21.54 0 0 1-2.498-4.543.693.693 0 0 0-.63-.403h-2.99a.508.508 0 0 0-.48.685C3.005 10.175 6.918 18 11.38 18h1.878a.742.742 0 0 0 .742-.742v-1.135a.73.73 0 0 1 1.23-.53l2.247 2.112a1.09 1.09 0 0 0 .746.295h2.953c1.424 0 1.424-.988.647-1.753-.546-.538-2.518-2.617-2.518-2.617a1.02 1.02 0 0 1-.078-1.323c.637-.84 1.68-2.212 2.122-2.8.603-.804 1.697-2.507.197-2.507z" />
              </svg>
              Открыть во ВКонтакте
            </a>
          </div>
        )}
      </div>

      {lightboxIndex !== null && allPhotoUrls.length > 0 && (
        <Lightbox
          photos={allPhotoUrls}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </motion.article>
  );
}
