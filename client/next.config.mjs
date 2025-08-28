/** @type {import('next').NextConfig} */

const nextConfig = {
  devIndicators: false,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.API_URL}/api/:path*`, // proxies /api/* → backend
      },
    ];
  },
};

export default nextConfig;
