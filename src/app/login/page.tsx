import dynamic from "next/dynamic";
import LoginLoading from "./loading";

const LoginFormPage = dynamic(
  () =>
    import("@/components/ui/animated-characters-login-page").then(
      (m) => m.LoginFormPage
    ),
  {
    loading: () => <LoginLoading />,
    ssr: false,
  }
);

export default function LoginPage() {
  return (
    <main className="min-h-screen w-full bg-background">
      <LoginFormPage />
    </main>
  );
}
