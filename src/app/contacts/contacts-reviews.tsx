"use client";

import { YANDEX_ORG_ID } from "./contacts-data";
import { BlurGlowBackground } from "@/shared/ui/blur-glow-background/blur-glow-background";
import { Surface } from "@/shared/ui/surface/surface";
import { Star } from "lucide-react";

const YANDEX_REVIEWS_URL = `https://yandex.ru/maps/org/uchebny_tsentr_standart/${YANDEX_ORG_ID}/reviews`;

/**
 * Премиальный блок отзывов: BlurGlow, Surface, центрированный виджет без серых полос.
 */
export function ContactsReviews() {
  return (
    <section className="relative" aria-labelledby="reviews-heading">
      <BlurGlowBackground
        spots={[
          { position: "top-left", color: "bg-primary/10" },
          { position: "bottom-right", color: "bg-amber-500/5" },
        ]}
      />
      <Surface
        variant="floating"
        className="relative z-10 overflow-hidden p-6 sm:p-8 lg:p-10"
      >
        <header className="mb-6 text-center sm:mb-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Star className="h-6 w-6" aria-hidden />
          </div>
          <h2
            id="reviews-heading"
            className="mt-4 text-xl font-bold tracking-tight text-foreground sm:text-2xl"
          >
            Отзывы
          </h2>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            Что говорят о нас клиенты
          </p>
          <div className="mx-auto mt-4 h-px w-16 rounded-full bg-primary/30" />
        </header>

        <div className="mx-auto w-full max-w-[760px] min-w-[300px]">
          <div className="overflow-hidden rounded-xl border border-border/50 bg-background shadow-inner ring-1 ring-black/5 dark:ring-white/5">
            <iframe
              title="Отзывы о организации на Яндекс.Картах"
              src={`https://yandex.ru/maps-reviews-widget/${YANDEX_ORG_ID}?comments`}
              className="block h-[520px] w-full border-0 sm:h-[600px]"
              allowFullScreen
            />
          </div>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            <a
              href={YANDEX_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-primary/40 underline-offset-2 transition-colors hover:text-primary hover:decoration-primary"
            >
              Все отзывы на Яндекс.Картах
            </a>
          </p>
        </div>
      </Surface>
    </section>
  );
}
