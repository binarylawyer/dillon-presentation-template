import type { ReactNode } from "react";

/**
 * Reusable Meridian page chrome. These wrap the design-system classes from
 * app/styles/memo.css so deck content can be written as composable React
 * instead of raw HTML — while staying pixel-identical to the source deck.
 */

export const DISCLAIMER =
  "Informational overview only. Not an offer to sell or a solicitation to buy securities. Any offering would be made solely through definitive offering documents. Figures are illustrative.";

export function Mark() {
  return (
    <div className="mark">
      <span className="glyph" />
      Meridian
    </div>
  );
}

/** Standard interior page: header, rule, body slot, disclaimer footer. */
export function StandardPage({
  idx,
  label,
  children,
}: {
  /** e.g. "02 / 06" */
  idx: string;
  /** data-screen-label for overview, e.g. "02 · Acquisition" */
  label: string;
  children: ReactNode;
}) {
  return (
    <section className="page" data-screen-label={label}>
      <div className="head">
        <Mark />
        <div className="idx">Informational overview · {idx}</div>
      </div>
      <div className="headrule" />
      <div className="body">{children}</div>
      <div className="foot">
        <p className="disclaimer">{DISCLAIMER}</p>
      </div>
    </section>
  );
}

/** Opener block: brass eyebrow + headline (+ optional lede). */
export function Opener({
  eyebrow,
  children,
  lede,
}: {
  eyebrow: string;
  children: ReactNode;
  lede?: ReactNode;
}) {
  return (
    <div className="opener">
      <div className="eyebrow eyebrow--brass">{eyebrow}</div>
      <h2>{children}</h2>
      {lede ? <p className="lede">{lede}</p> : null}
    </div>
  );
}
