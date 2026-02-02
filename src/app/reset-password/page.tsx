"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import { ResetPasswordForm } from "@/features/auth/ui/reset-password-form";

export default function ResetPasswordPage() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen w-full bg-background px-4">
      <div className="pointer-events-none absolute inset-0">
        <div className="bg-grid-black/[0.04] dark:bg-grid-white/[0.05] absolute inset-0 bg-size-[20px_20px]" />
        <div className="absolute -top-24 -left-24 h-[320px] w-[420px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -right-24 -bottom-24 h-[360px] w-[520px] rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 flex min-h-screen w-full items-center justify-center">
        <div className="w-full max-w-md">
          <div className="mb-8 flex justify-center">
            <button
              onClick={() => router.push("/")}
              className="rounded-lg transition-opacity duration-200 hover:opacity-80 focus:outline-none"
              aria-label="Перейти на главную страницу"
            >
              <Image
                src="/logo-full.svg"
                alt="ООО ЦОК СТАНДАРТ ПЛЮС"
                width={300}
                height={72}
                className="h-16 w-auto object-contain"
                style={{ width: "auto" }}
                priority
              />
            </button>
          </div>

          <Card className="border-border/60 bg-card/60 shadow-xl backdrop-blur">
            <CardContent className="p-8">
              <div className="space-y-2 pb-6 text-center">
                <h1 className="text-2xl font-bold text-foreground">
                  Новый пароль
                </h1>
                <p className="text-sm text-muted-foreground">
                  Введите новый пароль и подтвердите его.
                </p>
              </div>

              <Suspense
                fallback={
                  <div className="flex min-h-[200px] flex-col items-center justify-center gap-4 py-8">
                    <Spinner
                      className="text-primary"
                      size={32}
                    />
                    <span className="text-sm text-muted-foreground">
                      Загрузка формы…
                    </span>
                  </div>
                }
              >
                <ResetPasswordForm />
              </Suspense>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
