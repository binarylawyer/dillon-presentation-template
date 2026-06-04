"use client";
// components/viz/BarChart.tsx
// Data-driven replacement for the hand-built .barchart markup in slides.tsx.
// PHASE A: reuses the EXISTING memo.css classes (.barchart/.col/.bar/.val/.xlabs/.xlab),
// so output is pixel-identical — only the hardcoded JSX/heights become data.
// Bar heights are computed from value ÷ max (the original inline % were just
// hand-computed versions of exactly this).
import { cn } from "@/lib/utils";

export interface BarDatum {
  /** Axis label; use \n for a second line, e.g. "Anchor\n12,800 SF · 1943". */
  label: string;
  value: number;
  /** Pre-formatted display value over the bar; defaults to String(value). */
  display?: string;
  /** Render this bar + value in the accent (brass) color. */
  emphasis?: boolean;
}

export interface BarChartProps {
  data: BarDatum[];
  /** Axis ceiling; defaults to the largest value (tallest bar = 100%). */
  max?: number;
  /** Mono eyebrow above the plot. */
  caption?: string;
  className?: string;
}

export function BarChart({ data, max, caption, className }: BarChartProps) {
  const ceiling = max ?? Math.max(...data.map((d) => d.value));
  return (
    <figure className={cn("m-0", className)}>
      {caption && <div className="eyebrow chart-eyebrow">{caption}</div>}
      <div
        className="barchart"
        role="img"
        aria-label={
          (caption ? caption + ": " : "") +
          data.map((d) => `${d.label.replace(/\n/g, " ")} ${d.display ?? d.value}`).join(", ")
        }
      >
        {data.map((d) => (
          <div className="col" key={d.label}>
            <span className={cn("val", d.emphasis && "hi")}>{d.display ?? d.value}</span>
            <span
              className={cn("bar", d.emphasis && "hi")}
              style={{ height: `${ceiling > 0 ? (d.value / ceiling) * 100 : 0}%` }}
            />
          </div>
        ))}
      </div>
      <div className="xlabs">
        {data.map((d) => (
          <span className="xlab" key={d.label}>
            {d.label.split("\n").map((line, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </span>
        ))}
      </div>
    </figure>
  );
}
