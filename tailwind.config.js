/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
      'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    ],
  theme: {
    extend: {},
    colors: {
      // Configure your color palette here
    }
  },
  plugins: [
    require('flowbite/plugin')
  ],
  darkMode: 'class',
}
