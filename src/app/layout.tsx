import type { Metadata } from "next";
import { Providers } from "@/shared/lib/providers";
import { Marck_Script } from "next/font/google";
import "./globals.css";

const marckScript = Marck_Script({
  subsets: ["latin", "cyrillic"],
  weight: ["400"],
  variable: "--font-handwriting",
  display: "swap",
});

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
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.standart82.ru"
  ),
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.standart82.ru",
    siteName: "ООО ЦОК СТАНДАРТ ПЛЮС",
    title: "ООО ЦОК СТАНДАРТ ПЛЮС - Профессиональное обучение",
    description:
      "Профессиональные образовательные программы: повышение квалификации, профессиональная переподготовка, профессиональное обучение.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={marckScript.variable} suppressHydrationWarning>
      <body className="bg-background text-foreground antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
