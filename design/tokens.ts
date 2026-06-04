// design/tokens.ts
// ─────────────────────────────────────────────────────────────────────────────
// MERIDIAN — single source of truth for design tokens.
//
// Until now the same values lived in THREE places (app/styles/colors_and_type.css
// :root, tailwind.config.ts, and shadcn component classes). This module makes
// them ONE. Two consumers read it, so nothing can drift:
//
//   • scripts/build-tokens.ts → emits app/styles/tokens.generated.css
//                               (the full :root + [data-theme] semantic roles)
//   • tailwind.config.ts      → builds the Tailwind theme from the SAME object
//
// IMPORTANT (non-breaking): the primitive NAMES below are exactly the legacy
// token names already used across the repo (--navy, --brass-deep, bg-navy,
// text-paper, ring-brass …). Keeping them means the admin UI, shadcn
// components, and ported slides keep working untouched. The SEMANTIC layer is
// added ON TOP — adopt it gradually.
//
// This module reproduces the ENTIRE previous :root (colors, derived tints,
// legacy role aliases, the full type/spacing/border/motion/layout scales), so
// the generated CSS is value-for-value identical to the hand-written block it
// replaces. Only the *source* is unified; nothing renders differently.
// ─────────────────────────────────────────────────────────────────────────────

/* ============================================================================
   TIER 1 — PRIMITIVES
   Keyed by CSS custom-property name. Values are byte-for-byte the current
   :root in app/styles/colors_and_type.css. The build script additionally emits
   an `--x-rgb` channel companion for each (e.g. `--navy-rgb: 11 37 69;`) so
   Tailwind utilities can keep using opacity modifiers (bg-brass/15, …).
   ============================================================================ */
export const primitives = {
  '--navy':          '#0B2545',
  '--navy-deep':     '#07182E',
  '--blue':          '#1B3A6B',
  '--blue-mid':      '#2C6299',
  '--azure':         '#4A89C4',
  '--sky':           '#8FBCE0',
  '--mist':          '#CFE0EF',

  '--brass':         '#B4893C',
  '--brass-deep':    '#8C6722',
  '--brass-soft':    '#E7D6AE',

  '--char':          '#14202E',
  '--slate':         '#33455A',
  '--slate-mid':     '#5A6B7E',
  '--slate-soft':    '#8A98A6',
  '--line':          '#D7DCE2',
  '--line-strong':   '#B7C0CA',

  '--paper':         '#F8F7F3',
  '--paper-alt':     '#F1EFEA',
  '--cloud':         '#EDF1F5',
  '--white':         '#FFFFFF',

  '--positive':      '#2E6B4F',
  '--positive-soft': '#DCEAE2',
  '--negative':      '#9B2C2C',
  '--negative-soft': '#F1DEDE',
} as const;

export type PrimitiveVar = keyof typeof primitives;

/* ---- Derived color tints (alpha washes + a neutral alias). Theme-invariant;
   referenced directly in CSS as var(--navy-60) etc. ---- */
export const derived = {
  '--neutral-mark':  'var(--slate-mid)',

  '--navy-80':       'rgba(11, 37, 69, 0.80)',
  '--navy-60':       'rgba(11, 37, 69, 0.60)',
  '--navy-40':       'rgba(11, 37, 69, 0.40)',
  '--navy-20':       'rgba(11, 37, 69, 0.20)',
  '--navy-10':       'rgba(11, 37, 69, 0.10)',
  '--navy-05':       'rgba(11, 37, 69, 0.05)',

  '--brass-30':      'rgba(180, 137, 60, 0.30)',
  '--brass-15':      'rgba(180, 137, 60, 0.15)',

  '--paper-on-navy': 'rgba(248, 247, 243, 0.72)',
} as const;

/* ---- Legacy semantic role aliases. These existing names are consumed by the
   element styles in colors_and_type.css (html/body/h*, .eyebrow, .ledger …) and
   by memo.css. Kept verbatim. The new TIER-2 roles below are added alongside. ---- */
export const legacyRoles = {
  '--bg':            'var(--paper)',
  '--bg-alt':        'var(--paper-alt)',
  '--bg-panel':      'var(--cloud)',
  '--bg-inverse':    'var(--navy)',

  '--fg':            'var(--char)',
  '--fg-strong':     'var(--navy)',
  '--fg-muted':      'var(--slate-mid)',
  '--fg-subtle':     'var(--slate-soft)',
  '--fg-inverse':    'var(--paper)',
  '--fg-accent':     'var(--brass-deep)',

  '--border':        'var(--line)',
  '--border-strong': 'var(--line-strong)',
  '--border-ink':    'var(--navy)',
  '--border-accent': 'var(--brass)',

  '--focus-ring':    'var(--brass)',
  '--selection':     'var(--brass-soft)',
} as const;

/* ---- Non-color scales (theme-invariant). Mirror colors_and_type.css. ---- */
export const font = {
  '--font-display': `"Source Serif 4", "Iowan Old Style", Georgia, serif`,
  '--font-sans':    `"IBM Plex Sans", "Helvetica Neue", Arial, sans-serif`,
  '--font-mono':    `"IBM Plex Mono", "SFMono-Regular", Menlo, monospace`,
} as const;

export const fontSize = {
  '--fs-mono-xs': '0.6875rem', '--fs-mono-sm': '0.75rem',
  '--fs-body-sm': '0.875rem',  '--fs-body': '1rem',
  '--fs-body-lg': '1.1875rem', '--fs-body-xl': '1.375rem',
  '--fs-h6': '1.25rem', '--fs-h5': '1.5rem', '--fs-h4': '1.9375rem',
  '--fs-h3': '2.5rem',  '--fs-h2': '3.25rem', '--fs-h1': '4.5rem',
  '--fs-hero': '6.5rem', '--fs-mega': '9rem',
} as const;

export const lineHeight = {
  '--lh-tight':   '0.95',
  '--lh-display': '1.02',
  '--lh-heading': '1.12',
  '--lh-body':    '1.62',
  '--lh-loose':   '1.75',
} as const;

export const tracking = {
  '--tracking-tight':  '-0.02em',
  '--tracking-snug':   '-0.01em',
  '--tracking-normal': '0',
  '--tracking-wide':   '0.04em',
  '--tracking-widest': '0.16em',
} as const;

export const radius = { '--radius': '2px', '--radius-lg': '4px' } as const;

export const space = {
  '--space-1':  '4px',  '--space-2':  '8px',  '--space-3':  '12px',
  '--space-4':  '16px', '--space-5':  '20px', '--space-6':  '24px',
  '--space-8':  '32px', '--space-10': '40px', '--space-12': '48px',
  '--space-16': '64px', '--space-20': '80px', '--space-24': '96px',
  '--space-32': '128px',
} as const;

export const borderWeight = {
  '--bw-hair':  '1px',
  '--bw-thin':  '2px',
  '--bw-rule':  '3px',
  '--bw-strap': '4px',
} as const;

export const shadow = {
  '--shadow-sm':   '0 1px 2px rgba(11, 37, 69, 0.08)',
  '--shadow-md':   '0 4px 16px rgba(11, 37, 69, 0.10)',
  '--shadow-lg':   '0 12px 40px rgba(11, 37, 69, 0.14)',
  '--shadow-page': '0 18px 60px rgba(7, 24, 46, 0.22)',
} as const;

export const motion = {
  '--dur-quick': '120ms',
  '--dur-base':  '240ms',
  '--dur-slow':  '480ms',
  '--ease':      'cubic-bezier(0.2, 0, 0, 1)',
  '--ease-out':  'cubic-bezier(0.16, 1, 0.3, 1)',
} as const;

export const layout = {
  '--tempo-section': 'clamp(64px, 8vw, 120px)',
  '--tempo-gutter':  'clamp(24px, 4vw, 72px)',
  '--measure':       '68ch',
} as const;

/* ============================================================================
   TIER 2 — SEMANTICS  (role → primitive var, themed)
   Components should migrate to these so dark sections + white-label become a
   token swap. `light` is the default editorial canvas; `inverse` is the dark
   navy field (cover, first-mover, Bailey panels). The build script emits both a
   color ref (`--surface-canvas: var(--paper)`) and an rgb-channel ref
   (`--surface-canvas-rgb: var(--paper-rgb)`) for each role, so the new semantic
   Tailwind utilities (bg-canvas, text-ink, …) also support opacity modifiers.
   ============================================================================ */
export type SemanticRole =
  | '--surface-canvas' | '--surface-raised' | '--surface-sunken' | '--surface-inverse'
  | '--ink-strong' | '--ink-default' | '--ink-muted' | '--ink-subtle' | '--ink-inverse'
  | '--accent' | '--accent-strong' | '--accent-soft' | '--on-accent'
  | '--border-subtle' | '--border-strong' | '--border-accent'
  | '--data-primary' | '--data-support' | '--data-tint' | '--data-emphasis'
  | '--pos' | '--pos-soft' | '--neg' | '--neg-soft'
  | '--focus-ring' | '--selection';

export type SemanticMap = Record<SemanticRole, PrimitiveVar>;

export const light: SemanticMap = {
  '--surface-canvas': '--paper',   '--surface-raised': '--white',
  '--surface-sunken': '--cloud',   '--surface-inverse': '--navy',
  '--ink-strong': '--navy',  '--ink-default': '--char',
  '--ink-muted': '--slate-mid', '--ink-subtle': '--slate-soft', '--ink-inverse': '--paper',
  '--accent': '--brass', '--accent-strong': '--brass-deep', '--accent-soft': '--brass-soft',
  '--on-accent': '--navy-deep',
  '--border-subtle': '--line', '--border-strong': '--line-strong', '--border-accent': '--brass',
  '--data-primary': '--blue-mid', '--data-support': '--blue',
  '--data-tint': '--mist', '--data-emphasis': '--brass',
  '--pos': '--positive', '--pos-soft': '--positive-soft',
  '--neg': '--negative', '--neg-soft': '--negative-soft',
  '--focus-ring': '--brass', '--selection': '--brass-soft',
};

export const inverse: SemanticMap = {
  '--surface-canvas': '--navy-deep', '--surface-raised': '--navy',
  '--surface-sunken': '--navy',      '--surface-inverse': '--paper',
  '--ink-strong': '--white', '--ink-default': '--paper',
  '--ink-muted': '--mist', '--ink-subtle': '--sky', '--ink-inverse': '--navy',
  '--accent': '--brass', '--accent-strong': '--brass-soft', '--accent-soft': '--brass-deep',
  '--on-accent': '--navy-deep',
  '--border-subtle': '--blue', '--border-strong': '--blue-mid', '--border-accent': '--brass',
  '--data-primary': '--azure', '--data-support': '--sky',
  '--data-tint': '--blue', '--data-emphasis': '--brass-soft',
  '--pos': '--positive', '--pos-soft': '--positive-soft',
  '--neg': '--negative', '--neg-soft': '--negative-soft',
  '--focus-ring': '--brass-soft', '--selection': '--brass-deep',
};

export const themes = { light, inverse } as const;
export type ThemeName = keyof typeof themes;

/* ============================================================================
   WHITE-LABEL — a client theme is a thin override of the named primitives.
   Semantics don't change, so every component re-skins for free.
     makeBrand({ '--navy': '#10243F', '--brass': '#2E7D6B', '--brass-deep': '#1F5B4E' })
   The generator emits these under [data-brand="<name>"] redefining only the
   overridden --vars. Run `npm run check:contrast` after adding one.
   ============================================================================ */
export type PrimitiveOverride = Partial<Record<PrimitiveVar, string>>;
export function makeBrand(name: string, override: PrimitiveOverride) {
  return { name, override };
}

/* Helper: Tailwind reads colors as var() refs so utilities re-theme at runtime. */
export const cssVar = (name: PrimitiveVar | SemanticRole) => `var(${name})`;
