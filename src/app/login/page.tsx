import { AuthFormContainer } from "@/features/auth/ui/auth-form-container";

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full bg-linear-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <AuthFormContainer />
    </div>
  );
}
