import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'images.unsplash.com',
      port: '',
      pathname: '/**'
    }, {
      protocol: 'https',
      hostname: 'via.placeholder.com',
      port: '',
      pathname: '/**'
    }, {
      protocol: 'https',
      hostname: 'ucarecdn.com',
      port: '',
      pathname: '/**'
    }, {
      protocol: 'https',
      hostname: 'placehold.co',
      port: '',
      pathname: '/**'
    }, {
      protocol: 'https',
      hostname: 'placeimg.com',   
      port: '',
      pathname: '/**'
    }, {
      protocol: 'https',
      hostname: 'oaidalleapiprodscus.bolb.core.windows.net',
      port: '',
      pathname: '/**'
    }
    ]
  }
};

export default nextConfig;
