/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
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
        // daintree
        primary: {
          50: '#effcfc',
          100: '#d6f5f7',
          200: '#b2ebef',
          300: '#7cdbe4',
          400: '#40c2d0',
          Default: '#24a6b6',
          600: '#218699',
          700: '#216c7d',
          800: '#235967',
          900: '#214b58',
          950: '#0b2027',
        },
      
        // surf
        secondary: {
          50: '#f2f7f3',
          100: '#deede0',
          200: '#bcd8c1',
          300: '#95c09f',
          400: '#689f77',
          Default: '#478259',
          600: '#346745',
          700: '#2a5239',
          800: '#23422e',
          900: '#1d3727',
          950: '#101e16',
        }, 
        destructive: '#ff0035',
        // carnation
        accent: '#f2414c',
        white : '#ffffff',
        black : '#393e41',
        // schist
        gray : {
          '50': '#fafafa',
          '100': '#f3f5f0',
          '200': '#cfd3c3',
          Default: '#a9b195',
          '400': '#939d7e',
          '500': '#778161',
          '600': '#5c664a',
          '700': '#494f3c',
          '800': '#3c4133',
          '900': '#35392e',
          '950': '#1b1d16',
        },
        white_powder : '#fdfdfd'
      },
      fontSize: {
        'title-lg': ['2.8em', {
          lineHeight: '1em',
          letterSpacing: '0em',
          fontWeight: '700'

        }],
        'title-base': ['2em', {
          lineHeight: '1em',
          letterSpacing: '0em',
          fontWeight: '700'

        }],
        'title-sm': ['1.1em', {
          lineHeight: '1em',
          letterSpacing: '0em',
          fontWeight: '500'

        }],
        'title-xs': ['0.8em', {
          lineHeight: '1em',
          letterSpacing: '0em',
          fontWeight: '700'

        }],
        'body-lg': ['2em', {
          lineHeight: '1.1em',
          letterSpacing: '0em',
          fontWeight: '400'

        }],
        'body-base': ['1em', {
          lineHeight: '1.1em',
          letterSpacing: '0em',
          fontWeight: '300'

        }],
        'body-sm': ['0.8em', {
          lineHeight: '1.1em',
          letterSpacing: '0em',
          fontWeight: '100'
        }],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
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