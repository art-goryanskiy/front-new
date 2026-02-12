"use client";

import { lazy, Suspense } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ApolloClientProvider } from "./apollo/provider";
import { AuthInitializer } from "./auth/auth-initializer";

const Toaster = lazy(() =>
  import("@/widgets/admin/toaster/toaster").then((mod) => ({
    default: mod.Toaster,
  }))
);

export function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
    >
      <ApolloClientProvider>
        <AuthInitializer />
        {children}
        <Suspense fallback={null}>
          <Toaster />
        </Suspense>
      </ApolloClientProvider>
    </NextThemesProvider>
  );
}
