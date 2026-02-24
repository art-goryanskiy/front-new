"use client";

import { lazy, Suspense } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ApolloClientProvider } from "./apollo/provider";
import { AuthInitializer } from "./auth/auth-initializer";
import type { InitialAuthState } from "@/shared/store/auth-store";

const Toaster = lazy(() =>
  import("@/widgets/admin/toaster/toaster").then((mod) => ({
    default: mod.Toaster,
  }))
);

export function Providers({
  children,
  initialAuth,
}: {
  children: React.ReactNode;
  initialAuth?: InitialAuthState;
}) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
    >
      <ApolloClientProvider>
        <AuthInitializer initialAuth={initialAuth} />
        {children}
        <Suspense fallback={null}>
          <Toaster />
        </Suspense>
      </ApolloClientProvider>
    </NextThemesProvider>
  );
}
