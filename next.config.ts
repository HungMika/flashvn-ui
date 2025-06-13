import type { NextConfig } from 'next';
import withFlowbiteReact from 'flowbite-react/plugin/nextjs';

const nextConfig: NextConfig = {
  images: {
    domains: ['res.cloudinary.com'], // Cloudinary
    loader: 'default',
    unoptimized: true,
  },
};

export default withFlowbiteReact(nextConfig);
