import type { Config } from 'tailwindcss'

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        dark: '#0a0e27',
        'dark-secondary': '#1a1f3a',
        'neon-cyan': '#00d4ff',
        'neon-purple': '#b026ff',
        'neon-pink': '#ff006e',
        'neon-green': '#39ff14',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      animation: {
        'glitch': 'glitch 0.3s infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'scan-line': 'scan-line 8s linear infinite',
        'flicker': 'flicker 0.15s infinite',
      },
      keyframes: {
        glitch: {
          '0%, 100%': { textShadow: '0 0 0 transparent' },
          '20%': { textShadow: '2px 2px 0 #00d4ff' },
          '40%': { textShadow: '-2px -2px 0 #b026ff' },
          '60%': { textShadow: '2px -2px 0 #ff006e' },
          '80%': { textShadow: '-2px 2px 0 #39ff14' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 212, 255, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(176, 38, 255, 0.8)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'scan-line': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
      boxShadow: {
        'neon-cyan': '0 0 20px rgba(0, 212, 255, 0.5)',
        'neon-purple': '0 0 20px rgba(176, 38, 255, 0.5)',
        'neon-pink': '0 0 20px rgba(255, 0, 110, 0.5)',
        'neon-glow': '0 0 40px rgba(0, 212, 255, 0.8)',
      },
    },
  },
  plugins: [],
} satisfies Config
