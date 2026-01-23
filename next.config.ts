import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "standart-images.storage.yandexcloud.net",
        port: "",
        pathname: "/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
  },
  // Оптимизация bundle size
  experimental: {
    optimizePackageImports: [
      "@heroui/react",
      "lucide-react",
      "framer-motion",
    ],
  },
  // Компрессия
  compress: true,
  // Оптимизация production builds
};

export default nextConfig;
