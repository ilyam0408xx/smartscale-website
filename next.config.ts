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
      { source: '/lp-law-v2', destination: '/lp-law-v2.html' },
      { source: '/lp-law-toda', destination: '/lp-law-toda.html' },
      { source: '/lp-law-system', destination: '/lp-law-system.html' },
    ]
  },
}

export default withMDX(nextConfig)
