import Link from "next/link";
import { Surface } from "@/shared/ui/surface/surface";
import type { CategoryEntity } from "@/shared/api/generated/graphql";
import { CategoryType } from "@/shared/api/generated/graphql";
import { CATEGORY_TYPE_LABELS } from "@/shared/constants/categories";
import {
  ArrowRight,
  GraduationCap,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";

function sumProgramsCount(categories: CategoryEntity[]): number {
  return categories.reduce(
    (acc, c) => acc + (c.programsCount ?? 0),
    0
  );
}

function countByType(categories: CategoryEntity[]) {
  const map = new Map<
    CategoryType,
    { categories: number; programs: number }
  >();
  for (const c of categories) {
    const t = c.type;
    if (!t) continue;
    const prev = map.get(t) ?? { categories: 0, programs: 0 };
    map.set(t, {
      categories: prev.categories + 1,
      programs: prev.programs + (c.programsCount ?? 0),
    });
  }
  return map;
}

export function CategoryTypeTiles({
  categories,
}: {
  categories: CategoryEntity[];
}) {
  const counts = countByType(categories);
  const totalPrograms = sumProgramsCount(categories);

  const tiles = [
    {
      href: "/qualification-upgrade",
      title: CATEGORY_TYPE_LABELS.QUALIFICATION_UPGRADE,
      description:
        "Короткие программы для актуализации знаний и подтверждения компетенций.",
      icon: <GraduationCap className="h-5 w-5 text-primary" />,
      stats: counts.get(CategoryType.QualificationUpgrade),
    },
    {
      href: "/professional-retraining",
      title: CATEGORY_TYPE_LABELS.PROFESSIONAL_RETRAINING,
      description:
        "Освойте новую специальность и получите документ о квалификации.",
      icon: <RefreshCw className="h-5 w-5 text-primary" />,
      stats: counts.get(CategoryType.ProfessionalRetraining),
    },
    {
      href: "/professional-education",
      title: CATEGORY_TYPE_LABELS.PROFESSIONAL_EDUCATION,
      description:
        "Практико-ориентированное обучение с фокусом на реальные задачи.",
      icon: <ShieldCheck className="h-5 w-5 text-primary" />,
      stats: counts.get(CategoryType.ProfessionalEducation),
    },
  ] as const;

  return (
    <section className="relative py-12 sm:py-14 lg:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div className="space-y-2">
            <div className="inline-flex items-center rounded-full border border-border/60 bg-muted/20 px-3 py-1 text-xs font-semibold text-foreground/90 backdrop-blur">
              {totalPrograms} программ в каталоге
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Направления обучения
            </h2>
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Выберите направление — мы покажем категории и программы,
              которые подходят под вашу задачу.
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tiles.map((t) => {
            const stats = t.stats ?? { categories: 0, programs: 0 };

            return (
              <Link
                key={t.href}
                href={t.href}
                className="group block"
              >
                <Surface
                  variant="floating"
                  className="relative overflow-hidden p-5 transition-[border,transform,box-shadow] hover:-translate-y-0.5 hover:border-border/80"
                >
                  {/* shader-lite */}
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="absolute -top-24 -left-24 h-[260px] w-[360px] rounded-full bg-primary/10 blur-3xl" />
                    <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/10 to-background/60" />
                  </div>

                  <div className="relative z-10 space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <div className="rounded-xl border border-border/60 bg-background/60 p-2 shadow-sm backdrop-blur">
                          {t.icon}
                        </div>
                        <div className="text-sm font-semibold text-foreground">
                          {t.title}
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
                    </div>

                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {t.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <span className="inline-flex items-center rounded-full border border-border/60 bg-muted/20 px-2 py-1 text-[11px] font-medium text-foreground/90">
                        {stats.categories} катег.
                      </span>
                      <span className="inline-flex items-center rounded-full border border-border/60 bg-muted/20 px-2 py-1 text-[11px] font-medium text-foreground/90">
                        {stats.programs} программ
                      </span>
                    </div>
                  </div>
                </Surface>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
