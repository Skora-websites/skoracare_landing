import type { NextConfig } from "next";

const appUrl = process.env.NEXT_PUBLIC_APP_URL;

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    if (!appUrl) {
      return [
        { source: "/signup", destination: "/contact", permanent: false },
        { source: "/login", destination: "/contact", permanent: false },
      ];
    }
    return [
      { source: "/login", destination: `${appUrl}/login`, permanent: false },
      { source: "/signup", destination: `${appUrl}/signup`, permanent: false },
    ];
  },
};

export default nextConfig;
