"use client";

import { memo, useCallback } from "react";
import { Button } from "@heroui/react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface BackButtonProps {
  className?: string;
  label?: string;
}

export const BackButton = memo(function BackButton({
  className,
  label = "Назад",
}: BackButtonProps) {
  const router = useRouter();

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <Button
      variant="light"
      startContent={<ArrowLeft className="h-4 w-4" />}
      onPress={handleBack}
      className={className}
    >
      {label}
    </Button>
  );
});
