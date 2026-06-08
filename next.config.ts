import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [{ pathname: '/**' }],
  },
  serverExternalPackages: ['bcryptjs', '@libsql/client'],
};

export default nextConfig;
