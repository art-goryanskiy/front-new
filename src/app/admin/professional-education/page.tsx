import { CategoryPage } from "../category-page/category-page";
import { CategoryType } from "@/shared/api/generated/graphql";

export default function ProfessionalEducationPage() {
  return (
    <CategoryPage
      type={CategoryType.ProfessionalEducation}
      title="Профессиональное обучение"
      description="Управление категориями профессионального обучения"
    />
  );
}
