/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "www.thesportsdb.com",
      "hebbkx1anhila5yf.public.blob.vercel-storage.com",
      "r2.thesportsdb.com",
    ],
  },
};

module.exports = nextConfig;
