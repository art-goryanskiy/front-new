"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { UserAuthGuard } from "@/shared/lib/auth/user-auth-guard";
import { PublicPageLayout } from "@/shared/ui/layouts/public-page-layout";
import { OrdersList } from "@/widgets/orders/orders-list/orders-list";

export default function OrdersPage() {
  return (
    <UserAuthGuard redirectTo="login">
      <PublicPageLayout>
        <div className="flex min-h-0 flex-1 flex-col gap-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold tracking-tight text-balance text-foreground sm:text-3xl">
                Мои заявки
              </h1>
              <p className="text-sm text-muted-foreground sm:text-base">
                Список ваших заявок и их статусы.
              </p>
            </div>
            <Button
              variant="ghost"
              asChild
              className="self-start sm:self-auto"
            >
              <Link href="/profile">
                <ArrowLeft className="mr-2 h-4 w-4" />В профиль
              </Link>
            </Button>
          </div>
          <OrdersList />
        </div>
      </PublicPageLayout>
    </UserAuthGuard>
  );
}
