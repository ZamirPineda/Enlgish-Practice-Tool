import React from "react";

interface ViewToolbarProps {
  left: React.ReactNode;
  right?: React.ReactNode;
  className?: string;
}

const ViewToolbar: React.FC<ViewToolbarProps> = ({
  left,
  right,
  className = "",
}) => {
  return (
    <div
      className={`bg-surface-1 border border-border rounded-xl p-2.5 sm:p-3.5 ${className}`.trim()}
    >
      <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <div className="min-w-0">{left}</div>
        {right ? (
          <div className="flex items-center gap-2.5 flex-wrap md:flex-nowrap md:justify-end">
            {right}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ViewToolbar;
