"use client";

import { memo, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { FileText, ExternalLink, X } from "lucide-react";
import type { EducationDocumentEntity } from "@/shared/api/generated/graphql";
import { PROGRAM_DETAIL_CLASSES } from "../constants/program-detail-constants";
import { cn } from "@/lib/utils";

interface ProgramDetailEducationDocumentProps {
  document: EducationDocumentEntity;
}

export const ProgramDetailEducationDocument = memo(
  function ProgramDetailEducationDocument({
    document: educationDoc,
  }: ProgramDetailEducationDocumentProps) {
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const hasImage = Boolean(educationDoc.image?.trim());

    const openPreview = useCallback(() => {
      if (hasImage) setIsPreviewOpen(true);
    }, [hasImage]);

    const closePreview = useCallback(
      () => setIsPreviewOpen(false),
      []
    );

    useEffect(() => {
      if (!isPreviewOpen) return;
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") closePreview();
      };
      window.addEventListener("keydown", onKeyDown);
      document.body.style.overflow = "hidden";
      return () => {
        window.removeEventListener("keydown", onKeyDown);
        document.body.style.overflow = "";
      };
    }, [isPreviewOpen, closePreview]);

    return (
      <>
        <section
          id="education-document"
          className={cn(
            PROGRAM_DETAIL_CLASSES.section,
            "relative scroll-mt-28 overflow-hidden"
          )}
        >
          <div className="pointer-events-none absolute inset-0 opacity-50">
            <div className="absolute -top-20 -right-20 h-64 w-80 rounded-full bg-primary/5 blur-3xl" />
          </div>

          <div className="relative z-10">
            <div className="mb-5 flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FileText className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className={PROGRAM_DETAIL_CLASSES.sectionTitle}>
                  Документ об образовании
                </h2>
                <p className="text-sm text-muted-foreground">
                  Выдаётся по окончании программы и подтверждает
                  освоение курса.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-stretch">
              {hasImage && (
                <button
                  type="button"
                  onClick={openPreview}
                  className="group relative aspect-4/3 w-full overflow-hidden rounded-xl border border-border/60 bg-muted/20 sm:w-56 sm:shrink-0"
                  aria-label="Открыть превью документа"
                >
                  <Image
                    src={educationDoc.image!}
                    alt={educationDoc.name}
                    fill
                    sizes="224px"
                    unoptimized
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/10">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-muted-foreground opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                      <ExternalLink className="h-5 w-5" />
                    </span>
                  </div>
                  <div className="absolute right-0 bottom-0 left-0 bg-linear-to-t from-black/40 to-transparent px-3 py-2">
                    <span className="text-xs font-medium text-white drop-shadow-sm">
                      Нажмите для просмотра
                    </span>
                  </div>
                </button>
              )}

              <div
                className={cn(
                  "flex flex-1 flex-col justify-center rounded-xl border border-border/60 bg-muted/10 p-4 sm:p-5",
                  hasImage && "sm:min-w-0"
                )}
              >
                <div className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                  Выдаётся документ
                </div>
                <h3 className="mt-2 text-lg font-semibold text-foreground sm:text-xl">
                  {educationDoc.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  По завершении программы вы получите документ
                  установленного образца. Точный вид и формулировки
                  уточняйте при записи.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Fullscreen image preview */}
        {hasImage && isPreviewOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label="Превью документа"
            onClick={closePreview}
          >
            <button
              type="button"
              onClick={closePreview}
              className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              aria-label="Закрыть"
            >
              <X className="h-5 w-5" />
            </button>
            <div
              className="relative h-[90vh] w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={educationDoc.image!}
                alt={educationDoc.name}
                fill
                sizes="(max-width: 896px) 100vw, 896px"
                unoptimized
                className="rounded-lg object-contain shadow-2xl"
              />
            </div>
          </div>
        )}
      </>
    );
  }
);
