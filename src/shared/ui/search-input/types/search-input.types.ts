export interface SearchInputProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  onFocus?: () => void;
  entities?: string[]; // Сущности для ограничения поиска
  showKeyboardHint?: boolean;
  className?: string;
}
