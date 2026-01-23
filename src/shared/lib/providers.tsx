"use client";

import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ApolloClientProvider } from "./apollo/provider";
import { AuthInitializer } from "./auth/auth-initializer";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      <HeroUIProvider>
        <ApolloClientProvider>
          <AuthInitializer />
          {children}
        </ApolloClientProvider>
      </HeroUIProvider>
    </NextThemesProvider>
  );
}
