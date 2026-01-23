import type { CategoryType } from "@/shared/api/generated/graphql";

export interface ProgramFormData {
  title: string;
  description?: string;
  studentCategory?: string;
  pricing: Array<{ hours: number; price: number }>;
  awardedQualification?: string;
  awardedRankFrom?: number;
  awardedRankTo?: number;
  subPrograms: Array<{ title: string; description?: string }>;
}

export interface EditingProgram {
  id: string;
  title: string;
  description?: string | null;
  studentCategory?: string | null;
  category: string;
  pricing: Array<{ hours: number; price?: number | null }>;
  awardedQualification?: string | null;
  awardedRankFrom?: number | null;
  awardedRankTo?: number | null;
  subPrograms?: Array<{ title: string; description?: string | null }> | null;
}

export interface ProgramFormProps {
  editingProgram?: EditingProgram | null;
  categoryId: string;
  categoryType?: CategoryType | null;
}
