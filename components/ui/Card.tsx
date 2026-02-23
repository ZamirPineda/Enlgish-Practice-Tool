import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  elevated?: boolean;
  interactive?: boolean;
}

const Card: React.FC<CardProps> = ({
  elevated = false,
  interactive = false,
  className = "",
  children,
  ...props
}) => {
  return (
    <div
      className={`bg-[var(--color-surface-1)] border border-border rounded-[var(--radius-xl)] p-6 ${elevated ? "shadow-[var(--shadow-md)]" : ""} ${interactive ? "hover:-translate-y-1 hover:shadow-lg transition-all duration-200 cursor-pointer" : ""} ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
