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
      // Legacy /used-cars → hyphenated search slugs (most-specific first)
      {
        source: "/used-cars/:maker/:model/:city",
        destination: "/search/buy-used-:maker-:model-cars-:city",
        permanent: true,
      },
      {
        source: "/used-cars/:maker/:model",
        destination: "/search/buy-used-:maker-:model-cars",
        permanent: true,
      },
      {
        source: "/used-cars/:segment",
        destination: "/search/buy-used-cars-:segment",
        permanent: true,
      },
      {
        source: "/used-cars",
        destination: "/search/buy-used-cars",
        permanent: true,
      },
      // Legacy /used-bikes → hyphenated two-wheeler search slugs
      {
        source: "/used-bikes/:maker/:model/:city",
        destination: "/search/buy-used-:maker-:model-two-wheelers-:city",
        permanent: true,
      },
      {
        source: "/used-bikes/:maker/:model",
        destination: "/search/buy-used-:maker-:model-two-wheelers",
        permanent: true,
      },
      {
        source: "/used-bikes/:segment",
        destination: "/search/buy-used-two-wheelers-:segment",
        permanent: true,
      },
      {
        source: "/used-bikes",
        destination: "/search/buy-used-two-wheelers",
        permanent: true,
      },
      // Heal nested URLs produced by the old :path* redirects (Google may have cached them)
      {
        source: "/search/buy-used-cars/:maker/:model/:city",
        destination: "/search/buy-used-:maker-:model-cars-:city",
        permanent: true,
      },
      {
        source: "/search/buy-used-cars/:maker/:model",
        destination: "/search/buy-used-:maker-:model-cars",
        permanent: true,
      },
      {
        source: "/search/buy-used-cars/:segment",
        destination: "/search/buy-used-cars-:segment",
        permanent: true,
      },
      {
        source: "/search/buy-used-two-wheelers/:maker/:model/:city",
        destination: "/search/buy-used-:maker-:model-two-wheelers-:city",
        permanent: true,
      },
      {
        source: "/search/buy-used-two-wheelers/:maker/:model",
        destination: "/search/buy-used-:maker-:model-two-wheelers",
        permanent: true,
      },
      {
        source: "/search/buy-used-two-wheelers/:segment",
        destination: "/search/buy-used-two-wheelers-:segment",
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
      {
        source: "/how-it-works",
        destination: "/reecomm-works",
        permanent: true,
      },
      {
        source: "/refund-policy",
        destination: "/terms-and-conditions",
        permanent: true,
      },
      {
        source: "/compare",
        destination: "/search/buy-used-cars",
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
