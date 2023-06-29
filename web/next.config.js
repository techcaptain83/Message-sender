/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:{
    domains: ['images.unsplash.com']
  },
  env:{
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  },
  experimental: {
    scrollRestoration: true,
  },
}

module.exports = nextConfig
