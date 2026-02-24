import type { Metadata } from "next";
import { generateMetadata as generateSeoMetadata } from "@/shared/lib/seo/metadata";

export const metadata: Metadata = generateSeoMetadata({
  title: "Корзина",
  description: "Программы для записи",
  url: "/cart",
  noindex: true,
});

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
