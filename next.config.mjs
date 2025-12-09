/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Set to false in production to catch TypeScript errors
    ignoreBuildErrors: process.env.NODE_ENV === "development",
  },
  images: {
    unoptimized: true,
  },
  // Production optimizations
  reactStrictMode: true,
}

export default nextConfig
