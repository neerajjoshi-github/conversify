/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ["plus.unsplash.com"],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.node$/,
      use: "file-loader",
    });

    return config;
  },
};

module.exports = nextConfig;
