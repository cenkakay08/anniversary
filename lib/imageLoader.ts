export default function imageLoader({
  src,
  width,
}: {
  src: string;
  width: number;
}) {
  // src is expected to be like "/images/my-image.jpg" or from a StaticImageData import which might be hashed

  // Check if it's a local image we want to optimize
  const isOptimizable =
    src.includes("/images/") || src.includes("_next/static/media/");

  // Skip SVGs - they are already vector and shouldn't be "optimized" by our script
  if (
    !isOptimizable ||
    src.toLowerCase().endsWith(".svg") ||
    src.includes(".svg?")
  ) {
    return src;
  }

  // Pre-generated widths in our script
  const supportedWidths = [320, 480, 640, 800, 960, 1200];

  // Find the closest width from our supported list (equal or larger)
  const targetWidth =
    supportedWidths.find((w) => w >= width) ||
    supportedWidths[supportedWidths.length - 1];

  // Extract the filename from the path
  let filename = src.split("/").pop()?.split("?")[0];

  if (!filename) return src;

  // Strip Next.js hash if present (e.g., mmexport...2141e3b8.jpg -> mmexport...jpg)
  const parts = filename.split(".");
  if (parts.length > 2) {
    filename = parts[0] + "." + parts[parts.length - 1];
  }

  // Check if we are running in production build (where basePath is usually "/anniversary")
  // For local development, Next.js usually serves from the root.
  const isProd =
    typeof process !== "undefined" && process.env.NODE_ENV === "production";
  const prefix = isProd ? "/anniversary" : "";

  // Return the path to the optimized version
  return `${prefix}/images/optimized/${targetWidth}/${filename}`;
}
