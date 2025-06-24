/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ['zaporka-backend.onrender.com'], // Add your API domain here
    },
    experimental: {
    serverComponentsExternalPackages: [], // Исключает конфликты с внешними пакетами
  },
  };
export default nextConfig;
