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
    "bg-accent hover:bg-accent-hover text-slate-900 border border-transparent shadow-md shadow-accent/20 hover:shadow-xl hover:shadow-accent/40 hover:-translate-y-0.5",
  secondary:
    "bg-surface-2 hover:bg-surface-hover text-text-primary border border-border hover:shadow-md hover:border-text-muted hover:-translate-y-0.5",
  ghost:
    "bg-transparent hover:bg-surface-hover text-text-secondary border border-transparent",
  success:
    "bg-success hover:bg-success-hover text-white border border-transparent shadow-md shadow-success/20 hover:shadow-xl hover:shadow-success/40 hover:-translate-y-0.5",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "min-h-[36px] px-3 py-1.5 text-xs rounded-md",
  md: "min-h-[44px] px-4 py-2 text-sm rounded-lg",
  lg: "min-h-[48px] px-5 sm:px-6 py-2.5 text-sm rounded-xl",
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
      className={`font-semibold transition-all duration-200 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-focus disabled:opacity-50 disabled:cursor-not-allowed ${variantStyles[variant]} ${sizeStyles[size]} ${fullWidth ? "w-full" : ""} ${className}`.trim()}
      {...props}
    />
  );
};

export default Button;
