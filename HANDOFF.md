# Project Handoff — Meridian Presentation Platform (Dillon / Troika District)

> Single source of truth for resuming work in a fresh conversation. Read this top
> to bottom before doing anything. Last updated: 2026-06-04.

---

## 0. TL;DR

A custom Next.js presentation platform ("Meridian") is **built and live in
production**. Two things remain:

- **Track A — Design-system upgrade** (PR1→PR7) per `CLAUDE_CODE_TASK.md`. Needs
  the `meridian-handoff/reference/` source files (currently missing from this
  repo — see §1).
- **Track B — Populate the admin Runbook** with the real Troika District deal
  content (the two `Troika_District_*` markdown files in the repo).

---

## 1. ⚠️ REPOS — read this first (the thing that wasted a session)

There are **two near-identical GitHub repos**, and they got conflated:

| Repo | Role |
| --- | --- |
| **`binarylawyer/dillon-presentationn-1`** | The repo that was actively built in (PRs #1–6) and that **Vercel project `dillon-sc` deploys to production**. |
| **`binarylawyer/dillon-presentation-template`** | A second repo (the name `CLAUDE_CODE_TASK.md` references). The `meridian-handoff/` reference files were uploaded **here**, not into the deploy repo. |

**Pitfall:** a Claude Code session is scoped to **one** repo. If the session is
connected to `dillon-presentationn-1` it **cannot** read files that live in
`dillon-presentation-template`, and vice-versa. Renaming a repo does **not** move
files between repos or branches.

**Before starting the new session:**
1. Decide the **one** repo that is the source of truth (recommendation: the repo
   Vercel deploys — confirm which one that is in the Vercel dashboard for project
   `dillon-sc`).
2. Make sure **everything** lives in that one repo on `main`: the app code, the
   three deal/brief markdown files, **and** the `meridian-handoff/` folder with
   its `reference/` subtree.
3. Connect the new session to **that** repo.
4. Verify on day one: `git ls-tree -r --name-only origin/main | grep meridian-handoff`
   must list `reference/design/tokens.ts`, `reference/scripts/build-tokens.ts`,
   `reference/tailwind.config.target.ts`, and `reference/components/viz/*`.

---

## 2. What is built and live (state of the deploy repo)

A full presentation platform, shipped over PRs #1–6 (all merged to `main`):

- **Custom React deck engine** (`components/deck/`): present mode (←/→/Space,
  Home/End), overview grid (Esc), presenter view with speaker notes + timer (P),
  fullscreen (F), and a `ScaledPage` that scales a fixed 1100×850 artboard.
- **Scroll view** (`/<slug>/scroll`) — the same slides as a scrollable page.
- **Print → PDF** via browser print (print CSS in `app/styles/memo.css`).
- **Design system** in `app/styles/colors_and_type.css` (tokens + element styles)
  and `app/styles/memo.css` (per-slide styles). Tailwind mirrors the tokens in
  `tailwind.config.ts` with `preflight: false` and `darkMode: ["class"]`.
- **Reference deck**: `decks/incentive-convergence/` (typed React slides).
- **Authoring skill**: `.claude/skills/meridian-deck/` scaffolds new on-brand decks.
- **Access control** (see §4) and an **admin portal** (see §5).
- Deployed on **Vercel** as a Next.js app (`vercel.json` pins the `nextjs`
  framework preset).

---

## 3. File map

```
app/
  page.tsx                     Deck index (shows Protected badge + Admin link)
  [deck]/page.tsx              Present mode
  [deck]/scroll/page.tsx       Scroll view
  login/page.tsx + gate-form   Presentation password gate (Vimeo-style)
  admin/page.tsx               Admin portal (Access control)
  admin/admin-client.tsx       Admin UI (deck toggles, users, presentation pw)
  admin/actions.ts             Server actions (admin-guarded)
  admin/login/                 Admin account sign-in
  admin/runbook/page.tsx       Deal cheat sheet (see §5)
  api/login/route.ts           Handles BOTH shared-password and account login
  api/logout/route.ts
  styles/colors_and_type.css   Design tokens (:root) + element/utility styles
  styles/memo.css              Per-slide styles + print CSS
components/
  deck/                        Engine: DeckRuntime, ScaledPage, ScrollView, types
  meridian/Chrome.tsx          StandardPage, Opener, Mark, DISCLAIMER
  runbook/parts.tsx            Runbook cheat-sheet primitives
  ui/                          shadcn-style: button,input,label,switch,table,dialog,badge
config/
  users.json                  Admin/viewer accounts (bcrypt hashes)
  decks-access.json           { "<slug>": { "protected": bool } }
  site.json                   bcrypt hash of the shared presentation password
content/runbook.tsx           Runbook section content (the cheat sheet)
lib/access.ts                 Node-only: read/write config, bcrypt, verify
lib/session.ts                Edge-safe signed-cookie sessions (Web Crypto HMAC)
lib/decks.ts                  Deck registry
middleware.ts                 Gates protected decks + /admin
```

---

## 4. Access control & credentials

Two independent ways in (by design):

- **Presentation gate** (`/login`): a single **shared password**, Vimeo-style.
  Current password: **`dillon2026`** (bcrypt hash in `config/site.json`). Unlocks
  any deck marked `protected`.
- **Admin sign-in** (`/admin/login`): username + password account.
  Seed admin: **`admin`** / email **`moyelaw@gmail.com`** / password
  **`meridian2026`** (bcrypt hash in `config/users.json`). **Change this.**

Sessions are signed cookies (HMAC-SHA256). **`AUTH_SECRET`** is required:
- Set in Vercel env (user reports it is set). Use the same value in `.env.local`.
- Without it, sessions fall back to an insecure dev secret.

**Editing model:** the repo is the source of truth. The admin is fully editable
when running locally (`npm run dev`) — it writes `config/*.json`; commit + push and
Vercel redeploys. On Vercel the filesystem is read-only, so the admin is
**view-only in production** (it shows a banner). To change the password, add
users, or toggle a deck: do it locally, commit, push.

Production: **`https://dillon-sc.vercel.app`** (admin at `/admin`). The
`incentive-convergence` deck is currently `protected: true`.

---

## 5. Admin Runbook — built, awaiting content

`/admin/runbook` renders a "Deal Cheat Sheet" one-pager (sticky TOC, Print/PDF,
admin-only). Content lives in `content/runbook.tsx` as a `runbook[]` array of
sections, using primitives from `components/runbook/parts.tsx`
(`Lead, P, H3, Facts, Steps, Def, StatGrid, Note, Blank`).

It is seeded with an **accurate-but-generic first draft** and `<Blank/>`
placeholders. **Track B is to replace the blanks/draft with the real Troika
deal content** from the two markdown files in the repo:
- `Troika_District_Deal_Cheat_Sheet.md` (maps 1:1 to the 9 runbook sections)
- `Troika_District_Deal_Runbook_v3.md` (fuller 14-section development plan)

**Important when populating:** that content contains explicit **CONFLICTS** and
**NOT-FOUND** items the deal team must reconcile (e.g., project name
Troika/McRae/Dillon Main Street; rural OZ step-up 10% vs 30%; IM vs Pro Forma
return multiples 3.5–3.9x vs 7.85x; OZ designation is *prospective*). **Preserve
those flags in the runbook** — do not silently pick a number. Keep the
"Internal reference only — not legal or tax advice" framing. The deal is **Reg D
506(c)**, **Metallicus** tokenization, syndicate **JD McLeod (CEO) / Christopher
Moye (COO)**, economics **60/40** ("every published document must reflect 60/40").

---

## 6. Pending work

### Track A — Meridian design-system upgrade (PR1→PR7)
Follow `CLAUDE_CODE_TASK.md` exactly. Summary of intent: turn duplicated/bypassed
tokens into one tokenized source of truth + a semantic theming layer + a
componentized viz kit, **without changing how any slide looks** until a slide is
intentionally migrated behind a visual diff. **Work one PR at a time, stop after
each for review.** Keep the Tailwind change **additive** (every existing utility
like `bg-navy`, `ring-brass`, `text-brass-deep`, `border-line-strong` must keep
working), keep `preflight: false`, preserve `globals.css` import order.

- **PR1** Token source of truth: `design/tokens.ts` → generates both the CSS
  `:root` and the Tailwind theme; delete the hand-mirror. Add `scripts/build-tokens.ts`
  + dev dep `tsx` + npm scripts (`tokens`/`predev`/`prebuild`).
- **PR2** Semantic theming + `[data-theme="inverse"]` for dark fields.
- **PR3** Viz kit Phase A (componentize `slides.tsx`, reuse `memo.css` classes,
  one slide per commit, zero visual change).
- **PR4** `next/font` self-hosting (drop Google `@import`).
- **PR5** a11y + reduced-motion.
- **PR6** (optional) tokenize `memo.css` internals behind visual diff.
- **PR7** `/styleguide` route.

**Needs:** the `meridian-handoff/reference/` files (see §1). They are "starting
points" to adapt to real paths via the `@/` alias.

**⚠️ Known gotcha for PR1 (discovered, not yet solved in code):** the repo uses
Tailwind **opacity modifiers** heavily (`bg-navy-deep/50`, `text-paper/60`,
`bg-brass/15`, `ring-brass/40`, `border-white/10`, …). Naively pointing Tailwind
colors at `var(--navy)` **breaks** those modifiers. The fix is to back the color
utilities with RGB-channel vars, e.g. emit `--navy-rgb: 11 37 69;` and set
Tailwind `navy: "rgb(var(--navy-rgb) / <alpha-value>)"`, while element CSS keeps
using the full-color `var(--navy)`. Verify with a **visual baseline diff** of
`/incentive-convergence/scroll` (capture before, compare after — should be ~0).
Check whether `reference/tailwind.config.target.ts` already handles this; match it.

### Track B — Populate the Runbook (see §5).

---

## 7. Deal content location

In the deploy repo root:
- `Troika_District_Deal_Cheat_Sheet.md`
- `Troika_District_Deal_Runbook_v3.md`
- `CLAUDE_CODE_TASK.md` (the design brief)

(`START_HERE.md` and `ARCHITECTURE.md` exist only as prior chat attachments — get
them into the repo too if you want them as durable references.)

---

## 8. Kickoff prompt for the new conversation

> Read `HANDOFF.md` in full first. Confirm this session's repo is the one Vercel
> `dillon-sc` deploys and that `meridian-handoff/reference/` is present on `main`
> (`git ls-tree -r --name-only origin/main | grep meridian-handoff`) — if it
> isn't, stop and tell me before doing anything. Then start **Track A, PR1** from
> `CLAUDE_CODE_TASK.md`: capture a visual baseline of `/incentive-convergence/scroll`,
> adapt `meridian-handoff/reference/` into the real paths, keep the Tailwind change
> additive (all existing utilities keep working) and `preflight: false`, mind the
> opacity-modifier gotcha in HANDOFF.md §6, verify the deck is pixel-identical, and
> show me the diff. Stop after PR1 for review. Do **not** author the reference
> files from scratch — they must come from the repo.

---

## 9. Conventions

- Develop on a feature branch; open a **draft PR** per change; the user reviews
  and merges. CI = Vercel deploy checks (they go green on a clean build).
- Don't push to `main` directly.
- `npm run build` + `npm run lint` must pass for every PR.
- Stack: Next.js 15 (App Router) · React 19 · TypeScript · Tailwind 3.4 ·
  shadcn-style UI · bcryptjs · lucide-react · Radix.
