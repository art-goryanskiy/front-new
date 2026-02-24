import type { Metadata } from "next";
import { LoginFormPage } from "@/components/ui/animated-characters-login-page";
import { generateMetadata as generateSeoMetadata } from "@/shared/lib/seo/metadata";

export const metadata: Metadata = generateSeoMetadata({
  title: "Регистрация",
  description: "Регистрация на сайте",
  url: "/register",
  noindex: true,
});

export default function RegisterPage() {
  return (
    <main className="min-h-screen w-full bg-background">
      <LoginFormPage />
    </main>
  );
}
