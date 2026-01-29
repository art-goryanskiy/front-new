// src/app/admin/layout.tsx
import { AuthGuard } from "@/shared/lib/auth/auth-guard";
import { Header } from "@/widgets/admin/header/header";
import { Sidebar } from "@/widgets/admin/sidebar/sidebar";
import { lazy, Suspense } from "react";

const CommandPalette = lazy(() =>
  import("@/widgets/admin/command-palette/command-palette").then(
    (mod) => ({
      default: mod.CommandPalette,
    })
  )
);

const Toaster = lazy(() =>
  import("@/widgets/admin/toaster/toaster").then((mod) => ({
    default: mod.Toaster,
  }))
);

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="min-h-dvh bg-background [--admin-header-offset:--spacing(16)] lg:flex">
        {/* Sidebar рендерим ОДИН раз — внутри он сам решает desktop/mobile */}
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Header сам sticky, не оборачиваем доп. паддингами */}
          <Header />

          <main className="flex-1 overflow-auto pb-20 lg:pb-0">
            <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 md:px-8 lg:px-10 xl:px-12">
              {children}
            </div>
          </main>
        </div>
        <Suspense fallback={null}>
          <CommandPalette />
        </Suspense>
        <Suspense fallback={null}>
          <Toaster />
        </Suspense>
      </div>
    </AuthGuard>
  );
}
