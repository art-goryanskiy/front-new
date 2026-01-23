import { CategoryPage } from "../category-page/category-page";
import { CategoryType } from "@/shared/api/generated/graphql";

export default function ProfessionalRetrainingPage() {
  return (
    <CategoryPage
      type={CategoryType.ProfessionalRetraining}
      title="Профессиональная переподготовка"
      description="Управление категориями профессиональной переподготовки"
    />
  );
}
