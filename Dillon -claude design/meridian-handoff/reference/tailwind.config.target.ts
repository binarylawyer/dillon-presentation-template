// tailwind.config.ts  — TARGET SHAPE (additive; replaces the hand-mirror)
// ─────────────────────────────────────────────────────────────────────────────
// Built FROM design/tokens.ts. Two rules that keep this non-breaking:
//
//   1. ADDITIVE — every legacy utility the repo already uses (bg-navy,
//      text-paper, ring-brass, border-line-strong, text-brass-deep, …) is
//      regenerated here from the same tokens. DO NOT remove these names or the
//      admin UI + shadcn components break. We only ADD semantic names alongside.
//
//   2. CSS-VAR REFS — colors map to `var(--…)`, not hex. This kills drift (one
//      source) AND lets `data-theme="inverse"` re-skin Tailwind utilities too.
//
// Keep: darkMode, the tailwindcss-animate plugin, preflight:false (the design
// system styles raw elements; preflight would clobber them).
// ─────────────────────────────────────────────────────────────────────────────
import type { Config } from "tailwindcss";

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
        // ── LEGACY primitive utilities (unchanged names; now var-backed) ──
        navy:  { DEFAULT: "var(--navy)", deep: "var(--navy-deep)" },
        blue:  { DEFAULT: "var(--blue)", mid: "var(--blue-mid)" },
        azure: "var(--azure)",
        sky:   "var(--sky)",
        mist:  "var(--mist)",
        brass: { DEFAULT: "var(--brass)", deep: "var(--brass-deep)", soft: "var(--brass-soft)" },
        char:  "var(--char)",
        slate: { DEFAULT: "var(--slate)", mid: "var(--slate-mid)", soft: "var(--slate-soft)" },
        line:  { DEFAULT: "var(--line)", strong: "var(--line-strong)" },
        paper: { DEFAULT: "var(--paper)", alt: "var(--paper-alt)" },
        cloud: "var(--cloud)",
        positive: { DEFAULT: "var(--positive)", soft: "var(--positive-soft)" },
        negative: { DEFAULT: "var(--negative)", soft: "var(--negative-soft)" },

        // ── SEMANTIC utilities (preferred for NEW work; themeable) ──
        canvas: "var(--surface-canvas)",
        raised: "var(--surface-raised)",
        sunken: "var(--surface-sunken)",
        ink: {
          DEFAULT: "var(--ink-default)", strong: "var(--ink-strong)",
          muted: "var(--ink-muted)", subtle: "var(--ink-subtle)", inverse: "var(--ink-inverse)",
        },
        accent: {
          DEFAULT: "var(--accent)", strong: "var(--accent-strong)",
          soft: "var(--accent-soft)", on: "var(--on-accent)",
        },
        edge: { // "border-*" names collide with Tailwind borderColor; expose under `edge`
          subtle: "var(--border-subtle)", strong: "var(--border-strong)", accent: "var(--border-accent)",
        },
        data: {
          primary: "var(--data-primary)", support: "var(--data-support)",
          tint: "var(--data-tint)", emphasis: "var(--data-emphasis)",
        },
        pos: { DEFAULT: "var(--pos)", soft: "var(--pos-soft)" },
        neg: { DEFAULT: "var(--neg)", soft: "var(--neg-soft)" },
      },
      fontFamily: {
        display: ["var(--font-display)"],
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      borderRadius: { DEFAULT: "var(--radius)", lg: "var(--radius-lg)" },
      boxShadow: {
        sm: "var(--shadow-sm)", md: "var(--shadow-md)",
        lg: "var(--shadow-lg)", page: "var(--shadow-page)",
      },
      ringColor: { DEFAULT: "var(--focus-ring)" },
    },
  },
  plugins: [require("tailwindcss-animate")],
  corePlugins: { preflight: false },
};

export default config;
