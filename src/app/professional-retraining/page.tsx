import type { Metadata } from "next";
import { CategoryTypePage } from "@/shared/lib/pages/category-type-page";
import { CategoryType } from "@/shared/api/generated/graphql";
import { getCategoriesServer } from "@/shared/api/server/categories";
import { generateMetadata as generateSeoMetadata } from "@/shared/lib/seo/metadata";
import { safeAsyncArray } from "@/shared/lib/helpers/error-helpers";

export const metadata: Metadata = generateSeoMetadata({
  title: "Профессиональная переподготовка",
  description:
    "Программы профессиональной переподготовки для новой квалификации. ООО ЦОК СТАНДАРТ ПЛЮС — переподготовка для смены профессии и карьеры. Обучение в Крыму.",
  url: "/professional-retraining",
  keywords: [
    "профессиональная переподготовка",
    "переподготовка специалистов",
    "профессиональная переподготовка Крым",
    "курсы переподготовки",
  ],
});

export default async function ProfessionalRetrainingPage() {
  const categories = await safeAsyncArray(getCategoriesServer());

  return (
    <CategoryTypePage
      categoryType={CategoryType.ProfessionalRetraining}
      title="Профессиональная переподготовка"
      description="Программы профессиональной переподготовки для получения новой квалификации"
      initialCategories={categories}
    />
  );
}
