const debug = process.env.NODE_ENV !== "production";
const withMDX = require("@next/mdx")();

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  // Configure `pageExtensions` to include MDX files
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  assetPrefix: !debug ? "/" : "",
  output: "export",
  images: { unoptimized: true },
};

module.exports = withMDX(nextConfig);
