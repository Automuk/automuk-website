import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  assetPrefix: process.env.NODE_ENV === "production" ? "" : undefined,
  env: {
    BACKEND_URL: process.env.BACKEND_URL,
  },
};

export default nextConfig;
