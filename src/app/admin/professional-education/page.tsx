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
      <Tabs
        defaultValue="categories"
        className="space-y-4 [--admin-tabs-offset:3rem]"
      >
        <div className="sticky top-(--admin-header-offset) z-40 w-full sm:w-fit">
          <div className="rounded-2xl border border-border/60 bg-background/70 p-1 shadow-sm backdrop-blur-xl">
            <TabsList className="w-full border-0 bg-transparent p-0 shadow-none sm:w-auto">
              <TabsTrigger value="categories" className="flex-1">
                Категории
              </TabsTrigger>
              <TabsTrigger value="programs" className="flex-1">
                Программы
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

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
