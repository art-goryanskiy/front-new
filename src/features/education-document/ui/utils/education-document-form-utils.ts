import type {
  CreateEducationDocumentInput,
  UpdateEducationDocumentInput,
} from "@/shared/api/generated/graphql";
import type { EducationDocumentFormData } from "../types/education-document-form.types";

export function createEducationDocumentInput(
  data: EducationDocumentFormData,
  imageUrl?: string
): CreateEducationDocumentInput {
  return {
    name: data.name.trim(),
    ...(imageUrl && { image: imageUrl }),
  };
}

export function updateEducationDocumentInput(
  data: EducationDocumentFormData,
  imageUrl?: string
): UpdateEducationDocumentInput {
  return {
    name: data.name.trim(),
    ...(imageUrl && { image: imageUrl }),
  };
}

export function getDefaultValues(editingDocument?: {
  name?: string | null;
} | null): EducationDocumentFormData {
  return {
    name: editingDocument?.name || "",
    image: null,
  };
}
