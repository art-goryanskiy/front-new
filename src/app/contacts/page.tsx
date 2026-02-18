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
import { ContactsReviews } from "./contacts-reviews";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Контакты",
  description:
    "Контакты ЦОК Стандарт плюс: отдел продаж, методический отдел, офис-менеджер. Симферополь, просп. Победы. График работы.",
};

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
              <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Наименование
              </h2>
              <p className="mt-2 text-lg font-medium leading-snug text-foreground">
                {COMPANY_FULL_NAME}
              </p>
            </div>
            <div className="flex items-start gap-4 border-t border-border/60 pt-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <MapPin className="h-5 w-5" aria-hidden />
              </div>
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Адрес
                </h2>
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
                <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  График работы
                </h2>
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
                    className="inline-flex items-center gap-2 text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
                  >
                    <Phone className="h-4 w-4 shrink-0 text-primary/80" />
                    <span>{dept.phone}</span>
                  </a>
                  <a
                    href={`mailto:${dept.email}`}
                    className="inline-flex items-center gap-2 break-all text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
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

        {/* Отзывы */}
        <ContactsReviews />

        <div className="flex justify-center pb-4">
          <Button asChild variant="outline" size="lg">
            <Link href="/">На главную</Link>
          </Button>
        </div>
      </div>
    </PublicPageLayout>
  );
}
