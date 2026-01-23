// src/app/admin/layout.tsx
import { lazy, Suspense } from "react";
import { AuthGuard } from "@/shared/lib/auth/auth-guard";
import { Sidebar } from "@/widgets/admin/sidebar/sidebar";
import { Header } from "@/widgets/admin/header/header";

// Динамические импорты для компонентов, которые не нужны при первой загрузке
const CommandPalette = lazy(() =>
  import("@/widgets/admin/command-palette/command-palette").then((mod) => ({
    default: mod.CommandPalette,
  }))
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
      <div className="flex flex-col min-h-screen via-white bg-linear-to-br from-slate-50 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 lg:flex-row">
        <Sidebar />
        <div className="flex flex-col flex-1 pb-20 min-w-0 sm:pb-16 lg:pb-0">
          <div className="px-4 py-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
            <Header />
          </div>
          <main className="overflow-auto flex-1 px-4 py-6 sm:px-6 md:px-8 lg:px-10 xl:px-12 sm:py-8 lg:py-10">
            <div className="mx-auto w-full max-w-7xl">{children}</div>
          </main>
        </div>
        <div className="lg:hidden">
          <Sidebar />
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
