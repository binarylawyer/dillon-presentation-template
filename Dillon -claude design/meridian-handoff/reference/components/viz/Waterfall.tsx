// components/viz/Waterfall.tsx
// Data-driven replacement for the .waterfall markup in slides.tsx.
// PHASE A: reuses .waterfall/.wf-col/.wf-bar/.wf-float/.wf-val/.wf-axis/.wf-lab.
// Bar + float heights are COMPUTED from a running total (the original inline %
// were hand-derived from exactly this), so any waterfall data "just works".
import { cn } from "@/lib/utils";

export interface WaterfallStep {
  label: string; // use \n for a second line
  /** Negative for a reduction (e.g. a credit), positive to add. */
  delta: number;
  display: string; // e.g. "−$700K"
}

export interface WaterfallProps {
  start: { label: string; value: number; display: string };
  steps: WaterfallStep[];
  end: { label: string; display: string };
  /** Height (%) of the starting bar; everything scales off this. Default 88. */
  startBarPct?: number;
  className?: string;
}

export function Waterfall({ start, steps, end, startBarPct = 88, className }: WaterfallProps) {
  const scale = startBarPct / start.value; // % per unit
  let running = start.value;

  return (
    <div className={className}>
      <div className="waterfall">
        <div className="wf-col">
          <span className="wf-val base">{start.display}</span>
          <div className="wf-bar base" style={{ height: `${start.value * scale}%` }} />
        </div>

        {steps.map((s) => {
          running += s.delta;
          const barH = Math.abs(s.delta) * scale; // the floating cut segment
          const floatH = running * scale;          // gap below it = new running total
          return (
            <div className="wf-col" key={s.label}>
              <span className="wf-val cut">{s.display}</span>
              <div className="wf-bar cut" style={{ height: `${barH}%` }} />
              <div className="wf-float" style={{ height: `${floatH}%` }} />
            </div>
          );
        })}

        <div className="wf-col">
          <span className="wf-val end">{end.display}</span>
          <div className="wf-bar end" style={{ height: `${running * scale}%` }} />
        </div>
      </div>
      <div className="wf-axis" />
      <div className="xlabs" style={{ marginTop: "10px", gap: 0 }}>
        <Label text={start.label} />
        {steps.map((s) => <Label key={s.label} text={s.label} />)}
        <Label text={end.label} />
      </div>
    </div>
  );
}

function Label({ text }: { text: string }) {
  return (
    <span className="wf-lab" style={{ flex: 1 }}>
      {text.split("\n").map((line, i) => (
        <span key={i}>
          {i > 0 && <br />}
          {line}
        </span>
      ))}
    </span>
  );
}
