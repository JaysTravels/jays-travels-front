/** @type {import('next').NextConfig} */
import i18nConfig from './next-i18next.config.mjs'; 
const nextConfig = {
  i18n: i18nConfig.i18n,
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
