"use client";

import Image from "next/image";
import { memo } from "react";
import { cn } from "@/lib/utils";

type Client = {
  id: string;
  name: string;
  src: string;
  width: number;
  height: number;
};

const CLIENTS: Client[] = [
  {
    id: "coral",
    name: "Coral",
    src: "/clients/coral.png",
    width: 120,
    height: 48,
  },
  {
    id: "kzhd",
    name: "КЖЗД",
    src: "/clients/kzhd.jpg",
    width: 120,
    height: 48,
  },
  {
    id: "zhdn",
    name: "ЖЗДН",
    src: "/clients/zhdn.png",
    width: 120,
    height: 48,
  },
  {
    id: "gsx",
    name: "GSX",
    src: "/clients/logo-gsx-color.svg",
    width: 120,
    height: 48,
  },
  {
    id: "logo1",
    name: "Клиент",
    src: "/clients/Logo.jpg",
    width: 120,
    height: 48,
  },
  {
    id: "logo2",
    name: "Клиент 2",
    src: "/clients/logo (1).png",
    width: 120,
    height: 48,
  },
  {
    id: "logo3",
    name: "Клиент 3",
    src: "/clients/logo (2).png",
    width: 120,
    height: 48,
  },
  {
    id: "logo4",
    name: "Клиент 4",
    src: "/clients/logo-invert.png",
    width: 120,
    height: 48,
  },
  {
    id: "logo5",
    name: "Клиент 5",
    src: "/clients/logo-invert (1).png",
    width: 120,
    height: 48,
  },
  {
    id: "sherl",
    name: "Клиент 6",
    src: "/clients/sherl9z9lv6hmmjpaczxm4u4sn9pg6mk.png",
    width: 120,
    height: 48,
  },
  {
    id: "111",
    name: "Клиент 7",
    src: "/clients/111.png",
    width: 120,
    height: 48,
  },
  {
    id: "img",
    name: "Клиент 8",
    src: "/clients/images.jpeg",
    width: 120,
    height: 48,
  },
  {
    id: "noname1",
    name: "Клиент 9",
    src: "/clients/Без названия.png",
    width: 120,
    height: 48,
  },
  {
    id: "noname2",
    name: "Клиент 10",
    src: "/clients/Без названия.svg",
    width: 120,
    height: 48,
  },
  {
    id: "noname3",
    name: "Клиент 11",
    src: "/clients/Без названия.jpeg",
    width: 120,
    height: 48,
  },
  {
    id: "noname4",
    name: "Клиент 12",
    src: "/clients/Без названия (1).jpeg",
    width: 120,
    height: 48,
  },
];

/** Один логотип: нейтральный фильтр → цветной при hover */
const ClientLogo = memo(function ClientLogo({
  client,
}: {
  client: Client;
}) {
  return (
    <div
      className="group relative flex h-14 w-[130px] shrink-0 items-center justify-center rounded-xl border border-border/40 bg-background/60 px-4 py-2 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-md"
      title={client.name}
    >
      <Image
        src={client.src}
        alt={client.name}
        width={client.width}
        height={client.height}
        sizes="130px"
        className="h-full w-full object-contain grayscale transition-all duration-300 group-hover:grayscale-0"
        loading="lazy"
      />
    </div>
  );
});

export const ClientsMarqueeSection = memo(
  function ClientsMarqueeSection() {
    if (CLIENTS.length === 0) return null;

    // Дублируем для бесшовной петли
    const doubled = [...CLIENTS, ...CLIENTS];

    return (
      <section
        aria-label="Наши клиенты"
        className="relative overflow-hidden py-14 sm:py-16"
      >
        {/* Фоновые блики */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
        >
          <div className="absolute -top-16 left-1/4 h-48 w-96 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute right-1/4 -bottom-16 h-48 w-80 rounded-full bg-primary/5 blur-3xl" />
        </div>

        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          {/* Заголовок */}
          <div className="mb-10 text-center">
            <p className="mb-2 text-xs font-semibold tracking-[0.2em] text-primary/70 uppercase">
              Нам доверяют
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Наши клиенты
            </h2>
          </div>
        </div>

        {/* Маска по краям */}
        <div className="relative">
          <div
            className={cn(
              "pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-24 sm:w-40",
              "bg-linear-to-r from-background to-transparent"
            )}
            aria-hidden
          />
          <div
            className={cn(
              "pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-24 sm:w-40",
              "bg-linear-to-l from-background to-transparent"
            )}
            aria-hidden
          />

          {/* Бегущая полоса */}
          <div className="overflow-hidden">
            <div
              className="animate-marquee flex gap-4"
              style={
                { "--marquee-duration": "35s" } as React.CSSProperties
              }
            >
              {doubled.map((client, idx) => (
                <ClientLogo
                  key={`${client.id}-${idx}`}
                  client={client}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
);
