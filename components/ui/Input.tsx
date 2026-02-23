import React, { forwardRef } from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`w-full bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-[var(--radius-lg)] px-4 py-2.5 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-focus)] ${className}`.trim()}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

export default Input;
