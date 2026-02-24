import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Surface } from "@/shared/ui/surface/surface";
import { PublicHeader } from "@/widgets/public/header/public-header";
import { PublicFooter } from "@/widgets/public/footer/public-footer";
import { PublicChatWidget } from "@/widgets/public/chat/public-chat-widget";
import { Home, Search, BookOpen } from "lucide-react";

const QUICK_LINKS = [
  {
    href: "/qualification-upgrade",
    label: "Повышение квалификации",
  },
  {
    href: "/professional-retraining",
    label: "Профпереподготовка",
  },
  {
    href: "/professional-education",
    label: "Профессиональное обучение",
  },
  { href: "/news", label: "Новости" },
  { href: "/contacts", label: "Контакты" },
] as const;

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <PublicHeader />
      <main
        id="main-content"
        className="relative z-10 flex flex-1 items-center justify-center px-4 py-16"
      >
        {/* Ambient glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 left-1/2 h-[480px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/6 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 h-[280px] w-[360px] rounded-full bg-primary/4 blur-3xl" />
        </div>

        <div className="relative z-10 w-full max-w-xl space-y-6 text-center">
          {/* 404 numeral */}
          <div className="relative flex items-center justify-center">
            <span
              className="pointer-events-none select-none text-[11rem] font-black leading-none tracking-tighter text-foreground/4 sm:text-[14rem]"
              aria-hidden
            >
              404
            </span>
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border/60 bg-card/60 shadow-lg backdrop-blur">
                <Search className="h-8 w-8 text-primary" aria-hidden />
              </div>
              <span className="rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
                Страница не найдена
              </span>
            </div>
          </div>

          <Surface variant="floating" className="p-6 sm:p-8">
            <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              Такой страницы не существует
            </h1>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Возможно, ссылка устарела или страница была перемещена.
              Воспользуйтесь поиском или перейдите к каталогу программ.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="rounded-xl font-semibold">
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  На главную
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-xl"
              >
                <Link href="/qualification-upgrade">
                  <BookOpen className="mr-2 h-4 w-4" />
                  К программам
                </Link>
              </Button>
            </div>
          </Surface>

          {/* Quick links */}
          <div className="space-y-3">
            <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              Популярные разделы
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {QUICK_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full border border-border/60 bg-card/60 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur transition-colors hover:border-border/80 hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <PublicFooter />
      <PublicChatWidget />
    </div>
  );
}
