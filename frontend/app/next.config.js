/** @type {import('next').NextConfig} */
const nextConfig = {
  // webpackDevMiddleware: (config) => {
  //   config.watchOptions = {
  //     poll: 1000,
  //     aggregateTimeout: 300,
  //   }
  //   return config
  // },
  pageExtensions: ['page.tsx'],
  reactStrictMode: true,
  env: {
    GRAPHQL_ENDPOINT: 'http://localhost:8080/v1/graphql',
  },
}

module.exports = nextConfig
