import { OrbitalLoader } from "@/components/ui/orbital-loader";

export default function CheckoutLoading() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center p-8">
      <OrbitalLoader />
    </div>
  );
}
