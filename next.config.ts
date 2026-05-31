import type { NextConfig } from 'next'
import createMDX from '@next/mdx'

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      { protocol: 'https', hostname: 'img.youtube.com' },
      { protocol: 'https', hostname: 'i.ytimg.com' },
    ],
  },
  async redirects() {
    return [
      { source: '/business-card', destination: '/', permanent: true },
    ]
  },
  async rewrites() {
    return [
      { source: '/refael-QUOTATION', destination: '/refael-QUOTATION.html' },
      { source: '/lp-law', destination: '/lp-law.html' },
    ]
  },
}

export default withMDX(nextConfig)
