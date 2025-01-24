import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(5px)' },
          '50%': { transform: 'translateX(-5px)' },
          '75%': { transform: 'translateX(5px)' }
        }
      },
      animation: {
        'shake': 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both'
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            a: {
              color: '#36c',
              '&:hover': {
                color: '#447ff5',
              },
            },
          },
        },
        invert: {
          css: {
            color: '#fff',
            a: {
              color: '#36c',
              '&:hover': {
                color: '#447ff5',
              },
            },
            h1: {
              color: '#fff',
            },
            h2: {
              color: '#fff',
            },
            strong: {
              color: '#fff',
            },
            th: {
              color: '#fff',
            },
            'thead th': {
              color: '#fff',
            },
          },
        },
      },
      maxWidth: {
        '6xl': '72rem',  // Standard width (1152px)
        '7xl': '84rem',  // Wide width (1344px)
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
