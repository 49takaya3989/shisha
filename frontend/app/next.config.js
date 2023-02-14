/** @type {import('next').NextConfig} */
const nextConfig = {
  // webpackDevMiddleware: (config) => {
  //   config.watchOptions = {
  //     poll: 1000,
  //     aggregateTimeout: 300,
  //   }
  //   return config
  // },
  pageExtensions: ['api.ts', 'page.tsx'],
  reactStrictMode: true,
}

module.exports = nextConfig
