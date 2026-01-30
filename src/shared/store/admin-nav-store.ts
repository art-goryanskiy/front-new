import type { CategoryType } from "@/shared/api/generated/graphql";
import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";

interface AdminNavStore {
  /** Active category type while on `/admin/category/[id]` */
  activeCategoryType: CategoryType | null;
  setActiveCategoryType: (type: CategoryType | null) => void;
}

const useAdminNavStore = create<AdminNavStore>((set) => ({
  activeCategoryType: null,
  setActiveCategoryType: (type) => set({ activeCategoryType: type }),
}));

export const useAdminNavState = () =>
  useAdminNavStore(
    useShallow((state) => ({
      activeCategoryType: state.activeCategoryType,
      setActiveCategoryType: state.setActiveCategoryType,
    }))
  );
