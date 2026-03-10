/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'erp.lemacore.com',
        port: '8018',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '**',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**',
        pathname: '/**',
      },
    ],
    dangerouslyAllowSVG: true,
    unoptimized: process.env.NODE_ENV === 'production', // Disable optimization in production
  },
};

module.exports = nextConfig;