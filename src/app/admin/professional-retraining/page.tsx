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

const STICKY_BLOCK_OFFSET = "6.5rem";

export default function ProfessionalRetrainingPage() {
  const [tab, setTab] = useState<"categories" | "programs">("categories");

  const sectionTitle =
    tab === "categories"
      ? "Профессиональная переподготовка"
      : "Программы • Проф. переподготовка";

  return (
    <>
      <Tabs
        value={tab}
        onValueChange={(v) => setTab(v as "categories" | "programs")}
        className="space-y-4 [--admin-tabs-offset:var(--sticky-offset)]"
        style={{ "--sticky-offset": STICKY_BLOCK_OFFSET } as React.CSSProperties}
      >
        <div className={cn("sticky top-(--admin-header-offset) z-40 w-full space-y-3 rounded-2xl p-4 shadow-lg shadow-black/5", GLASS_CLASSES.panelWithRing)}>
          <div className="rounded-xl border border-border/40 bg-background/60 p-1 shadow-inner backdrop-blur-sm">
            <TabsList className="w-full border-0 bg-transparent p-0 shadow-none sm:w-auto">
              <TabsTrigger value="categories" className="flex-1 font-semibold">
                Категории
              </TabsTrigger>
              <TabsTrigger value="programs" className="flex-1 font-semibold">
                Программы
              </TabsTrigger>
            </TabsList>
          </div>
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
            type={CategoryType.ProfessionalRetraining}
            title="Профессиональная переподготовка"
            description="Управление категориями профессиональной переподготовки"
            suppressHeaderTitle
          />
        </TabsContent>

        <TabsContent value="programs" className="mt-0">
          <ProgramsByTypeView
            type={CategoryType.ProfessionalRetraining}
            title="Программы • Проф. переподготовка"
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
