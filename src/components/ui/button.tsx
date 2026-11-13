import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffc83d]/70 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-[#f5a524] via-[#ffc83d] to-[#ffdd66] text-[#050b18] font-semibold shadow-[0_0_25px_rgba(255,200,61,0.4)] hover:shadow-[0_0_35px_rgba(255,217,90,0.65)] hover:scale-[1.02]",
        destructive:
          "bg-red-500/90 text-white shadow-sm hover:bg-red-500",
        outline:
          "border border-[#ffc83d]/35 bg-[#11295a]/75 text-[#f4ebd0] backdrop-blur-md hover:bg-[#1f4f99]/60 hover:border-[#ffcf4a]/70 hover:text-white",
        secondary:
          "bg-[#173d7a]/90 text-[#f4ebd0] border border-[#ffc83d]/25 hover:bg-[#22539c]",
        ghost:
          "text-[#e6dcc5] hover:bg-[#ffc83d]/10 hover:text-[#ffd95a]",
        link: "text-[#ffcf4a] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-xl px-7 text-base font-semibold",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
