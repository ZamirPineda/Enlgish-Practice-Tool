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
    "bg-accent hover:bg-accent-hover text-white border border-transparent shadow-sm",
  secondary:
    "bg-surface-2 hover:bg-surface-hover text-text-primary border border-border",
  ghost:
    "bg-transparent hover:bg-surface-hover text-text-secondary border border-transparent",
  success:
    "bg-success hover:bg-success-hover text-white border border-transparent shadow-sm",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-xs rounded-md",
  md: "px-4 py-2.5 text-sm rounded-lg",
  lg: "px-6 py-3 text-sm rounded-xl",
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
      className={`font-semibold transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-focus disabled:opacity-50 disabled:cursor-not-allowed ${variantStyles[variant]} ${sizeStyles[size]} ${fullWidth ? "w-full" : ""} ${className}`.trim()}
      {...props}
    />
  );
};

export default Button;
