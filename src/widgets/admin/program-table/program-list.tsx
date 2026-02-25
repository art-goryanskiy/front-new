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
import { cn } from "@/lib/utils";
import type {
  CategoryType,
  ProgramEntity,
} from "@/shared/api/generated/graphql";
import { pluralPrograms } from "@/shared/lib/helpers/plural";
import { useProgramModalState } from "@/shared/store/modal-store";
import { Surface } from "@/shared/ui/surface/surface";
import { TableActions } from "@/shared/ui/table-actions/table-actions";
import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { TABLE_CLASSES } from "./constants/program-table-constants";
import { useProgramTableConfig } from "./hooks/use-program-table-config";

import { ProgramTablePricingContent } from "./cells/program-table-pricing-content";
import { ProgramTableQualificationContent } from "./cells/program-table-qualification-content";
import { ProgramTableRankContent } from "./cells/program-table-rank-content";
import { ProgramTableSubprogramsContent } from "./cells/program-table-subprograms-content";
import { ProgramTableTitleContent } from "./cells/program-table-title-content";
import { ProgramTableViewsContent } from "./cells/program-table-views-content";
import { VirtualizedProgramTable } from "./virtualized-program-table";
import { ADMIN_VIRTUALIZE_THRESHOLD } from "@/shared/constants/admin";

const VIRTUALIZE_THRESHOLD = ADMIN_VIRTUALIZE_THRESHOLD;

export const ProgramList = memo(function ProgramList({
  programs,
  categoryType,
  caption,
  selectedProgramIds,
  onSelectProgram,
  onSelectAllPrograms,
  onOpenBulkUpdate,
  onClearSelection,
}: {
  programs: ProgramEntity[];
  categoryType?: CategoryType | null;
  caption?: string;
  selectedProgramIds?: Set<string>;
  onSelectProgram?: (id: string, selected: boolean) => void;
  onSelectAllPrograms?: (ids: string[], selected: boolean) => void;
  onOpenBulkUpdate?: () => void;
  onClearSelection?: () => void;
}) {
  const { openEditProgramModal, openDeleteProgramModal } =
    useProgramModalState();

  const {
    showAwardedQualification,
    showAwardedRank,
    showSubPrograms,
  } = useProgramTableConfig(categoryType);
  const bulkEnabled = !!selectedProgramIds && !!onSelectProgram;
  const allSelected =
    bulkEnabled &&
    programs.length > 0 &&
    programs.every((program) => selectedProgramIds.has(program.id));
  const someSelected =
    bulkEnabled &&
    programs.some((program) => selectedProgramIds.has(program.id)) &&
    !allSelected;
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    programId: string;
  } | null>(null);
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const menuRef = useRef<HTMLDivElement | null>(null);
  const visibleProgramIds = useMemo(
    () => programs.map((program) => program.id),
    [programs]
  );
  const selectedCount = useMemo(
    () =>
      bulkEnabled
        ? programs.filter((program) =>
            selectedProgramIds.has(program.id)
          ).length
        : 0,
    [bulkEnabled, programs, selectedProgramIds]
  );

  const handleRowClick = useCallback(
    (program: ProgramEntity, e: React.MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("button") ||
        target.closest("input") ||
        target.closest("label") ||
        target.closest('[role="button"]') ||
        target.closest("svg")
      ) {
        return;
      }
      openEditProgramModal(program, categoryType);
    },
    [openEditProgramModal, categoryType]
  );

  const handleKeyDown = useCallback(
    (program: ProgramEntity, e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openEditProgramModal(program, categoryType);
      }
    },
    [openEditProgramModal, categoryType]
  );

  const handleEditClick = useCallback(
    (program: ProgramEntity) =>
      openEditProgramModal(program, categoryType),
    [openEditProgramModal, categoryType]
  );

  const handleDeleteClick = useCallback(
    (program: ProgramEntity) => openDeleteProgramModal(program),
    [openDeleteProgramModal]
  );
  const handleContextMenu = useCallback(
    (programId: string, e: React.MouseEvent) => {
      if (!bulkEnabled) return;
      e.preventDefault();
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
      const MENU_WIDTH = 240;
      const MENU_HEIGHT = 176;
      const x = Math.min(
        e.clientX + 4,
        window.innerWidth - MENU_WIDTH - 8
      );
      const y = Math.min(
        e.clientY + 4,
        window.innerHeight - MENU_HEIGHT - 8
      );
      setContextMenu({
        x: Math.max(8, x),
        y: Math.max(8, y),
        programId,
      });
      setContextMenuVisible(false);
      requestAnimationFrame(() => setContextMenuVisible(true));
    },
    [bulkEnabled]
  );
  const closeContextMenu = useCallback(() => {
    if (!contextMenu) return;
    setContextMenuVisible(false);
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }
    closeTimerRef.current = setTimeout(() => {
      setContextMenu(null);
      closeTimerRef.current = null;
    }, 120);
  }, [contextMenu]);
  useEffect(() => {
    if (!contextMenu) return;

    // On small screens, ensure the menu stays comfortably visible.
    if (window.innerWidth < 768) {
      requestAnimationFrame(() => {
        menuRef.current?.scrollIntoView({
          block: "nearest",
          inline: "nearest",
        });
      });
    }

    const handlePointerDown = () => closeContextMenu();
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeContextMenu();
    };

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleEscape);
    window.addEventListener("scroll", handlePointerDown, true);

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleEscape);
      window.removeEventListener("scroll", handlePointerDown, true);
    };
  }, [closeContextMenu, contextMenu]);
  useEffect(
    () => () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    },
    []
  );

  const tableId = useMemo(() => `program-list`, []);
  const canUseVirtualized =
    programs.length > VIRTUALIZE_THRESHOLD && !bulkEnabled;

  return (
    <>
      {/* MOBILE (<md): cards */}
      <div className={TABLE_CLASSES.cardsWrap}>
        {programs.map((program) => (
          <Surface
            key={program.id}
            className={cn(
              TABLE_CLASSES.card,
              "focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none"
            )}
            role="button"
            tabIndex={0}
            onClick={() =>
              openEditProgramModal(program, categoryType)
            }
            onKeyDown={(e) => handleKeyDown(program, e)}
            aria-label={`Открыть программу ${program.title}`}
            onContextMenu={(e) => handleContextMenu(program.id, e)}
          >
            {bulkEnabled ? (
              <div className="absolute top-3 right-3 z-10">
                <input
                  type="checkbox"
                  className="h-4 w-4 cursor-pointer accent-primary"
                  checked={selectedProgramIds.has(program.id)}
                  onChange={(e) =>
                    onSelectProgram(program.id, e.target.checked)
                  }
                  onClick={(e) => e.stopPropagation()}
                  aria-label={`Выбрать программу ${program.title}`}
                />
              </div>
            ) : null}
            <div className={TABLE_CLASSES.cardHeader}>
              <div className={TABLE_CLASSES.cardMain}>
                <ProgramTableTitleContent program={program} />

                <div className={TABLE_CLASSES.cardMeta}>
                  <ProgramTableViewsContent program={program} />
                  <ProgramTablePricingContent program={program} />

                  {showAwardedQualification && (
                    <ProgramTableQualificationContent
                      program={program}
                    />
                  )}

                  {showAwardedRank && (
                    <ProgramTableRankContent program={program} />
                  )}

                  {showSubPrograms && (
                    <ProgramTableSubprogramsContent
                      program={program}
                    />
                  )}
                </div>
              </div>

              <div className="shrink-0">
                <TableActions
                  onEdit={() => handleEditClick(program)}
                  onDelete={() => handleDeleteClick(program)}
                  editLabel="Редактировать программу"
                  deleteLabel="Удалить программу"
                />
              </div>
            </div>
          </Surface>
        ))}
      </div>

      {/* DESKTOP (md+): table or virtualized table for large lists */}
      <div className="hidden md:block">
        {canUseVirtualized ? (
          <VirtualizedProgramTable
            programs={programs}
            categoryType={categoryType}
            caption={
              caption ??
              `Показано ${programs.length} ${pluralPrograms(programs.length)}`
            }
          />
        ) : (
          <Surface
            variant="floating"
            className={TABLE_CLASSES.wrapper}
          >
            <Table
              id={tableId}
              aria-label="Таблица программ"
              className="table-fixed"
            >
              <TableHeader className={TABLE_CLASSES.thead}>
                <TableRow>
                  {bulkEnabled ? (
                    <TableHead
                      className={`w-[4%] min-w-[44px] text-center ${TABLE_CLASSES.th}`}
                    >
                      <input
                        type="checkbox"
                        className="h-4 w-4 cursor-pointer accent-primary"
                        checked={allSelected}
                        ref={(node) => {
                          if (node)
                            node.indeterminate = !!someSelected;
                        }}
                        onChange={(e) =>
                          onSelectAllPrograms?.(
                            programs.map((program) => program.id),
                            e.target.checked
                          )
                        }
                        aria-label="Выбрать все программы на странице"
                      />
                    </TableHead>
                  ) : null}
                  <TableHead
                    className={`min-w-0 ${TABLE_CLASSES.th}`}
                  >
                    ПРОГРАММА
                  </TableHead>

                  <TableHead
                    className={`${showAwardedQualification ? "hidden md:table-cell" : "hidden"} w-[16%] min-w-[120px] text-center ${TABLE_CLASSES.th}`}
                  >
                    КВАЛИФИКАЦИЯ
                  </TableHead>

                  <TableHead
                    className={`${showAwardedRank ? "hidden md:table-cell" : "hidden"} w-[7%] min-w-[56px] text-center ${TABLE_CLASSES.th}`}
                  >
                    РАЗРЯД
                  </TableHead>

                  <TableHead
                    className={`hidden w-[16%] min-w-[120px] text-start md:table-cell ${TABLE_CLASSES.th}`}
                  >
                    ЧАСЫ - ЦЕНА
                  </TableHead>

                  <TableHead
                    className={`hidden w-[8%] min-w-0 text-center lg:table-cell ${TABLE_CLASSES.th}`}
                  >
                    ПРОСМОТРЫ
                  </TableHead>

                  <TableHead
                    className={`${showSubPrograms ? "hidden lg:table-cell" : "hidden"} w-[10%] min-w-0 text-center ${TABLE_CLASSES.th}`}
                  >
                    ПОДПРОГРАММЫ
                  </TableHead>

                  <TableHead
                    className={`hidden w-[8%] min-w-0 text-center md:table-cell ${TABLE_CLASSES.th}`}
                  >
                    ДЕЙСТВИЯ
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {programs.map((program) => (
                  <TableRow
                    key={program.id}
                    className={`group cursor-pointer ${TABLE_CLASSES.tr}`}
                    onClick={(e) => handleRowClick(program, e)}
                    onContextMenu={(e) =>
                      handleContextMenu(program.id, e)
                    }
                    role="row"
                    tabIndex={0}
                    onKeyDown={(e) => handleKeyDown(program, e)}
                    aria-label={`Программа ${program.title}`}
                  >
                    {bulkEnabled ? (
                      <TableCell
                        className={`text-center ${TABLE_CLASSES.td}`}
                      >
                        <input
                          type="checkbox"
                          className="h-4 w-4 cursor-pointer accent-primary"
                          checked={selectedProgramIds.has(program.id)}
                          onChange={(e) =>
                            onSelectProgram(
                              program.id,
                              e.target.checked
                            )
                          }
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`Выбрать программу ${program.title}`}
                        />
                      </TableCell>
                    ) : null}
                    <TableCell
                      className={`min-w-0 overflow-hidden ${TABLE_CLASSES.td}`}
                    >
                      <ProgramTableTitleContent program={program} />
                    </TableCell>

                    <TableCell
                      className={`${showAwardedQualification ? "hidden md:table-cell" : "hidden"} min-w-0 overflow-hidden ${TABLE_CLASSES.td}`}
                    >
                      <ProgramTableQualificationContent
                        program={program}
                      />
                    </TableCell>

                    <TableCell
                      className={`${showAwardedRank ? "hidden md:table-cell" : "hidden"} min-w-0 overflow-hidden ${TABLE_CLASSES.td}`}
                    >
                      <ProgramTableRankContent program={program} />
                    </TableCell>

                    <TableCell
                      className={`hidden min-w-0 overflow-hidden md:table-cell ${TABLE_CLASSES.td}`}
                    >
                      <ProgramTablePricingContent program={program} />
                    </TableCell>

                    <TableCell
                      className={`hidden min-w-0 overflow-hidden lg:table-cell ${TABLE_CLASSES.td}`}
                    >
                      <ProgramTableViewsContent program={program} />
                    </TableCell>

                    <TableCell
                      className={`${showSubPrograms ? "hidden lg:table-cell" : "hidden"} min-w-0 overflow-hidden ${TABLE_CLASSES.td}`}
                    >
                      <ProgramTableSubprogramsContent
                        program={program}
                      />
                    </TableCell>

                    <TableCell
                      className={`hidden min-w-0 overflow-hidden md:table-cell ${TABLE_CLASSES.td}`}
                    >
                      <TableActions
                        onEdit={() => handleEditClick(program)}
                        onDelete={() => handleDeleteClick(program)}
                        editLabel="Редактировать программу"
                        deleteLabel="Удалить программу"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>

              <TableCaption className={TABLE_CLASSES.caption}>
                {caption ??
                  `Показано ${programs.length} ${pluralPrograms(programs.length)}`}
              </TableCaption>
            </Table>
          </Surface>
        )}
      </div>
      {bulkEnabled && contextMenu ? (
        <div
          ref={menuRef}
          className={cn(
            "fixed z-50 min-w-56 rounded-lg border border-border/60 bg-background/95 p-1.5 shadow-xl backdrop-blur transition duration-120 ease-out",
            contextMenuVisible
              ? "scale-100 opacity-100"
              : "scale-95 opacity-0"
          )}
          style={{ left: contextMenu.x, top: contextMenu.y }}
          onPointerDown={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            className="w-full rounded-md px-3 py-2 text-left text-sm hover:bg-muted"
            onClick={() => {
              onSelectProgram(
                contextMenu.programId,
                !selectedProgramIds.has(contextMenu.programId)
              );
              closeContextMenu();
            }}
          >
            {selectedProgramIds.has(contextMenu.programId)
              ? "Убрать из выбора"
              : "Добавить в выбор"}
          </button>
          <button
            type="button"
            className="w-full rounded-md px-3 py-2 text-left text-sm hover:bg-muted"
            onClick={() => {
              onSelectAllPrograms?.(visibleProgramIds, true);
              closeContextMenu();
            }}
          >
            Выбрать все по текущему фильтру
          </button>
          <button
            type="button"
            className="w-full rounded-md px-3 py-2 text-left text-sm hover:bg-muted"
            onClick={() => {
              onOpenBulkUpdate?.();
              closeContextMenu();
            }}
          >
            Открыть массовое обновление ({selectedCount})
          </button>
          <button
            type="button"
            className="w-full rounded-md px-3 py-2 text-left text-sm text-muted-foreground hover:bg-muted"
            onClick={() => {
              onClearSelection?.();
              closeContextMenu();
            }}
          >
            Очистить выбор
          </button>
        </div>
      ) : null}
    </>
  );
});
