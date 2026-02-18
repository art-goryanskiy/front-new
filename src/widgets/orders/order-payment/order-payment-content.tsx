"use client";

import { memo, useCallback, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useOrder } from "@/entities/order/api/use-order";
import { useCreateOrderCardPayment } from "@/entities/order/api/use-create-order-card-payment";
import { useCreateOrderInvoice } from "@/entities/order/api/use-create-order-invoice";
import { Surface } from "@/shared/ui/surface/surface";
import { OrderPaymentSkeleton } from "./order-payment-skeleton";
import { ErrorState } from "@/shared/ui/error-state/error-state";
import { formatPriceWithCurrency } from "@/shared/lib/helpers/format-helpers";
import { OrganizationSuggestInput } from "@/shared/ui/form-fields/organization-suggest-input";
import type { OrganizationSuggestion } from "@/shared/ui/form-fields/organization-suggest-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  ArrowLeft,
  CreditCard,
  FileText,
  ExternalLink,
  Download,
  Loader2,
  Sparkles,
} from "lucide-react";
import {
  OrderCustomerType,
  OrderStatus,
} from "@/shared/api/generated/graphql";
import { cn } from "@/lib/utils";

export const OrderPaymentContent = memo(function OrderPaymentContent({
  orderId,
}: {
  orderId: string;
}) {
  const router = useRouter();
  const {
    order,
    loading: orderLoading,
    error: orderError,
  } = useOrder(orderId);
  const { createOrderCardPayment, loading: cardCreating } =
    useCreateOrderCardPayment();
  const { createOrderInvoice, loading: invoiceCreating } =
    useCreateOrderInvoice();

  const [invoiceResult, setInvoiceResult] = useState<{
    pdfUrl: string;
    invoiceId: string;
    incomingInvoiceUrl?: string | null;
  } | null>(null);
  const [payerInn, setPayerInn] = useState("");
  const [payerKpp, setPayerKpp] = useState("");
  const [payerName, setPayerName] = useState("");
  const [payerOrgApiUnavailable, setPayerOrgApiUnavailable] =
    useState(false);
  const [cardPaymentError, setCardPaymentError] = useState<
    string | null
  >(null);

  const needsPayerInn =
    order?.customerType === OrderCustomerType.Self ||
    order?.customerType === OrderCustomerType.Individual;

  const handlePayByCard = useCallback(async () => {
    setCardPaymentError(null);
    const { data, error } = await createOrderCardPayment(orderId);
    if (data?.paymentUrl) {
      window.location.href = data.paymentUrl;
      return;
    }
    setCardPaymentError(
      error ??
        "Не удалось создать платёж. Попробуйте позже или выберите другой способ оплаты."
    );
  }, [orderId, createOrderCardPayment]);

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
  }, [
    orderId,
    needsPayerInn,
    payerInn,
    payerKpp,
    payerName,
    createOrderInvoice,
  ]);

  const handlePayerOrgSelect = useCallback(
    (suggestion: OrganizationSuggestion) => {
      setPayerInn(suggestion.inn);
      setPayerKpp(suggestion.kpp ?? "");
      setPayerName(suggestion.displayName ?? "");
    },
    []
  );

  if (orderLoading && !order) {
    return <OrderPaymentSkeleton />;
  }

  if (orderError) {
    return <ErrorState message={orderError.message} />;
  }

  if (!order) {
    return (
      <Surface variant="floating" className="p-8 text-center">
        <p className="text-muted-foreground">Заявка не найдена.</p>
        <Button
          variant="link"
          className="mt-2"
          onClick={() => router.push("/orders")}
        >
          К списку заявок
        </Button>
      </Surface>
    );
  }

  const isPaymentPending =
    order.status === OrderStatus.AwaitingPayment ||
    (order.status as string) === "PAYMENT_PENDING";
  const isPaid =
    order.status === OrderStatus.Paid ||
    order.status === OrderStatus.Completed ||
    (order.status as string) === "DOCUMENTS_GENERATED";

  if (!isPaymentPending && !isPaid) {
    return (
      <Surface variant="floating" className="p-8 text-center">
        <p className="text-muted-foreground">
          Оплата для этой заявки недоступна (статус: {order.status}).
        </p>
        <Button asChild variant="outline" className="mt-4">
          <Link href={`/orders/${orderId}`}>К заявке</Link>
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
        <h1 className="mt-4 text-xl font-semibold text-foreground">
          Оплата получена
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Заявка №{order.number ?? order.id} оплачена.
        </p>
        <Button asChild variant="outline" className="mt-6">
          <Link href={`/orders/${orderId}`}>К заявке</Link>
        </Button>
      </Surface>
    );
  }

  return (
    <div className="mx-auto w-full max-w-4xl space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            Оплата заявки
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground">
            Заявка №{order.number ?? order.id}
          </h1>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="self-start sm:self-auto"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Назад
        </Button>
      </div>

      <Surface variant="floating" className="overflow-hidden p-0">
        <div className="border-b border-border/60 bg-muted/20 px-6 py-4">
          <p className="text-sm font-medium text-muted-foreground">
            Сумма к оплате
          </p>
          <p className="text-3xl font-bold tracking-tight text-primary">
            {formatPriceWithCurrency(order.totalAmount)}
          </p>
        </div>
        <div className="p-6">
          <ul className="space-y-2 text-sm text-muted-foreground">
            {order.lines.map((line, idx) => (
              <li
                key={`${line.programId}-${idx}`}
                className="flex justify-between gap-4"
              >
                <span className="min-w-0 flex-1 text-foreground">
                  {line.subProgramTitle ?? line.programTitle}
                </span>
                <span className="shrink-0">
                  {formatPriceWithCurrency(line.lineAmount)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Surface>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          Способ оплаты
        </h2>
        <Tabs defaultValue="card" className="w-full">
          <TabsList
            className={cn(
              "grid w-full grid-cols-2 rounded-2xl p-1",
              "border border-border/40 bg-muted/50"
            )}
          >
            <TabsTrigger
              value="card"
              className="gap-2 rounded-xl transition-colors"
            >
              <CreditCard className="h-4 w-4" />
              Картой
            </TabsTrigger>
            <TabsTrigger
              value="invoice"
              className="gap-2 rounded-xl transition-colors"
            >
              <FileText className="h-4 w-4" />
              По счёту
            </TabsTrigger>
          </TabsList>

          <TabsContent value="card" className="mt-6">
            <Surface
              variant="floating"
              className="space-y-6 p-6 ring-1 ring-border/20 transition-shadow hover:ring-primary/10"
            >
              <p className="text-sm text-muted-foreground">
                Оплата банковской картой через защищённую форму
                Т-Банка. После нажатия кнопки вы будете перенаправлены
                на страницу оплаты.
              </p>
              {cardPaymentError && (
                <p
                  className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
                  role="alert"
                >
                  {cardPaymentError}
                </p>
              )}
              <Button
                size="lg"
                className="w-full min-w-[200px] gap-2 font-medium sm:w-auto"
                onClick={handlePayByCard}
                disabled={cardCreating}
              >
                {cardCreating ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <CreditCard className="h-4 w-4" />
                )}
                Оплатить картой
              </Button>
            </Surface>
          </TabsContent>

          <TabsContent value="invoice" className="mt-6">
            <Surface
              variant="floating"
              className="space-y-6 p-6 ring-1 ring-border/20 transition-shadow hover:ring-primary/10"
            >
              {!invoiceResult ? (
                <>
                  {needsPayerInn && (
                    <div className="space-y-4">
                      {payerOrgApiUnavailable ? (
                        <>
                          <div className="space-y-2">
                            <Label htmlFor="payerInn">
                              ИНН плательщика *
                            </Label>
                            <Input
                              id="payerInn"
                              placeholder="10 или 12 цифр"
                              value={payerInn}
                              onChange={(e) =>
                                setPayerInn(
                                  e.target.value
                                    .replace(/\D/g, "")
                                    .slice(0, 12)
                                )
                              }
                              maxLength={12}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="payerKpp">
                              КПП (необязательно)
                            </Label>
                            <Input
                              id="payerKpp"
                              placeholder="9 цифр"
                              value={payerKpp}
                              onChange={(e) =>
                                setPayerKpp(
                                  e.target.value
                                    .replace(/\D/g, "")
                                    .slice(0, 9)
                                )
                              }
                              maxLength={9}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="payerName">
                              Наименование плательщика (необязательно)
                            </Label>
                            <Input
                              id="payerName"
                              placeholder="ФИО или название"
                              value={payerName}
                              onChange={(e) =>
                                setPayerName(e.target.value)
                              }
                            />
                          </div>
                        </>
                      ) : (
                        <OrganizationSuggestInput
                          label="Плательщик (организация или ИП)"
                          placeholder="Введите ИНН или название"
                          description="Выберите организацию из списка — подставятся ИНН, КПП и наименование"
                          onSelect={handlePayerOrgSelect}
                          onApiUnavailableChange={
                            setPayerOrgApiUnavailable
                          }
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
                      Для заявки от организации данные плательщика
                      берутся автоматически.
                    </p>
                  )}
                  <Button
                    size="lg"
                    className="w-full min-w-[200px] gap-2 font-medium sm:w-auto"
                    onClick={handleCreateInvoice}
                    disabled={
                      invoiceCreating ||
                      (needsPayerInn && !payerInn.trim())
                    }
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
                    Счёт выставлен. Скачайте PDF и оплатите по
                    реквизитам.
                  </p>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Button
                      size="lg"
                      className="flex-1 gap-2 font-medium"
                      onClick={() =>
                        window.open(invoiceResult.pdfUrl, "_blank")
                      }
                    >
                      <Download className="h-4 w-4" />
                      Скачать счёт
                    </Button>
                    {invoiceResult.incomingInvoiceUrl && (
                      <Button
                        size="lg"
                        variant="outline"
                        className="flex-1 gap-2"
                        onClick={() =>
                          window.open(
                            invoiceResult.incomingInvoiceUrl!,
                            "_blank"
                          )
                        }
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
          <Link href={`/orders/${orderId}`}>Перейти к заявке</Link>
        </Button>
      </div>
    </div>
  );
});
