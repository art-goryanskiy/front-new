import type { Metadata } from "next";
import { PublicPageLayout } from "@/shared/ui/layouts/public-page-layout";
import { NewsPageClient } from "@/widgets/news/news-page-client";

export const metadata: Metadata = {
  title: "Новости",
  description: "Анонсы и новости от Стандарт Плюс.",
};

export default function NewsPage() {
  return (
    <PublicPageLayout>
      <NewsPageClient />
    </PublicPageLayout>
  );
}
