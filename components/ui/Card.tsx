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
      className={`bg-surface-1 border border-border rounded-2xl p-4 sm:p-6 ${elevated ? "shadow-md" : ""} ${interactive ? "md:hover:-translate-y-1 md:hover:shadow-lg transition-all duration-200 cursor-pointer" : ""} ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
