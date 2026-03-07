import React from "react";

interface RoadmapPathProps {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  status: "locked" | "in_progress" | "completed";
}

export const RoadmapPath: React.FC<RoadmapPathProps> = ({
  startX,
  startY,
  endX,
  endY,
  status,
}) => {
  const isCompleted = status === "completed";

  // Create a stylized S-curve or curved path between two points
  // Control points for bezier curve
  const midY = startY + (endY - startY) / 2;
  const pathData = `M ${startX} ${startY} C ${startX} ${midY}, ${endX} ${midY}, ${endX} ${endY}`;

  return (
    <svg
      className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10"
      style={{ overflow: "visible" }}
    >
      {/* Background track (shadow/uncompleted) */}
      <path
        d={pathData}
        fill="none"
        strokeWidth="16"
        strokeLinecap="round"
        className={isCompleted ? "stroke-emerald-500/20" : "stroke-surface-2"}
      />

      {/* Foreground track (completed) */}
      {isCompleted && (
        <path
          d={pathData}
          fill="none"
          strokeWidth="16"
          strokeLinecap="round"
          className="stroke-emerald-500"
        />
      )}
    </svg>
  );
};
