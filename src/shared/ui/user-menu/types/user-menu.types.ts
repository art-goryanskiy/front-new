import type { IconName } from "@/shared/ui/icons/icon";
import type { UserEntity } from "@/shared/api/generated/graphql";

export interface UserMenuProps {
  user: UserEntity | null;
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
