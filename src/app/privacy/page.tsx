import { PublicPageLayout } from "@/shared/ui/layouts/public-page-layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
  description:
    "Политика конфиденциальности ООО ЦОК СТАНДАРТ ПЛЮС. Обработка персональных данных.",
};

export default function PrivacyPage() {
  return (
    <PublicPageLayout>
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Политика конфиденциальности
        </h1>
        <p className="mt-4 text-sm text-muted-foreground sm:text-base">
          Раздел в разработке. Здесь будет размещена политика
          конфиденциальности ООО ЦОК «СТАНДАРТ ПЛЮС» в отношении
          обработки персональных данных пользователей сайта.
        </p>
      </div>
    </PublicPageLayout>
  );
}
