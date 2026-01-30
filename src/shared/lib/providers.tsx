"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ApolloClientProvider } from "./apollo/provider";
import { AuthInitializer } from "./auth/auth-initializer";

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
      </ApolloClientProvider>
    </NextThemesProvider>
  );
}
