// components/viz/TierStack.tsx
// Data-driven replacement for the .stackbar + .tiers block in slides.tsx.
// PHASE A: reuses .stack-wrap/.stackbar/.stackseg/.stack-total + .tiers/.tier.
import { cn } from "@/lib/utils";

export interface Tier {
  pct: string;        // "20%"
  title: string;      // "Federal Historic Tax Credit"
  body: string;       // one-line description
  meta: string;       // right-aligned mono note
}

export interface TierStackProps {
  /** Stacked-bar eyebrow, e.g. "Combined credit rate on qualified expenditures". */
  stackLabel: string;
  /** Bottom→top segments of the stacked bar. */
  segments: { pct: string; label: string }[];
  total?: { value: string; label: string };
  /** The tier rows on the right. */
  tiers: Tier[];
  className?: string;
}

// Segment fills cycle through the three established blues (matches memo.css
// .seg-fed / .seg-state / .seg-abandoned).
const SEG = ["seg-fed", "seg-state", "seg-abandoned"];

export function TierStack({ stackLabel, segments, total, tiers, className }: TierStackProps) {
  return (
    <div className={cn("content3", className)}>
      <div className="stack-wrap">
        <div className="stack-eyebrow">{stackLabel}</div>
        <div className="stackbar">
          {segments.map((s, i) => (
            <div className={cn("stackseg", SEG[i % SEG.length])} key={s.label}>
              <span className="pct">{s.pct}</span>
              <span className="sl">{s.label}</span>
            </div>
          ))}
        </div>
        {total && (
          <div className="stack-total">
            <div className="tnum">{total.value}</div>
            <div className="tl">{total.label}</div>
          </div>
        )}
      </div>

      <div>
        <div className="tiers">
          {tiers.map((t) => (
            <div className="tier" key={t.title}>
              <div className="tpct">{t.pct}</div>
              <div className="tbody">
                <h4>{t.title}</h4>
                <p>{t.body}</p>
              </div>
              <div className="tmeta">{t.meta}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
