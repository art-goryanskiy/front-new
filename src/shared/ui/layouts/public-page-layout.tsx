import { PublicHeader } from "@/widgets/public/header/public-header";

interface PublicPageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function PublicPageLayout({
  children,
  className = "",
}: PublicPageLayoutProps) {
  return (
    <div className={`min-h-screen bg-background ${className}`}>
      <PublicHeader />
      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        {children}
      </main>
    </div>
  );
}
