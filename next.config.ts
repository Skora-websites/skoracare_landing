import type { NextConfig } from "next";

const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/login", destination: `${appUrl}/login`, permanent: false },
      { source: "/signup", destination: `${appUrl}/signup`, permanent: false },
    ];
  },
};

export default nextConfig;
