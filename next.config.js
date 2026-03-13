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
    unoptimized: process.env.NODE_ENV === 'development', // Disable optimization in development
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options",  value: "nosniff"      },
          { key: "X-XSS-Protection",        value: "1; mode=block" },
          { key: "X-Frame-Options",         value: "SAMEORIGIN"   },
          { key: "Referrer-Policy",         value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },

  async rewrites() {
    const ODOO_BASE_URL = process.env.ODOO_BASE_URL || "http://localhost:8069";

    return [
      // Proxy Odoo media (images, videos) melalui Next.js
      // Mencegah Mixed Content error saat Next.js di HTTPS, Odoo di HTTP
      {
        source: "/odoo-media/:path*",
        destination: `${ODOO_BASE_URL}/:path*`,
      },
      // Proxy API Odoo langsung (opsional — untuk kebutuhan client-side)
      {
        source: "/odoo-api/:path*",
        destination: `${ODOO_BASE_URL}/api/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;