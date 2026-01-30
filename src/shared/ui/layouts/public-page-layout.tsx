import { PublicHeader } from "@/widgets/public/header/public-header";
import { PublicBackdrop } from "@/widgets/public/background/public-backdrop";
import { PublicFooter } from "@/widgets/public/footer/public-footer";

interface PublicPageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function PublicPageLayout({
  children,
  className = "",
}: PublicPageLayoutProps) {
  return (
    <div
      className={`relative min-h-screen overflow-x-hidden bg-background ${className}`}
    >
      <PublicBackdrop />
      <PublicHeader />
      <main className="relative z-10 mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        {children}
      </main>
      <PublicFooter />
    </div>
  );
}
