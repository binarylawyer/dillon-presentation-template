// components/viz/StatHero.tsx
// The "one dominant number per page" primitive. Data-driven replacement for the
// .rwa-hero block (and a home for any future hero figure).
// PHASE A: reuses .rwa-hero/.rk/.rnum/.rsub/.rsrc.
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface StatHeroProps {
  /** Mono eyebrow above the figure. */
  eyebrow?: string;
  /** The number itself, pre-formatted: "$4", "55–70", "$1.4M". */
  figure: ReactNode;
  /** Trailing unit rendered in the accent color: "T", "%", "M". */
  unit?: string;
  /** Supporting sentence below the figure. */
  caption?: ReactNode;
  /** Mono source line, e.g. "Source: Deloitte, 2025". */
  source?: string;
  children?: ReactNode; // optional extra content under the hero (e.g. a MilestoneTrack)
  className?: string;
}

export function StatHero({ eyebrow, figure, unit, caption, source, children, className }: StatHeroProps) {
  return (
    <figure className={cn("rwa-hero", className)} style={{ margin: 0 }}>
      {eyebrow && <div className="rk">{eyebrow}</div>}
      <div className="rnum">
        {figure}
        {unit && <em>{unit}</em>}
      </div>
      {caption && <div className="rsub">{caption}</div>}
      {source && <div className="rsrc">{source}</div>}
      {children}
    </figure>
  );
}
