"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { CategoryType } from "@/shared/api/generated/graphql";
import { GLASS_CLASSES } from "@/shared/ui/glass/glass-constants";
import { AddProgramHeaderButton } from "@/widgets/admin/programs-by-type/add-program-header-button";
import { ProgramsByTypeView } from "@/widgets/admin/programs-by-type/programs-by-type-view";
import { Suspense, lazy, useState } from "react";
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

/** Высота липкого блока (табы + заголовок) для расчёта top у DataToolbar */
const STICKY_BLOCK_OFFSET = "6.5rem";

export default function ProfessionalEducationPage() {
  const [tab, setTab] = useState<"categories" | "programs">("categories");

  const sectionTitle =
    tab === "categories"
      ? "Профессиональное обучение"
      : "Программы • Проф. обучение";

  return (
    <>
      <Tabs
        value={tab}
        onValueChange={(v) => setTab(v as "categories" | "programs")}
        className="space-y-4 [--admin-tabs-offset:var(--sticky-offset)]"
        style={{ "--sticky-offset": STICKY_BLOCK_OFFSET } as React.CSSProperties}
      >
        {/* Липкий блок: табы + заголовок — заголовок не уезжает под табы */}
        <div className={cn("sticky top-(--admin-header-offset) z-40 w-full space-y-3 rounded-2xl p-4 shadow-lg shadow-black/5", GLASS_CLASSES.panelWithRing)}>
          <TabsList className="inline-flex w-full border-0 bg-background/50 p-1 rounded-xl shadow-none sm:w-auto">
            <TabsTrigger
              value="categories"
              className="flex-1 rounded-lg px-4 font-semibold transition-colors data-[state=active]:bg-primary/12 data-[state=active]:text-foreground data-[state=active]:shadow-sm"
            >
              Категории
            </TabsTrigger>
            <TabsTrigger
              value="programs"
              className="flex-1 rounded-lg px-4 font-semibold transition-colors data-[state=active]:bg-primary/12 data-[state=active]:text-foreground data-[state=active]:shadow-sm"
            >
              Программы
            </TabsTrigger>
          </TabsList>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/40 pt-3">
            <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              {sectionTitle}
            </h2>
            {tab === "programs" ? (
              <AddProgramHeaderButton />
            ) : null}
          </div>
        </div>

        <TabsContent value="categories" className="mt-0">
          <CategoryPage
            type={CategoryType.ProfessionalEducation}
            title="Профессиональное обучение"
            description="Управление категориями профессионального обучения"
            suppressHeaderTitle
          />
        </TabsContent>

        <TabsContent value="programs" className="mt-0">
          <ProgramsByTypeView
            type={CategoryType.ProfessionalEducation}
            title="Программы • Проф. обучение"
            suppressTitle
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
