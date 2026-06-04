# Meridian — Presentation Platform

An internal platform for building and presenting institutional-finance decks,
built with **Next.js + Tailwind**. Every deck is a set of typed React slide
components that reuse the shared **Meridian** design system, and can be shown as
a slide deck, shared as a scrollable page, or exported to PDF.

## Quick start

```bash
npm install      # first time only
npm run dev      # http://localhost:3000
```

| Command          | What it does                          |
| ---------------- | ------------------------------------- |
| `npm run dev`    | Dev server with hot reload            |
| `npm run build`  | Production build                      |
| `npm start`      | Serve the production build            |
| `npm run lint`   | Lint                                  |

## Routes

| Path                            | View                                   |
| ------------------------------- | -------------------------------------- |
| `/`                             | Deck index                             |
| `/<deck-slug>`                  | Present mode (slide-by-slide)          |
| `/<deck-slug>/scroll`           | Scrollable "product presentation" view |

Example: `/incentive-convergence` and `/incentive-convergence/scroll`.

## Presenting

Keyboard shortcuts in present mode:

| Key            | Action                                  |
| -------------- | --------------------------------------- |
| `←` `→` `Space`| Previous / next slide                   |
| `Home` `End`   | Jump to first / last slide              |
| `Esc`          | Overview grid (click a slide to jump)   |
| `P`            | Presenter view — speaker notes + timer  |
| `F`            | Fullscreen                              |

**PDF export:** open a deck and use the browser's **Print → Save as PDF**
(Letter landscape, one slide per page — print styling lives in
`app/styles/memo.css`).

## Project layout

```
app/
  page.tsx                 Deck index
  [deck]/page.tsx          Present mode
  [deck]/scroll/page.tsx   Scroll view
  styles/                  Meridian design system (colors_and_type.css, memo.css)
components/
  deck/                    The slide engine (nav, present, overview, presenter, scaling)
  meridian/Chrome.tsx      Reusable page chrome (StandardPage, Opener, Mark)
decks/
  incentive-convergence/   Reference deck (slides.tsx + index.tsx)
lib/decks.ts               Deck registry
tailwind.config.ts         Meridian tokens exposed as Tailwind utilities
```

The design tokens live in `app/styles/colors_and_type.css` (CSS custom
properties) and are mirrored into `tailwind.config.ts` so app chrome can use
`bg-navy`, `text-brass-deep`, `font-display`, etc. Tailwind's preflight is
disabled so it doesn't override the design system's element styling.

## Adding a new deck

1. Create `decks/<slug>/slides.tsx` — one component per slide. Wrap interior
   slides in `<StandardPage idx="02 / 06" label="…">` with an `<Opener>` header,
   and reuse the chart/layout classes from `app/styles/memo.css`. Copy
   `decks/incentive-convergence/slides.tsx` as a template.
2. Create `decks/<slug>/index.tsx` exporting a `Deck` object (`slug`, `title`,
   `summary`, `slides[]` with `{ id, label, render, notes }`).
3. Register it in `lib/decks.ts`.
4. `npm run build`, then visit `/<slug>`.

Or run the **`meridian-deck`** Claude Code skill
(`.claude/skills/meridian-deck/`) and describe the deck you want — it scaffolds
the above on-brand.

## Access control

Decks can be public or require sign-in, toggled per presentation.

- **Config (source of truth, in the repo):**
  - `config/users.json` — admin/viewer accounts (`email`, `username`, `role`,
    bcrypt `passwordHash`). Passwords are never stored in plaintext.
  - `config/decks-access.json` — `{ "<slug>": { "protected": true|false } }`.
  - `config/site.json` — bcrypt hash of the shared presentation password.
- **Two ways in, by design:**
  - **Presentation gate (`/login`)** — a single shared password (Vimeo-style)
    that unlocks every protected deck. Hand it to viewers. No username.
  - **Admin sign-in (`/admin/login`)** — username + password for an admin
    account; required for the `/admin` portal. Admins can also view decks.
- Sessions are signed cookies (HMAC-SHA256). Set a strong `AUTH_SECRET`
  (see `.env.example`) locally and in Vercel.
- **Middleware** (`middleware.ts`) gates protected decks and the `/admin` portal.
- **Admin portal:** `/admin` (admin role required) — toggle deck protection,
  change the shared presentation password, and add / edit / delete access
  records and reset passwords.

**Editing model:** the repo is the source of truth. The admin portal is fully
editable when you run locally (`npm run dev`); commit and push, and Vercel
redeploys with the new config. On Vercel the filesystem is read-only, so the
admin is **view-only in production** (it shows a banner explaining this).

Seed admin (change it immediately): username `admin` /
email `moyelaw@gmail.com` / password `meridian2026`.
Seed presentation password: `dillon2026` (change it in `/admin`).

## Deployment

Deployed on Vercel as a Next.js app (`vercel.json` pins the `nextjs` framework
preset). Pushing to the connected branch triggers a deployment. Set
`AUTH_SECRET` in the Vercel project's environment variables.
