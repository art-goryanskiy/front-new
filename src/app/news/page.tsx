import type { Metadata } from "next";
import { PublicPageLayout } from "@/shared/ui/layouts/public-page-layout";
import { NewsPageClient } from "@/widgets/news/news-page-client";
import { generateMetadata as generateSeoMetadata } from "@/shared/lib/seo/metadata";

export const metadata: Metadata = generateSeoMetadata({
  title: "Новости",
  description:
    "Анонсы и новости ООО ЦОК СТАНДАРТ ПЛЮС: образовательные программы, повышение квалификации, мероприятия.",
  url: "/news",
});

export default function NewsPage() {
  return (
    <PublicPageLayout>
      <NewsPageClient />
    </PublicPageLayout>
  );
}
