import type { CategoryType } from "@/shared/api/generated/graphql";
import { create } from "zustand";

interface ProgramsByTypeHeaderState {
  categoryId: string;
  type: CategoryType | null;
  setState: (categoryId: string, type: CategoryType | null) => void;
}

export const useProgramsByTypeHeaderStore =
  create<ProgramsByTypeHeaderState>((set) => ({
    categoryId: "all",
    type: null,
    setState: (categoryId, type) => set({ categoryId, type }),
  }));
