// components/viz/KpiCard.tsx
// Data-driven replacement for the .oz-card stat blocks (and a general KPI card).
// PHASE A: reuses .oz-card/.ozk/.ozv. Group three in the existing .oz-top grid.
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface KpiCardProps {
  /** Mono eyebrow (brass), e.g. "10-year hold". */
  eyebrow: string;
  /** Serif value line, e.g. "Permanent exclusion", "OBBBA · July 2025". */
  value: ReactNode;
  /** Supporting sentence. */
  children?: ReactNode;
  className?: string;
}

export function KpiCard({ eyebrow, value, children, className }: KpiCardProps) {
  return (
    <div className={cn("oz-card", className)}>
      <div className="ozk">{eyebrow}</div>
      <div className="ozv">{value}</div>
      {children && <p>{children}</p>}
    </div>
  );
}

/** Convenience wrapper for the three-up KPI band (reuses .oz-top). */
export function KpiBand({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("oz-top", className)}>{children}</div>;
}
