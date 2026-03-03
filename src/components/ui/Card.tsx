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
      className={`bg-surface-1/95 border border-border/80 rounded-2xl p-4 sm:p-6 ${
        elevated ? "shadow-xl shadow-black/5 backdrop-blur-xl" : ""
      } ${
        interactive
          ? "md:hover:-translate-y-1 md:hover:shadow-2xl md:hover:shadow-accent/20 md:hover:border-accent/30 transition-all duration-300 cursor-pointer"
          : "transition-all duration-300"
      } ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
