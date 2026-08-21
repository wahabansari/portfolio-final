import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The repo lives under a OneDrive path with a lockfile above it; pin the root
  // so Turbopack does not walk up out of the project.
  turbopack: { root: __dirname },
};

export default nextConfig;
