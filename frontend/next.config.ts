/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    serverOptions: {
      port: 4812,
    },
  },
};

export default nextConfig;
