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
      // טסט הנישות באאוטבריין, 19.8.2026. דף נחיתה לכל נישה + דף תודה משותף.
      { source: '/lp-bituach', destination: '/lp-bituach.html' },
      { source: '/lp-toda', destination: '/lp-toda.html' },
      // כתבות ממומנות לטאבולה, 27.9.2026: HTML סטטי לפי הטמפלייט הנעול
      // (יוצר-כתבות/_outbrain/_טמפלייט-עיצוב/). נבדק לפני הנתיב הדינמי /promo/[slug].
      { source: '/promo/tahkir-mazkira-orchei-din', destination: '/promo/tahkir-mazkira-orchei-din.html' },
      // פנייה למערכת ("מצאתם טעות? כתבו לנו"), גנרי לכל כתבה ודף. נשלח לטלגרם דרך /api/pniya.
      { source: '/pniyot', destination: '/pniyot.html' },
    ]
  },
}

export default withMDX(nextConfig)
