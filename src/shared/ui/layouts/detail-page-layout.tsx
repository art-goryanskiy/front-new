import { PublicHeader } from "@/widgets/public/header/public-header";
import { PublicBackdrop } from "@/widgets/public/background/public-backdrop";
import { PublicFooter } from "@/widgets/public/footer/public-footer";

interface DetailPageLayoutProps {
  children: React.ReactNode;
  schemas?: Array<{ type: string; data: object }>;
}

export function DetailPageLayout({
  children,
  schemas = [],
}: DetailPageLayoutProps) {
  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema.data),
          }}
        />
      ))}
      <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-background">
        <PublicBackdrop />
        <PublicHeader />
        <main className="relative z-10 mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          {children}
        </main>
        <PublicFooter />
      </div>
    </>
  );
}
