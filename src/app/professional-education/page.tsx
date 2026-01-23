import type { Metadata } from "next";
import { CategoryTypePage } from "@/shared/lib/pages/category-type-page";
import { CategoryType } from "@/shared/api/generated/graphql";
import { getCategoriesServer } from "@/shared/api/server/categories";
import { generateMetadata as generateSeoMetadata } from "@/shared/lib/seo/metadata";
import { safeAsyncArray } from "@/shared/lib/helpers/error-helpers";

export const metadata: Metadata = generateSeoMetadata({
  title: "Профессиональное обучение",
  description:
    "Программы профессионального обучения для развития навыков и компетенций. ООО ЦОК СТАНДАРТ ПЛЮС предлагает профессиональное обучение по различным направлениям. Обучение в Крыму.",
  url: "/professional-education",
  keywords: [
    "профессиональное обучение",
    "курсы профессионального обучения",
    "профессиональное обучение Крым",
    "обучение рабочим профессиям",
  ],
});

export default async function ProfessionalEducationPage() {
  const categories = await safeAsyncArray(getCategoriesServer());

  return (
    <CategoryTypePage
      categoryType={CategoryType.ProfessionalEducation}
      title="Профессиональное обучение"
      description="Программы профессионального обучения для развития навыков и компетенций"
      initialCategories={categories}
    />
  );
}
