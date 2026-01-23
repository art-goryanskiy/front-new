import type { IconName } from "@/shared/ui/icons/icon";

export interface UserMenuProps {
  user: {
    email?: string | null;
    name?: string | null;
  } | null;
  onLogout: () => void;
  role?: string;
  menuItems?: ReadonlyArray<{
    key: string;
    label: string;
    icon: IconName;
    onPress?: () => void;
    color?: "default" | "danger";
  }>;
}
