import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
     extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
        lexend: ['Lexend', 'sans-serif'],
      },
      colors: {
        'dark-bg': '#0a0a0a',
        'dark-card': '#121214',
        'dark-card-hover': '#18181b',
        'dark-border': '#27272a',
        'dark-gray': '#1E1E1E',
        'light-gray': '#333333',
        accent: {
          DEFAULT: '#6366f1',
          hover: '#4f46e5',
          muted: '#818cf8',
        }
      },
    },
  },
  plugins: [],
} satisfies Config;
