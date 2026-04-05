import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          base: '#0f0f13',
          card: '#18181f',
        },
        border: {
          DEFAULT: '#2d2d3a',
        },
        text: {
          primary: '#e2e8f0',
          muted: '#64748b',
        },
        pilar: {
          construtor: '#6366f1',
          visionario: '#0ea5e9',
          gestor: '#10b981',
          cirurgiao: '#f59e0b',
        },
      },
      backgroundImage: {
        'construtor': 'linear-gradient(135deg, #1e1b4b, #312e81)',
        'visionario': 'linear-gradient(135deg, #0c4a6e, #075985)',
        'gestor': 'linear-gradient(135deg, #14532d, #166534)',
        'cirurgiao': 'linear-gradient(135deg, #78350f, #92400e)',
      },
    },
  },
  plugins: [],
}

export default config
