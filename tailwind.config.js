/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': 'rgba(68, 56, 245, 0.274)',
      },
    },
  },
  plugins: [],
}

