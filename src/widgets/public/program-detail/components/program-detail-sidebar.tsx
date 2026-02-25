import Link from "next/link";
import { memo, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import type { ProgramPricing } from "@/shared/api/generated/graphql";
import { PROGRAM_DETAIL_CLASSES } from "../constants/program-detail-constants";
import { ProgramDetailPricing } from "./program-detail-pricing";
import { ProgramDetailAddToCart } from "./program-detail-add-to-cart";
import { Skeleton } from "@/components/ui/skeleton";
import { Surface } from "@/shared/ui/surface/surface";
import { usePriceVisibility } from "@/shared/store/auth-store";
import { formatPrice } from "@/shared/lib/helpers/format-helpers";
import { CONTACTS_FORM_HREF } from "@/shared/constants/routes";

interface ProgramDetailSidebarProps {
  programId: string;
  programPricing: ProgramPricing[];
  pricingList: ProgramPricing[];
}

export const ProgramDetailSidebar = memo(
  function ProgramDetailSidebar({
    programId,
    programPricing,
    pricingList,
  }: ProgramDetailSidebarProps) {
    const { canSeePrice, isAuthLoading } = usePriceVisibility();

    const minPrice = useMemo(() => {
      if (!pricingList || pricingList.length === 0) return null;
      const prices = pricingList
        .map((p) => p.price ?? null)
        .filter((p): p is number => typeof p === "number");
      if (prices.length === 0) return null;
      return Math.min(...prices);
    }, [pricingList]);

    const priceText = useMemo(() => {
      if (!canSeePrice) return "Войдите, чтобы увидеть стоимость";
      if (minPrice === null || minPrice <= 0)
        return "Цена по запросу";
      return `от ${formatPrice(minPrice)} ₽`;
    }, [canSeePrice, minPrice]);

    return (
      <div className={PROGRAM_DETAIL_CLASSES.sidebar}>
        <div id="pricing" className="h-0 scroll-mt-28" />
        <div className="sticky top-24 hidden lg:block">
          <Surface
            variant="floating"
            className="relative overflow-hidden p-6"
          >
            <div className="pointer-events-none absolute inset-0 opacity-70">
              <div className="absolute -top-28 -right-28 h-[300px] w-[420px] rounded-full bg-primary/10 blur-3xl" />
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/10 to-background/60" />
            </div>

            <div className="relative z-10 space-y-6">
              {isAuthLoading ? (
                <div className="space-y-3">
                  <div className="text-xs font-semibold text-muted-foreground">
                    Стоимость
                  </div>
                  <Skeleton className="h-6 w-28" />
                </div>
              ) : canSeePrice ? (
                <div className="space-y-0">
                  <ProgramDetailPricing pricingList={pricingList} />
                  {pricingList.length > 0 && (
                    <ProgramDetailAddToCart
                      programId={programId}
                      programPricing={programPricing}
                      compact
                    />
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="text-xs font-semibold text-muted-foreground">
                    Стоимость
                  </div>
                  <div className="text-base font-semibold text-foreground">
                    {priceText}
                  </div>
                  <Button asChild className="w-full">
                    <Link href="/login">Войти</Link>
                  </Button>
                </div>
              )}
              {canSeePrice && (
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full"
                  asChild
                >
                  <Link href={CONTACTS_FORM_HREF}>
                    <BookOpen className="mr-2 h-5 w-5" />
                    Записаться на программу
                  </Link>
                </Button>
              )}
            </div>
          </Surface>
        </div>

        {/* Mobile sticky CTA */}
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/80 backdrop-blur-xl lg:hidden">
          <div className="mx-auto flex w-full max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 md:px-8 lg:px-10 xl:px-12">
            <div className="min-w-0 flex-1">
              <div className="text-[11px] font-semibold text-muted-foreground">
                Стоимость
              </div>
              {isAuthLoading ? (
                <Skeleton className="mt-1 h-4 w-24" />
              ) : (
                <div className="truncate text-sm font-semibold text-foreground">
                  {priceText}
                </div>
              )}
            </div>

            {isAuthLoading ? (
              <Skeleton className="h-10 w-28" />
            ) : canSeePrice ? (
              <Button size="lg" asChild>
                <Link href={CONTACTS_FORM_HREF}>
                  <BookOpen className="mr-2 h-5 w-5" />
                  Записаться
                </Link>
              </Button>
            ) : (
              <Button size="lg" asChild>
                <Link href="/login">Войти</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }
);
