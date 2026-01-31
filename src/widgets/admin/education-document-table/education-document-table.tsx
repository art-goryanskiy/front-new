"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEducationDocuments } from "@/entities/education-document/api/use-education-documents";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { EducationDocumentEntity } from "@/shared/api/generated/graphql";
import { useEducationDocumentModalState } from "@/shared/store/modal-store";
import { EmptyState } from "@/shared/ui/empty-state/empty-state";
import { ErrorState } from "@/shared/ui/error-state/error-state";
import { Surface } from "@/shared/ui/surface/surface";
import { TableActions } from "@/shared/ui/table-actions/table-actions";
import { TableSkeleton } from "@/shared/ui/table-skeleton/table-skeleton";
import { memo, useCallback, useEffect, useMemo } from "react";
import {
  EMPTY_STATE_ICON,
  TABLE_CLASSES,
} from "./constants/education-document-table-constants";

function formatDate(value: string | null | undefined): string {
  if (!value) return "—";
  try {
    const d = new Date(value);
    return d.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch {
    return "—";
  }
}

export const EducationDocumentTable = memo(function EducationDocumentTable({
  searchQuery = "",
  onCountsChange,
}: {
  searchQuery?: string;
  onCountsChange?: (c: { shown: number; total: number }) => void;
}) {
  const { educationDocuments, loading, error } = useEducationDocuments();
  const { openEditEducationDocumentModal, openDeleteEducationDocumentModal } =
    useEducationDocumentModalState();

  const normalizedQuery = useMemo(
    () => searchQuery.trim().toLowerCase(),
    [searchQuery]
  );

  const filtered = useMemo(() => {
    if (!normalizedQuery) return educationDocuments;
    return educationDocuments.filter((d) =>
      d.name?.toLowerCase().includes(normalizedQuery)
    );
  }, [educationDocuments, normalizedQuery]);

  useEffect(() => {
    onCountsChange?.({ shown: filtered.length, total: educationDocuments.length });
  }, [onCountsChange, filtered.length, educationDocuments.length]);

  const handleRowClick = useCallback(
    (doc: EducationDocumentEntity, e: React.MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("button") ||
        target.closest('[role="button"]') ||
        target.closest("svg")
      ) {
        return;
      }
      openEditEducationDocumentModal(doc);
    },
    [openEditEducationDocumentModal]
  );

  const handleEditClick = useCallback(
    (doc: EducationDocumentEntity) => openEditEducationDocumentModal(doc),
    [openEditEducationDocumentModal]
  );

  const handleDeleteClick = useCallback(
    (doc: EducationDocumentEntity) => openDeleteEducationDocumentModal(doc),
    [openDeleteEducationDocumentModal]
  );

  const handleKeyDown = useCallback(
    (doc: EducationDocumentEntity, e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openEditEducationDocumentModal(doc);
      }
    },
    [openEditEducationDocumentModal]
  );

  if (loading) return <TableSkeleton rows={5} columns={4} />;
  if (error) return <ErrorState message={error.message} />;

  if (educationDocuments.length === 0) {
    return (
      <EmptyState
        title="Документы не найдены"
        description="Создайте первый документ об образовании"
        icon={EMPTY_STATE_ICON}
      />
    );
  }

  if (filtered.length === 0) {
    return (
      <EmptyState
        title="Ничего не найдено"
        description={`По запросу "${searchQuery}" нет результатов`}
        icon={EMPTY_STATE_ICON}
      />
    );
  }

  return (
    <>
      <div className={cn(TABLE_CLASSES.cardsWrap, "md:hidden")}>
        {filtered.map((doc) => (
          <Surface
            key={doc.id}
            className={cn(
              TABLE_CLASSES.card,
              "focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none"
            )}
            role="button"
            tabIndex={0}
            onClick={(e) => handleRowClick(doc, e)}
            onKeyDown={(e) => handleKeyDown(doc, e)}
            aria-label={`Редактировать ${doc.name}`}
          >
            <div className={TABLE_CLASSES.cardHeader}>
              <div className="flex items-center gap-3 min-w-0">
                <Avatar className="h-12 w-12 shrink-0 rounded-lg">
                  <AvatarImage
                    src={doc.image ?? undefined}
                    alt={doc.name ?? ""}
                    className="object-cover"
                  />
                  <AvatarFallback className="rounded-lg text-xs">
                    DOC
                  </AvatarFallback>
                </Avatar>
                <div className={TABLE_CLASSES.cardMain}>
                  <div className={TABLE_CLASSES.cardTitle} title={doc.name ?? ""}>
                    {doc.name ?? "—"}
                  </div>
                  <div className={TABLE_CLASSES.cardMeta}>
                    {formatDate(doc.createdAt)}
                  </div>
                </div>
              </div>
              <div className="shrink-0" onClick={(e) => e.stopPropagation()}>
                <TableActions
                  onEdit={() => handleEditClick(doc)}
                  onDelete={() => handleDeleteClick(doc)}
                  editLabel="Редактировать документ"
                  deleteLabel="Удалить документ"
                />
              </div>
            </div>
          </Surface>
        ))}
      </div>

      <div className="hidden md:block">
        <Surface variant="floating" className={TABLE_CLASSES.wrapper}>
          <Table aria-label="Таблица документов об образовании">
          <TableHeader className={TABLE_CLASSES.thead}>
            <TableRow>
              <TableHead className={cn(TABLE_CLASSES.th, "w-14")}></TableHead>
              <TableHead className={TABLE_CLASSES.th}>Название</TableHead>
              <TableHead className={TABLE_CLASSES.th}>Создан</TableHead>
              <TableHead className={cn(TABLE_CLASSES.th, "w-24")}></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((doc) => (
              <TableRow
                key={doc.id}
                className={cn(TABLE_CLASSES.tr, "cursor-pointer")}
                onClick={(e) => handleRowClick(doc, e)}
                onKeyDown={(e) => handleKeyDown(doc, e)}
                tabIndex={0}
                role="button"
                aria-label={`Редактировать ${doc.name}`}
              >
                <TableCell className={TABLE_CLASSES.td}>
                  <Avatar className="h-10 w-10 rounded-lg">
                    <AvatarImage
                      src={doc.image ?? undefined}
                      alt={doc.name ?? ""}
                      className="object-cover"
                    />
                    <AvatarFallback className="rounded-lg text-xs">
                      DOC
                    </AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className={TABLE_CLASSES.td}>
                  <span className="font-medium">{doc.name ?? "—"}</span>
                </TableCell>
                <TableCell className={TABLE_CLASSES.td}>
                  {formatDate(doc.createdAt)}
                </TableCell>
                <TableCell
                  className={TABLE_CLASSES.td}
                  onClick={(e) => e.stopPropagation()}
                >
                  <TableActions
                    onEdit={() => handleEditClick(doc)}
                    onDelete={() => handleDeleteClick(doc)}
                    editLabel="Редактировать"
                    deleteLabel="Удалить"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableCaption className={TABLE_CLASSES.caption}>
            {filtered.length} из {educationDocuments.length} документов
          </TableCaption>
        </Table>
        </Surface>
      </div>
    </>
  );
});
