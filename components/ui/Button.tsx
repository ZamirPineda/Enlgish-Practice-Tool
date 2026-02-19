import React from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "success";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[var(--color-text-primary)] border border-transparent shadow-[var(--shadow-sm)]",
  secondary:
    "bg-[var(--color-surface-2)] hover:bg-[var(--color-surface-hover)] text-[var(--color-text-primary)] border border-[var(--color-border)]",
  ghost:
    "bg-transparent hover:bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)] border border-transparent",
  success:
    "bg-[var(--color-success)] hover:bg-[var(--color-success-hover)] text-[var(--color-text-primary)] border border-transparent shadow-[var(--shadow-sm)]",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-xs rounded-[var(--radius-sm)]",
  md: "px-4 py-2.5 text-sm rounded-[var(--radius-md)]",
  lg: "px-6 py-3 text-sm rounded-[var(--radius-lg)]",
};

const Button: React.FC<ButtonProps> = ({
  variant = "secondary",
  size = "md",
  fullWidth = false,
  className = "",
  type = "button",
  ...props
}) => {
  return (
    <button
      type={type}
      className={`font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-focus)] disabled:opacity-50 disabled:cursor-not-allowed ${variantStyles[variant]} ${sizeStyles[size]} ${fullWidth ? "w-full" : ""} ${className}`.trim()}
      {...props}
    />
  );
};

export default Button;
