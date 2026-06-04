// components/viz/Callout.tsx
// One component for every framed aside in the deck. Data-driven replacement for
// .callout-compliance, .caveat-token, .bailey, .firstmover, .note-standards.
// PHASE A: each variant emits the EXACT existing class so it stays pixel-identical.
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "compliance" | "caveat" | "bailey" | "firstmover" | "note";

export interface CalloutProps {
  variant: Variant;
  /** Mono kicker (compliance/bailey/firstmover use it). */
  label?: string;
  children: ReactNode;
  className?: string;
}

export function Callout({ variant, label, children, className }: CalloutProps) {
  switch (variant) {
    case "compliance":
      return (
        <div className={cn("callout-compliance", className)}>
          {label && <div className="ce">{label}</div>}
          <p>{children}</p>
        </div>
      );
    case "bailey":
      return (
        <div className={cn("bailey", className)}>
          {label && <div className="bk">{label}</div>}
          <p>{children}</p>
        </div>
      );
    case "firstmover":
      return (
        <div className={cn("firstmover", className)}>
          {label && <div className="fk">{label}</div>}
          <p>{children}</p>
        </div>
      );
    case "caveat":
      return <p className={cn("caveat-token", className)}>{children}</p>;
    case "note":
    default:
      return <p className={cn("note-standards", className)}>{children}</p>;
  }
}
