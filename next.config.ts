// import type { NextConfig } from "next";
const nextConfig = {
  /* config options here */

  images: {
    remotePatterns:[
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com'
      }
    ]
  },

  experimental: {
    serverActions: {
      bodySizeLimit: '20mb' // Set desired value here
    }
  }
};

export default nextConfig;
