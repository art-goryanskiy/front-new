"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Surface } from "@/shared/ui/surface/surface";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.error("Error boundary caught:", error);
    }
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center p-4">
      <Surface
        variant="floating"
        className="mx-auto w-full max-w-md p-6 text-center"
      >
        <h2 className="text-lg font-semibold text-foreground">
          Что-то пошло не так
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Произошла ошибка. Попробуйте обновить страницу или вернуться
          позже.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button onClick={() => reset()} variant="default">
            Попробовать снова
          </Button>
          <Button
            onClick={() => window.history.back()}
            variant="outline"
          >
            Назад
          </Button>
        </div>
      </Surface>
    </div>
  );
}
