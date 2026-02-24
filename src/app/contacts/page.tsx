import { PublicPageLayout } from "@/shared/ui/layouts/public-page-layout";
import {
  COMPANY_FULL_NAME,
  COMPANY_ADDRESS,
  WORKING_HOURS,
  CONTACT_DEPARTMENTS,
} from "./contacts-data";
import { Surface } from "@/shared/ui/surface/surface";
import { BlurGlowBackground } from "@/shared/ui/blur-glow-background/blur-glow-background";
import { ContactsMap } from "./contacts-map";
import { ContactsDocuments } from "./contacts-documents";
import { ContactsReviews } from "./contacts-reviews";
import { ContactsForm } from "./contacts-form";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock, ArrowRight, BookOpen } from "lucide-react";
import { generateMetadata as generateSeoMetadata } from "@/shared/lib/seo/metadata";

export const metadata: Metadata = generateSeoMetadata({
  title: "Контакты",
  description:
    "Контакты ЦОК Стандарт плюс: отдел продаж, методический отдел, офис-менеджер. Симферополь, просп. Победы. График работы.",
  url: "/contacts",
});

function telHref(phone: string) {
  return `tel:${phone.replace(/\s|[()]/g, "")}`;
}

export default function ContactsPage() {
  return (
    <PublicPageLayout>
      <div className="space-y-10">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Контакты
          </h1>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            Свяжитесь с нами по вопросам программ обучения и заявок.
          </p>
        </div>

        {/* Наименование и адрес */}
        <section className="relative">
          <BlurGlowBackground
            spots={[
              { position: "top-right", color: "bg-primary/10" },
              { position: "bottom-left", color: "bg-blue-500/10" },
            ]}
          />
          <Surface
            variant="floating"
            className="relative z-10 space-y-4 p-6 sm:p-8"
          >
            <div>
              <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                Наименование
              </span>
              <p className="mt-2 text-lg leading-snug font-medium text-foreground">
                {COMPANY_FULL_NAME}
              </p>
            </div>
            <div className="flex items-start gap-4 border-t border-border/60 pt-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <MapPin className="h-5 w-5" aria-hidden />
              </div>
              <div>
                <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                  Адрес
                </span>
                <p className="mt-2 text-base font-medium text-foreground">
                  {COMPANY_ADDRESS}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 border-t border-border/60 pt-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Clock className="h-5 w-5" aria-hidden />
              </div>
              <div>
                <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                  График работы
                </span>
                <p className="mt-2 text-base font-medium text-foreground">
                  {WORKING_HOURS}
                </p>
              </div>
            </div>
          </Surface>
        </section>

        {/* Карточки отделов */}
        <section>
          <h2 className="mb-4 text-lg font-semibold text-foreground">
            Отделы
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CONTACT_DEPARTMENTS.map((dept) => (
              <Surface
                key={dept.title}
                variant="floating"
                className="flex flex-col gap-4 p-6 transition-[border,box-shadow] hover:border-border/80 hover:shadow-md"
              >
                <h3 className="text-base font-semibold text-foreground">
                  {dept.title}
                </h3>
                <div className="flex flex-col gap-3 text-sm">
                  <a
                    href={telHref(dept.phone)}
                    className="inline-flex items-center gap-2 rounded text-foreground transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
                  >
                    <Phone className="h-4 w-4 shrink-0 text-primary/80" />
                    <span>{dept.phone}</span>
                  </a>
                  <a
                    href={`mailto:${dept.email}`}
                    className="inline-flex items-center gap-2 rounded break-all text-foreground transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
                  >
                    <Mail className="h-4 w-4 shrink-0 text-primary/80" />
                    <span>{dept.email}</span>
                  </a>
                </div>
                <div className="mt-auto flex flex-wrap gap-2 pt-2">
                  <Button asChild size="sm">
                    <a href={telHref(dept.phone)}>Позвонить</a>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <a href={`mailto:${dept.email}`}>Написать</a>
                  </Button>
                </div>
              </Surface>
            ))}
          </div>
        </section>

        {/* Карта */}
        <section>
          <h2 className="mb-4 text-lg font-semibold text-foreground">
            Как нас найти
          </h2>
          <ContactsMap />
        </section>

        {/* Документы */}
        <ContactsDocuments />

        {/* Отзывы */}
        <ContactsReviews />

        {/* Форма заявки */}
        <ContactsForm />

        {/* CTA-блок */}
        <section className="relative overflow-hidden rounded-2xl border border-border/60 bg-linear-to-br from-primary/7 via-background to-blue-500/5 p-8 sm:p-10 lg:p-14">
          <div className="pointer-events-none absolute -top-24 -right-24 h-[360px] w-[460px] rounded-full bg-primary/8 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-[240px] w-[320px] rounded-full bg-blue-500/6 blur-3xl" />
          <div className="relative z-10 flex flex-col items-center gap-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-[0_0_28px_color-mix(in_srgb,var(--primary)_16%,transparent)]">
              <BookOpen className="h-7 w-7" aria-hidden />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Готовы начать обучение?
              </h2>
              <p className="mx-auto max-w-md text-sm text-muted-foreground sm:text-base">
                Выберите подходящую программу или оставьте заявку — мы подберём оптимальный вариант.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="gap-2">
                <Link href="/programs">
                  Все программы
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/">На главную</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </PublicPageLayout>
  );
}
