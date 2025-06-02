import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['res.cloudinary.com'], // Add Cloudinary hostname
    loader: 'default',
    unoptimized: true,
  },
};

export default nextConfig;
