import type { ReactNode } from "react";

/** A single slide: a fixed-canvas artboard plus optional speaker notes. */
export interface SlideDef {
  /** Stable id used in the URL hash / overview. */
  id: string;
  /** Short label shown in the overview and presenter view. */
  label: string;
  /** The slide artboard. Should render a `.page` section (1100x850). */
  render: () => ReactNode;
  /** Speaker notes, shown only in presenter mode. */
  notes?: string;
}

/** A deck: metadata + ordered slides. */
export interface Deck {
  slug: string;
  title: string;
  /** One-line description for the deck index. */
  summary?: string;
  /** Fixed artboard dimensions. Defaults to 1100x850 (Letter landscape). */
  width?: number;
  height?: number;
  slides: SlideDef[];
}

export const DEFAULT_PAGE_W = 1100;
export const DEFAULT_PAGE_H = 850;
