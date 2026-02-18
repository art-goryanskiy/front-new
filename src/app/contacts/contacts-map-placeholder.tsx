"use client";

/**
 * Контейнер для Яндекс.Карты.
 * Подключение: добавьте скрипт Яндекс.Карт API и инициализацию карты в этот компонент
 * или замените на iframe из Конструктора карт (https://yandex.ru/map-constructor/).
 */
export function ContactsMapPlaceholder() {
  return (
    <div
      id="yandex-map"
      className="min-h-[320px] w-full overflow-hidden rounded-2xl border border-border/60 bg-muted/20 flex items-center justify-center"
      aria-label="Карта"
    >
      <p className="text-sm text-muted-foreground px-4 text-center">
        Здесь будет карта. Подключите Яндекс.Карты (API или iframe из Конструктора).
      </p>
    </div>
  );
}
