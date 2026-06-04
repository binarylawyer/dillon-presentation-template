# Meridian — Architecture & Rationale

Background for the upgrade in `CLAUDE_CODE_TASK.md`. Read this to understand
*why*; read the task file for *what to do*.

---

## The problem

The Meridian look is right, but its tokens live in **three** places that drift:

1. `app/styles/colors_and_type.css` `:root` — the real source.
2. `tailwind.config.ts` — a hand-typed copy of the same hexes.
3. shadcn components + hardcoded slide markup — values restated inline
   (`style={{ height: "17%" }}`, `background: "var(--brass)"`).

Change a blue and you must remember all three. New decks copy-paste chart
markup. That's the debt.

---

## The model: 2 tiers + a theme axis

```
PRIMITIVES            SEMANTICS (themed)              CONSUMERS
--navy  #0B2545   →   --surface-canvas  (light→paper)  →  bg-canvas / .cover
--brass #B4893C   →   --accent          (→ brass)       →  text-accent / .bar.hi
--char  #14202E   →   --ink-default     (→ char)        →  text-ink / body
                      [data-theme="inverse"] re-points
                      the same roles to navy/paper.
```

- **Primitives** keep the **existing names** (`--navy`, `--brass-deep`, …) so the
  whole repo keeps working. They're the brand's raw values.
- **Semantics** are role aliases (`surface`, `ink`, `accent`, `border`, `data`,
  `pos`/`neg`) defined twice — `light` and `inverse`. Components that use them
  re-skin on a `data-theme` swap.
- **One source file** (`design/tokens.ts`) generates the CSS `:root` *and* feeds
  Tailwind, so the two can never disagree.

### Why keep primitive names instead of a numeric ramp?
A "pure" system would rename to `blue.900` etc. But this repo already ships
`--navy`/`bg-navy` everywhere. Renaming = a giant, risky churn for no user-visible
gain. Keeping the names and **layering** semantics on top gets 100% of the
theming benefit with a near-zero-risk migration. If a future need (Figma sync,
native apps, many white-labels) justifies it, the ramp rename is a clean later
step.

---

## Theming

- **Light / inverse:** the dark cover, Bailey, and first-mover panels are
  currently hardcoded navy. Pointing them at `--surface-canvas` / `--ink-*` and
  tagging them `data-theme="inverse"` makes them themeable with **zero pixel
  change** (inverse maps `--surface-canvas → --navy-deep`, the same color).
- **White-label:** a client theme is a thin override of the *named primitives*
  (`makeBrand("northwind", { "--navy": "#10243F", "--brass": "#2E7D6B" })`).
  Semantics don't change, so every slide + the admin re-skin for free. The
  generator emits the override under `[data-brand="…"]`. Run a contrast check
  per brand.

**Decision — override at the primitive tier, not semantic.** Overriding roles
per client would fork the role map and re-introduce drift. Overriding the ramps
those roles point at keeps one role map forever.

---

## The viz kit, in two phases

**Phase A (safe, default):** components render the **existing `memo.css`
classes**, driven by data props. `BarChart` computes bar heights from `value ÷
max` (the old inline `%` were hand-computed versions of exactly that). Output is
pixel-identical; `slides.tsx` shrinks dramatically and new decks pass data, not
markup. This is a perfectly good resting state.

**Phase B (optional):** move each component's styling from `memo.css` into
semantic Tailwind utilities *inside* the component, delete the dead CSS, and
confirm via visual diff. Do this only where it stays pixel-safe.

Component inventory (prop APIs in the reference files):
`BarChart · Waterfall · StatHero · MilestoneTrack · Pipeline · TierStack ·
Callout · KpiCard/KpiBand`.

---

## Key decisions & tradeoffs

1. **TS token module + tiny generator, not Style Dictionary.** One web target;
   SD's multi-platform machinery isn't worth the dependency yet. The module is
   already structured (primitive/semantic) to port to SD later if needed.
2. **Tailwind colors → `var(--…)`, not hex.** Enables runtime `data-theme`
   swap and kills drift; costs one extra devtools hop. Worth it.
3. **Additive Tailwind, keep `preflight: false`.** Removing legacy utility
   names or enabling preflight would break the admin UI / clobber the
   design-system element styles. Both are explicit "don't" constraints.
4. **Generated static CSS, not CSS-in-JS.** Print/PDF fidelity, zero runtime,
   clean SSR on Vercel.
5. **Two-phase viz migration behind a visual-diff gate.** Pixel fidelity is a
   hard requirement; Phase A guarantees it, Phase B is opt-in.

---

## Beyond the design system (app improvements in the task)

- **next/font self-hosting** — removes the render-blocking Google Fonts call and
  the external request (better for IR/compliance), fixes CLS.
- **a11y** — global focus-visible ring, AA-safe brass for text, chart
  `aria-label`s, reduced-motion-safe.
- **Mobile reading mode** — once slides are components, a narrow-viewport reflow
  beats shrinking the 1100×850 artboard to illegibility. (Extends the existing
  `ScrollView`.)
- **Visual-regression tests** — Playwright screenshot diffs protect fidelity
  across the whole refactor.
- **Admin in production (optional, P3)** — config is JSON, read-only on Vercel;
  an Edge Config / KV adapter would make the admin live in prod.
