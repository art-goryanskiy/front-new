"use client";

import { memo, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useOrder } from "@/entities/order/api/use-order";
import { useCreateOrderSbpLink } from "@/entities/order/api/use-create-order-sbp-link";
import { useCreateOrderInvoice } from "@/entities/order/api/use-create-order-invoice";
import { useOrderSbpLinkStatus } from "@/entities/order/api/use-order-sbp-link-status";
import { Surface } from "@/shared/ui/surface/surface";
import { LoadingState } from "@/shared/ui/loading-state/loading-state";
import { ErrorState } from "@/shared/ui/error-state/error-state";
import { formatPriceWithCurrency } from "@/shared/lib/helpers/format-helpers";
import { OrganizationSuggestInput } from "@/shared/ui/form-fields/organization-suggest-input";
import type { OrganizationSuggestion } from "@/shared/ui/form-fields/organization-suggest-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  CreditCard,
  FileText,
  QrCode,
  ExternalLink,
  Download,
  Loader2,
  Sparkles,
} from "lucide-react";
import { OrderCustomerType } from "@/shared/api/generated/graphql";

function formatDueDate(date: string | unknown): string {
  if (!date) return "—";
  try {
    return new Date(String(date)).toLocaleString("ru-RU", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return String(date);
  }
}

export const OrderPaymentContent = memo(function OrderPaymentContent({
  orderId,
}: {
  orderId: string;
}) {
  const router = useRouter();
  const { order, loading: orderLoading, error: orderError, refetch: refetchOrder } =
    useOrder(orderId);
  const { createOrderSbpLink, loading: sbpCreating } = useCreateOrderSbpLink();
  const { createOrderInvoice, loading: invoiceCreating } = useCreateOrderInvoice();
  const [sbpLink, setSbpLink] = useState<{
    url: string;
    qrId: string;
    dueDate: string;
    qrImageBase64?: string | null;
  } | null>(null);
  // orderSbpLinkStatus только после успешного createOrderSbpLink; интервал 10 с; опрос останавливается при статусе «оплачено»
  const { sbpLinkStatus, refetch: refetchSbpStatus } = useOrderSbpLinkStatus(
    orderId,
    { skip: !orderId || !sbpLink, pollInterval: 10_000 }
  );

  // При статусе СБП «оплачено» обновляем заказ (order.status → PAID)
  useEffect(() => {
    if (sbpLinkStatus?.status === "Ready") {
      refetchOrder();
    }
  }, [sbpLinkStatus?.status, refetchOrder]);

  const [invoiceResult, setInvoiceResult] = useState<{
    pdfUrl: string;
    invoiceId: string;
    incomingInvoiceUrl?: string | null;
  } | null>(null);
  const [payerInn, setPayerInn] = useState("");
  const [payerKpp, setPayerKpp] = useState("");
  const [payerName, setPayerName] = useState("");
  const [payerOrgApiUnavailable, setPayerOrgApiUnavailable] = useState(false);

  const needsPayerInn =
    order?.customerType === OrderCustomerType.Self ||
    order?.customerType === OrderCustomerType.Individual;

  const handleCreateSbpLink = useCallback(async () => {
    const result = await createOrderSbpLink(orderId);
    if (result) {
      setSbpLink({
        url: result.url,
        qrId: result.qrId,
        dueDate: result.dueDate,
        qrImageBase64: result.qrImageBase64,
      });
    }
  }, [orderId, createOrderSbpLink]);

  const handleCreateInvoice = useCallback(async () => {
    const variables: {
      orderId: string;
      payerInn?: string;
      payerKpp?: string;
      payerName?: string;
    } = { orderId };
    if (needsPayerInn && payerInn?.trim()) {
      variables.payerInn = payerInn.trim();
      if (payerKpp?.trim()) variables.payerKpp = payerKpp.trim();
      if (payerName?.trim()) variables.payerName = payerName.trim();
    }
    const result = await createOrderInvoice(variables);
    if (result) {
      setInvoiceResult({
        pdfUrl: result.pdfUrl,
        invoiceId: result.invoiceId,
        incomingInvoiceUrl: result.incomingInvoiceUrl,
      });
    }
  }, [orderId, needsPayerInn, payerInn, payerKpp, payerName, createOrderInvoice]);

  const handlePayerOrgSelect = useCallback((suggestion: OrganizationSuggestion) => {
    setPayerInn(suggestion.inn);
    setPayerKpp(suggestion.kpp ?? "");
    setPayerName(suggestion.displayName ?? "");
  }, []);

  if (orderLoading && !order) {
    return <LoadingState message="Загрузка заказа…" />;
  }

  if (orderError) {
    return <ErrorState message={orderError.message} />;
  }

  if (!order) {
    return (
      <Surface variant="floating" className="p-8 text-center">
        <p className="text-muted-foreground">Заказ не найден.</p>
        <Button variant="link" className="mt-2" onClick={() => router.push("/orders")}>
          К списку заказов
        </Button>
      </Surface>
    );
  }

  const isPaymentPending = order.status === "PAYMENT_PENDING";
  const isPaid = order.status === "PAID" || order.status === "COMPLETED" || order.status === "DOCUMENTS_GENERATED";

  if (!isPaymentPending && !isPaid) {
    return (
      <Surface variant="floating" className="p-8 text-center">
        <p className="text-muted-foreground">
          Оплата для этого заказа недоступна (статус: {order.status}).
        </p>
        <Button asChild variant="outline" className="mt-4">
          <Link href={`/orders/${orderId}`}>К заказу</Link>
        </Button>
      </Surface>
    );
  }

  if (isPaid) {
    return (
      <Surface variant="floating" className="p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Sparkles className="h-7 w-7" />
        </div>
        <h1 className="mt-4 text-xl font-semibold text-foreground">Оплата получена</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Заказ №{order.id} оплачен.
        </p>
        <Button asChild variant="outline" className="mt-6">
          <Link href={`/orders/${orderId}`}>К заказу</Link>
        </Button>
      </Surface>
    );
  }

  return (
    <div className="mx-auto w-full max-w-2xl space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Оплата заказа
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground">
            Заказ №{order.id}
          </h1>
        </div>
        <Button variant="ghost" size="sm" onClick={() => router.back()} className="self-start sm:self-auto">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Назад
        </Button>
      </div>

      <Surface variant="floating" className="overflow-hidden p-0">
        <div className="border-b border-border/60 bg-muted/20 px-6 py-4">
          <p className="text-sm font-medium text-muted-foreground">Сумма к оплате</p>
          <p className="text-3xl font-bold text-primary">
            {formatPriceWithCurrency(order.totalAmount)}
          </p>
        </div>
        <div className="p-6">
          <ul className="space-y-2 text-sm text-muted-foreground">
            {order.lines.map((line, idx) => (
              <li key={`${line.programId}-${idx}`} className="flex justify-between">
                <span className="text-foreground">{line.programTitle}</span>
                <span>{formatPriceWithCurrency(line.lineAmount)}</span>
              </li>
            ))}
          </ul>
        </div>
      </Surface>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Способ оплаты</h2>
        <Tabs defaultValue="sbp" className="w-full">
          <TabsList className="grid w-full grid-cols-2 rounded-2xl p-1">
            <TabsTrigger value="sbp" className="gap-2">
              <CreditCard className="h-4 w-4" />
              СБП
            </TabsTrigger>
            <TabsTrigger value="invoice" className="gap-2">
              <FileText className="h-4 w-4" />
              По счёту
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sbp" className="mt-6">
            <Surface variant="floating" className="space-y-6 p-6">
              {!sbpLink ? (
                <>
                  <p className="text-sm text-muted-foreground">
                    Получите ссылку для оплаты через СБП. Действует ограниченное время.
                  </p>
                  <Button
                    size="lg"
                    className="w-full gap-2 sm:w-auto"
                    onClick={handleCreateSbpLink}
                    disabled={sbpCreating}
                  >
                    {sbpCreating ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <QrCode className="h-4 w-4" />
                    )}
                    Получить ссылку СБП
                  </Button>
                </>
              ) : (
                <div className="space-y-6">
                  {sbpLink.qrImageBase64 && (
                    <div className="flex justify-center rounded-2xl border border-border/60 bg-white p-4">
                      <img
                        src={`data:image/png;base64,${sbpLink.qrImageBase64}`}
                        alt="QR-код для оплаты СБП"
                        className="h-48 w-48 object-contain"
                      />
                    </div>
                  )}
                  <p className="text-center text-xs text-muted-foreground">
                    Ссылка действует до {formatDueDate(sbpLink.dueDate)}
                  </p>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Button
                      size="lg"
                      className="flex-1 gap-2"
                      onClick={() => window.location.assign(sbpLink.url)}
                    >
                      <ExternalLink className="h-4 w-4" />
                      Оплатить по СБП
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={() => refetchSbpStatus()}
                      className="flex-1"
                    >
                      Проверить статус оплаты
                    </Button>
                  </div>
                  {sbpLinkStatus?.status === "Ready" && (
                    <p className="rounded-xl bg-primary/10 px-4 py-2 text-center text-sm font-medium text-primary">
                      Оплата получена
                    </p>
                  )}
                </div>
              )}
            </Surface>
          </TabsContent>

          <TabsContent value="invoice" className="mt-6">
            <Surface variant="floating" className="space-y-6 p-6">
              {!invoiceResult ? (
                <>
                  {needsPayerInn && (
                    <div className="space-y-4">
                      {payerOrgApiUnavailable ? (
                        <>
                          <div className="space-y-2">
                            <Label htmlFor="payerInn">ИНН плательщика *</Label>
                            <Input
                              id="payerInn"
                              placeholder="10 или 12 цифр"
                              value={payerInn}
                              onChange={(e) =>
                                setPayerInn(e.target.value.replace(/\D/g, "").slice(0, 12))
                              }
                              maxLength={12}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="payerKpp">КПП (необязательно)</Label>
                            <Input
                              id="payerKpp"
                              placeholder="9 цифр"
                              value={payerKpp}
                              onChange={(e) =>
                                setPayerKpp(e.target.value.replace(/\D/g, "").slice(0, 9))
                              }
                              maxLength={9}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="payerName">Наименование плательщика (необязательно)</Label>
                            <Input
                              id="payerName"
                              placeholder="ФИО или название"
                              value={payerName}
                              onChange={(e) => setPayerName(e.target.value)}
                            />
                          </div>
                        </>
                      ) : (
                        <OrganizationSuggestInput
                          label="Плательщик (организация или ИП)"
                          placeholder="Введите ИНН или название"
                          description="Выберите организацию из списка — подставятся ИНН, КПП и наименование"
                          onSelect={handlePayerOrgSelect}
                          onApiUnavailableChange={setPayerOrgApiUnavailable}
                        />
                      )}
                      {payerInn && (
                        <p className="text-sm text-muted-foreground">
                          Выбрано: ИНН {payerInn}
                          {payerKpp ? `, КПП ${payerKpp}` : ""}
                          {payerName ? ` — ${payerName}` : ""}
                        </p>
                      )}
                    </div>
                  )}
                  {!needsPayerInn && (
                    <p className="text-sm text-muted-foreground">
                      Для заказа от организации данные плательщика берутся автоматически.
                    </p>
                  )}
                  <Button
                    size="lg"
                    className="w-full gap-2 sm:w-auto"
                    onClick={handleCreateInvoice}
                    disabled={invoiceCreating || (needsPayerInn && !payerInn.trim())}
                  >
                    {invoiceCreating ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <FileText className="h-4 w-4" />
                    )}
                    Выставить счёт
                  </Button>
                </>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Счёт выставлен. Скачайте PDF и оплатите по реквизитам.
                  </p>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Button
                      size="lg"
                      className="flex-1 gap-2"
                      onClick={() => window.open(invoiceResult.pdfUrl, "_blank")}
                    >
                      <Download className="h-4 w-4" />
                      Скачать счёт
                    </Button>
                    {invoiceResult.incomingInvoiceUrl && (
                      <Button
                        size="lg"
                        variant="outline"
                        className="flex-1 gap-2"
                        onClick={() => window.open(invoiceResult.incomingInvoiceUrl!, "_blank")}
                      >
                        <ExternalLink className="h-4 w-4" />
                        Открыть в Т-Бизнес
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </Surface>
          </TabsContent>
        </Tabs>
      </div>

      <div className="flex justify-center">
        <Button variant="link" asChild>
          <Link href={`/orders/${orderId}`}>Перейти к заказу</Link>
        </Button>
      </div>
    </div>
  );
});
