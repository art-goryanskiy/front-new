import {
  Search,
  Bell,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  User,
  Users,
  Settings,
  LogOut,
  Plus,
  Edit,
  Trash2,
  Folder,
  BookOpen,
  Eye,
  Tag,
  Inbox,
  GraduationCap,
  Briefcase,
  ArrowLeft,
  ArrowRight,
  Home,
  FileText,
  type LucideIcon,
} from "lucide-react";
import { memo } from "react";

export type IconName =
  | "search"
  | "bell"
  | "chevron-down"
  | "chevron-left"
  | "chevron-right"
  | "user"
  | "users"
  | "settings"
  | "log-out"
  | "plus"
  | "edit"
  | "trash"
  | "folder"
  | "book"
  | "eye"
  | "tag"
  | "inbox"
  | "graduation-cap"
  | "briefcase"
  | "arrow-left"
  | "arrow-right"
  | "home"
  | "file-text";

const iconMap: Record<IconName, LucideIcon> = {
  search: Search,
  bell: Bell,
  "chevron-down": ChevronDown,
  "chevron-left": ChevronLeft,
  "chevron-right": ChevronRight,
  user: User,
  users: Users,
  settings: Settings,
  "log-out": LogOut,
  plus: Plus,
  edit: Edit,
  trash: Trash2,
  folder: Folder,
  book: BookOpen,
  eye: Eye,
  tag: Tag,
  inbox: Inbox,
  "graduation-cap": GraduationCap,
  briefcase: Briefcase,
  "arrow-left": ArrowLeft,
  "arrow-right": ArrowRight,
  home: Home,
  "file-text": FileText,
};

interface IconProps {
  name: IconName;
  className?: string;
  size?: number | string;
  strokeWidth?: number;
  "aria-label"?: string;
}

export const Icon = memo(function Icon({
  name,
  className = "",
  size = 20,
  strokeWidth = 2,
  "aria-label": ariaLabel,
}: IconProps) {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return (
    <IconComponent
      className={className}
      size={size}
      strokeWidth={strokeWidth}
      aria-label={ariaLabel}
      aria-hidden={!ariaLabel}
    />
  );
});
