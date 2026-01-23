import type { Metadata } from "next";
import { PublicHeader } from "@/widgets/public/header/public-header";
import { HeroBanner } from "@/widgets/public/hero-banner/hero-banner";
import { TopProgramsSection } from "@/widgets/public/top-programs/top-programs-section";
import { getTopProgramsServer } from "@/shared/api/server/programs";
import { getProgramsServer } from "@/shared/api/server/programs";
import { getCategoriesServer } from "@/shared/api/server/categories";
import { cookies } from "next/headers";
import { generateMetadata as generateSeoMetadata } from "@/shared/lib/seo/metadata";
import { generateOrganizationSchema } from "@/shared/lib/seo/structured-data";

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

  const [topPrograms, allPrograms, categories] = await Promise.all([
    getTopProgramsServer(6, cookie),
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
        <main>
          <HeroBanner />
          <TopProgramsSection
            initialTopPrograms={topPrograms}
            initialAllPrograms={allPrograms}
            initialCategories={categories}
          />
        </main>
      </div>
    </>
  );
}
