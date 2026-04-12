import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,md,mdx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0a0a0a',
        muted: '#6b6b6b',
        light: '#aaaaaa',
        border: '#e5e5e5',
        wa: '#25D366',
        'wa-hover': '#128C7E',
        accent: '#0ea5e9',
        off: '#f9f9f7',
      },
      fontFamily: {
        heebo: ['var(--font-heebo)', 'sans-serif'],
      },
      maxWidth: {
        wrap: '1000px',
      },
    },
  },
  plugins: [],
}

export default config
