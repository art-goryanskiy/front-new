import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Providers } from "@/shared/lib/providers";
import { getViewerServer } from "@/shared/api/server/auth";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "ООО ЦОК СТАНДАРТ ПЛЮС - Профессиональное обучение",
    template: "%s | ООО ЦОК СТАНДАРТ ПЛЮС",
  },
  description:
    "Профессиональные образовательные программы: повышение квалификации, профессиональная переподготовка, профессиональное обучение. Охрана труда, экологическая безопасность и другие направления. ООО ЦОК СТАНДАРТ ПЛЮС.",
  keywords: [
    "профессиональное обучение",
    "повышение квалификации",
    "профессиональная переподготовка",
    "охрана труда",
    "экологическая безопасность",
    "обучение в Крыму",
    "ООО ЦОК СТАНДАРТ ПЛЮС",
    "курсы повышения квалификации",
    "профессиональная переподготовка Крым",
  ],
  authors: [{ name: "ООО ЦОК СТАНДАРТ ПЛЮС" }],
  creator: "ООО ЦОК СТАНДАРТ ПЛЮС",
  publisher: "ООО ЦОК СТАНДАРТ ПЛЮС",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
      "https://www.new.standart82.ru"
  ),
  alternates: {
    canonical:
      process.env.NEXT_PUBLIC_SITE_URL ||
      "https://www.new.standart82.ru",
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url:
      process.env.NEXT_PUBLIC_SITE_URL ||
      "https://www.new.standart82.ru",
    siteName: "ООО ЦОК СТАНДАРТ ПЛЮС",
    title: "ООО ЦОК СТАНДАРТ ПЛЮС - Профессиональное обучение",
    description:
      "Профессиональные образовательные программы: повышение квалификации, профессиональная переподготовка, профессиональное обучение.",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
      {
        url: "/favicon-96x96.png",
        sizes: "96x96",
        type: "image/png",
      },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const cookie = cookieStore.toString();
  const viewer = await getViewerServer(cookie);
  const initialAuth = {
    user: viewer,
    isAuthenticated: !!viewer,
    isLoading: false,
  } as const;

  return (
    <html lang="ru" suppressHydrationWarning>
      <body className="bg-background text-foreground antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-9999 focus:rounded-lg focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-foreground focus:shadow-lg focus:ring-2 focus:ring-ring focus:outline-none"
        >
          Перейти к основному содержимому
        </a>
        <Providers initialAuth={initialAuth}>{children}</Providers>
      </body>
    </html>
  );
}
