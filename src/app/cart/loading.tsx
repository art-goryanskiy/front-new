import { OrbitalLoader } from "@/components/ui/orbital-loader";

export default function CartLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <OrbitalLoader />
    </div>
  );
}
