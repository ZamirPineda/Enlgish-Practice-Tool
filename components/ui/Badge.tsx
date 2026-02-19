import React from "react";

type BadgeVariant = "default" | "accent" | "success" | "warning";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  default:
    "bg-[var(--color-surface-2)] text-[var(--color-text-muted)] border-[var(--color-border)]",
  accent: "bg-sky-900/30 text-sky-300 border-sky-700/40",
  success: "bg-emerald-900/30 text-emerald-300 border-emerald-700/40",
  warning: "bg-amber-900/30 text-amber-300 border-amber-700/40",
};

const Badge: React.FC<BadgeProps> = ({
  variant = "default",
  className = "",
  children,
  ...props
}) => (
  <span
    className={`inline-flex items-center border rounded-[var(--radius-sm)] px-1.5 py-0.5 text-[var(--text-xs)] font-semibold ${variantStyles[variant]} ${className}`.trim()}
    {...props}
  >
    {children}
  </span>
);

export default Badge;
