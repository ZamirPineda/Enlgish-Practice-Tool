import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-accent text-slate-900 shadow-md shadow-accent/20 hover:bg-accent-hover hover:shadow-xl hover:shadow-accent/30",
        secondary:
          "bg-surface-2 text-text-primary border border-border hover:bg-surface-hover",
        ghost: "bg-transparent text-text-secondary hover:bg-surface-hover",
        outline: "bg-transparent border border-border text-text-primary hover:bg-surface-hover",
        success:
          "bg-success text-white shadow-md shadow-success/20 hover:bg-success-hover hover:shadow-xl hover:shadow-success/30",
      },
      size: {
        sm: "h-9 px-3 text-xs",
        default: "h-11 px-4",
        lg: "h-12 px-6",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
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
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
