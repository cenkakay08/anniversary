import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  output: "export",
  basePath: isProd ? "/anniversary" : "",
  assetPrefix: isProd ? "/anniversary" : "",
  images: {
    loader: "custom",
    loaderFile: "./lib/imageLoader.ts",
    deviceSizes: [320, 480, 640, 800, 960, 1200],
    imageSizes: [320], // Still keep a small one for thumbnails if needed
  },
  turbopack: {},
  webpack(config) {
    config.module.rules.push({
      test: /\.(mp3|wav)$/i,
      type: "asset/resource",
    });
    return config;
  },
};

export default nextConfig;
