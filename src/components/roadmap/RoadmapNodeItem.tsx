import React from "react";
import { motion } from "framer-motion";
import { Button as AriaButton } from "react-aria-components";
import type { RoadmapNodeProgressStatus } from "@/lib/roadmapProgress";
import type { RoadmapNode } from "@/lib/roadmapModel";

export interface RoadmapNodeItemProps {
  node: RoadmapNode;
  status: RoadmapNodeProgressStatus;
  isUnlocked: boolean;
  offset: number;
}

const getIconPath = (kind: string) => {
  switch (kind) {
    case "english":
      return (
        <path
          fillRule="evenodd"
          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM2.625 12c0-1.026.175-2.008.497-2.932h3.337a.75.75 0 00.75-.75V7.5a.75.75 0 00-.75-.75H5.05A9.761 9.761 0 0112 2.75v5.303a.75.75 0 001.06.685l3.52-1.76a.75.75 0 01.996.34 9.75 9.75 0 011.674 5.433v.3a.75.75 0 01-.75.75h-3.32a.75.75 0 00-.53.22L12 16.657a.75.75 0 00-.22.53v3.832a.75.75 0 00.16.467c-.636.17-1.305.264-2 .264-5.385 0-9.75-4.365-9.75-9.75z"
          clipRule="evenodd"
          fill="currentColor"
        />
      );
    case "math":
      return (
        <path
          fillRule="evenodd"
          d="M3.75 4.5a3 3 0 013-3h10.5a3 3 0 013 3v15a3 3 0 01-3 3H6.75a3 3 0 01-3-3v-15zM6.75 6a1.5 1.5 0 00-1.5 1.5v1.5c0 .828.672 1.5 1.5 1.5h10.5a1.5 1.5 0 001.5-1.5v-1.5A1.5 1.5 0 0017.25 6H6.75zm1.5 6a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v1.5a.75.75 0 01-.75.75h-1.5a.75.75 0 01-.75-.75v-1.5zm0 3.75a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v1.5a.75.75 0 01-.75.75h-1.5a.75.75 0 01-.75-.75v-1.5zm3.75-3.75a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v1.5a.75.75 0 01-.75.75h-1.5a.75.75 0 01-.75-.75v-1.5zm0 3.75a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v1.5a.75.75 0 01-.75.75h-1.5a.75.75 0 01-.75-.75v-1.5z"
          clipRule="evenodd"
          fill="currentColor"
        />
      );
    case "dev":
      return (
        <path
          fillRule="evenodd"
          d="M3 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm14.25 6a.75.75 0 0 1-.22.53l-2.25 2.25a.75.75 0 1 1-1.06-1.06L15.44 12l-1.72-1.72a.75.75 0 1 1 1.06-1.06l2.25 2.25c.141.14.22.331.22.53Zm-10.28-.53a.75.75 0 0 0 0 1.06l2.25 2.25a.75.75 0 1 0 1.06-1.06L8.56 12l1.72-1.72a.75.75 0 1 0-1.06-1.06l-2.25 2.25Z"
          clipRule="evenodd"
          fill="currentColor"
        />
      );
    default:
      return (
        <path
          fillRule="evenodd"
          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
          clipRule="evenodd"
          fill="currentColor"
        />
      );
  }
};

const MotionAriaButton = motion.create(AriaButton as any);

export const RoadmapNodeItem = React.forwardRef<
  HTMLButtonElement,
  RoadmapNodeItemProps & React.ComponentPropsWithoutRef<typeof AriaButton>
>(({ node, status, isUnlocked, offset, ...props }, ref) => {
  const isCompleted = status === "completed";
  const isInProgress = status === "in_progress";

  // Color configuration based on status
  const bgColor = isCompleted
    ? "bg-emerald-500"
    : isInProgress
      ? "bg-accent"
      : "bg-surface-2";

  const shadowColor = isCompleted
    ? "shadow-[0_4px_0_0_rgb(16,185,129)]" // emerald-500
    : isInProgress
      ? "shadow-[0_4px_0_0_rgb(14,165,233)]" // accent (sky-500ish default)
      : "shadow-[0_4px_0_0_rgb(63,63,70)]"; // border color

  const textColor = isUnlocked ? "text-white" : "text-text-muted";

  return (
    <div
      className="relative flex justify-center w-full py-4 z-10"
      style={{
        transform: `translateX(${offset}px)`,
      }}
    >
      <MotionAriaButton
        {...props}
        ref={ref}
        aria-label={`${isUnlocked ? "Abrir:" : "Bloqueado:"} ${node.title}`}
        isDisabled={!isUnlocked}
        whileHover={isUnlocked ? { scale: 1.05 } : {}}
        whileTap={
          isUnlocked
            ? { scale: 0.95, y: 4, boxShadow: "0 0 0 0 transparent" }
            : {}
        }
        animate={
          isInProgress
            ? {
                y: [0, -6, 0],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }
            : {}
        }
        className={`${bgColor} ${shadowColor} ${textColor} flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/20 transition-colors data-[disabled]:opacity-80 outline-none focus-visible:ring-4 focus-visible:ring-white/40 cursor-pointer data-[disabled]:cursor-not-allowed`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="h-7 w-7"
        >
          {getIconPath(node.kind)}
        </svg>

        {isCompleted && (
          <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-yellow-400 border-2 border-background">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4 text-yellow-900"
            >
              <path
                fillRule="evenodd"
                d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </MotionAriaButton>
    </div>
  );
});

RoadmapNodeItem.displayName = "RoadmapNodeItem";
