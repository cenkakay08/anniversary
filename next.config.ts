import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  output: "export",
  basePath: isProd ? "/anniversary" : "",
  assetPrefix: isProd ? "/anniversary" : "",
};

export default nextConfig;
