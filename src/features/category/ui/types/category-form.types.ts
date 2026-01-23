import type { CategoryType } from "@/shared/api/generated/graphql";

export interface CategoryFormData {
  name: string;
  description?: string;
  type?: CategoryType;
  image?: File | null;
}

export interface EditingCategory {
  id: string;
  name: string;
  description?: string | null;
  type?: CategoryType | null;
  image?: string | null;
}

export interface CategoryFormProps {
  editingCategory?: EditingCategory | null;
}
