"use client";

import { useEducationDocumentModalState } from "@/shared/store/modal-store";
import { AdminPageHeader } from "@/shared/ui/admin-page-header/admin-page-header";
import { DashboardSection } from "@/shared/ui/dashboard-section/dashboard-section";
import { DataToolbar } from "@/shared/ui/data-toolbar/data-toolbar";
import { EducationDocumentTable } from "@/widgets/admin/education-document-table/education-document-table";
import { Suspense, lazy, memo, useCallback, useState } from "react";

const EducationDocumentModal = lazy(() =>
  import("@/widgets/education-document/education-document-modal/education-document-modal").then(
    (mod) => ({ default: mod.EducationDocumentModal })
  )
);

const DeleteEducationDocumentModal = lazy(() =>
  import("@/widgets/education-document/delete-education-document-modal/delete-education-document-modal").then(
    (mod) => ({ default: mod.DeleteEducationDocumentModal })
  )
);

const AdminEducationDocumentsPage = memo(
  function AdminEducationDocumentsPage() {
    const { openCreateEducationDocumentModal } =
      useEducationDocumentModalState();

    const [q, setQ] = useState("");
    const [counts, setCounts] = useState({ shown: 0, total: 0 });

    const handleCreate = useCallback(() => {
      openCreateEducationDocumentModal();
    }, [openCreateEducationDocumentModal]);

    return (
      <div className="space-y-4 sm:space-y-6 lg:space-y-8">
        <AdminPageHeader
          variant="default"
          title="Документы об образовании"
          description="Создавайте и управляйте документами об образовании для программ"
          actionButton={{
            label: "Создать документ",
            mobileLabel: "Создать",
            onPress: handleCreate,
            icon: "plus",
          }}
        />

        <DashboardSection
          title="Все документы"
          actions={
            <span className="hidden rounded-full border border-border/60 bg-muted/20 px-2.5 py-1 text-xs text-muted-foreground sm:inline-flex">
              {counts.shown} / {counts.total}
            </span>
          }
        >
          <DataToolbar
            searchValue={q}
            onSearchValueChange={setQ}
            searchPlaceholder="Поиск по названию…"
          />

          <EducationDocumentTable
            searchQuery={q}
            onCountsChange={setCounts}
          />
        </DashboardSection>

        <Suspense fallback={null}>
          <EducationDocumentModal />
        </Suspense>
        <Suspense fallback={null}>
          <DeleteEducationDocumentModal />
        </Suspense>
      </div>
    );
  }
);

export default AdminEducationDocumentsPage;
