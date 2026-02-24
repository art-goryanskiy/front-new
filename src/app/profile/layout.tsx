import type { Metadata } from "next";
import { generateMetadata as generateSeoMetadata } from "@/shared/lib/seo/metadata";

export const metadata: Metadata = generateSeoMetadata({
  title: "Профиль",
  description: "Личный кабинет",
  url: "/profile",
  noindex: true,
});

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
