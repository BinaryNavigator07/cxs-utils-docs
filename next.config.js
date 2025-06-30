const withMarkdoc = require('@markdoc/next.js');

module.exports = withMarkdoc({
  // Markdoc configuration options
  schemaPath: './markdoc',
  // Enable experimental features for better performance
  experimental: {
    // Enable SWC minification for better performance
    swcMinify: true,
  },
})({
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdoc'],
  // Ensure proper handling of static files
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
});