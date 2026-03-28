/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        bg: { DEFAULT: '#06080d', 2: '#0c1017', 3: '#111722' },
        gold: { light: '#f0d48a', DEFAULT: '#d4a853', dark: '#a67c2e' },
        cyan: { DEFAULT: '#00e5ff', dim: 'rgba(0,229,255,0.2)' },
        card: { DEFAULT: '#0d1119', border: '#1a2035' },
        txt: { DEFAULT: '#f0eff4', muted: '#8a8fa3', dark: '#3a3f52' }
      },
      fontFamily: {
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['Space Grotesk', 'monospace']
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        'marquee-rev': 'marquee 35s linear infinite reverse',
        'spin-slow': 'spin 50s linear infinite',
        'spin-slower': 'spin 70s linear infinite reverse',
        'pulse-dot': 'pulse-dot 2s ease infinite',
        float: 'float 6s ease-in-out infinite',
        glow: 'glow 3s ease-in-out infinite'
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(212,168,83,0.15)' },
          '50%': { boxShadow: '0 0 40px rgba(212,168,83,0.3)' }
        }
      }
    }
  },
  plugins: []
};
