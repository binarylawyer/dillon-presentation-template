import type { Config } from "tailwindcss";

/**
 * Meridian design tokens wired into Tailwind — built FROM design/tokens.ts
 * (via the generated CSS custom properties), not a hand-typed copy. Two rules
 * keep this non-breaking:
 *
 *   1. ADDITIVE — every legacy utility the repo already uses (bg-navy,
 *      text-paper, ring-brass, border-line-strong, text-brass-deep, …) is
 *      regenerated here. Semantic names (bg-canvas, text-ink, …) are ADDED
 *      alongside. No legacy name is removed, or the admin UI + shadcn break.
 *
 *   2. CSS-VAR REFS with rgb CHANNELS — colors resolve to
 *      `rgb(var(--x-rgb) / <alpha-value>)`, where `--x-rgb` holds the
 *      space-separated channels emitted by scripts/build-tokens.ts. This kills
 *      drift (one source), lets `data-theme="inverse"` re-skin utilities at
 *      runtime, AND keeps opacity modifiers working (bg-brass/15, text-paper/60,
 *      ring-brass/40, bg-navy-deep/50). A plain `var(--navy)` would silently
 *      drop the alpha and change the render.
 */

/** color utility backed by rgb channels, opacity-modifier safe. */
const c = (channelVar: string) => `rgb(var(${channelVar}) / <alpha-value>)`;

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
        navy:  { DEFAULT: c("--navy-rgb"), deep: c("--navy-deep-rgb") },
        blue:  { DEFAULT: c("--blue-rgb"), mid: c("--blue-mid-rgb") },
        azure: c("--azure-rgb"),
        sky:   c("--sky-rgb"),
        mist:  c("--mist-rgb"),
        brass: { DEFAULT: c("--brass-rgb"), deep: c("--brass-deep-rgb"), soft: c("--brass-soft-rgb") },
        char:  c("--char-rgb"),
        slate: { DEFAULT: c("--slate-rgb"), mid: c("--slate-mid-rgb"), soft: c("--slate-soft-rgb") },
        line:  { DEFAULT: c("--line-rgb"), strong: c("--line-strong-rgb") },
        paper: { DEFAULT: c("--paper-rgb"), alt: c("--paper-alt-rgb") },
        cloud: c("--cloud-rgb"),
        positive: { DEFAULT: c("--positive-rgb"), soft: c("--positive-soft-rgb") },
        negative: { DEFAULT: c("--negative-rgb"), soft: c("--negative-soft-rgb") },

        // ── SEMANTIC utilities (preferred for NEW work; themeable) ──
        canvas: c("--surface-canvas-rgb"),
        raised: c("--surface-raised-rgb"),
        sunken: c("--surface-sunken-rgb"),
        ink: {
          DEFAULT: c("--ink-default-rgb"), strong: c("--ink-strong-rgb"),
          muted: c("--ink-muted-rgb"), subtle: c("--ink-subtle-rgb"), inverse: c("--ink-inverse-rgb"),
        },
        accent: {
          DEFAULT: c("--accent-rgb"), strong: c("--accent-strong-rgb"),
          soft: c("--accent-soft-rgb"), on: c("--on-accent-rgb"),
        },
        edge: { // "border-*" names collide with Tailwind borderColor; expose under `edge`
          subtle: c("--border-subtle-rgb"), strong: c("--border-strong-rgb"), accent: c("--border-accent-rgb"),
        },
        data: {
          primary: c("--data-primary-rgb"), support: c("--data-support-rgb"),
          tint: c("--data-tint-rgb"), emphasis: c("--data-emphasis-rgb"),
        },
        pos: { DEFAULT: c("--pos-rgb"), soft: c("--pos-soft-rgb") },
        neg: { DEFAULT: c("--neg-rgb"), soft: c("--neg-soft-rgb") },
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
  // The Meridian design system (colors_and_type.css) already styles raw
  // elements (h1-h6, body, a, etc.). Tailwind's preflight reset would clobber
  // that, so we disable it. box-sizing reset lives in memo.css.
  corePlugins: { preflight: false },
};

export default config;
