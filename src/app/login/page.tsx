import type { Metadata } from "next";
import { LoginFormPage } from "@/components/ui/animated-characters-login-page";
import { generateMetadata as generateSeoMetadata } from "@/shared/lib/seo/metadata";

export const metadata: Metadata = generateSeoMetadata({
  title: "Вход",
  description: "Вход в личный кабинет",
  url: "/login",
  noindex: true,
});

export default function LoginPage() {
  return (
    <main className="min-h-screen w-full bg-background">
      <LoginFormPage />
    </main>
  );
}
