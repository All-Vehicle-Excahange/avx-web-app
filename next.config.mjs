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
      // Canonical storefront: digit slug → clean username (GSC was splitting equity)
      {
        source: "/auto-consultant/aabadmotors487206",
        destination: "/auto-consultant/aabadmotors",
        permanent: true,
      },
    ];
  },
  images: {
    // Always use AWS CloudFront loader so src (and "Open image in new tab")
    // resolve to image.reecomm.com — not private S3 — in both dev and prod.
    loader: "custom",
    loaderFile: "./src/lib/cdnImageLoader.js",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // Proxy rewrite rules for CDN and Local API
  async rewrites() {
    return [
      {
        // Proxy API requests to backend during local development to fix SameSite Cookie issues
        source: "/api/v1/:path*",
        destination: `${process.env.BACKEND_URL}/api/v1/:path*`,
      },
      {
        // Legacy /cdn-image paths (mobile + old links) → AWS CloudFront
        source: "/cdn-image/:path*",
        destination: "https://image.reecomm.com/:path*",
      },
    ];
  },
};

export default nextConfig;
