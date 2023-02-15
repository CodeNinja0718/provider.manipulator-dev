const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  output: 'standalone',
  eslint: {
    dirs: ['.'],
  },
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['page.tsx', 'page.ts'],
  experimental: {
    scrollRestoration: true,
    modularizeImports: {
      '@mui/material': {
        transform: '@mui/material/{{member}}',
      },
      lodash: {
        transform: 'lodash/{{member}}',
      },
      hooks: {
        transform: 'hooks/{{member}}',
      },
      // 'components/Form': {
      //   transform: 'components/Form/{{member}}',
      // },
    },
  },
  images: {
    domains: (process.env.IMAGE_DOMAIN || '').split(','),
    minimumCacheTTL: 86400,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  // This is required for checking docker container's health if devops requires.
  async rewrites() {
    return [
      {
        source: '/health',
        destination: '/api',
      },
    ]
  },
  env: {
    API_SERVER_BASE_URL: process.env.API_SERVER_BASE_URL,
    DEPLOY_ENV: process.env.DEPLOY_ENV,
    DOMAIN: process.env.DOMAIN,
    IMAGE_DOMAIN: process.env.IMAGE_DOMAIN,
    PROJECT_NAME: process.env.PROJECT_NAME
  },
  webpack(config) {
    const fileLoaderRule = config.module.rules.find(
      (rule) => rule.test && rule.test.test('.svg'),
    );
    fileLoaderRule.exclude = /\.svg$/;
    config.module.rules.push({
      test: /\.svg$/,
      loader: require.resolve('@svgr/webpack'),
      options: {
        svgoConfig: {
          plugins: [{
            name: 'removeViewBox',
            active: false
          }]
        }
      }
    });
    return config;
  },
};

module.exports = withBundleAnalyzer(nextConfig);
