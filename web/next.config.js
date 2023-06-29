/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:{
    domains: ['images.unsplash.com']
  },
  experimental: {
    scrollRestoration: true,
  },
}

module.exports = nextConfig
