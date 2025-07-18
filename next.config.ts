import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 output: 'export',
 async redirects() {
    return [
      {
        source: '/(.*)',
        has: [
          {
            type: 'host',
            value: 'stylznsmylz.com',
          },
        ],
        destination: 'https://stylznsmylz.com/:1',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
