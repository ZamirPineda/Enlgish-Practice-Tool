import React from "react";

type BadgeVariant = "default" | "accent" | "success" | "warning";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  default:
    "bg-[var(--color-surface-2)] text-[var(--color-text-muted)] border-[var(--color-border)]",
  accent:
    "bg-sky-100 text-sky-700 border-sky-200 dark:bg-sky-900/30 dark:text-sky-300 dark:border-sky-700/40",
  success:
    "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-700/40",
  warning:
    "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-700/40",
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
