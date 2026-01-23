// src/shared/store/ui-store.ts
import { create } from "zustand";
import type {
  CategoryType,
  CategoryEntity,
  ProgramEntity,
  UserEntity,
} from "@/shared/api/generated/graphql";

interface UIStore {
  isCategoryModalOpen: boolean;
  isDeleteCategoryModalOpen: boolean;
  categoryType: CategoryType | null;
  editingCategory: CategoryEntity | null;
  deletingCategory: CategoryEntity | null;
  searchQuery: string;
  searchOriginPath: string | null; // Путь, откуда был начат поиск
  isProgramModalOpen: boolean;
  isDeleteProgramModalOpen: boolean;
  editingProgram: ProgramEntity | null;
  deletingProgram: ProgramEntity | null;
  programCategoryId: string | null;
  programCategoryType: CategoryType | null;
  openCreateCategoryModal: (type?: CategoryType) => void;
  openEditCategoryModal: (category: CategoryEntity) => void;
  openDeleteCategoryModal: (category: CategoryEntity) => void;
  closeCategoryModal: () => void;
  closeDeleteCategoryModal: () => void;
  setSearchQuery: (query: string) => void;
  setSearchOriginPath: (path: string | null) => void;
  clearSearch: () => void;
  openCreateProgramModal: (
    categoryId: string,
    categoryType?: CategoryType | null
  ) => void;
  openEditProgramModal: (
    program: ProgramEntity,
    categoryType?: CategoryType | null
  ) => void;
  openDeleteProgramModal: (program: ProgramEntity) => void;
  closeProgramModal: () => void;
  closeDeleteProgramModal: () => void;

  // User modals
  isUserModalOpen: boolean;
  isDeleteUserModalOpen: boolean;
  editingUser: UserEntity | null;
  deletingUser: UserEntity | null;
  openCreateUserModal: () => void;
  openEditUserModal: (user: UserEntity) => void;
  openDeleteUserModal: (user: UserEntity) => void;
  closeUserModal: () => void;
  closeDeleteUserModal: () => void;

  isCommandPaletteOpen: boolean;
  openCommandPalette: () => void;
  closeCommandPalette: () => void;
  toast: {
    type: "success" | "error" | "info";
    message: string;
  } | null;
  showToast: (
    type: "success" | "error" | "info",
    message: string
  ) => void;
  clearToast: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  isCategoryModalOpen: false,
  isDeleteCategoryModalOpen: false,
  categoryType: null,
  editingCategory: null,
  deletingCategory: null,
  searchQuery: "",
  searchOriginPath: null,
  isProgramModalOpen: false,
  isDeleteProgramModalOpen: false,
  editingProgram: null,
  deletingProgram: null,
  programCategoryId: null,
  programCategoryType: null,
  isCommandPaletteOpen: false,
  openCreateCategoryModal: (type) =>
    set({
      isCategoryModalOpen: true,
      categoryType: type || null,
      editingCategory: null,
    }),
  openEditCategoryModal: (category) =>
    set({
      isCategoryModalOpen: true,
      editingCategory: category,
      categoryType: null,
    }),
  openDeleteCategoryModal: (category) =>
    set({
      isDeleteCategoryModalOpen: true,
      deletingCategory: category,
    }),
  closeCategoryModal: () =>
    set({
      isCategoryModalOpen: false,
      categoryType: null,
      editingCategory: null,
    }),
  closeDeleteCategoryModal: () =>
    set({
      isDeleteCategoryModalOpen: false,
      deletingCategory: null,
    }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSearchOriginPath: (path) => set({ searchOriginPath: path }),
  clearSearch: () =>
    set({
      searchQuery: "",
      searchOriginPath: null,
    }),
  openCreateProgramModal: (categoryId, categoryType) =>
    set({
      isProgramModalOpen: true,
      programCategoryId: categoryId,
      programCategoryType: categoryType ?? null,
      editingProgram: null,
    }),
  openEditProgramModal: (program, categoryType) =>
    set({
      isProgramModalOpen: true,
      editingProgram: program,
      programCategoryId: null,
      programCategoryType: categoryType ?? null,
    }),
  openDeleteProgramModal: (program) =>
    set({
      isDeleteProgramModalOpen: true,
      deletingProgram: program,
    }),
  closeProgramModal: () =>
    set({
      isProgramModalOpen: false,
      editingProgram: null,
      programCategoryId: null,
      programCategoryType: null,
    }),
  closeDeleteProgramModal: () =>
    set({
      isDeleteProgramModalOpen: false,
      deletingProgram: null,
    }),
  // User modals
  isUserModalOpen: false,
  isDeleteUserModalOpen: false,
  editingUser: null,
  deletingUser: null,
  openCreateUserModal: () =>
    set({
      isUserModalOpen: true,
      editingUser: null,
    }),
  openEditUserModal: (user) =>
    set({
      isUserModalOpen: true,
      editingUser: user,
    }),
  openDeleteUserModal: (user) =>
    set({
      isDeleteUserModalOpen: true,
      deletingUser: user,
    }),
  closeUserModal: () =>
    set({
      isUserModalOpen: false,
      editingUser: null,
    }),
  closeDeleteUserModal: () =>
    set({
      isDeleteUserModalOpen: false,
      deletingUser: null,
    }),
  openCommandPalette: () => set({ isCommandPaletteOpen: true }),
  closeCommandPalette: () => set({ isCommandPaletteOpen: false }),
  toast: null,
  showToast: (type, message) => set({ toast: { type, message } }),
  clearToast: () => set({ toast: null }),
}));

import { useShallow } from "zustand/react/shallow";
// Оптимизированные селекторы для минимизации ререндеров
export const useSearchState = () =>
  useUIStore(
    useShallow((state) => ({
      searchQuery: state.searchQuery,
      searchOriginPath: state.searchOriginPath,
      isCommandPaletteOpen: state.isCommandPaletteOpen,
      setSearchQuery: state.setSearchQuery,
      setSearchOriginPath: state.setSearchOriginPath,
      openCommandPalette: state.openCommandPalette,
      closeCommandPalette: state.closeCommandPalette,
      clearSearch: state.clearSearch,
    }))
  );

export const useCategoryModalState = () =>
  useUIStore(
    useShallow((state) => ({
      isCategoryModalOpen: state.isCategoryModalOpen,
      isDeleteCategoryModalOpen: state.isDeleteCategoryModalOpen,
      categoryType: state.categoryType,
      editingCategory: state.editingCategory,
      deletingCategory: state.deletingCategory,
      openCreateCategoryModal: state.openCreateCategoryModal,
      openEditCategoryModal: state.openEditCategoryModal,
      openDeleteCategoryModal: state.openDeleteCategoryModal,
      closeCategoryModal: state.closeCategoryModal,
      closeDeleteCategoryModal: state.closeDeleteCategoryModal,
    }))
  );

export const useProgramModalState = () =>
  useUIStore(
    useShallow((state) => ({
      isProgramModalOpen: state.isProgramModalOpen,
      isDeleteProgramModalOpen: state.isDeleteProgramModalOpen,
      editingProgram: state.editingProgram,
      deletingProgram: state.deletingProgram,
      programCategoryId: state.programCategoryId,
      programCategoryType: state.programCategoryType,
      openCreateProgramModal: state.openCreateProgramModal,
      openEditProgramModal: state.openEditProgramModal,
      openDeleteProgramModal: state.openDeleteProgramModal,
      closeProgramModal: state.closeProgramModal,
      closeDeleteProgramModal: state.closeDeleteProgramModal,
    }))
  );

export const useUserModalState = () =>
  useUIStore(
    useShallow((state) => ({
      isUserModalOpen: state.isUserModalOpen,
      isDeleteUserModalOpen: state.isDeleteUserModalOpen,
      editingUser: state.editingUser,
      deletingUser: state.deletingUser,
      openCreateUserModal: state.openCreateUserModal,
      openEditUserModal: state.openEditUserModal,
      openDeleteUserModal: state.openDeleteUserModal,
      closeUserModal: state.closeUserModal,
      closeDeleteUserModal: state.closeDeleteUserModal,
    }))
  );

export const useToastState = () =>
  useUIStore(
    useShallow((state) => ({
      toast: state.toast,
      showToast: state.showToast,
      clearToast: state.clearToast,
    }))
  );
