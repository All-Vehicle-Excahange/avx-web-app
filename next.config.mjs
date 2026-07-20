/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  experimental: {
    reactCompiler: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  images: {
    // Only use custom loader in production, fallback to default in dev to avoid missing loader prop error
    loader: process.env.NODE_ENV === "production" ? "custom" : "default",
    loaderFile: process.env.NODE_ENV === "production" ? "./src/lib/imagekitLoader.js" : undefined,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // Proxy rewrite rules for ImageKit and Local API
  async rewrites() {
    return [
      {
        // Proxy API requests to backend during local development to fix SameSite Cookie issues
        source: "/api/v1/:path*",
        destination: `${process.env.BACKEND_URL}/api/v1/:path*`,
      },
      {
        // Local dev environment proxy
        source: "/cdn-image/:path*",
        destination: "https://ik.imagekit.io/reecommKit/:path*",
      },
      {
        // Production custom subdomain
        has: [
          {
            type: "header",
            key: "host",
            value: "image.reecomm.com",
          },
        ],
        source: "/:path*",
        destination: "https://ik.imagekit.io/reecommKit/:path*",
      },
    ];
  },
};

export default nextConfig;
