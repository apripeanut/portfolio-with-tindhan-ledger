import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ijjanmhuwtsuhgrnmdxd.supabase.co",
      },
    ],
  },
};

export default nextConfig;
