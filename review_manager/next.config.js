/** @type {import('next').NextConfig} */
const nextConfig = {
  // other config options...
  experimental: {
    serverActions: {
      allowedOrigins: [
        "localhost:3000",
        ".app.github.dev", // This allows all Codespaces domains
      ],
    },
  },
};

module.exports = nextConfig;
