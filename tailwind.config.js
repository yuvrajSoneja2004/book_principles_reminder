/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "primary-regular": ["PrimaryFont", "sans-shreif"],
        "secondary-regular": ["SecondaryFont", "sans-shreif"],
        "secondary-bold": ["SecondaryFontBold", "sans-shreif"],
      },
    },
  },
  plugins: [],
};
