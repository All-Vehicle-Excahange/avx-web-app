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
    loader: "custom",
    loaderFile: "./src/lib/imagekitLoader.js",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // Proxy rewrite rules for ImageKit
  async rewrites() {
    return [
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
