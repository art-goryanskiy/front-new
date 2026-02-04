import { Component } from "@/components/ui/the-infinite-grid";
import { getCategoriesServer } from "@/shared/api/server/categories";
import { getProgramsServer } from "@/shared/api/server/programs";
import { generateMetadata as generateSeoMetadata } from "@/shared/lib/seo/metadata";
import { generateOrganizationSchema } from "@/shared/lib/seo/structured-data";
import { PublicFooter } from "@/widgets/public/footer/public-footer";
import { PublicHeader } from "@/widgets/public/header/public-header";
import { CategoryTypeTiles } from "@/widgets/public/home/category-type-tiles";
import { TopProgramsSection } from "@/widgets/public/top-programs/top-programs-section";
import type { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = generateSeoMetadata({
  title: "Главная",
  description:
    "ООО ЦОК СТАНДАРТ ПЛЮС - профессиональные образовательные программы для развития карьеры. Повышение квалификации, профессиональная переподготовка и профессиональное обучение. Охрана труда, экологическая безопасность.",
  url: "/",
  keywords: [
    "обучение в Крыму",
    "курсы повышения квалификации",
    "профессиональная переподготовка Крым",
  ],
});

export default async function Home() {
  const cookieStore = await cookies();
  const cookie = cookieStore.toString();

  const [allPrograms, categories] = await Promise.all([
    getProgramsServer(undefined, cookie),
    getCategoriesServer(),
  ]);

  const organizationSchema = generateOrganizationSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <div className="min-h-screen bg-background">
        <PublicHeader />
        <main className="relative z-10">
          <Component />
          <CategoryTypeTiles categories={categories} />
          <TopProgramsSection
            initialAllPrograms={allPrograms}
            initialCategories={categories}
          />
        </main>
        <PublicFooter />
      </div>
    </>
  );
}

//test comment
