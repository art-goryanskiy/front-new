import { useMutation } from "@apollo/client/react";
import { UPDATE_PROGRAMS_BULK } from "@/shared/api/mutations/programs";
import {
  GET_PROGRAMS,
  GET_PROGRAMS_PAGE,
} from "@/shared/api/queries/programs";
import { GET_CATEGORIES } from "@/shared/api/queries/categories";
import { revalidatePublicProgramsAndCategories } from "@/shared/lib/revalidate/public-revalidate";

export type BulkPatchMode = "REPLACE" | "DELTA" | "CLEAR";

export type BulkFailureCode =
  | "NOT_FOUND"
  | "BAD_REQUEST"
  | "CONFLICT"
  | "INTERNAL_ERROR";

export type ProgramPricingPatchInput = {
  hours: number;
  price: number;
};

type ReplacePatch = {
  mode: "REPLACE";
  category?: string;
  pricing?: ProgramPricingPatchInput[];
  baseHours?: number;
};

type DeltaPatch = {
  mode: "DELTA";
  baseHours: number;
};

type ClearPatch = {
  mode: "CLEAR";
};

export type UpdateProgramsBulkPatchInput =
  | ReplacePatch
  | DeltaPatch
  | ClearPatch;

export type UpdateProgramsBulkInput = {
  ids: string[];
  patch: UpdateProgramsBulkPatchInput;
  dryRun?: boolean;
};

export type UpdateProgramsBulkFailedItem = {
  id: string;
  code: BulkFailureCode;
  message: string;
};

export type UpdateProgramsBulkResult = {
  total: number;
  updated: number;
  failed: UpdateProgramsBulkFailedItem[];
};

export function useUpdateProgramsBulk() {
  const [updateProgramsBulkMutation, { loading, error }] =
    useMutation<{
      updateProgramsBulk: UpdateProgramsBulkResult;
    }>(UPDATE_PROGRAMS_BULK, {
      refetchQueries: [
        { query: GET_PROGRAMS },
        { query: GET_PROGRAMS_PAGE },
        { query: GET_CATEGORIES },
      ],
      awaitRefetchQueries: true,
      update: (cache) => {
        cache.evict({ fieldName: "programs" });
        cache.evict({ fieldName: "programsPage" });
        cache.evict({ fieldName: "categories" });
        cache.gc();
      },
    });

  const updateProgramsBulk = async (
    input: UpdateProgramsBulkInput
  ) => {
    const uniqueIds = Array.from(new Set(input.ids.filter(Boolean)));
    if (uniqueIds.length === 0) {
      throw new Error("Выберите хотя бы одну программу");
    }

    if (
      input.patch.mode === "DELTA" &&
      typeof input.patch.baseHours !== "number"
    ) {
      throw new Error("Для режима DELTA обязательно поле baseHours");
    }

    if (
      input.patch.mode === "CLEAR" &&
      "category" in input.patch &&
      input.patch.category !== undefined
    ) {
      throw new Error("В режиме CLEAR нельзя передавать category");
    }

    const result = await updateProgramsBulkMutation({
      variables: {
        input: {
          ...input,
          ids: uniqueIds,
        },
      },
    });

    if (!input.dryRun) {
      try {
        await revalidatePublicProgramsAndCategories();
      } catch {
        // Do not break admin UX if revalidation fails
      }
    }

    return result.data?.updateProgramsBulk;
  };

  return {
    updateProgramsBulk,
    loading,
    error,
  };
}
