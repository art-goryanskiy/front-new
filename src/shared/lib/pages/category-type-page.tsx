import { PublicPageLayout } from "@/shared/ui/layouts/public-page-layout";
import { SubcategoryList } from "@/entities/category/ui/subcategory-list/subcategory-list";
import { Breadcrumbs } from "@/shared/ui/breadcrumbs/breadcrumbs";
import { CategoryType } from "@/shared/api/generated/graphql";
import type { CategoryEntity } from "@/shared/api/generated/graphql";

interface CategoryTypePageProps {
  categoryType: CategoryType;
  title: string;
  description: string;
  initialCategories: CategoryEntity[];
}

export function CategoryTypePage({
  categoryType,
  title,
  description,
  initialCategories,
}: CategoryTypePageProps) {
  return (
    <PublicPageLayout>
      <Breadcrumbs
        items={[{ label: title }]}
        className="mb-6"
      />
      <SubcategoryList
        categoryType={categoryType}
        title={title}
        description={description}
        initialCategories={initialCategories}
      />
    </PublicPageLayout>
  );
}
