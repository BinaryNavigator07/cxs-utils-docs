const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [require('remark-gfm')],
    rehypePlugins: [
      [require('rehype-highlight'), {
        languages: {
          javascript: require('highlight.js/lib/languages/javascript'),
          python: require('highlight.js/lib/languages/python'),
          json: require('highlight.js/lib/languages/json'),
          bash: require('highlight.js/lib/languages/bash'),
          typescript: require('highlight.js/lib/languages/typescript'),
          jsx: require('highlight.js/lib/languages/javascript'),
          tsx: require('highlight.js/lib/languages/typescript'),
        }
      }]
    ],
    providerImportSource: '@mdx-js/react',
  },
});

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  trailingSlash: false,
  
  // Configure image optimization
  images: {
    domains: ['via.placeholder.com', 'example.com'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Configure redirects for old .mdoc URLs to .mdx
  async redirects() {
    return [
      {
        source: '/docs/:path*.mdoc',
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
});