const withMarkdoc = require('@markdoc/next.js');

module.exports = withMarkdoc({
  schemaPath: './markdoc/markdoc.config.js',
})({
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdoc'],
  trailingSlash: false,
  
  // Configure image optimization
  images: {
    domains: ['via.placeholder.com', 'example.com'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Configure redirects for old .md URLs to .mdoc
  async redirects() {
    return [
      {
        source: '/docs/:path*.md',
        destination: '/docs/:path*',
        permanent: true,
      },
    ];
  },
  
  // Ensure proper handling of index routes
  async rewrites() {
    return [
      // Handle /docs to /docs/index
      {
        source: '/docs',
        destination: '/docs/index',
      },
    ];
  },
  
  // Webpack configuration for Markdoc
  webpack: (config, { isServer }) => {
    // Handle .mdoc files
    config.module.rules.push({
      test: /\.mdoc$/,
      use: '@markdoc/next.js/loader',
    });
    
    return config;
  },
});