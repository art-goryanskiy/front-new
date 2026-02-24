import type {
  CreateProgramInput,
  UpdateProgramInput,
  ProgramPricingInput,
  ProgramSubProgramInput,
} from "@/shared/api/generated/graphql";
import type { ProgramFormData } from "../types/program-form.types";

/**
 * Подготавливает данные о ценах для отправки
 */
export function preparePricing(
  pricing: Array<{ hours: number; price: number }>
): ProgramPricingInput[] {
  return pricing
    .filter((p) => p.hours > 0)
    .map((p) => {
      let priceValue: number;

      if (typeof p.price === "number" && !isNaN(p.price)) {
        priceValue = p.price;
      } else {
        priceValue = 0;
      }

      return {
        hours: p.hours,
        price: priceValue,
      };
    });
}

/**
 * Подготавливает данные о подпрограммах для отправки
 */
export function prepareSubPrograms(
  subPrograms: Array<{ title: string; description?: string }>
): ProgramSubProgramInput[] {
  return subPrograms
    .filter((sp) => sp.title.trim())
    .map(
      (sp): ProgramSubProgramInput => ({
        title: sp.title.trim(),
        ...(sp.description?.trim() && {
          description: sp.description.trim(),
        }),
      })
    );
}

/**
 * Создает объект CreateProgramInput из данных формы
 */
export function createProgramInput(
  data: ProgramFormData,
  categoryId: string,
  config: {
    showAwardedQualification: boolean;
    showAwardedRank: boolean;
    showSubPrograms: boolean;
  }
): CreateProgramInput {
  const pricing = preparePricing(data.pricing);

  const input: CreateProgramInput = {
    title: data.title.trim(),
    category: categoryId,
    ...(data.educationDocumentId?.trim() && {
      educationDocumentId: data.educationDocumentId.trim(),
    }),
    ...(data.shortTitle?.trim() && {
      shortTitle: data.shortTitle.trim(),
    }),
    ...(data.description?.trim() && {
      description: data.description.trim(),
    }),
    ...(data.studentCategory?.trim() && {
      studentCategory: data.studentCategory.trim(),
    }),
    ...(pricing.length > 0 && { pricing }),
    ...(config.showAwardedQualification &&
      data.awardedQualification?.trim() && {
        awardedQualification: data.awardedQualification.trim(),
      }),
    ...(config.showAwardedRank && {
      awardedRankFrom:
        data.awardedRankFrom != null && data.awardedRankFrom > 0
          ? data.awardedRankFrom
          : null,
      awardedRankTo:
        data.awardedRankTo != null && data.awardedRankTo > 0
          ? data.awardedRankTo
          : null,
    }),
    ...(config.showSubPrograms && {
      subPrograms: prepareSubPrograms(data.subPrograms),
    }),
  };

  return input;
}

/**
 * Создает объект UpdateProgramInput из данных формы
 */
export function updateProgramInput(
  data: ProgramFormData,
  config: {
    showAwardedQualification: boolean;
    showAwardedRank: boolean;
    showSubPrograms: boolean;
  }
): UpdateProgramInput {
  const pricing = preparePricing(data.pricing);

  const input: UpdateProgramInput = {
    title: data.title.trim(),
    ...(data.shortTitle?.trim() && {
      shortTitle: data.shortTitle.trim(),
    }),
    ...(data.description?.trim() && {
      description: data.description.trim(),
    }),
    ...(data.studentCategory?.trim() && {
      studentCategory: data.studentCategory.trim(),
    }),
    ...(pricing.length > 0 && { pricing }),
    ...(config.showAwardedQualification &&
      data.awardedQualification?.trim() && {
        awardedQualification: data.awardedQualification.trim(),
      }),
    ...(config.showAwardedRank && {
      awardedRankFrom:
        data.awardedRankFrom != null && data.awardedRankFrom > 0
          ? data.awardedRankFrom
          : null,
      awardedRankTo:
        data.awardedRankTo != null && data.awardedRankTo > 0
          ? data.awardedRankTo
          : null,
    }),
    ...(config.showSubPrograms && {
      subPrograms: prepareSubPrograms(data.subPrograms),
    }),
    ...(data.educationDocumentId !== undefined && {
      educationDocumentId: data.educationDocumentId || null,
    }),
  };

  return input;
}

/**
 * Получает значения по умолчанию для формы
 */
export function getDefaultValues(
  editingProgram?: {
    title?: string;
    shortTitle?: string | null;
    description?: string | null;
    studentCategory?: string | null;
    educationDocumentId?: string | null;
    pricing?: Array<{ hours: number; price?: number | null }>;
    awardedQualification?: string | null;
    awardedRankFrom?: number | null;
    awardedRankTo?: number | null;
    subPrograms?: Array<{
      title: string;
      description?: string | null;
    }> | null;
  } | null
): ProgramFormData {
  return {
    title: editingProgram?.title || "",
    shortTitle: editingProgram?.shortTitle || "",
    description: editingProgram?.description || "",
    studentCategory: editingProgram?.studentCategory || "",
    educationDocumentId: editingProgram?.educationDocumentId ?? "",
    pricing: editingProgram?.pricing?.map((p) => ({
      hours: p.hours || 0,
      price: p.price ?? 0,
    })) || [{ hours: 0, price: 0 }],
    awardedQualification: editingProgram?.awardedQualification || "",
    awardedRankFrom: editingProgram?.awardedRankFrom || undefined,
    awardedRankTo: editingProgram?.awardedRankTo || undefined,
    subPrograms: editingProgram?.subPrograms?.map((sp) => ({
      title: sp.title,
      description: sp.description || "",
    })) || [{ title: "", description: "" }],
  };
}
