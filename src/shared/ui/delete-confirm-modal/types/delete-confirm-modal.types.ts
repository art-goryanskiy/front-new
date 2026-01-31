export interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  itemName: string;
  onDelete: () => Promise<void>;
  loading?: boolean;
  error?: Error | null;
  entityType: "категорию" | "программу" | "пользователя" | "документ";
}
