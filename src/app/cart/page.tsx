"use client";

import { UserAuthGuard } from "@/shared/lib/auth/user-auth-guard";
import { PublicPageLayout } from "@/shared/ui/layouts/public-page-layout";
import { CartPageContent } from "@/widgets/cart/cart-page-content";

export default function CartPage() {
  return (
    <UserAuthGuard redirectTo="login">
      <PublicPageLayout>
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Корзина
            </h1>
            <p className="text-sm text-muted-foreground sm:text-base">
              Программы, которые вы выбрали для записи.
            </p>
          </div>
          <CartPageContent />
        </div>
      </PublicPageLayout>
    </UserAuthGuard>
  );
}
