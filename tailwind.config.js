// tailwind.config.js
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          sans: ["Vazirmatn", "sans-serif"],
        },
      },
    },
    plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
  };