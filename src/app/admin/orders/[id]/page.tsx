"use client";

import { memo, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useAdminOrder } from "@/entities/order/api/use-admin-order";
import { useAdminOrderDocuments } from "@/entities/order/api/use-admin-order-documents";
import { useAdminUpdateOrderStatus } from "@/entities/order/api/use-admin-update-order-status";
import { useAdminDeleteOrder } from "@/entities/order/api/use-admin-delete-order";
import { useAdminSetOrderTrainingDates } from "@/entities/order/api/use-admin-set-order-training-dates";
import {
  useAdminGenerateOrderContract,
  useAdminGenerateOrderAct,
  useAdminGenerateOrderTrainingApplication,
} from "@/entities/order/api/use-admin-order-document-mutations";
import { Surface } from "@/shared/ui/surface/surface";
import { ErrorState } from "@/shared/ui/error-state/error-state";
import { formatPriceWithCurrency } from "@/shared/lib/helpers/format-helpers";
import {
  ORDER_STATUS_LABELS,
  ORDER_STATUS_BADGE_CLASSES,
  ORDER_CUSTOMER_TYPE_LABELS,
} from "@/shared/constants/orders";
import type { OrderFieldsFragment } from "@/shared/api/generated/graphql";
import {
  OrderDocumentKind,
  OrderStatus,
} from "@/shared/api/generated/graphql";
import { useToastState } from "@/shared/store/toast-store";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  FileText,
  FileDown,
  User,
  ArrowLeft,
  Loader2,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";

function formatOrderDate(date: string | unknown): string {
  if (!date) return "—";
  try {
    return new Date(String(date)).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return String(date);
  }
}

/** Только дата (без времени), чтобы не показывать 03:00 из-за UTC. */
function formatDocumentDate(date: string | unknown): string {
  if (!date) return "—";
  try {
    return new Date(String(date)).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return String(date);
  }
}

function documentFileLabel(fileUrl: string): "PDF" | "DOCX" {
  const lower = fileUrl.toLowerCase();
  return lower.endsWith(".docx") || lower.includes(".docx?")
    ? "DOCX"
    : "PDF";
}

function documentKindLabel(kind: OrderDocumentKind): string {
  switch (kind) {
    case OrderDocumentKind.TrainingApplication:
      return "Заявка на обучение";
    case OrderDocumentKind.Contract:
      return "Договор";
    case OrderDocumentKind.Act:
      return "Акт оказанных услуг";
    default:
      return kind;
  }
}

/** Статусы, которые админ может выбрать. «Оплачен» не в списке — выставляется автоматически. */
const ADMIN_STATUS_OPTIONS: { value: OrderStatus; label: string }[] =
  [
    {
      value: OrderStatus.AwaitingPayment,
      label:
        ORDER_STATUS_LABELS["AWAITING_PAYMENT"] ?? "Ожидает оплаты",
    },
    {
      value: OrderStatus.InProgress,
      label: ORDER_STATUS_LABELS["IN_PROGRESS"] ?? "В работе",
    },
    {
      value: OrderStatus.Completed,
      label: ORDER_STATUS_LABELS["COMPLETED"] ?? "Завершён",
    },
    {
      value: OrderStatus.Cancelled,
      label: ORDER_STATUS_LABELS["CANCELLED"] ?? "Отменён",
    },
  ];

type AdminStatusOption = {
  value: OrderStatus;
  label: string;
  disabled?: boolean;
};

/** Для оплаченной заявки админ может только «В работе» или «Завершён»; текущий «Оплачен» показываем, но не даём выбрать. */
function getAdminStatusOptions(
  orderStatus: OrderStatus
): AdminStatusOption[] {
  if (orderStatus === OrderStatus.Paid) {
    return [
      {
        value: OrderStatus.Paid,
        label: ORDER_STATUS_LABELS["PAID"] ?? "Оплачен",
        disabled: true,
      },
      ...ADMIN_STATUS_OPTIONS.filter(
        (opt) =>
          opt.value === OrderStatus.InProgress ||
          opt.value === OrderStatus.Completed
      ),
    ];
  }
  return ADMIN_STATUS_OPTIONS;
}

const AdminOrderDetailContent = memo(
  function AdminOrderDetailContent() {
    const params = useParams();
    const router = useRouter();
    const orderId = typeof params?.id === "string" ? params.id : null;
    const { showToast } = useToastState();

    const { order, loading, error, refetch } = useAdminOrder(orderId);
    const {
      documents,
      loading: documentsLoading,
      refetch: refetchDocs,
    } = useAdminOrderDocuments(orderId);

    const { adminUpdateOrderStatus, loading: statusLoading } =
      useAdminUpdateOrderStatus();
    const { adminDeleteOrder, loading: deleteLoading } =
      useAdminDeleteOrder();
    const { adminGenerateOrderContract, loading: contractLoading } =
      useAdminGenerateOrderContract(orderId ?? "");
    const { adminGenerateOrderAct, loading: actLoading } =
      useAdminGenerateOrderAct(orderId ?? "");
    const {
      adminGenerateOrderTrainingApplication,
      loading: trainingAppLoading,
    } = useAdminGenerateOrderTrainingApplication(orderId ?? "");
    const {
      adminSetOrderTrainingDates,
      loading: trainingDatesLoading,
    } = useAdminSetOrderTrainingDates(orderId ?? "");

    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [trainingStartInput, setTrainingStartInput] = useState("");
    const [trainingEndInput, setTrainingEndInput] = useState("");

    useEffect(() => {
      if (!order) return;
      setTrainingStartInput(
        order.trainingStartDate
          ? new Date(order.trainingStartDate)
              .toISOString()
              .slice(0, 10)
          : ""
      );
      setTrainingEndInput(
        order.trainingEndDate
          ? new Date(order.trainingEndDate).toISOString().slice(0, 10)
          : ""
      );
    }, [order]);

    const handleStatusChange = useCallback(
      async (status: OrderStatus) => {
        if (!orderId) return;
        try {
          await adminUpdateOrderStatus(orderId, status);
          showToast("success", "Статус обновлён");
          refetch();
        } catch (e) {
          showToast(
            "error",
            (e as Error)?.message ?? "Ошибка смены статуса"
          );
        }
      },
      [orderId, adminUpdateOrderStatus, showToast, refetch]
    );

    const handleDelete = useCallback(async () => {
      if (!orderId) return;
      try {
        const ok = await adminDeleteOrder(orderId);
        if (ok) {
          showToast("success", "Заявка удалена");
          router.push("/admin/orders");
        } else {
          showToast("error", "Не удалось удалить заявку");
        }
      } catch (e) {
        showToast(
          "error",
          (e as Error)?.message ?? "Ошибка удаления"
        );
      } finally {
        setDeleteConfirmOpen(false);
      }
    }, [orderId, adminDeleteOrder, router, showToast]);

    const handleGenerateContract = useCallback(async () => {
      try {
        await adminGenerateOrderContract();
        showToast("success", "Договор сформирован");
        refetchDocs();
      } catch (e) {
        showToast(
          "error",
          (e as Error)?.message ?? "Ошибка формирования договора"
        );
      }
    }, [adminGenerateOrderContract, showToast, refetchDocs]);

    const handleGenerateAct = useCallback(async () => {
      try {
        await adminGenerateOrderAct();
        showToast("success", "Акт сформирован");
        refetchDocs();
      } catch (e) {
        showToast(
          "error",
          (e as Error)?.message ?? "Ошибка формирования акта"
        );
      }
    }, [adminGenerateOrderAct, showToast, refetchDocs]);

    const handleSaveTrainingDates = useCallback(async () => {
      try {
        await adminSetOrderTrainingDates({
          trainingStartDate: trainingStartInput
            ? `${trainingStartInput}T00:00:00.000Z`
            : undefined,
          trainingEndDate: trainingEndInput
            ? `${trainingEndInput}T00:00:00.000Z`
            : undefined,
        });
        showToast("success", "Сроки обучения сохранены");
        refetch();
      } catch (e) {
        showToast(
          "error",
          (e as Error)?.message ?? "Ошибка сохранения сроков"
        );
      }
    }, [
      adminSetOrderTrainingDates,
      trainingStartInput,
      trainingEndInput,
      showToast,
      refetch,
    ]);

    const handleGenerateTrainingApplication =
      useCallback(async () => {
        try {
          await adminGenerateOrderTrainingApplication();
          showToast("success", "Заявка на обучение сформирована");
          refetchDocs();
        } catch (e) {
          showToast(
            "error",
            (e as Error)?.message ??
              "Ошибка формирования заявки на обучение"
          );
        }
      }, [
        adminGenerateOrderTrainingApplication,
        showToast,
        refetchDocs,
      ]);

    if (loading && !order) {
      return (
        <Surface
          variant="floating"
          className="animate-pulse rounded-2xl p-8"
        >
          <div className="h-8 w-48 rounded bg-muted" />
          <div className="mt-4 h-4 w-64 rounded bg-muted" />
        </Surface>
      );
    }

    if (error) {
      return <ErrorState message={error.message} />;
    }

    if (!order) {
      return (
        <Surface
          variant="floating"
          className="rounded-2xl p-8 text-center"
        >
          <p className="text-muted-foreground">Заявка не найдена.</p>
          <Button asChild variant="link" className="mt-2">
            <Link href="/admin/orders">К списку заявок</Link>
          </Button>
        </Surface>
      );
    }

    const statusLabel =
      ORDER_STATUS_LABELS[order.status] ?? order.status;
    const statusBadgeClass =
      ORDER_STATUS_BADGE_CLASSES[order.status] ??
      "border-border/60 bg-muted/20 text-muted-foreground";
    const customerTypeLabel =
      ORDER_CUSTOMER_TYPE_LABELS[order.customerType] ??
      order.customerType;
    const displayNumber =
      (order as OrderFieldsFragment & { number?: string | null })
        .number ?? order.id;

    return (
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="gap-2 rounded-xl"
          >
            <Link href="/admin/orders">
              <ArrowLeft className="h-4 w-4" />К списку заявок
            </Link>
          </Button>
        </div>

        <Surface
          variant="floating"
          className="relative overflow-hidden p-6"
        >
          <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-80 rounded-full bg-primary/5 blur-3xl" />
          <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Заявка №{displayNumber}
              </h1>
              <p className="text-sm text-muted-foreground">
                {formatOrderDate(order.createdAt)}
              </p>
              <span
                className={cn(
                  "inline-flex rounded-full border px-3 py-1 text-sm font-semibold",
                  statusBadgeClass
                )}
              >
                {statusLabel}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Select
                value={order.status}
                onValueChange={(v) =>
                  handleStatusChange(v as OrderStatus)
                }
                disabled={statusLoading}
              >
                <SelectTrigger className="w-[180px] rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {getAdminStatusOptions(order.status).map((opt) => (
                    <SelectItem
                      key={opt.value}
                      value={opt.value}
                      disabled={opt.disabled}
                    >
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                variant="destructive"
                size="sm"
                className="rounded-xl"
                onClick={() => setDeleteConfirmOpen(true)}
                disabled={deleteLoading}
              >
                {deleteLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Удалить"
                )}
              </Button>
            </div>
          </div>
        </Surface>

        <Surface variant="floating" className="space-y-6 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-2 text-sm">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">
                Тип заказчика:
              </span>
              <span className="font-medium text-foreground">
                {customerTypeLabel}
              </span>
            </div>
            {order.contactEmail && (
              <div className="text-sm">
                <span className="text-muted-foreground">Email: </span>
                <span className="font-medium text-foreground">
                  {order.contactEmail}
                </span>
              </div>
            )}
            {order.contactPhone && (
              <div className="text-sm">
                <span className="text-muted-foreground">
                  Телефон:{" "}
                </span>
                <span className="font-medium text-foreground">
                  {order.contactPhone}
                </span>
              </div>
            )}
          </div>

          <div>
            <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-foreground">
              <FileText className="h-5 w-5" />
              Позиции заявки
            </h2>
            <ul className="space-y-3">
              {order.lines.map((line, idx) => (
                <li
                  key={`${line.programId}-${line.hours}-${idx}`}
                  className="rounded-xl border border-border/60 bg-muted/10 p-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-foreground">
                        {line.subProgramTitle ?? line.programTitle}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {line.hours} ч × {line.quantity} —{" "}
                        {formatPriceWithCurrency(line.lineAmount)}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-primary">
                      {formatPriceWithCurrency(line.lineAmount)}
                    </span>
                  </div>
                  {line.learners && line.learners.length > 0 && (
                    <div className="mt-3 border-t border-border/60 pt-3">
                      <p className="text-xs font-semibold text-muted-foreground">
                        Слушатели:
                      </p>
                      <ul className="mt-1 space-y-1 text-sm text-foreground">
                        {line.learners.map((l, i) => (
                          <li key={i}>
                            {l.lastName} {l.firstName}
                            {l.middleName ? ` ${l.middleName}` : ""}
                            {l.email ? ` (${l.email})` : ""}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-border/60 pt-4 text-right">
            <span className="text-sm text-muted-foreground">
              Итого:{" "}
            </span>
            <span className="text-xl font-bold text-primary">
              {formatPriceWithCurrency(order.totalAmount)}
            </span>
          </div>
        </Surface>

        {/* Сроки обучения */}
        <Surface variant="floating" className="space-y-4 p-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
            <Calendar className="h-5 w-5" />
            Сроки обучения
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="training-start">Дата начала</Label>
              <Input
                id="training-start"
                type="date"
                value={trainingStartInput}
                onChange={(e) =>
                  setTrainingStartInput(e.target.value)
                }
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="training-end">Дата окончания</Label>
              <Input
                id="training-end"
                type="date"
                value={trainingEndInput}
                onChange={(e) => setTrainingEndInput(e.target.value)}
                className="rounded-xl"
              />
            </div>
          </div>
          <Button
            onClick={handleSaveTrainingDates}
            disabled={trainingDatesLoading}
            className="rounded-xl"
          >
            {trainingDatesLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Сохранить"
            )}
          </Button>
        </Surface>

        {/* Документы заявки (админ): список + кнопки формирования */}
        <Surface variant="floating" className="space-y-4 p-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
            <FileText className="h-5 w-5" />
            Документы
          </h2>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              className="rounded-xl"
              onClick={handleGenerateTrainingApplication}
              disabled={trainingAppLoading}
            >
              {trainingAppLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Сформировать заявку на обучение"
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="rounded-xl"
              onClick={handleGenerateContract}
              disabled={contractLoading}
            >
              {contractLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Сформировать договор"
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="rounded-xl"
              onClick={handleGenerateAct}
              disabled={actLoading}
            >
              {actLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Сформировать акт"
              )}
            </Button>
          </div>
          {documentsLoading ? (
            <p className="text-sm text-muted-foreground">Загрузка…</p>
          ) : documents.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Документы по заявке пока не сформированы.
            </p>
          ) : (
            <ul className="space-y-2">
              {documents.map((doc) => {
                const fileLabel = doc.fileUrl
                  ? documentFileLabel(doc.fileUrl)
                  : null;
                const isPdf = fileLabel === "PDF";
                const isDocx = fileLabel === "DOCX";
                return (
                  <li
                    key={doc.id}
                    className="grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-xl border border-border/50 bg-muted/5 px-4 py-3 sm:gap-4 dark:border-white/10"
                  >
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted/50"
                      aria-hidden
                    >
                      <FileText
                        className={cn(
                          "h-4 w-4",
                          isPdf && "text-red-600 dark:text-red-400",
                          isDocx &&
                            "text-blue-600 dark:text-blue-400",
                          !fileLabel && "text-muted-foreground"
                        )}
                        aria-hidden
                      />
                    </span>
                    <span className="min-w-0 text-sm font-medium text-foreground">
                      {documentKindLabel(doc.kind)}
                    </span>
                    <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                      <span className="shrink-0 text-left text-sm text-muted-foreground tabular-nums">
                        {formatDocumentDate(doc.documentDate)}
                      </span>
                      {doc.fileUrl ? (
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="shrink-0 gap-2 rounded-xl"
                        >
                          <a
                            href={doc.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center"
                          >
                            <FileDown
                              className="h-4 w-4 shrink-0"
                              aria-hidden
                            />
                            Скачать {fileLabel}
                          </a>
                        </Button>
                      ) : (
                        <span className="shrink-0 text-xs text-muted-foreground">
                          —
                        </span>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </Surface>

        <ConfirmDialog
          open={deleteConfirmOpen}
          onOpenChange={setDeleteConfirmOpen}
          title="Удалить заявку?"
          description="Это действие нельзя отменить."
          confirmLabel="Удалить"
          cancelLabel="Отмена"
          variant="destructive"
          onConfirm={handleDelete}
          loading={deleteLoading}
        />
      </div>
    );
  }
);

export default function AdminOrderDetailPage() {
  return <AdminOrderDetailContent />;
}
