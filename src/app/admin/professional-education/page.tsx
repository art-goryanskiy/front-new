import { CategoryType } from "@/shared/api/generated/graphql";
import { AdminCategoryTypePage } from "../_components/admin-category-type-page";

export default function ProfessionalEducationPage() {
  return (
    <AdminCategoryTypePage
      config={{
        type: CategoryType.ProfessionalEducation,
        categoriesTitle: "Профессиональное обучение",
        categoriesDescription:
          "Управление категориями профессионального обучения",
        programsTitle: "Программы • Проф. обучение",
      }}
    />
  );
}
