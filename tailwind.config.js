/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          coral: '#FF6B6B',
          mint: '#4ECDC4',
          warm: '#FFF9E6',
        },
        simple: {
          blue: '#4A90A4',
          light: '#7FB3C8',
          gray: '#F5F5F5',
        },
        success: '#2ECC71',
        error: '#E74C3C',
        warning: '#F39C12',
      },
      fontFamily: {
        cartoon: ['Comic Neue', 'Comic Sans MS', 'cursive'],
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px',
      },
      minHeight: {
        'btn': '60px',
      },
      minWidth: {
        'btn': '60px',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  }
}
