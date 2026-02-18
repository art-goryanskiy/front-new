import { PublicPageLayout } from "@/shared/ui/layouts/public-page-layout";
import {
  COMPANY_PHONE,
  COMPANY_EMAIL,
  COMPANY_ADDRESS,
} from "@/shared/lib/seo/structured-data";
import { Surface } from "@/shared/ui/surface/surface";
import { BlurGlowBackground } from "@/shared/ui/blur-glow-background/blur-glow-background";
import { ContactsMapPlaceholder } from "./contacts-map-placeholder";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Контакты",
  description:
    "Контакты ООО ЦОК СТАНДАРТ ПЛЮС: телефон, email, адрес. Свяжитесь с нами по вопросам обучения.",
};

export default function ContactsPage() {
  return (
    <PublicPageLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Контакты
          </h1>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            Свяжитесь с нами по вопросам программ обучения и заявок.
          </p>
        </div>

        <section className="relative">
          <BlurGlowBackground
            spots={[
              { position: "top-right", color: "bg-primary/10" },
              { position: "bottom-left", color: "bg-blue-500/10" },
            ]}
          />
          <Surface
            variant="floating"
            className="relative z-10 space-y-6 p-6 sm:p-8"
          >
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Phone className="h-5 w-5" aria-hidden />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-muted-foreground">
                    Телефон
                  </h2>
                  <a
                    href={`tel:${COMPANY_PHONE.replace(/\s/g, "")}`}
                    className="mt-1 text-lg font-medium text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
                  >
                    {COMPANY_PHONE}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Mail className="h-5 w-5" aria-hidden />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-muted-foreground">
                    Email
                  </h2>
                  <a
                    href={`mailto:${COMPANY_EMAIL}`}
                    className="mt-1 block text-lg font-medium text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded break-all"
                  >
                    {COMPANY_EMAIL}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4 sm:col-span-2">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <MapPin className="h-5 w-5" aria-hidden />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-muted-foreground">
                    Адрес
                  </h2>
                  <p className="mt-1 text-lg font-medium text-foreground">
                    {COMPANY_ADDRESS}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 border-t border-border/60 pt-6">
              <Button asChild size="lg">
                <a href={`tel:${COMPANY_PHONE.replace(/\s/g, "")}`}>
                  Позвонить
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href={`mailto:${COMPANY_EMAIL}`}>Написать</a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/">На главную</Link>
              </Button>
            </div>
          </Surface>
        </section>

        <section>
          <h2 className="mb-4 text-lg font-semibold text-foreground">
            Как нас найти
          </h2>
          <ContactsMapPlaceholder />
        </section>
      </div>
    </PublicPageLayout>
  );
}
