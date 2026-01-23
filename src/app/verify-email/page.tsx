"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button, Card, CardBody, Spinner } from "@heroui/react";
import Image from "next/image";
import { Mail, CheckCircle2, XCircle } from "lucide-react";
import { useVerifyEmail } from "@/features/auth/api/use-verify-email";
import { useMe } from "@/features/auth/api/use-me";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email");
  const { verifyEmail, loading: verifying, error } = useVerifyEmail();
  const { user, loading: meLoading } = useMe();
  const [mounted, setMounted] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(
    null
  );

  // Извлекаем token из hash (#token=...) после монтирования
  useEffect(() => {
    queueMicrotask(() => {
      setMounted(true);
      const hash = window.location.hash;
      const tokenMatch = hash.match(/token=([^&]+)/);
      if (tokenMatch) {
        setToken(decodeURIComponent(tokenMatch[1]));
      }
    });
  }, []);

  // Вызываем мутацию при наличии token
  useEffect(() => {
    if (mounted && token && !verifying && !isVerified && !verificationError) {
      verifyEmail({ token })
        .then((success) => {
          if (success) {
            setIsVerified(true);
            // После успешной верификации бэк поставит cookies
            // useMe автоматически получит пользователя
          }
        })
        .catch((err) => {
          setVerificationError(err.message || "Ошибка при подтверждении email");
        });
    }
  }, [mounted, token, verifying, isVerified, verificationError, verifyEmail]);

  // После успешной верификации и получения пользователя - редирект
  useEffect(() => {
    if (isVerified && user && !meLoading) {
      // Небольшая задержка для показа успешного сообщения
      const timer = setTimeout(() => {
        router.push("/admin");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isVerified, user, meLoading, router]);

  // Пока не смонтирован - показываем fallback
  if (!mounted) {
    return (
      <div className="min-h-screen w-full bg-linear-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <Card className="bg-white dark:bg-slate-900 shadow-lg">
            <CardBody className="p-8">
              <div className="flex flex-col items-center text-center space-y-6">
                <Spinner size="lg" color="primary" />
                <p className="text-slate-600 dark:text-slate-400">
                  Загрузка...
                </p>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }

  // Если нет token - показываем обычное сообщение
  if (!token) {
    return (
      <div className="min-h-screen w-full bg-linear-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          {/* Логотип */}
          <div className="flex justify-center mb-8">
            <button
              onClick={() => router.push("/")}
              className="focus:outline-none focus:ring-0 rounded-lg hover:opacity-80 transition-opacity duration-200"
              aria-label="Перейти на главную страницу"
            >
              <Image
                src="/logo-full.svg"
                alt="ООО ЦОК СТАНДАРТ ПЛЮС"
                width={300}
                height={72}
                className="h-16 w-auto object-contain"
                style={{ width: "auto" }}
                priority
              />
            </button>
          </div>

          {/* Карточка с сообщением */}
          <Card className="bg-white dark:bg-slate-900 shadow-lg">
            <CardBody className="p-8">
              <div className="flex flex-col items-center text-center space-y-6">
                {/* Иконка */}
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                  <Mail className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                </div>

                {/* Заголовок */}
                <div>
                  <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-2">
                    Проверьте вашу почту
                  </h1>
                  <p className="text-slate-600 dark:text-slate-400">
                    Мы отправили письмо для подтверждения на адрес
                  </p>
                  {email && (
                    <p className="text-primary-600 dark:text-primary-400 font-semibold mt-2 break-all">
                      {email}
                    </p>
                  )}
                </div>

                {/* Описание */}
                <div className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
                  <p>
                    Пожалуйста, проверьте вашу почту и перейдите по ссылке в
                    письме для подтверждения регистрации.
                  </p>
                  <p>
                    Если письмо не пришло, проверьте папку &quot;Спам&quot; или
                    попробуйте зарегистрироваться снова.
                  </p>
                </div>

                {/* Кнопки */}
                <div className="w-full space-y-3 pt-4">
                  <Button
                    color="primary"
                    className="w-full"
                    onPress={() => router.push("/login")}
                  >
                    Вернуться к входу
                  </Button>
                  <Button
                    variant="light"
                    className="w-full"
                    onPress={() => router.push("/")}
                  >
                    На главную
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }

  // Состояние загрузки верификации
  if (verifying) {
    return (
      <div className="min-h-screen w-full bg-linear-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <Card className="bg-white dark:bg-slate-900 shadow-lg">
            <CardBody className="p-8">
              <div className="flex flex-col items-center text-center space-y-6">
                <Spinner size="lg" color="primary" />
                <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
                  Подтверждение email...
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                  Пожалуйста, подождите
                </p>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }

  // Состояние ошибки
  if (verificationError || error) {
    return (
      <div className="min-h-screen w-full bg-linear-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <Card className="bg-white dark:bg-slate-900 shadow-lg">
            <CardBody className="p-8">
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                  <XCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-2">
                    Ошибка подтверждения
                  </h1>
                  <p className="text-slate-600 dark:text-slate-400">
                    {verificationError ||
                      error?.message ||
                      "Не удалось подтвердить email"}
                  </p>
                </div>
                <div className="w-full space-y-3 pt-4">
                  <Button
                    color="primary"
                    className="w-full"
                    onPress={() => router.push("/login")}
                  >
                    Вернуться к входу
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }

  // Состояние успеха
  if (isVerified) {
    return (
      <div className="min-h-screen w-full bg-linear-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <Card className="bg-white dark:bg-slate-900 shadow-lg">
            <CardBody className="p-8">
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-2">
                    Email успешно подтвержден!
                  </h1>
                  <p className="text-slate-600 dark:text-slate-400">
                    {meLoading
                      ? "Выполняется вход..."
                      : "Вы будете перенаправлены в панель администратора"}
                  </p>
                </div>
                {meLoading && <Spinner size="lg" color="primary" />}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }

  return null;
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen w-full bg-linear-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center">
          <div className="text-slate-600 dark:text-slate-400">Загрузка...</div>
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
