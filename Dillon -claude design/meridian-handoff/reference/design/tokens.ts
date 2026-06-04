// design/tokens.ts
// ─────────────────────────────────────────────────────────────────────────────
// MERIDIAN — single source of truth for design tokens.
//
// Today the same values live in THREE places (app/styles/colors_and_type.css
// :root, tailwind.config.ts, and shadcn component classes). This module makes
// them ONE. Two consumers read it, so nothing can drift:
//
//   • scripts/build-tokens.ts → emits app/styles/tokens.generated.css
//                               (:root primitives + scales + [data-theme] roles)
//   • tailwind.config.ts      → builds the Tailwind theme from the SAME object
//
// IMPORTANT (non-breaking): the primitive NAMES below are exactly the legacy
// token names already used across the repo (--navy, --brass-deep, bg-navy,
// text-paper, ring-brass …). Keeping them means the admin UI, shadcn
// components, and ported slides keep working untouched. The SEMANTIC layer is
// added ON TOP — adopt it gradually.
// ─────────────────────────────────────────────────────────────────────────────

/* ============================================================================
   TIER 1 — PRIMITIVES
   Keyed by CSS custom-property name. Values are byte-for-byte the current
   :root in app/styles/colors_and_type.css. This object reproduces it exactly.
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

export const radius = { '--radius': '2px', '--radius-lg': '4px' } as const;

export const shadow = {
  '--shadow-sm':   '0 1px 2px rgba(11,37,69,0.08)',
  '--shadow-md':   '0 4px 16px rgba(11,37,69,0.10)',
  '--shadow-lg':   '0 12px 40px rgba(11,37,69,0.14)',
  '--shadow-page': '0 18px 60px rgba(7,24,46,0.22)',
} as const;

/* ============================================================================
   TIER 2 — SEMANTICS  (role → primitive var, themed)
   Components should migrate to these so dark sections + white-label become a
   token swap. `light` is the default editorial canvas; `inverse` is the dark
   navy field (cover, first-mover, Bailey panels).
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
