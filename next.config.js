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
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://erp.lemacore.com:8018/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;