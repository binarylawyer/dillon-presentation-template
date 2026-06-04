// components/viz/MilestoneTrack.tsx
// Data-driven replacement for the .milestones block in slides.tsx.
// PHASE A: reuses .milestones/.ms/.my/.mtrack/.mfill/.mv.
import { cn } from "@/lib/utils";

export interface Milestone {
  /** Left mono label, e.g. "2022", "Q3 2025", "2035 E". */
  label: string;
  /** Right display value, e.g. "~$24B", "$4T". */
  value: string;
  /** Track fill, 0–1. */
  fill: number;
  /** Render fill + value in accent (brass) — for the projected/hero row. */
  emphasis?: boolean;
}

export function MilestoneTrack({ items, className }: { items: Milestone[]; className?: string }) {
  return (
    <div className={cn("milestones", className)}>
      {items.map((m) => (
        <div className="ms" key={m.label}>
          <span className="my">{m.label}</span>
          <div className="mtrack">
            <div
              className="mfill"
              style={{
                width: `${Math.max(0, Math.min(1, m.fill)) * 100}%`,
                ...(m.emphasis ? { background: "var(--accent)" } : null),
              }}
            />
          </div>
          <span className="mv" style={m.emphasis ? { color: "var(--accent-strong)" } : undefined}>
            {m.value}
          </span>
        </div>
      ))}
    </div>
  );
}
