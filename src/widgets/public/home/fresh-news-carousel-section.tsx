"use client";

import { memo } from "react";
import { Newspaper } from "lucide-react";
import { OfferCarousel } from "@/components/ui/offer-carousel";
import type { Offer } from "@/components/ui/offer-carousel";
import { useNews } from "@/entities/news/api/use-news";
import type { NewsEntity } from "@/entities/news/api/news.types";
import { FreshNewsCarouselSkeleton } from "./fresh-news-carousel-skeleton";
import { cn } from "@/lib/utils";

const CAROUSEL_NEWS_LIMIT = 8;

const SECTION_CLASSES = {
  section: "relative py-14 sm:py-18 lg:py-22",
  container:
    "mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12",
  header: "text-center space-y-3 mb-10",
  title:
    "text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground",
  subtitle:
    "text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto",
} as const;

const TEXTS = {
  title: "Свежие новости",
  subtitle: "Анонсы и события от Стандарт Плюс",
  tag: "Новость",
} as const;

// Placeholder for news without image (neutral gradient)
const PLACEHOLDER_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='380'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23f4f4f5'/%3E%3Cstop offset='100%25' style='stop-color:%23e4e4e7'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23g)' width='300' height='380'/%3E%3C/svg%3E";

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
  const att = news.attachments?.find(
    (a) => a.type === "photo" && a.url
  );
  return att?.url ?? null;
}

function truncateText(text: string, maxLength: number): string {
  const trimmed = text.trim();
  if (trimmed.length <= maxLength) return trimmed;
  return trimmed.slice(0, maxLength).trimEnd() + "…";
}

const FALLBACK_DESCRIPTION = "Подробнее на странице новости.";

function newsToOffer(news: NewsEntity): Offer {
  const photoUrl = getFirstPhotoUrl(news);
  const rawTitle = truncateText(news.text, 60);
  const rawDescription = truncateText(news.text, 100);
  const dateStr = formatNewsDate(news.date);
  const title = rawTitle || `Новость от ${dateStr}`;
  const description = rawDescription || FALLBACK_DESCRIPTION;
  return {
    id: news.id,
    imageSrc: photoUrl ?? PLACEHOLDER_IMAGE,
    imageAlt: title,
    tag: TEXTS.tag,
    title,
    description,
    brandName: dateStr,
    href: `/news/${encodeURIComponent(news.id)}`,
  };
}

export const FreshNewsCarouselSection = memo(
  function FreshNewsCarouselSection() {
    const { news, loading } = useNews({
      limit: CAROUSEL_NEWS_LIMIT,
      offset: 0,
    });

    const offers: Offer[] = news.map(newsToOffer);

    if (loading && offers.length === 0) {
      return (
        <section id="fresh-news" className={SECTION_CLASSES.section}>
          <div className={SECTION_CLASSES.container}>
            <div className={SECTION_CLASSES.header}>
              <h2 className={SECTION_CLASSES.title}>{TEXTS.title}</h2>
              <p className={SECTION_CLASSES.subtitle}>
                {TEXTS.subtitle}
              </p>
            </div>
            <FreshNewsCarouselSkeleton />
          </div>
        </section>
      );
    }

    if (offers.length === 0) {
      return null;
    }

    return (
      <section id="fresh-news" className={SECTION_CLASSES.section}>
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -right-24 h-[320px] w-[420px] rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-[280px] w-[380px] rounded-full bg-primary/5 blur-3xl" />
        </div>
        <div className={cn("relative", SECTION_CLASSES.container)}>
          <div className={SECTION_CLASSES.header}>
            <div className="flex items-center justify-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/5 text-primary">
                <Newspaper className="h-5 w-5" aria-hidden />
              </div>
              <h2 className={SECTION_CLASSES.title}>{TEXTS.title}</h2>
            </div>
            <p className={SECTION_CLASSES.subtitle}>
              {TEXTS.subtitle}
            </p>
          </div>
          <OfferCarousel offers={offers} className="mt-8" />
        </div>
      </section>
    );
  }
);
