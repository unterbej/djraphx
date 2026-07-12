import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [{ pathname: '/**' }],
  },
  serverExternalPackages: ['bcryptjs', '@libsql/client', 'sharp'],
  allowedDevOrigins: ['unterbej.at'],
};

export default nextConfig;
