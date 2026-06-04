---
name: meridian-deck
description: >-
  Scaffold a new on-brand Meridian presentation deck (institutional finance
  style) for this Next.js platform. Use when the user wants to create a new
  slide deck, add slides, or build a presentation from a content brief. Produces
  typed React slide components that reuse the Meridian design system and plug
  into the deck registry, present mode, scroll view, and PDF export.
---

# Meridian Deck Builder

Build a new presentation deck for this platform. Decks are **typed React
components** that reuse the Meridian design system — no Markdown, no external
slide library. Each slide is a fixed `1100×850` artboard.

## How the platform fits together

- `app/styles/colors_and_type.css` — design tokens + raw element styling (the
  source of truth). Also mirrored into `tailwind.config.ts` as `bg-navy`,
  `text-brass-deep`, `font-display`, etc.
- `app/styles/memo.css` — per-component slide styles (`.cover`, `.barchart`,
  `.waterfall`, `.tiers`, `.oz-card`, `.milestones`, `.phases`, …).
- `components/meridian/Chrome.tsx` — reusable chrome: `StandardPage`, `Opener`,
  `Mark`, `DISCLAIMER`.
- `components/deck/` — the engine: present mode, overview, presenter view,
  scroll view, scaling. **Do not modify** unless changing engine behaviour.
- `decks/<slug>/` — one folder per deck: `slides.tsx` + `index.tsx`.
- `lib/decks.ts` — the registry. New decks must be added here.

## Steps to create a deck

1. **Create `decks/<slug>/slides.tsx`.** Export one component per slide.
   - Interior slides: wrap in `<StandardPage idx="02 / 06" label="...">` and use
     an `<Opener eyebrow="..." lede="...">Headline with <em>emphasis</em></Opener>`.
   - Use existing memo.css component classes for data viz (bar charts,
     waterfalls, tier stacks, milestone tracks, pipelines). Copy the closest
     existing slide in `decks/incentive-convergence/slides.tsx` as a template.
   - Inline styles use objects: `style={{ height: "44%" }}`.
2. **Create `decks/<slug>/index.tsx`.** Export a `Deck` object: `slug`, `title`,
   `summary`, and a `slides[]` array of `{ id, label, render: () => <Slide/>, notes }`.
   Always write `notes` — they power presenter mode.
3. **Register it** in `lib/decks.ts` (`import` + add to the `decks` array).
4. **Verify**: `npm run build`. Then it is live at `/<slug>` (present) and
   `/<slug>/scroll` (scrollable). Overview = Esc, Presenter = P, Fullscreen = F.

## Design rules (keep it institutional)

- Numbers are the hero. One brass `<em>` emphasis per headline, used sparingly.
- Charts are CSS, not chart libraries — heights/widths as percentages.
- Every interior page carries the `DISCLAIMER` footer (StandardPage adds it).
- Reuse tokens (`var(--navy)`, `bg-navy`) — never hardcode new hex values.

## Reference deck

`decks/incentive-convergence/` is the canonical example: a 6-slide deck with a
cover, bar chart, stacked-credit tiers, a waterfall, milestone tracks, and a
phased-pipeline slide. Mirror its structure.
