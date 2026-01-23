import type {
  CategoryEntity,
  ProgramEntity,
} from "@/shared/api/generated/graphql";

export interface Command {
  id: string;
  label: string;
  path: string;
  icon: string;
}

export type SearchResultType = "command" | "category" | "program";

export interface SearchResult {
  id: string;
  type: SearchResultType;
  label: string;
  path: string;
  icon: string;
  description?: string;
  parentCategoryName?: string;
  entity?: CategoryEntity | ProgramEntity;
}

export interface CommandPaletteContentProps {
  closeCommandPalette: () => void;
}
