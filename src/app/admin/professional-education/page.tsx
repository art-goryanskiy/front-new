"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { CategoryType } from "@/shared/api/generated/graphql";
import { ProgramsByTypeView } from "@/widgets/admin/programs-by-type/programs-by-type-view";
import { Suspense, lazy } from "react";
import { CategoryPage } from "../category-page/category-page";

const ProgramModal = lazy(() =>
  import("@/widgets/program/program-modal/program-modal").then(
    (mod) => ({
      default: mod.ProgramModal,
    })
  )
);

const DeleteProgramModal = lazy(() =>
  import("@/widgets/program/delete-program-modal/delete-program-modal").then(
    (mod) => ({ default: mod.DeleteProgramModal })
  )
);

export default function ProfessionalEducationPage() {
  return (
    <>
      <Tabs defaultValue="categories" className="space-y-4">
        <TabsList>
          <TabsTrigger value="categories">Категории</TabsTrigger>
          <TabsTrigger value="programs">Программы</TabsTrigger>
        </TabsList>

        <TabsContent value="categories">
          <CategoryPage
            type={CategoryType.ProfessionalEducation}
            title="Профессиональное обучение"
            description="Управление категориями профессионального обучения"
          />
        </TabsContent>

        <TabsContent value="programs">
          <ProgramsByTypeView
            type={CategoryType.ProfessionalEducation}
            title="Программы • Проф. обучение"
          />
        </TabsContent>
      </Tabs>

      <Suspense fallback={null}>
        <ProgramModal />
        <DeleteProgramModal />
      </Suspense>
    </>
  );
}
