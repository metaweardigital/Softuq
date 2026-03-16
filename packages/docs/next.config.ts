import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@designystem/react", "@designystem/tokens", "@designystem/tailwind"],
};

export default nextConfig;
