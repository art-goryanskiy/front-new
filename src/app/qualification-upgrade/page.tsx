import type { Metadata } from "next";
import { CategoryTypePage } from "@/shared/lib/pages/category-type-page";
import { CategoryType } from "@/shared/api/generated/graphql";
import { getCategoriesServer } from "@/shared/api/server/categories";
import { generateMetadata as generateSeoMetadata } from "@/shared/lib/seo/metadata";
import { safeAsyncArray } from "@/shared/lib/helpers/error-helpers";

export const metadata: Metadata = generateSeoMetadata({
  title: "Повышение квалификации",
  description:
    "Программы повышения квалификации для профессионального развития. ООО ЦОК СТАНДАРТ ПЛЮС предлагает современные образовательные программы для развития профессиональных навыков. Обучение в Крыму.",
  url: "/qualification-upgrade",
  keywords: [
    "повышение квалификации",
    "курсы повышения квалификации",
    "повышение квалификации Крым",
    "обучение повышение квалификации",
  ],
});

export default async function QualificationUpgradePage() {
  const categories = await safeAsyncArray(getCategoriesServer());

  return (
    <CategoryTypePage
      categoryType={CategoryType.QualificationUpgrade}
      title="Повышение квалификации"
      description="Современные программы повышения квалификации для развития профессиональных навыков"
      initialCategories={categories}
    />
  );
}
