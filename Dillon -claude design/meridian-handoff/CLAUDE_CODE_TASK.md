# Meridian Platform — Upgrade Task (for Claude Code)

> **You are working in the `dillon-presentation-template` repo** (Next.js 15 App Router · React 19 · TypeScript · Tailwind 3.4.17 · shadcn-style UI · deployed on Vercel). This file is your complete brief. A `meridian-handoff/reference/` folder ships alongside it with ready-made source you should adapt into the real paths. Work in **small, sequenced PRs** exactly as laid out below. **Do not do everything in one commit.**

---

## Mission

Evolve the **Meridian** design system in this repo from "good tokens, but duplicated and bypassed" into a single tokenized source of truth with a semantic theming layer and a componentized data-viz kit — **without ever breaking the existing `incentive-convergence` deck or the admin UI, and without changing how any slide looks** until a slide is intentionally migrated behind a visual check.

Aesthetic is fixed and must be preserved exactly: *quiet authority · blue-forward · numbers-as-hero · one brass accent · editorial serif headlines.* **Do not redesign the brand. Evolve the system around it.**

---

## Ground truth about THIS repo (already verified — don't re-derive)

- **Tokens already exist** in `app/styles/colors_and_type.css` as `:root` custom properties (`--navy`, `--brass-deep`, `--font-display`, the type scale, shadows, etc.) plus raw-element styling (`h1–h6`, `body`, `a`, `.eyebrow`, `.ledger`, `.pull`, `.tag`, `.disclaimer`).
- **`tailwind.config.ts` hand-mirrors those hexes** (`navy: "#0B2545"`, `brass: {...}`, `fontFamily`, `borderRadius`, `boxShadow`). This is the drift risk to remove.
- **`app/globals.css`** imports in this order: `colors_and_type.css`, then `memo.css`, then `@tailwind base/components/utilities`. Preserve this order — design-system `:root` + element styles must load before Tailwind.
- **`tailwind.config.ts` has `corePlugins.preflight: false`** on purpose (preflight would clobber the design-system element styling). **Keep it false.**
- **`app/styles/memo.css`** (~18KB) holds all per-slide styles: `.page`, `.cover`, `.barchart`, `.waterfall`, `.stackbar`/`.tiers`, `.milestones`, `.pipeline`, `.oz-card`, `.callout-compliance`, `.bailey`, `.firstmover`, `.phases`, etc. Many slide values are **hardcoded inline in JSX** (`style={{ height: "17%" }}`, `style={{ background: "var(--brass)" }}`).
- **`components/meridian/Chrome.tsx`** already componentizes page chrome: `StandardPage`, `Opener`, `Mark`, and exports `DISCLAIMER`. New viz components compose INSIDE these.
- **`decks/incentive-convergence/slides.tsx`** is the reference deck (6 slide components) and the place hardcoded markup lives. `decks/<slug>/index.tsx` exports a `Deck`; `lib/decks.ts` is the registry.
- **`components/deck/`** is the engine: `DeckRuntime` (present mode, keyboard nav, overview, presenter view), `ScaledPage` (scales the 1100×850 artboard), `ScrollView` (stacks scaled artboards for `/<slug>/scroll`), `types.ts` (`DEFAULT_PAGE_W = 1100`, `DEFAULT_PAGE_H = 850`).
- **`components/ui/*`** are shadcn-style and already use Meridian utilities directly (`bg-navy`, `text-paper`, `ring-brass`, `border-line-strong`, `hover:bg-cloud`). `components/ui/button.tsx` uses `cva` + `cn`.
- **`lib/utils.ts`** exports `cn` (clsx + tailwind-merge). Use it.
- **Fonts** load via `@import url("https://fonts.googleapis.com/…")` at the top of `colors_and_type.css` (render-blocking + external request).
- **Deps present:** `class-variance-authority`, `clsx`, `tailwind-merge`, `lucide-react`, `@radix-ui/*`, `bcryptjs`, `tailwindcss-animate`. React 19 / Next 15.
- **Admin** is editable in `npm run dev` but **view-only in production** (Vercel FS is read-only) — out of scope unless you reach the optional P3 task.

---

## Hard constraints (read twice)

1. **ADDITIVE, never destructive.** The repo uses `bg-navy`, `text-paper`, `ring-brass`, `text-brass-deep`, `border-line-strong`, etc. across admin + UI + deck. You may **add** semantic utilities but must **keep every existing utility name working**, or the build breaks. The provided `tailwind.config.target.ts` shows exactly how (regenerate the legacy names as `var()`-backed, add semantics alongside).
2. **Pixel fidelity until intentional migration.** After each PR, `/incentive-convergence` and `/incentive-convergence/scroll` must look **identical** to before. Verify (see Verification). When migrating a slide to components, the components REUSE the existing `memo.css` classes (Phase A) so output can't drift.
3. **Keep `preflight: false`.** Keep the `tailwindcss-animate` plugin and `darkMode: ["class"]`.
4. **Preserve `globals.css` import order.**
5. **`"use client"`** only where needed (hooks/interactivity). The viz components are server-safe except `BarChart` (marked client only because it could later animate — keep or drop the directive as you prefer; it renders fine either way).
6. **Small PRs.** One concern per PR. Each must `npm run build` and `npm run lint` clean.
7. **No new heavy deps.** Everything needed is already installed. (Dev-only: you may add `tsx` for the token script and `@playwright/test` for visual checks.)

---

## Sequenced PRs

### PR1 — Token source of truth (zero visual change)
**Goal:** one file generates both the CSS `:root` and the Tailwind theme; delete the hand-mirror.

1. Add `design/tokens.ts` (from `reference/design/tokens.ts`). It encodes the current primitives **byte-for-byte**, plus the semantic role maps (`light`/`inverse`) and scales.
2. Add `scripts/build-tokens.ts` (from reference). Add dev dep `tsx`. Add npm scripts:
   ```json
   "tokens": "tsx scripts/build-tokens.ts",
   "predev": "npm run tokens",
   "prebuild": "npm run tokens"
   ```
3. Run `npm run tokens` → writes `app/styles/tokens.generated.css`.
4. Refactor `app/styles/colors_and_type.css`: **replace its `:root{…}` block** with `@import "./tokens.generated.css";` at the very top. Leave ALL the element styling + utility classes (`.eyebrow`, `.ledger`, `.pull`, …) exactly as-is below it.
5. Replace `tailwind.config.ts` with the additive version (from `reference/tailwind.config.target.ts`). Confirm every previously-defined color/font/radius/shadow name still resolves.
6. **Verify:** `git diff` on a built CSS snapshot shows no value changes; `/incentive-convergence` pixel-identical; admin pages unchanged; `npm run build` + `npm run lint` clean.

> Rationale: this is pure plumbing. Values are unchanged; only their *source* is unified. Reviewable in minutes.

### PR2 — Semantic theming + inverse fields (tiny visual-neutral refactor)
**Goal:** dark sections stop being hardcoded navy and become a theme.

1. `tokens.generated.css` already emits `[data-theme="light"]` (default) and `[data-theme="inverse"]`.
2. In `memo.css`, change the dark blocks (`.cover`, `.bailey`, `.firstmover`) so their navy/paper colors read from semantic vars (`--surface-canvas`, `--ink-default`, `--ink-muted`, `--accent-strong`) **instead of** `--navy-deep`/`--paper`. Then set `data-theme="inverse"` on those elements (in `Chrome.tsx`/`slides.tsx` or via the existing class).
3. The resolved colors are identical (inverse maps `--surface-canvas → --navy-deep`, etc.), so **no pixel change** — but the dark fields are now themeable.
4. **Verify:** identical render; toggling `data-theme` on a wrapper visibly swaps light/dark (quick manual check in devtools).

### PR3 — Viz kit, Phase A (componentize markup; reuse classes; zero visual change)
**Goal:** kill the hardcoded JSX; give slide authors a data API.

1. Add `components/viz/*` (from reference): `BarChart`, `Waterfall`, `StatHero`, `MilestoneTrack`, `Pipeline`, `TierStack`, `Callout`, `KpiCard` (+ `KpiBand`), and `index.ts`. These render the **existing `memo.css` classes** — guaranteed identical output — but driven by props; computed bar heights replace hand-typed percentages.
2. Migrate `decks/incentive-convergence/slides.tsx` **one slide per commit**, in this order (simplest first): `HistoricCredits` (TierStack + Callout) → `Scale` (Pipeline + Kpiless) → `OpportunityZone` (KpiBand/KpiCard + Waterfall + Callout) → `Tokenization` (StatHero + MilestoneTrack + Callout) → `Acquisition` (BarChart + Callout) → `Cover` (leave as-is or extract a `CoverIndex` later).
3. After each slide commit, **visual-diff that slide** (see Verification). It must pass before the next.
4. **Verify:** `/incentive-convergence` and `/scroll` pixel-identical; `slides.tsx` is now ~⅓ the size and declarative.

### PR4 — next/font self-hosting (perf + privacy)
1. Remove the Google `@import` from `colors_and_type.css`.
2. In `app/layout.tsx`, load the three families via `next/font/google` (Source Serif 4, IBM Plex Sans, IBM Plex Mono) with `variable: "--font-display" | "--font-sans" | "--font-mono"` and `display: "swap"`. Apply the variable classes to `<html>` (or `<body>`). The token `--font-*` values already match these CSS variables, so nothing else changes.
3. **Verify:** fonts render identically; Network panel shows no `fonts.googleapis.com` request; no CLS.

### PR5 — a11y + reduced-motion pass
1. Add a global focus-visible ring in `globals.css`: `:focus-visible { outline: 2px solid var(--focus-ring); outline-offset: 2px; }` (don't remove shadcn's component rings).
2. Confirm AA: body ink on canvas, and `--accent-strong` (brass-deep #8C6722) for any brass **text** on light; `--accent-soft`/brass-soft for brass text on inverse. Fix any brass-on-light text that uses `--brass` for legibility.
3. Charts: the viz components already accept/emit `aria-label` on `BarChart`; add concise `aria-label`s to `Waterfall`/`Pipeline`/`MilestoneTrack` summarizing the series.
4. If you add any entrance animation later, gate it on `@media (prefers-reduced-motion: no-preference)` and make the end-state the default.
5. **Verify:** keyboard-tab shows visible focus everywhere; axe/Lighthouse a11y has no contrast errors.

### PR6 — Phase B (optional, behind visual diff): tokenize memo.css internals
Only after PR1–3 are stable. For each viz component, move its styling from `memo.css` classes into semantic Tailwind utilities **inside the component**, delete the now-dead `memo.css` rule, and confirm the visual diff stays within threshold. Skip anything that risks a pixel; Phase A is a perfectly good resting state.

### PR7 — `/styleguide` route (living documentation)
Add `app/styleguide/page.tsx` rendering: the color roles (primitive + semantic swatches reading from the vars), the type scale, and one live example of every viz component with sample data. This is the home for design review and white-label QA.

### P3 (separate track, optional) — admin editable in production
Today config is JSON files (read-only on Vercel). If live prod editing is wanted, move `config/*.json` reads/writes behind an adapter backed by **Vercel Edge Config or KV**. Keep the JSON adapter for local. Out of scope for the design-system work; note it and stop unless asked.

---

## Verification (run for every PR)

- `npm run build` and `npm run lint` must pass.
- `npm run dev`, then eyeball **`/incentive-convergence`** (present mode, arrow through all 6) and **`/incentive-convergence/scroll`**. Compare against `main`.
- **Visual diff (recommended):** add `@playwright/test` (dev only) and a tiny spec that screenshots each slide of `/scroll` at 1100×850 and diffs against a baseline captured from `main` before you started. A PR merges only if diffs are within threshold (≈0 for PR1–4). This is what lets you refactor fearlessly.
- Spot-check **admin** (`/admin`, `/login`) still styles correctly (proves the additive Tailwind change held).

## Definition of done
1. `design/tokens.ts` is the only place hexes/scales are defined; `tailwind.config.ts` and the CSS `:root` both derive from it; the hand-mirror is gone.
2. Dark fields are `data-theme="inverse"`; a theme swap re-skins them.
3. `slides.tsx` uses `components/viz/*` with data props; no hardcoded chart pixels in JSX.
4. Fonts are self-hosted via `next/font`; no external font request.
5. Visible focus, AA contrast, reduced-motion-safe.
6. `/styleguide` renders tokens + every component.
7. Every step shipped as its own PR; the deck looks identical throughout (or intentionally + visibly improved, with the diff reviewed).

## How to use the reference folder
`meridian-handoff/reference/` mirrors target paths:
- `design/tokens.ts` → `design/tokens.ts`
- `scripts/build-tokens.ts` → `scripts/build-tokens.ts`
- `tailwind.config.target.ts` → replace `tailwind.config.ts`
- `components/viz/*` → `components/viz/*`

Adapt imports to the repo's `@/` alias (already configured in `tsconfig.json`). These are starting points — reconcile against the real `memo.css` class names if anything has changed, and prefer the repo's existing conventions where they differ.
