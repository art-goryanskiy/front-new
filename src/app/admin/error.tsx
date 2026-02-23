"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Surface } from "@/shared/ui/surface/surface";
import { ShieldAlert } from "lucide-react";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.error("[Admin] Error boundary caught:", error);
    }
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center p-4">
      <Surface
        variant="floating"
        className="mx-auto w-full max-w-md p-6 text-center"
      >
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
          <ShieldAlert className="h-6 w-6 text-destructive" />
        </div>
        <h2 className="text-lg font-semibold text-foreground">
          Ошибка в панели администратора
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Произошла ошибка при загрузке раздела. Данные не изменились.
        </p>
        {process.env.NODE_ENV === "development" && error?.message && (
          <p className="mt-2 rounded bg-muted px-3 py-2 text-left font-mono text-xs text-muted-foreground">
            {error.message}
          </p>
        )}
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
