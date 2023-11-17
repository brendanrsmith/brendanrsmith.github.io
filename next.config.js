const debug = process.env.NODE_ENV !== "production";

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  assetPrefix: !debug ? "/" : "",
  output: "export",
  images: { unoptimized: true },
};

module.exports = nextConfig;
