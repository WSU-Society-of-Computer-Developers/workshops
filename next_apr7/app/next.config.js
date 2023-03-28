/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BACKEND: 'https://jsonplaceholder.typicode.com'
  }
}

module.exports = nextConfig
