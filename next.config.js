/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Disable Next.js image optimization for localhost Odoo images
    // This avoids the "private IP" error in development
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '2018',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8069',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**',
        pathname: '/**',
      },
    ],
    // Allow private IPs (needed for localhost in Next.js 16)
    dangerouslyAllowSVG: true,
    unoptimized: process.env.NODE_ENV === 'development',
  },
};

module.exports = nextConfig;