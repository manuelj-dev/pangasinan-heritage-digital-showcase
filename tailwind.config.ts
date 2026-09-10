import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Design tokens — see design-tokens/manual for rationale
        heritage: {
          50: "#FBEFEC",
          100: "#F3D6CF",
          300: "#D6796A",
          500: "#B23A2B",   // primary heritage red
          600: "#9A2D20",
          700: "#7A2118",   // hover / pressed
          900: "#4A140F",
        },
        gold: {
          400: "#D9B463",
          500: "#C79A3E",   // accent — festival gold
          600: "#A87E2C",
        },
        sand: {
          50: "#FBF7EF",
          100: "#F5ECDB",   // page background
        },
        ink: {
          800: "#2B211C",
          900: "#1C1512",   // primary text
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        prose: "72ch",
      },
    },
  },
  plugins: [],
};
export default config;
