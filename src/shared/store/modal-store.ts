import type {
  CategoryEntity,
  CategoryType,
  EducationDocumentEntity,
  ProgramEntity,
  UserEntity,
} from "@/shared/api/generated/graphql";
import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";

interface ModalStore {
  // Category modals
  isCategoryModalOpen: boolean;
  isDeleteCategoryModalOpen: boolean;
  categoryType: CategoryType | null;
  editingCategory: CategoryEntity | null;
  deletingCategory: CategoryEntity | null;

  openCreateCategoryModal: (type?: CategoryType) => void;
  openEditCategoryModal: (category: CategoryEntity) => void;
  openDeleteCategoryModal: (category: CategoryEntity) => void;
  closeCategoryModal: () => void;
  closeDeleteCategoryModal: () => void;

  // Program modals
  isProgramModalOpen: boolean;
  isDeleteProgramModalOpen: boolean;
  editingProgram: ProgramEntity | null;
  deletingProgram: ProgramEntity | null;
  programCategoryId: string | null;
  programCategoryType: CategoryType | null;

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

  // Education document modals
  isEducationDocumentModalOpen: boolean;
  isDeleteEducationDocumentModalOpen: boolean;
  editingEducationDocument: EducationDocumentEntity | null;
  deletingEducationDocument: EducationDocumentEntity | null;

  openCreateEducationDocumentModal: () => void;
  openEditEducationDocumentModal: (doc: EducationDocumentEntity) => void;
  openDeleteEducationDocumentModal: (doc: EducationDocumentEntity) => void;
  closeEducationDocumentModal: () => void;
  closeDeleteEducationDocumentModal: () => void;

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
}

const useModalStore = create<ModalStore>((set) => ({
  // Category modals
  isCategoryModalOpen: false,
  isDeleteCategoryModalOpen: false,
  categoryType: null,
  editingCategory: null,
  deletingCategory: null,

  openCreateCategoryModal: (type) =>
    set({
      isCategoryModalOpen: true,
      categoryType: type ?? null,
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

  // Program modals
  isProgramModalOpen: false,
  isDeleteProgramModalOpen: false,
  editingProgram: null,
  deletingProgram: null,
  programCategoryId: null,
  programCategoryType: null,

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

  // Education document modals
  isEducationDocumentModalOpen: false,
  isDeleteEducationDocumentModalOpen: false,
  editingEducationDocument: null,
  deletingEducationDocument: null,

  openCreateEducationDocumentModal: () =>
    set({
      isEducationDocumentModalOpen: true,
      editingEducationDocument: null,
    }),
  openEditEducationDocumentModal: (doc) =>
    set({
      isEducationDocumentModalOpen: true,
      editingEducationDocument: doc,
    }),
  openDeleteEducationDocumentModal: (doc) =>
    set({
      isDeleteEducationDocumentModalOpen: true,
      deletingEducationDocument: doc,
    }),
  closeEducationDocumentModal: () =>
    set({
      isEducationDocumentModalOpen: false,
      editingEducationDocument: null,
    }),
  closeDeleteEducationDocumentModal: () =>
    set({
      isDeleteEducationDocumentModalOpen: false,
      deletingEducationDocument: null,
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
}));

export const useCategoryModalState = () =>
  useModalStore(
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
  useModalStore(
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

export const useEducationDocumentModalState = () =>
  useModalStore(
    useShallow((state) => ({
      isEducationDocumentModalOpen: state.isEducationDocumentModalOpen,
      isDeleteEducationDocumentModalOpen:
        state.isDeleteEducationDocumentModalOpen,
      editingEducationDocument: state.editingEducationDocument,
      deletingEducationDocument: state.deletingEducationDocument,
      openCreateEducationDocumentModal:
        state.openCreateEducationDocumentModal,
      openEditEducationDocumentModal: state.openEditEducationDocumentModal,
      openDeleteEducationDocumentModal:
        state.openDeleteEducationDocumentModal,
      closeEducationDocumentModal: state.closeEducationDocumentModal,
      closeDeleteEducationDocumentModal:
        state.closeDeleteEducationDocumentModal,
    }))
  );

export const useUserModalState = () =>
  useModalStore(
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
