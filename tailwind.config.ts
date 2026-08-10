import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0A0B0D',
        surface: {
          DEFAULT: '#111316',
          raised: '#0D0F12',
          panel: '#131518',
        },
        border: {
          DEFAULT: '#1F2227',
          strong: '#24272C',
          hair: '#1B1E23',
        },
        accent: {
          DEFAULT: '#2FD8A6',
          hover: '#4BE6B8',
          soft: '#5CEBC0',
          ink: '#06251C',
        },
        text: {
          DEFAULT: '#F2F4F7',
          muted: '#9AA1AB',
          faint: '#79808A',
          dim: '#6C737C',
        },
        danger: '#FF8E8E',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        card: '16px',
        control: '12px',
      },
      transitionTimingFunction: {
        cf: 'cubic-bezier(.4,0,.2,1)',
      },
      keyframes: {
        cfPop: {
          '0%': { opacity: '0', transform: 'scale(0.96) translateY(-4px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        cfShimmer: {
          from: { backgroundPosition: '-420px 0' },
          to: { backgroundPosition: '420px 0' },
        },
      },
      animation: {
        cfPop: 'cfPop .16s cubic-bezier(.4,0,.2,1) both',
        cfShimmer: 'cfShimmer 1.3s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
