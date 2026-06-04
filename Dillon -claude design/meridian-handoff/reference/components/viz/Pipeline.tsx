// components/viz/Pipeline.tsx
// Data-driven replacement for the .pipeline block in slides.tsx.
// PHASE A: reuses .pipeline/.pl-eyebrow/.prow/.pl-k/.ptrack/.pfill/.pv.
import { cn } from "@/lib/utils";

export interface PipelineRow {
  label: string;
  /** Display value, e.g. "$5.7M". */
  value: string;
  /** Bar fill, 0–1. */
  fill: number;
  /** Render bar + value in accent (brass) — for the full/headline scenario. */
  emphasis?: boolean;
}

export function Pipeline({
  rows, caption, className,
}: { rows: PipelineRow[]; caption?: string; className?: string }) {
  return (
    <div className={cn("pipeline", className)}>
      {caption && <div className="pl-eyebrow">{caption}</div>}
      {rows.map((r) => (
        <div className="prow" key={r.label}>
          <span className="pl-k">{r.label}</span>
          <div className="ptrack">
            <div
              className={cn("pfill", r.emphasis && "hi")}
              style={{ width: `${Math.max(0, Math.min(1, r.fill)) * 100}%` }}
            />
          </div>
          <span className={cn("pv", r.emphasis && "hi")}>{r.value}</span>
        </div>
      ))}
    </div>
  );
}
