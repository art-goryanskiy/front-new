"use client";

import { YANDEX_ORG_ID } from "./contacts-data";

/**
 * Виджет отзывов Яндекс.Карт (организация по oid).
 * Если виджет не отображается, проверьте настройки организации в Личном кабинете Яндекс.Бизнеса.
 */
export function ContactsReviews() {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-border/60 bg-muted/10">
      <iframe
        title="Отзывы о организации на Яндекс.Картах"
        src={`https://yandex.ru/maps-reviews-widget/${YANDEX_ORG_ID}?comments`}
        className="h-[500px] w-full border-0 sm:h-[600px]"
        allowFullScreen
      />
    </div>
  );
}
