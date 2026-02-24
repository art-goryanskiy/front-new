import dynamic from "next/dynamic";
import { Component } from "@/components/ui/the-infinite-grid";
import { getCategoriesServer } from "@/shared/api/server/categories";
import { getProgramsServer } from "@/shared/api/server/programs";
import { generateMetadata as generateSeoMetadata } from "@/shared/lib/seo/metadata";
import { generateOrganizationSchema } from "@/shared/lib/seo/structured-data";
import { PublicFooter } from "@/widgets/public/footer/public-footer";
import { PublicHeader } from "@/widgets/public/header/public-header";
import { PublicChatWidget } from "@/widgets/public/chat/public-chat-widget";
import { CategoryTypeTiles } from "@/widgets/public/home/category-type-tiles";
import { ClientsMarqueeSection } from "@/widgets/public/home/clients-marquee-section";
import { StatsSection } from "@/widgets/public/home/stats-section";
import { HowItWorksSection } from "@/widgets/public/home/how-it-works-section";
import { WhyUsSection } from "@/widgets/public/home/why-us-section";
import type { Metadata } from "next";

const TopProgramsSection = dynamic(
  () =>
    import("@/widgets/public/top-programs/top-programs-section").then(
      (m) => ({
        default: m.TopProgramsSection,
      })
    ),
  { ssr: true, loading: () => null }
);

const FreshNewsCarouselSection = dynamic(
  () =>
    import("@/widgets/public/home/fresh-news-carousel-section").then(
      (m) => ({
        default: m.FreshNewsCarouselSection,
      })
    ),
  {
    ssr: true,
    loading: () => (
      <section
        className="relative py-14 sm:py-18 lg:py-22"
        aria-hidden
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <div className="h-10 w-48 animate-pulse rounded-lg bg-muted/40" />
          <div className="mt-8 h-[380px] w-full max-w-[300px] animate-pulse rounded-2xl bg-muted/30" />
        </div>
      </section>
    ),
  }
);

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
  const [allPrograms, categories] = await Promise.all([
    getProgramsServer(),
    getCategoriesServer(),
  ]);

  const programsCount = allPrograms.length;
  const categoriesCount = categories.length;

  const organizationSchema = generateOrganizationSchema();

  return (
    <>
      {/* JSON-LD: данные только из generateOrganizationSchema(), не пользовательский ввод */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <div className="min-h-screen bg-background">
        <PublicHeader />
        <main id="main-content" className="relative z-10">
          <Component />
          <CategoryTypeTiles categories={categories} />
          <HowItWorksSection />
          <WhyUsSection />
          <StatsSection
            programsCount={programsCount}
            categoriesCount={categoriesCount}
          />
          <TopProgramsSection
            initialAllPrograms={allPrograms}
            initialCategories={categories}
          />
          <FreshNewsCarouselSection />
          <ClientsMarqueeSection />
        </main>
        <PublicFooter />
        <PublicChatWidget />
      </div>
    </>
  );
}
