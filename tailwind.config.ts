import type { Config } from "tailwindcss";

/**
 * Meridian design tokens wired into Tailwind.
 * The full token source of truth remains app/styles/colors_and_type.css
 * (CSS custom properties). These mappings let you write `bg-navy`,
 * `text-brass-deep`, `font-display`, etc. for app shell + new components,
 * while the ported deck slides reuse the original .page component classes.
 */
const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./decks/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#0B2545", deep: "#07182E" },
        blue: { DEFAULT: "#1B3A6B", mid: "#2C6299" },
        azure: "#4A89C4",
        sky: "#8FBCE0",
        mist: "#CFE0EF",
        brass: { DEFAULT: "#B4893C", deep: "#8C6722", soft: "#E7D6AE" },
        char: "#14202E",
        slate: { DEFAULT: "#33455A", mid: "#5A6B7E", soft: "#8A98A6" },
        line: { DEFAULT: "#D7DCE2", strong: "#B7C0CA" },
        paper: { DEFAULT: "#F8F7F3", alt: "#F1EFEA" },
        cloud: "#EDF1F5",
        positive: "#2E6B4F",
        negative: "#9B2C2C",
      },
      fontFamily: {
        display: ['"Source Serif 4"', "Iowan Old Style", "Georgia", "serif"],
        sans: ['"IBM Plex Sans"', '"Helvetica Neue"', "Arial", "sans-serif"],
        mono: ['"IBM Plex Mono"', '"SFMono-Regular"', "Menlo", "monospace"],
      },
      borderRadius: { DEFAULT: "2px", lg: "4px" },
      boxShadow: {
        sm: "0 1px 2px rgba(11,37,69,0.08)",
        md: "0 4px 16px rgba(11,37,69,0.10)",
        lg: "0 12px 40px rgba(11,37,69,0.14)",
        page: "0 18px 60px rgba(7,24,46,0.22)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
  // The Meridian design system (colors_and_type.css) already styles raw
  // elements (h1-h6, body, a, etc.). Tailwind's preflight reset would clobber
  // that, so we disable it. box-sizing reset lives in memo.css.
  corePlugins: { preflight: false },
};

export default config;
