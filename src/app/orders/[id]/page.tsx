"use client";

import { useParams } from "next/navigation";
import { UserAuthGuard } from "@/shared/lib/auth/user-auth-guard";
import { PublicPageLayout } from "@/shared/ui/layouts/public-page-layout";
import { OrderDetailContent } from "@/widgets/orders/order-detail/order-detail-content";

export default function OrderDetailPage() {
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : null;

  return (
    <UserAuthGuard redirectTo="login">
      <PublicPageLayout>
        <div className="flex min-h-0 flex-1 flex-col gap-6">
          {id ? (
            <OrderDetailContent orderId={id} />
          ) : (
            <p className="text-muted-foreground">
              Неверный идентификатор заявки.
            </p>
          )}
        </div>
      </PublicPageLayout>
    </UserAuthGuard>
  );
}
