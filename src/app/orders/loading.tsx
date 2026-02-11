export default function OrdersLoading() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center p-8">
      <div
        className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"
        aria-hidden
      />
    </div>
  );
}
