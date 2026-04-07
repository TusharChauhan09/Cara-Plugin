import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default:
          "border border-[var(--color-accent-dim)] bg-[var(--color-accent-dim)]/40 text-blue-400",
        secondary:
          "border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-muted)]",
        outline:
          "border border-[var(--color-border)] text-[var(--color-muted)]",
        success:
          "border border-emerald-900/60 bg-emerald-950/40 text-emerald-400",
        destructive:
          "border border-red-900/60 bg-red-950/40 text-red-400",
        warning:
          "border border-amber-900/60 bg-amber-950/40 text-amber-400",
        purple:
          "border border-purple-900/60 bg-purple-950/40 text-purple-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
