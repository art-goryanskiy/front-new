export interface NotificationButtonProps {
  count?: number;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
  className?: string;
  animationKey?: number;
}
