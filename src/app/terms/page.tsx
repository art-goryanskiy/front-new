import { PublicPageLayout } from "@/shared/ui/layouts/public-page-layout";
import type { Metadata } from "next";
import { generateMetadata as generateSeoMetadata } from "@/shared/lib/seo/metadata";

export const metadata: Metadata = generateSeoMetadata({
  title: "Пользовательское соглашение",
  description:
    "Пользовательское соглашение ООО ЦОК СТАНДАРТ ПЛЮС. Условия использования сайта.",
  url: "/terms",
});

export default function TermsPage() {
  return (
    <PublicPageLayout>
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Пользовательское соглашение
        </h1>
        <p className="mt-4 text-sm text-muted-foreground sm:text-base">
          Раздел в разработке. Здесь будут размещены условия
          использования сайта ООО ЦОК «СТАНДАРТ ПЛЮС» и
          пользовательское соглашение.
        </p>
      </div>
    </PublicPageLayout>
  );
}
