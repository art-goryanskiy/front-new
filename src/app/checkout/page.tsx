"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { UserAuthGuard } from "@/shared/lib/auth/user-auth-guard";
import { PublicPageLayout } from "@/shared/ui/layouts/public-page-layout";
import {
  CheckoutForm,
  type CheckoutFormProps,
} from "@/features/checkout/ui/checkout-form";
import type { CheckoutStep } from "@/features/checkout/ui/components/checkout-stepper";

const STEP_SUBTITLES: Record<CheckoutStep, string> = {
  1: "Заказчик и контакты",
  2: "Данные слушателей",
  3: "Подтверждение заявки",
};

export default function CheckoutPage() {
  const router = useRouter();
  const [step, setStep] = useState<CheckoutStep>(1);

  const handleStepChange: CheckoutFormProps["onStepChange"] = (s) => {
    setStep(s);
  };

  return (
    <UserAuthGuard redirectTo="login">
      <PublicPageLayout>
        <div className="flex min-h-0 flex-1 flex-col gap-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold tracking-tight text-balance text-foreground sm:text-3xl">
                Оформление заявки
              </h1>
              <p className="text-sm text-muted-foreground sm:text-base">
                Шаг {step} из 3: {STEP_SUBTITLES[step]}
              </p>
            </div>
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="self-start sm:self-auto"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Назад
            </Button>
          </div>
          <CheckoutForm onStepChange={handleStepChange} />
        </div>
      </PublicPageLayout>
    </UserAuthGuard>
  );
}
