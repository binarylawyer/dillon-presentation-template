# START HERE — Meridian platform upgrade handoff

This folder is a complete, self-contained brief for upgrading the
**dillon-presentation-template** repo's design system. Hand it to Claude Code and
it will do the work in small, safe, reviewable PRs.

## What's inside
```
meridian-handoff/
├── START_HERE.md            ← you are here
├── CLAUDE_CODE_TASK.md      ← the full task brief Claude Code follows
├── ARCHITECTURE.md          ← the why: token model, theming, decisions, tradeoffs
└── reference/               ← ready-made source to adapt into real repo paths
    ├── design/tokens.ts
    ├── scripts/build-tokens.ts
    ├── tailwind.config.target.ts
    └── components/viz/{BarChart,Waterfall,StatHero,MilestoneTrack,Pipeline,TierStack,Callout,KpiCard}.tsx (+ index.ts)
```

## How to run it (two options)

**Option A — drop in the repo, then prompt (simplest)**
1. Unzip this folder into the repo root, so you have `dillon-presentation-template/meridian-handoff/…`.
2. Commit it on a scratch branch (or leave it untracked).
3. In Claude Code, paste the kickoff prompt below.
4. When the work is done, delete `meridian-handoff/` in a final cleanup commit.

**Option B — attach the files**
Attach `CLAUDE_CODE_TASK.md` + the `reference/` files in Claude Code and paste the kickoff prompt.

## Kickoff prompt (paste this into Claude Code)

> Read `meridian-handoff/CLAUDE_CODE_TASK.md` in full, then implement it in this
> repo. Work one PR at a time exactly as sequenced (PR1 → PR7), and **stop after
> each PR** so I can review before you continue. Honor every Hard Constraint —
> especially: the Tailwind change must be **additive** (keep `bg-navy`,
> `ring-brass`, etc. working), keep `preflight: false`, and the
> `incentive-convergence` deck must look **pixel-identical** after each PR until
> a slide is intentionally migrated. Use the files in
> `meridian-handoff/reference/` as starting points, adapting them to the repo's
> real paths and the `@/` import alias. Before you start, capture a visual
> baseline of `/incentive-convergence/scroll` so you can diff against it. Begin
> with **PR1 (Token source of truth)** and show me the diff.

## The one thing not to get wrong
The repo's admin UI and shadcn components depend on utilities like `bg-navy`,
`text-paper`, `ring-brass`, `border-line-strong`. The migration **adds** a
semantic layer (`bg-canvas`, `text-ink`, `border-edge-subtle`, …) **without
removing** those legacy names. `reference/tailwind.config.target.ts` shows the
exact additive shape. If those names disappear, the build breaks — so they don't.

## Suggested order of review
PR1 (plumbing, zero visual change) → PR2 (theming, zero visual change) →
PR3 (componentize slides, zero visual change) → PR4 (self-host fonts) →
PR5 (a11y) → PR6 (optional CSS tokenization) → PR7 (styleguide). P3 (admin in
prod) is a separate, optional track.
