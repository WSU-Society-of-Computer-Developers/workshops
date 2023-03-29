/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        port: "",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "avatars.dicebear.com",
        port: "",
        pathname: '/api/identicon/*.svg',
      }
    ]
  }
}

module.exports = nextConfig
