module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "duck-yellow": "#FFD700",
        "duck-orange": "#FFA500",
        "pipe-green": "#228B22",
        "sky-blue": "#87CEEB",
      },
    },
  },
  plugins: [],
}