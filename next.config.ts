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
};

export default nextConfig;
