import { CategoryPage } from "../category-page/category-page";
import { CategoryType } from "@/shared/api/generated/graphql";

export default function QualificationUpgradePage() {
  return (
    <CategoryPage
      type={CategoryType.QualificationUpgrade}
      title="Повышение квалификации"
      description="Управление категориями повышения квалификации"
    />
  );
}
