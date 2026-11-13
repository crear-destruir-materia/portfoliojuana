import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#ffc83d]",
  {
    variants: {
      variant: {
        default:
          "border-[#ffc83d]/45 bg-[#1c4688]/75 text-[#ffd95a] shadow-[0_0_12px_rgba(255,200,61,0.2)]",
        secondary:
          "border-[#4a8cf0]/45 bg-[#173d7a]/80 text-[#c3dbff]",
        outline:
          "border-[#ffc83d]/30 bg-[#0d2242]/70 text-[#e8dfc8] backdrop-blur-sm",
        cosmic:
          "border-[#ffcf4a]/55 bg-gradient-to-r from-[#1f4f99]/90 via-[#2A62B8]/85 to-[#3577d6]/80 text-[#ffe9a3] shadow-[0_0_16px_rgba(255,200,61,0.25)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
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
