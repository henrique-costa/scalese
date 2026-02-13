import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Confetteria Scalese brand palette
        brand: {
          rose: "#E8A0BF",        // Rosa principal (bolos, decorações)
          "rose-light": "#F5D0E0", // Rosa claro (backgrounds)
          "rose-dark": "#C47A9A",  // Rosa escuro (hover states)
          gold: "#C9A96E",         // Dourado (detalhes premium)
          "gold-light": "#E8D5A8", // Dourado claro
          "gold-dark": "#A88A4E",  // Dourado escuro
          mint: "#8DBFAB",         // Verde-menta (acentos)
          "mint-light": "#B5D9CC", // Menta claro
          chocolate: "#5C3D2E",    // Marrom chocolate (textos)
          "chocolate-light": "#8B6F5E", // Marrom claro
          cream: "#FFF8F0",        // Creme (background principal)
          "cream-warm": "#FDF2E9", // Creme quente (cards)
        },
      },
      fontFamily: {
        display: ["Playfair Display", "serif"],
        body: ["Lato", "sans-serif"],
        accent: ["Dancing Script", "cursive"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      boxShadow: {
        soft: "0 2px 15px -3px rgba(92, 61, 46, 0.08), 0 10px 20px -2px rgba(92, 61, 46, 0.04)",
        card: "0 4px 25px -5px rgba(92, 61, 46, 0.1), 0 10px 30px -5px rgba(92, 61, 46, 0.06)",
        elevated: "0 10px 40px -10px rgba(92, 61, 46, 0.15)",
      },
    },
  },
  plugins: [],
};

export default config;
