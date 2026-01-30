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
import { cookies } from "next/headers";
import { safeAsyncArray } from "@/shared/lib/helpers/error-helpers";
import { getProgramsServer } from "@/shared/api/server/programs";

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
  const cookieStore = await cookies();
  const cookie = cookieStore.toString();

  const program = await safeAsyncNull(getProgramServer(id, cookie));

  if (!program) {
    notFound();
  }

  const [category, programSchema, relatedProgramsRaw] =
    await Promise.all([
      program.category
        ? safeAsyncNull(getCategoryServer(program.category))
        : Promise.resolve<CategoryEntity | null>(null),
      Promise.resolve(generateProgramSchema(program)),
      program.category
        ? safeAsyncArray(
            getProgramsServer(
              {
                category: program.category,
                sortBy: "views",
                sortOrder: "desc",
                limit: 8,
              },
              cookie
            )
          )
        : Promise.resolve([]),
    ]);

  const relatedPrograms = relatedProgramsRaw
    .filter((p) => p.id !== program.id)
    .slice(0, 6);

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
      <ProgramDetail
        program={program}
        category={category}
        relatedPrograms={relatedPrograms}
      />
    </DetailPageLayout>
  );
}
