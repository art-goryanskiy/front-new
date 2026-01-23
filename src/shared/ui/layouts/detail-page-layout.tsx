import { PublicHeader } from "@/widgets/public/header/public-header";

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
      <div className="min-h-screen bg-background">
        <PublicHeader />
        <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          {children}
        </main>
      </div>
    </>
  );
}
