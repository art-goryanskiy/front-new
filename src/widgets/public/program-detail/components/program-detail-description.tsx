import Link from "next/link";
import { memo, useMemo } from "react";
import {
  Clock,
  Coins,
  FileText,
  GraduationCap,
  LayoutGrid,
  Lock,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";
import { usePriceVisibility } from "@/shared/store/auth-store";
import { formatPrice } from "@/shared/lib/helpers/format-helpers";
import { Skeleton } from "@/components/ui/skeleton";
import { MarkdownContent } from "@/shared/ui/markdown/markdown-content";
import { PROGRAM_DETAIL_CLASSES } from "../constants/program-detail-constants";

type DescriptionHighlights = Partial<{
  format: string;
  document: string;
  result: string;
  goal: string;
  requirements: string;
}>;

function parseDescription(rawText: string): {
  markdown: string;
  highlights: DescriptionHighlights;
} {
  const highlights: DescriptionHighlights = {};
  const kept: string[] = [];

  for (const raw of rawText.replace(/\r\n/g, "\n").split("\n")) {
    const trimmed = raw.trim();
    const m = trimmed.match(
      /^(Формат|Документ|Результат|Цель|Требования)\s*[:—-]\s*(.+)$/i
    );

    if (m) {
      const key = m[1].toLowerCase();
      const value = m[2].trim();
      if (value) {
        if (key === "формат") highlights.format = value;
        if (key === "документ") highlights.document = value;
        if (key === "результат") highlights.result = value;
        if (key === "цель") highlights.goal = value;
        if (key === "требования") highlights.requirements = value;
      }
      continue;
    }

    kept.push(raw);
  }

  return { markdown: kept.join("\n").trim(), highlights };
}

interface ProgramDetailDescriptionProps {
  description: string;
  hoursDisplay?: string | null;
  minPrice?: number | null;
  awardedQualification?: string | null;
}

export const ProgramDetailDescription = memo(
  function ProgramDetailDescription({
    description,
    hoursDisplay,
    minPrice,
    awardedQualification,
  }: ProgramDetailDescriptionProps) {
    const { canSeePrice, isAuthLoading } = usePriceVisibility();

    const parsed = useMemo(
      () => parseDescription(description),
      [description]
    );
    const markdown = parsed.markdown;
    const highlights = parsed.highlights;

    const priceText = useMemo(() => {
      if (!canSeePrice) return null;
      if (
        minPrice === null ||
        minPrice === undefined ||
        minPrice <= 0
      ) {
        return "Цена по запросу";
      }
      return `от ${formatPrice(minPrice)} ₽`;
    }, [canSeePrice, minPrice]);

    const extraCards = useMemo(() => {
      const cards: Array<{
        key: string;
        label: string;
        value: string;
        icon: React.ReactNode;
      }> = [];

      if (highlights.format) {
        cards.push({
          key: "format",
          label: "Формат",
          value: highlights.format,
          icon: <LayoutGrid className="h-4 w-4" />,
        });
      }
      if (highlights.result) {
        cards.push({
          key: "result",
          label: "Результат",
          value: highlights.result,
          icon: <Sparkles className="h-4 w-4" />,
        });
      }
      if (highlights.document) {
        cards.push({
          key: "document",
          label: "Документ",
          value: highlights.document,
          icon: <FileText className="h-4 w-4" />,
        });
      }
      if (highlights.goal) {
        cards.push({
          key: "goal",
          label: "Цель",
          value: highlights.goal,
          icon: <Target className="h-4 w-4" />,
        });
      }
      if (highlights.requirements) {
        cards.push({
          key: "requirements",
          label: "Требования",
          value: highlights.requirements,
          icon: <ShieldCheck className="h-4 w-4" />,
        });
      }

      return cards;
    }, [
      highlights.document,
      highlights.format,
      highlights.goal,
      highlights.requirements,
      highlights.result,
    ]);

    return (
      <section
        id="description"
        className={`${PROGRAM_DETAIL_CLASSES.section} scroll-mt-28`}
      >
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-1">
            <h2 className={PROGRAM_DETAIL_CLASSES.sectionTitle}>
              Описание
            </h2>
            <p className="text-sm text-muted-foreground">
              Коротко о программе, формате и результатах обучения.
            </p>
          </div>
          <Link
            href="#pricing"
            className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            Перейти к стоимости
          </Link>
        </div>

        <div className="mt-5 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <MarkdownContent
              content={markdown || description}
              leadParagraph
            />
          </div>

          <aside className="space-y-3 lg:col-span-1">
            <div className="rounded-xl border border-border/60 bg-muted/15 p-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                <Clock className="h-4 w-4" />
                Длительность
              </div>
              <div className="mt-2 text-sm font-semibold text-foreground">
                {hoursDisplay
                  ? `${hoursDisplay} часов`
                  : "По программе"}
              </div>
            </div>

            <div className="rounded-xl border border-border/60 bg-muted/15 p-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                {isAuthLoading ? null : canSeePrice ? (
                  <Coins className="h-4 w-4" />
                ) : (
                  <Lock className="h-4 w-4" />
                )}
                Стоимость
              </div>
              <div className="mt-2 text-sm font-semibold text-foreground">
                {isAuthLoading ? (
                  <Skeleton className="h-5 w-24" />
                ) : canSeePrice ? (
                  priceText
                ) : (
                  <span className="text-muted-foreground">
                    Войдите, чтобы увидеть
                  </span>
                )}
              </div>
              {!isAuthLoading && !canSeePrice && (
                <Link
                  href="/login"
                  className="mt-2 inline-flex text-sm font-semibold text-primary underline-offset-4 hover:underline"
                >
                  Войти
                </Link>
              )}
            </div>

            {extraCards.map((c) => (
              <div
                key={c.key}
                className="rounded-xl border border-border/60 bg-muted/15 p-4"
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                  {c.icon}
                  {c.label}
                </div>
                <div className="mt-2 text-sm leading-relaxed text-foreground">
                  {c.value}
                </div>
              </div>
            ))}

            {awardedQualification?.trim() && (
              <div className="rounded-xl border border-border/60 bg-muted/15 p-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                  <GraduationCap className="h-4 w-4" />
                  Квалификация
                </div>
                <div className="mt-2 text-sm leading-snug font-semibold text-foreground">
                  {awardedQualification.trim()}
                </div>
              </div>
            )}
          </aside>
        </div>
      </section>
    );
  }
);
