/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: 'build',
  output: 'standalone',
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        tls: false,
        net: false,
        path: false,
        dns: false,
        child_process: false,
      };
    }
    return config;
  },
};
export default nextConfig;
