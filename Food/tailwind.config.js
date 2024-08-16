// /** @type {import('tailwindcss').Config} */
// export const content = [
//   "./src/**/*.{html,js,jsx}", // Add support for JSX/TSX if you're using React components
//   "./index.html", // Make sure the HTML files are scanned too
// ];
// export const theme = {
//   extend: {},
// };
// export const plugins = [];

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}