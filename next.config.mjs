/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: 'build',
  output: 'standalone',
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "http://www.jaystravel.co.uk/" }],
        destination: "https://jaystravels.co.uk/:path*",
        permanent: true,
      },
      // If you need more redirects, they can be added JS objects here.
    ];
  },
};
export default nextConfig;
