import type { Metadata } from "next";
import { generateMetadata as generateSeoMetadata } from "@/shared/lib/seo/metadata";

export const metadata: Metadata = generateSeoMetadata({
  title: "Подтверждение email",
  description: "Подтверждение электронной почты",
  url: "/verify-email",
  noindex: true,
});

export default function VerifyEmailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
