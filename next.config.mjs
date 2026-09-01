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
  async redirects() {
    return [
      {
        source: "/used-cars/:path*",
        destination: "/search/buy-used-cars/:path*",
        permanent: true,
      },
      {
        source: "/used-bikes/:path*",
        destination: "/search/buy-used-two-wheelers/:path*",
        permanent: true,
      },
      {
        source: "/search/buy-used-bikes",
        destination: "/search/buy-used-two-wheelers",
        permanent: true,
      },
      {
        source: "/search/buy-used-bike",
        destination: "/search/buy-used-two-wheelers",
        permanent: true,
      },
      {
        source: "/search/buy-used-motorcycles",
        destination: "/search/buy-used-two-wheelers",
        permanent: true,
      },
      {
        source: "/search/buy-used-motorcycle",
        destination: "/search/buy-used-two-wheelers",
        permanent: true,
      },
      {
        source: "/search/buy-used-bikes-:city",
        destination: "/search/buy-used-two-wheelers-:city",
        permanent: true,
      },
      {
        source: "/search/buy-used-bike-:city",
        destination: "/search/buy-used-two-wheelers-:city",
        permanent: true,
      },
      {
        source: "/search/buy-used-creta-cars",
        destination: "/search/buy-used-hyundai-creta-cars",
        permanent: true,
      },
      {
        source: "/search/buy-used-creta-cars-:city",
        destination: "/search/buy-used-hyundai-creta-cars-:city",
        permanent: true,
      },
    ];
  },
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
