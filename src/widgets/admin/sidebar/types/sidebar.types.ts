import type { IconName } from "@/shared/ui/icons/icon";

export interface MenuItem {
  type?: string;
  label: string;
  icon: IconName;
  path: string;
  color: "primary" | "success" | "warning" | "default";
}

export interface SidebarNavItemProps {
  item: MenuItem;
  isActive: boolean;
  isCollapsed: boolean;
  onNavigate: (path: string) => void;
}
