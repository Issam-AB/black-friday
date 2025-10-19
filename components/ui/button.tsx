import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 touch-manipulation active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--color-primary)] text-white hover:opacity-90 sm:hover:scale-[1.02] active:opacity-80",
        secondary:
          "bg-[var(--bg-filter)] text-white hover:bg-[var(--bg-filter-hover)] active:bg-[var(--bg-filter)]",
        outline:
          "border-2 border-white/20 bg-transparent text-white hover:bg-white/10 active:bg-white/5",
        ghost: "hover:bg-white/10 text-white active:bg-white/5",
      },
      size: {
        default: "h-10 sm:h-10 px-4 py-2 min-h-[44px]",
        sm: "h-9 sm:h-9 rounded-md px-3 min-h-[40px]",
        lg: "h-12 sm:h-12 rounded-lg px-6 sm:px-8 text-base min-h-[48px]",
        icon: "h-10 w-10 min-h-[44px] min-w-[44px]",
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
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

