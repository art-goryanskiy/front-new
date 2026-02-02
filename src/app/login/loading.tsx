export default function LoginLoading() {
  return (
    <main className="min-h-screen w-full bg-background">
      <div className="flex min-h-screen items-center justify-center p-8">
        <div className="w-full max-w-[420px] text-center">
          <div className="mb-12">
            <h1 className="text-4xl font-semibold tracking-tighter text-black dark:text-white md:text-6xl">
              Стандарт +
            </h1>
            <p className="mt-1 text-xl text-black/80 dark:text-white/80">
              учебный центр
            </p>
          </div>
          <div
            className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent mx-auto"
            aria-hidden
          />
        </div>
      </div>
    </main>
  );
}
