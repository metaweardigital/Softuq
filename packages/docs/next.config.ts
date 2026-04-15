import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@softuq/react", "@softuq/tokens", "@softuq/tailwind"],
};

export default nextConfig;
