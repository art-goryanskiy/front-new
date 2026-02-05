"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { useMe } from "@/features/auth/api/use-me";
import { useVerifyEmail } from "@/features/auth/api/use-verify-email";
import { useApolloClient } from "@apollo/client/react";
import { CheckCircle2, XCircle } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email");
  const { verifyEmail, loading: verifying, error } = useVerifyEmail();
  const { loading: meLoading } = useMe();
  const [mounted, setMounted] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState(false);
  const [verificationError, setVerificationError] = useState<
    string | null
  >(null);
  const apollo = useApolloClient();

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
    if (
      mounted &&
      token &&
      !verifying &&
      !isVerified &&
      !verificationError
    ) {
      verifyEmail({ token })
        .then((success) => {
          if (success) {
            setIsVerified(true);
            // После успешной верификации бэк поставит cookies
            // useMe автоматически получит пользователя
            apollo.resetStore();
          }
        })
        .catch((err) => {
          setVerificationError(
            err.message || "Ошибка при подтверждении email"
          );
        });
    }
  }, [
    mounted,
    token,
    verifying,
    isVerified,
    verificationError,
    verifyEmail,
    apollo,
  ]);

  // После успешной верификации и получения пользователя - редирект
  useEffect(() => {
    if (!isVerified) return;

    const timer = setTimeout(() => {
      router.replace("/");
    }, 2000);

    return () => clearTimeout(timer);
  }, [isVerified, router]);

  // Пока не смонтирован - показываем fallback
  if (!mounted) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-background px-4">
        <div className="w-full max-w-md">
          <Card className="bg-card shadow-lg">
            <CardContent className="p-8">
              <div className="flex flex-col items-center space-y-6 text-center">
                <Spinner size={32} />
                <p className="text-muted-foreground">Загрузка...</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Если нет token - показываем обычное сообщение
  if (!token) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-background px-4">
        <div className="w-full max-w-md">
          {/* Карточка с сообщением */}
          <Card className="bg-card shadow-lg">
            <CardContent className="p-8">
              <div className="flex flex-col items-center space-y-6 text-center">
                {/* Логотип */}
                <div className="flex justify-center">
                  <Image
                    src="/logo-full.svg"
                    alt="ООО ЦОК СТАНДАРТ ПЛЮС"
                    width={200}
                    height={48}
                    className="h-12 w-auto object-contain"
                    style={{ width: "auto" }}
                  />
                </div>

                {/* Заголовок */}
                <div>
                  <h1 className="mb-2 text-3xl font-bold text-foreground">
                    Проверьте вашу почту
                  </h1>
                  <p className="text-muted-foreground">
                    Мы отправили письмо для подтверждения на адрес
                  </p>
                  {email && (
                    <p className="mt-2 font-semibold break-all text-primary">
                      {email}
                    </p>
                  )}
                </div>

                {/* Описание */}
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    Пожалуйста, проверьте вашу почту и перейдите по
                    ссылке в письме для подтверждения регистрации.
                  </p>
                  <p>
                    Если письмо не пришло, проверьте папку
                    &quot;Спам&quot; или попробуйте зарегистрироваться
                    снова.
                  </p>
                </div>

                {/* Кнопки */}
                <div className="w-full space-y-3 pt-4">
                  <Button
                    className="w-full"
                    onClick={() => router.push("/login")}
                  >
                    Вернуться к входу
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full"
                    onClick={() => router.push("/")}
                  >
                    На главную
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Состояние загрузки верификации
  if (verifying) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-background px-4">
        <div className="w-full max-w-md">
          <Card className="bg-card shadow-lg">
            <CardContent className="p-8">
              <div className="flex flex-col items-center space-y-6 text-center">
                <Spinner size={32} />
                <h1 className="text-2xl font-bold text-foreground">
                  Подтверждение email...
                </h1>
                <p className="text-muted-foreground">
                  Пожалуйста, подождите
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Состояние ошибки
  if (verificationError || error) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-background px-4">
        <div className="w-full max-w-md">
          <Card className="bg-card shadow-lg">
            <CardContent className="p-8">
              <div className="flex flex-col items-center space-y-6 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
                  <XCircle className="h-8 w-8 text-destructive" />
                </div>
                <div>
                  <h1 className="mb-2 text-2xl font-bold text-foreground">
                    Ошибка подтверждения
                  </h1>
                  <p className="text-muted-foreground">
                    {verificationError ||
                      error?.message ||
                      "Не удалось подтвердить email"}
                  </p>
                </div>
                <div className="w-full space-y-3 pt-4">
                  <Button
                    className="w-full"
                    onClick={() => router.push("/login")}
                  >
                    Вернуться к входу
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Состояние успеха
  if (isVerified) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-background px-4">
        <div className="w-full max-w-md">
          <Card className="bg-card shadow-lg">
            <CardContent className="p-8">
              <div className="flex flex-col items-center space-y-6 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
                  <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h1 className="mb-2 text-2xl font-bold text-foreground">
                    Email успешно подтвержден!
                  </h1>
                  <p className="text-muted-foreground">
                    {meLoading
                      ? "Выполняется вход..."
                      : "Вы будете перенаправлены на главную страницу"}
                  </p>
                </div>
                {meLoading && <Spinner size={32} />}
              </div>
            </CardContent>
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
        <div className="flex min-h-screen w-full items-center justify-center bg-background">
          <div className="text-muted-foreground">Загрузка...</div>
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
