/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  optimizeFonts: false,  
  images: {
  domains: ['https://jays-travels-front.azurewebsites.net/' , 'http://localhost:3000/'], 
  formats: ['image/avif', 'image/webp'], 
},
};
export default nextConfig;
