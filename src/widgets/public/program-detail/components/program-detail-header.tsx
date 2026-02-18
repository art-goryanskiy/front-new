import Link from "next/link";
import { memo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, Clock, Copy, Folder } from "lucide-react";
import type {
  CategoryEntity,
  ProgramEntity,
} from "@/shared/api/generated/graphql";
import { useToastState } from "@/shared/store/toast-store";
import { RatingStars } from "@/shared/ui/rating-stars/rating-stars";
import { Surface } from "@/shared/ui/surface/surface";
import { PROGRAM_DETAIL_CLASSES } from "../constants/program-detail-constants";

interface ProgramDetailHeaderProps {
  program: ProgramEntity;
  totalHours: number | null;
  category: CategoryEntity | null;
}

export const ProgramDetailHeader = memo(function ProgramDetailHeader({
  program,
  totalHours,
  category,
}: ProgramDetailHeaderProps) {
  const { showToast } = useToastState();

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast("success", "Ссылка скопирована");
    } catch {
      showToast("error", "Не удалось скопировать ссылку");
    }
  }, [showToast]);

  return (
    <div className={PROGRAM_DETAIL_CLASSES.header}>
      <nav className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-muted-foreground">
        <Link
          href="/"
          className="transition-colors hover:text-foreground"
        >
          Главная
        </Link>
        {category && (
          <>
            <ChevronRight className="h-3.5 w-3.5 opacity-70" />
            <Link
              href={`/categories/${category.id}`}
              className="inline-flex items-center gap-1 transition-colors hover:text-foreground"
            >
              <Folder className="h-3.5 w-3.5" />
              {category.name}
            </Link>
          </>
        )}
        <ChevronRight className="h-3.5 w-3.5 opacity-70" />
        <span className="text-foreground/80">Программа</span>
      </nav>

      <Surface
        variant="floating"
        className="relative overflow-hidden p-6 sm:p-7"
      >
        <div className="pointer-events-none absolute inset-0 opacity-70">
          <div className="absolute -top-28 -right-28 h-[360px] w-[520px] rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-32 h-[360px] w-[520px] rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/10 to-background/60" />
        </div>

        <div className="relative z-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <h1 className={PROGRAM_DETAIL_CLASSES.title}>
                {program.title}
              </h1>

              {program.shortTitle?.trim() &&
                program.shortTitle.trim() !== program.title && (
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {program.shortTitle.trim()}
                  </p>
                )}
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleCopyLink}
                className="rounded-xl border border-border/60 bg-background/60 backdrop-blur hover:bg-muted/20"
              >
                <Copy className="mr-2 h-4 w-4" />
                Ссылка
              </Button>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            {category && (
              <Link
                href={`/categories/${category.id}`}
                className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-muted/20 px-3 py-1 text-xs font-semibold text-muted-foreground backdrop-blur transition-colors hover:text-foreground"
              >
                <Folder className="h-3.5 w-3.5" />
                {category.name}
              </Link>
            )}

            {totalHours !== null && (
              <span className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-muted/20 px-3 py-1 text-xs font-semibold text-muted-foreground backdrop-blur">
                <Clock className="h-3.5 w-3.5" />
                {totalHours} ч
              </span>
            )}

            {program.viewsRating != null && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-muted/20 px-3 py-1 text-xs font-semibold text-muted-foreground backdrop-blur">
                <RatingStars rating={program.viewsRating} size="sm" />
                <span>{program.viewsRating.toFixed(1)} / 5</span>
              </span>
            )}
          </div>
        </div>
      </Surface>
    </div>
  );
});
