/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['localhost', 'ehb-franchise.com'],
  },
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    BLOCKCHAIN_RPC_URL: process.env.BLOCKCHAIN_RPC_URL,
    EHBGC_CONTRACT_ADDRESS: process.env.EHBGC_CONTRACT_ADDRESS,
  },
}

module.exports = nextConfig
