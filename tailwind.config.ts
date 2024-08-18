import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // tango
        primary: {
          50: '#f5f6f9',
          100: '#e7eaf2',
          200: '#d5dae8',
          300: '#b9c2d7',
          400: '#97a4c3',
          Default: '#7d89b4',
          600: '#6b73a5',
          700: '#5f6596',
          800: '#595c87',
          900: '#444764',
          950: '#2d2e3e',
        },
      
      
        // surf
        secondary:{
          50: '#f1f8f2',
          100: '#dcefdc',
          200: '#bbdfbd',
          300: '#87c38f',
          400: '#5ea96b',
          Default: '#3d8c4d',
          600: '#2c6f3b',
          700: '#235931',
          800: '#1e4729',
          900: '#193b22',
          950: '#0d2113',
        },
       
        destructive: '#ff0035',
        // carnation
        accent: '#f2414c',
        white : '#ffffff',
        black : '#393e41',
        white_powder : '#fdfdfd'
      },
      fontSize: {
        'display': ['4rem', {
          lineHeight: '100%',
          fontWeight: '800'
        }],
        'title-lg': ['2rem', {
          lineHeight: '100%',
          fontWeight: '800'
        }],
        'title-base': ['1.5rem', {
          lineHeight: '100%',
          fontWeight: '800'
        }],
        'title-sm': ['1rem', {
          lineHeight: '100%',
          fontWeight: '600'
        }],
        'title-xs': ['0.75rem', {
          lineHeight: '100%',
          fontWeight: '600'
        }],
        'body-lg': ['1.5rem', {
          lineHeight: '100%',
          fontWeight: '400'
        }],
        'body-base': ['1rem', {
          lineHeight: '100%',
          fontWeight: '400'

        }],
        'body-sm': ['0.75rem', {
          lineHeight: '100%',
          fontWeight: '400'
        }],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
export default config
