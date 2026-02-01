"use client";

import Link from "next/link";
import { memo } from "react";
import { Surface } from "@/shared/ui/surface/surface";

const LINKS = [
  { label: "Главная", href: "/" },
  { label: "Повышение квалификации", href: "/qualification-upgrade" },
  { label: "Проф. переподготовка", href: "/professional-retraining" },
  { label: "Проф. обучение", href: "/professional-education" },
  { label: "Корзина", href: "/cart" },
  { label: "Мои заказы", href: "/orders" },
  { label: "Профиль", href: "/profile" },
] as const;

export const PublicFooter = memo(function PublicFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <Surface
          variant="default"
          className="overflow-hidden border-border/60 bg-background/50 p-6 backdrop-blur-xl"
        >
          <div className="grid gap-6 md:grid-cols-[1.2fr_1fr] md:gap-10">
            <div className="space-y-3">
              <div className="text-sm font-semibold text-foreground">
                ООО ЦОК «СТАНДАРТ ПЛЮС»
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Современные образовательные программы: повышение
                квалификации, профессиональная переподготовка и
                профессиональное обучение.
              </p>
              <p className="text-xs text-muted-foreground">
                По вопросам:{" "}
                <a
                  className="font-medium text-foreground hover:underline"
                  href="mailto:info@standart82.ru"
                >
                  info@standart82.ru
                </a>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {l.label}
                </Link>
              ))}
              <a
                href="#"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Политика конфиденциальности
              </a>
              <a
                href="#"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Пользовательское соглашение
              </a>
            </div>
          </div>

          <div className="mt-6 border-t border-border/60 pt-5 text-xs text-muted-foreground">
            © {year} ООО ЦОК «СТАНДАРТ ПЛЮС». Все права защищены.
          </div>
        </Surface>
      </div>
    </footer>
  );
});
