/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366f1',
        secondary: '#10b981',
        background: {
          DEFAULT: '#0f172a',
          light: '#1e293b',
        },
        text: {
          DEFAULT: '#f8fafc',
          muted: '#94a3b8',
        },
        accent: {
          DEFAULT: '#8b5cf6',
          hover: '#7c3aed',
        },
      },
    },
  },
  plugins: [],
} 