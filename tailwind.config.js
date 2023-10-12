// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'customBg': '#1F232B',
      },
    },
  },
  plugins: [require("daisyui")],
}
