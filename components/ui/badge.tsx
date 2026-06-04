import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-[2px] border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em]",
  {
    variants: {
      variant: {
        default: "border-line-strong bg-cloud text-slate",
        admin: "border-brass bg-brass/15 text-brass-deep",
        protected: "border-navy bg-navy text-paper",
        public: "border-line-strong bg-white text-slate-mid",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export function Badge({
  className,
  variant,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
