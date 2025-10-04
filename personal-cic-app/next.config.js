/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Enable static exports for Vercel
  output: 'standalone',
  // Ensure proper image optimization
  images: {
    unoptimized: true, // Disable image optimization if not using Vercel's image optimization
  },
  // Set the base path if your app is not served from the root
  // basePath: '/your-base-path',
  // Enable TypeScript type checking during build
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: false,
  },
  // Enable ESLint during build
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: false,
  },
}
