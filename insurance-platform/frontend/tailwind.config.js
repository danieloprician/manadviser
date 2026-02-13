/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#007ab3',
        accent: '#00a0d2',
        success: '#28a745',
        warning: '#ffc107',
        danger: '#dc3545',
      },
    },
  },
  plugins: [],
}
