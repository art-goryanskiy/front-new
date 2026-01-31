export interface EducationDocumentFormData {
  name: string;
  image: File | null;
}

export interface EducationDocumentFormProps {
  editingDocument?: {
    id: string;
    name?: string | null;
    image?: string | null;
  } | null;
  onDirtyChange?: (dirty: boolean) => void;
  onBusyChange?: (busy: boolean) => void;
}
