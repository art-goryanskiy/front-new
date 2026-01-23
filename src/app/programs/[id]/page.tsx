import type { Metadata } from "next";
import { DetailPageLayout } from "@/shared/ui/layouts/detail-page-layout";
import { ProgramDetail } from "@/widgets/public/program-detail/program-detail";
import { getProgramServer } from "@/shared/api/server/programs";
import { notFound } from "next/navigation";
import { generateProgramMetadata } from "@/shared/lib/seo/metadata";
import {
  generateProgramSchema,
  generateBreadcrumbSchema,
} from "@/shared/lib/seo/structured-data";
import { getCategoryServer } from "@/shared/api/server/categories";
import type { CategoryEntity } from "@/shared/api/generated/graphql";
import { safeAsyncNull } from "@/shared/lib/helpers/error-helpers";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const program = await safeAsyncNull(getProgramServer(id));

  if (!program) {
    return {
      title: "Программа не найдена",
    };
  }

  return generateProgramMetadata(program);
}

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const program = await safeAsyncNull(getProgramServer(id));

  if (!program) {
    notFound();
  }

  const [category, programSchema] = await Promise.all([
    program.category
      ? safeAsyncNull(getCategoryServer(program.category))
      : Promise.resolve<CategoryEntity | null>(null),
    Promise.resolve(generateProgramSchema(program)),
  ]);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Главная", url: "/" },
    ...(category
      ? [{ name: category.name, url: `/categories/${category.id}` }]
      : []),
    { name: program.title, url: `/programs/${program.id}` },
  ]);

  return (
    <DetailPageLayout
      schemas={[
        { type: "program", data: programSchema },
        { type: "breadcrumb", data: breadcrumbSchema },
      ]}
    >
      <ProgramDetail program={program} />
    </DetailPageLayout>
  );
}
