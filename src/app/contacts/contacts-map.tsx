"use client";

import { YANDEX_ORG_ID } from "./contacts-data";

export function ContactsMap() {
  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl border border-border/60 bg-muted/10"
      style={{ paddingBottom: "min(400px, 71.43%)" }}
    >
      <iframe
        title="Организация на Яндекс.Картах"
        src={`https://yandex.ru/map-widget/v1/?z=12&ol=biz&oid=${YANDEX_ORG_ID}`}
        className="absolute top-0 left-0 h-full w-full border-0"
        allowFullScreen
      />
    </div>
  );
}
