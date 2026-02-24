import { CategoryType } from "@/shared/api/generated/graphql";
import { AdminCategoryTypePage } from "../_components/admin-category-type-page";

export default function QualificationUpgradePage() {
  return (
    <AdminCategoryTypePage
      config={{
        type: CategoryType.QualificationUpgrade,
        categoriesTitle: "Повышение квалификации",
        categoriesDescription:
          "Управление категориями повышения квалификации",
        programsTitle: "Программы • Повышение квалификации",
      }}
    />
  );
}
