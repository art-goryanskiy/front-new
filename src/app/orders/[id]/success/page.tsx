"use client";

import { useParams } from "next/navigation";
import { UserAuthGuard } from "@/shared/lib/auth/user-auth-guard";
import { PublicPageLayout } from "@/shared/ui/layouts/public-page-layout";
import { OrderPaymentReturnContent } from "@/widgets/orders/order-payment-return/order-payment-return-content";

export default function OrderPaymentSuccessPage() {
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : null;

  return (
    <UserAuthGuard redirectTo="login">
      <PublicPageLayout>
        <div className="flex min-h-0 flex-1 flex-col gap-6">
          {id ? (
            <OrderPaymentReturnContent orderId={id} variant="success" />
          ) : (
            <p className="text-muted-foreground">Неверный идентификатор заказа.</p>
          )}
        </div>
      </PublicPageLayout>
    </UserAuthGuard>
  );
}
