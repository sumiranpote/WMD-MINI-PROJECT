/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#FAFBF9',
        surface: '#FFFFFF',
        'subtle-border': '#E5E9E0',
        'text-main': '#1B1F19',
        'text-muted': '#5D6758',
        olive: {
          50: '#F5F7F2',
          100: '#EBF0E5',
          200: '#D8E2CE',
          300: '#B8CBA9',
          400: '#95AF7E',
          500: '#75945C',
          600: '#5C7745',
          700: '#485E36',
          800: '#3D4F2F', // Brand primary olive
          900: '#324027',
          950: '#192213',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
