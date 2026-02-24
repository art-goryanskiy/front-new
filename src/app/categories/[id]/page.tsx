import type { Metadata } from "next";
import { DetailPageLayout } from "@/shared/ui/layouts/detail-page-layout";
import { ProgramList } from "@/entities/program/ui/program-list/program-list";
import { getCategoryServer } from "@/shared/api/server/categories";
import { getProgramsServer } from "@/shared/api/server/programs";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { generateCategoryMetadata } from "@/shared/lib/seo/metadata";
import {
  generateCategorySchema,
  generateBreadcrumbSchema,
} from "@/shared/lib/seo/structured-data";
import { getCategoriesServer } from "@/shared/api/server/categories";
import {
  safeAsyncNull,
  safeAsyncArray,
} from "@/shared/lib/helpers/error-helpers";
import { CATEGORY_TYPE_LABELS } from "@/shared/constants/categories";
import { CATEGORY_TYPE_HREFS } from "@/shared/constants/category-hrefs";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const category = await safeAsyncNull(getCategoryServer(id));

  if (!category) {
    return {
      title: "Категория не найдена",
    };
  }

  return generateCategoryMetadata(category);
}

export default async function CategoryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cookieStore = await cookies();
  const cookie = cookieStore.toString();

  const [category, programs, allCategories] = await Promise.all([
    safeAsyncNull(getCategoryServer(id)),
    safeAsyncArray(
      getProgramsServer(
        { sortBy: "views", sortOrder: "desc" },
        cookie
      )
    ),
    safeAsyncArray(getCategoriesServer()),
  ]);

  if (!category) {
    notFound();
  }

  const parentCategory = category.parent
    ? allCategories.find((c) => c.id === category.parent)
    : null;

  const categorySchema = generateCategorySchema(category);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Главная", url: "/" },
    ...(parentCategory
      ? [
          {
            name: parentCategory.name,
            url: `/categories/${parentCategory.id}`,
          },
        ]
      : []),
    { name: category.name, url: `/categories/${category.id}` },
  ]);

  const breadcrumbs = [
    ...(category.type
      ? [
          {
            label: CATEGORY_TYPE_LABELS[category.type],
            href: CATEGORY_TYPE_HREFS[category.type],
          },
        ]
      : []),
    ...(parentCategory
      ? [
          {
            label: parentCategory.name,
            href: `/categories/${parentCategory.id}`,
          },
        ]
      : []),
    { label: category.name },
  ];

  return (
    <DetailPageLayout
      schemas={[
        { type: "category", data: categorySchema },
        { type: "breadcrumb", data: breadcrumbSchema },
      ]}
    >
      <ProgramList
        programs={programs}
        categoryId={category.id}
        title={category.name}
        description={category.description || undefined}
        breadcrumbs={breadcrumbs}
      />
    </DetailPageLayout>
  );
}
