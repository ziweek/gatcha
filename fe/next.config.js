/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
  disable: true,
});

const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["images.dog.ceo", "dog.ceo", "localhost"],
  },
};

// module.exports = nextConfig;

module.exports = withPWA({
  // next.js config
  ...nextConfig,
});
