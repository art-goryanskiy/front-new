"use client";

import { memo, useCallback } from "react";
import type {
  ProgramPricing,
  ProgramSubProgramEntity,
} from "@/shared/api/generated/graphql";
import { PROGRAM_DETAIL_CLASSES } from "../constants/program-detail-constants";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useAddToCart } from "@/entities/cart/api/use-add-to-cart";
import { useToastState } from "@/shared/store/toast-store";
import { formatPrice } from "@/shared/lib/helpers/format-helpers";
import { useRouter } from "next/navigation";
import { saveReturnUrl } from "@/shared/lib/auth/utils/auth-redirect-utils";
import { AUTH_GUARD_ROUTES } from "@/shared/lib/auth/constants/auth-guard-constants";

interface ProgramDetailSubProgramsProps {
  programId: string;
  subPrograms: ProgramSubProgramEntity[];
  programPricing: ProgramPricing[];
}

function isPricingWithPrice(
  p: ProgramPricing
): p is ProgramPricing & { price: number } {
  return typeof p.price === "number" && p.price > 0;
}

export const ProgramDetailSubPrograms = memo(
  function ProgramDetailSubPrograms({
    programId,
    subPrograms,
    programPricing,
  }: ProgramDetailSubProgramsProps) {
    const router = useRouter();
    const { addToCart, loading } = useAddToCart();
    const { showToast } = useToastState();

    const firstPricingWithPrice = programPricing.findIndex(isPricingWithPrice);
    const canAddToCart =
      firstPricingWithPrice >= 0 && subPrograms.length > 0;

    const handleAddSubProgramToCart = useCallback(
      async (subProgramIndex: number) => {
        if (firstPricingWithPrice < 0) return;
        try {
          await addToCart({
            programId,
            pricingIndex: firstPricingWithPrice,
            quantity: 1,
            subProgramIndex,
          });
          showToast("success", "Подпрограмма добавлена в корзину");
        } catch (err) {
          const e = err as {
            networkError?: { statusCode?: number };
            graphQLErrors?: Array<{ extensions?: { code?: string } }>;
          };
          const is401 =
            e?.networkError?.statusCode === 401 ||
            e?.graphQLErrors?.some(
              (g) => g?.extensions?.code === "UNAUTHENTICATED"
            );
          if (is401) {
            saveReturnUrl(window.location.pathname);
            router.replace(AUTH_GUARD_ROUTES.login);
            return;
          }
          showToast("error", "Не удалось добавить в корзину");
        }
      },
      [addToCart, firstPricingWithPrice, programId, router, showToast]
    );

    const price =
      firstPricingWithPrice >= 0
        ? programPricing[firstPricingWithPrice]?.price ?? null
        : null;

    return (
      <section
        id="subprograms"
        className={`${PROGRAM_DETAIL_CLASSES.section} scroll-mt-28`}
      >
        <h2 className={PROGRAM_DETAIL_CLASSES.sectionTitle}>
          Подпрограммы
        </h2>
        <div className={PROGRAM_DETAIL_CLASSES.subProgramsList}>
          {subPrograms.map((subProgram, index) => (
            <div
              key={index}
              className={PROGRAM_DETAIL_CLASSES.subProgramCard}
            >
              <h3 className="mb-2 text-sm font-semibold text-foreground sm:text-base">
                {subProgram.title}
              </h3>
              {subProgram.description && (
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {subProgram.description}
                </p>
              )}
              {canAddToCart && (
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {price != null && price > 0 && (
                    <span className="text-sm font-medium text-muted-foreground">
                      {formatPrice(price)} ₽
                    </span>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleAddSubProgramToCart(index)}
                    disabled={loading}
                  >
                    <ShoppingCart className="mr-1.5 h-4 w-4" />
                    {loading ? "Добавление…" : "В корзину"}
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    );
  }
);
