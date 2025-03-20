/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // Move experimental options to root level
  outputFileTracingRoot: process.cwd(),
  outputFileTracingExcludes: {
    '*': [
      'node_modules/.pnpm',
    ],
  },
  // Configure server port
  server: {
    port: 4812,
  },
};

export default nextConfig;
