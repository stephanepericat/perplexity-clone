import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  images: {
    domains: ['imgs.search.brave.com'],
  },
  reactStrictMode: false,
}

export default nextConfig
