import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  elevated?: boolean;
}

const Card: React.FC<CardProps> = ({
  elevated = false,
  className = "",
  children,
  ...props
}) => {
  return (
    <div
      className={`bg-[var(--color-surface-1)] border border-[var(--color-border)] rounded-[var(--radius-xl)] p-6 ${elevated ? "shadow-[var(--shadow-md)]" : ""} ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
