import type { ReactNode } from "react";

/** Reusable presentational primitives for the Runbook cheat sheet. */

export function Lead({ children }: { children: ReactNode }) {
  return (
    <p className="text-[18px] leading-[1.6] text-slate">{children}</p>
  );
}

export function P({ children }: { children: ReactNode }) {
  return (
    <p className="mt-4 text-[15.5px] leading-[1.65] text-slate">{children}</p>
  );
}

export function H3({ children }: { children: ReactNode }) {
  return (
    <h3 className="mt-8 font-display text-[20px] font-medium text-navy">
      {children}
    </h3>
  );
}

export function Facts({ items }: { items: ReactNode[] }) {
  return (
    <ul className="mt-4 flex flex-col gap-2.5">
      {items.map((it, i) => (
        <li
          key={i}
          className="relative pl-5 text-[15px] leading-[1.55] text-slate"
        >
          <span className="absolute left-0 top-[9px] h-[6px] w-[6px] bg-brass" />
          {it}
        </li>
      ))}
    </ul>
  );
}

export function Steps({ items }: { items: ReactNode[] }) {
  return (
    <ol className="mt-4 flex flex-col gap-3">
      {items.map((it, i) => (
        <li
          key={i}
          className="flex gap-3 text-[15px] leading-[1.55] text-slate"
        >
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy font-mono text-[11px] text-paper">
            {i + 1}
          </span>
          <span>{it}</span>
        </li>
      ))}
    </ol>
  );
}

export function Def({
  term,
  children,
}: {
  term: string;
  children: ReactNode;
}) {
  return (
    <div className="mt-4 border-l-2 border-line-strong pl-4">
      <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-brass-deep">
        {term}
      </div>
      <div className="mt-1 text-[15px] leading-[1.55] text-slate">
        {children}
      </div>
    </div>
  );
}

export function StatGrid({
  stats,
}: {
  stats: { value: string; label: string }[];
}) {
  return (
    <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
      {stats.map((s, i) => (
        <div key={i} className="border border-line bg-white p-4">
          <div className="font-display text-[26px] font-semibold leading-none tabular-nums text-navy">
            {s.value}
          </div>
          <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.1em] text-slate-mid">
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}

/** Highlighted callout — defaults to a "fill this in" prompt for deal-specifics. */
export function Note({
  children,
  label = "To confirm",
}: {
  children: ReactNode;
  label?: string;
}) {
  return (
    <div className="mt-5 border-l-4 border-brass bg-cloud px-5 py-3">
      <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-brass-deep">
        {label}
      </div>
      <div className="mt-1 text-[14px] leading-[1.55] text-slate">
        {children}
      </div>
    </div>
  );
}

/** Inline blank for deal-specific values to be filled later. */
export function Blank({ hint }: { hint: string }) {
  return (
    <span className="mx-0.5 rounded-[2px] border border-dashed border-brass/60 bg-brass/10 px-1.5 py-0.5 font-mono text-[12px] text-brass-deep">
      {hint}
    </span>
  );
}

/** Institutional ledger table. Headers + rows of cells; numeric columns wrap. */
export function Table({
  headers,
  rows,
  caption,
}: {
  headers: ReactNode[];
  rows: ReactNode[][];
  caption?: ReactNode;
}) {
  return (
    <div className="mt-5 overflow-x-auto">
      <table className="w-full border-collapse text-left tabular-nums">
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th
                key={i}
                className="border-b-2 border-navy px-3 py-2 font-mono text-[10px] uppercase tracking-[0.1em] text-slate-mid"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, r) => (
            <tr key={r}>
              {row.map((cell, c) => (
                <td
                  key={c}
                  className="border-b border-line px-3 py-2 align-top text-[13.5px] leading-[1.5] text-slate"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {caption ? (
        <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.1em] text-slate-soft">
          {caption}
        </div>
      ) : null}
    </div>
  );
}

/**
 * Tone-aware callout for deal flags. Distinct from <Note> (which is the brass
 * "to confirm" prompt): use this for reconciliation conflicts, resolved
 * decisions, and open items so the must-reconcile flags read at a glance.
 */
export function Flag({
  children,
  label = "Flag",
  tone = "warn",
}: {
  children: ReactNode;
  label?: string;
  tone?: "warn" | "conflict" | "resolved" | "open";
}) {
  const tones = {
    warn: { edge: "border-brass", chip: "text-brass-deep", fill: "bg-[var(--brass-15)]" },
    conflict: { edge: "border-negative", chip: "text-negative", fill: "bg-[var(--negative-soft)]" },
    resolved: { edge: "border-positive", chip: "text-positive", fill: "bg-[var(--positive-soft)]" },
    open: { edge: "border-line-strong", chip: "text-slate-mid", fill: "bg-cloud" },
  } as const;
  const t = tones[tone];
  return (
    <div className={`mt-5 border-l-4 ${t.edge} ${t.fill} px-5 py-3`}>
      <div className={`font-mono text-[10px] uppercase tracking-[0.12em] ${t.chip}`}>
        {label}
      </div>
      <div className="mt-1 text-[14px] leading-[1.55] text-slate">{children}</div>
    </div>
  );
}
