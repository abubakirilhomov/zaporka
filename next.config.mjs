/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['zaporka-backend.onrender.com', "zaporka.uz", "api.zaporka.uz"],
  },
  serverExternalPackages: [],
};

export default nextConfig;
