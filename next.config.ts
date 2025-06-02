import type { NextConfig } from "next";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const nextConfig: NextConfig = {
  images: {
    domains: ['res.cloudinary.com'], // Add Cloudinary hostname
    loader: 'default',
    unoptimized: true,
  },
};

export default withFlowbiteReact(nextConfig);