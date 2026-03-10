import { PublicHeader } from "@/widgets/public/header/public-header";
import { PublicBackdrop } from "@/widgets/public/background/public-backdrop";
import { PublicFooter } from "@/widgets/public/footer/public-footer";
import { PublicChatWidget } from "@/widgets/public/chat/public-chat-widget";

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
      {/* JSON-LD: schema.data только из кода/сервера, не пользовательский ввод */}
      {schemas.map((schema, index) => (
        <script
          key={`${schema.type}-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema.data),
          }}
        />
      ))}
      <div className="relative flex min-h-screen flex-col bg-background">
        <PublicBackdrop />
        <PublicHeader />
        <main
          id="main-content"
          className="relative z-10 mx-auto w-full max-w-7xl flex-1 overflow-x-hidden px-4 py-8 sm:px-6 md:px-8 lg:px-10 xl:px-12"
        >
          {children}
        </main>
        <PublicFooter />
        <PublicChatWidget />
      </div>
    </>
  );
}
