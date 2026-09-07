import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,

  images: {
    // Real route photography can be dropped into /public/images and served
    // through next/image; these formats are used when it is.
    formats: ["image/avif", "image/webp"],
  },

  async redirects() {
    // The site previously used nested URLs. These 301s keep any indexed or
    // shared link working and point it at the flat replacement.
    // statusCode 301 is set explicitly; `permanent: true` would emit a 308.
    return [
      { source: "/outstation", destination: "/outstation-taxi-chandigarh", statusCode: 301 },
      { source: "/outstation/shimla", destination: "/chandigarh-to-shimla-taxi", statusCode: 301 },
      { source: "/outstation/manali", destination: "/chandigarh-to-manali-taxi", statusCode: 301 },
      { source: "/outstation/delhi", destination: "/chandigarh-to-delhi-taxi", statusCode: 301 },
      { source: "/outstation/:slug", destination: "/routes", statusCode: 301 },

      { source: "/airport", destination: "/chandigarh-airport-taxi", statusCode: 301 },
      {
        source: "/airport/chandigarh-airport-to-city",
        destination: "/chandigarh-airport-taxi",
        statusCode: 301,
      },
      { source: "/airport/:slug", destination: "/chandigarh-airport-taxi", statusCode: 301 },

      { source: "/local", destination: "/local-taxi-chandigarh", statusCode: 301 },
      { source: "/local/chandigarh", destination: "/local-taxi-chandigarh", statusCode: 301 },
      { source: "/local/:slug", destination: "/local-taxi-chandigarh", statusCode: 301 },
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
