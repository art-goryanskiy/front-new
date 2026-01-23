import { useMemo } from "react";
import type { CategoryType } from "@/shared/api/generated/graphql";

/**
 * Хук для конфигурации видимости столбцов таблицы программ
 */
export function useProgramTableConfig(categoryType?: CategoryType | null) {
  return useMemo(
    () => ({
      showAwardedQualification: categoryType === "PROFESSIONAL_RETRAINING",
      showAwardedRank: categoryType === "PROFESSIONAL_EDUCATION",
      showSubPrograms: categoryType === "QUALIFICATION_UPGRADE",
    }),
    [categoryType]
  );
}
