import { CategoryType } from "@/shared/api/generated/graphql";
import { AdminCategoryTypePage } from "../_components/admin-category-type-page";

export default function ProfessionalRetrainingPage() {
  return (
    <AdminCategoryTypePage
      config={{
        type: CategoryType.ProfessionalRetraining,
        categoriesTitle: "Профессиональная переподготовка",
        categoriesDescription:
          "Управление категориями профессиональной переподготовки",
        programsTitle: "Программы • Проф. переподготовка",
      }}
    />
  );
}
