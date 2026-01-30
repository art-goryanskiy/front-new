"use client";

import Link from "next/link";
import { memo } from "react";
import type {
  CategoryEntity,
  ProgramEntity,
} from "@/shared/api/generated/graphql";
import { ProgramCard } from "@/widgets/public/program-card/program-card";
import { PROGRAM_DETAIL_CLASSES } from "../constants/program-detail-constants";

interface ProgramDetailRelatedProgramsProps {
  programs: ProgramEntity[];
  category: CategoryEntity | null;
}

export const ProgramDetailRelatedPrograms = memo(
  function ProgramDetailRelatedPrograms({
    programs,
    category,
  }: ProgramDetailRelatedProgramsProps) {
    if (!programs || programs.length === 0) return null;

    return (
      <section
        id="related"
        className={`${PROGRAM_DETAIL_CLASSES.section} scroll-mt-28`}
      >
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-1">
            <h2 className={PROGRAM_DETAIL_CLASSES.sectionTitle}>
              Похожие программы
            </h2>
            <p className="text-sm text-muted-foreground">
              Ещё несколько программ из этого направления.
            </p>
          </div>

          {category && (
            <Link
              href={`/categories/${category.id}`}
              className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
            >
              Все в категории
            </Link>
          )}
        </div>

        {/* Mobile: horizontal, snap carousel. Desktop: grid */}
        <div className="relative mt-5">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-linear-to-r from-background/70 to-transparent sm:hidden" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-linear-to-l from-background/70 to-transparent sm:hidden" />

          <div className="sm:hidden">
            <div className="-mx-2 overflow-x-auto px-2">
              <div className="flex snap-x snap-mandatory gap-3">
                {programs.map((p) => (
                  <div
                    key={p.id}
                    className="w-[min(84%,22rem)] shrink-0 snap-start"
                  >
                    <ProgramCard program={p} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="hidden gap-3 sm:grid sm:grid-cols-2">
            {programs.map((p) => (
              <ProgramCard key={p.id} program={p} />
            ))}
          </div>
        </div>
      </section>
    );
  }
);
