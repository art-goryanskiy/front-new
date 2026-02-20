"use client";

import { Button } from "@/components/ui/button";
import { useProgramModalState } from "@/shared/store/modal-store";
import { useToastState } from "@/shared/store/toast-store";
import { useProgramsByTypeHeaderStore } from "./programs-by-type-header-store";

export function AddProgramHeaderButton() {
  const { categoryId, type } = useProgramsByTypeHeaderStore();
  const { openCreateProgramModal } = useProgramModalState();
  const { showToast } = useToastState();

  const canCreate = categoryId !== "all" && type !== null;

  const handleClick = () => {
    if (!canCreate) {
      showToast(
        "info",
        "Выберите категорию в блоке фильтров ниже, чтобы создать программу"
      );
      return;
    }
    openCreateProgramModal(categoryId, type);
  };

  return (
    <Button
      className="shrink-0 font-semibold shadow-sm transition-shadow hover:shadow-md"
      onClick={handleClick}
      title={
        canCreate
          ? "Создать программу"
          : "Выберите категорию в фильтрах, чтобы создать программу"
      }
    >
      + Программа
    </Button>
  );
}
