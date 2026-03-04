import React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

interface GameShellProps {
  hasStarted: boolean;
  startScreen: React.ReactNode;
  children: React.ReactNode;
  contentKey?: string;
  pageClassName?: string;
  contentClassName?: string;
}

const DEFAULT_PAGE_CLASSNAME =
  "flex-1 overflow-y-auto overscroll-y-contain bg-background p-4 sm:p-8 pb-4 sm:pb-8";
const DEFAULT_CONTENT_CLASSNAME = "max-w-4xl mx-auto space-y-6";

const GameShell: React.FC<GameShellProps> = ({
  hasStarted,
  startScreen,
  children,
  contentKey = "active",
  pageClassName = DEFAULT_PAGE_CLASSNAME,
  contentClassName = DEFAULT_CONTENT_CLASSNAME,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const shouldReduceMotion =
    prefersReducedMotion ||
    (typeof document !== "undefined" &&
      document.documentElement.dataset.reducedMotion === "reduce");
  const disableAnimations =
    shouldReduceMotion || process.env.NODE_ENV === "test";
  const transition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const };

  if (disableAnimations) {
    return (
      <div className={pageClassName}>
        {!hasStarted ? startScreen : null}
        {hasStarted ? <div className={contentClassName}>{children}</div> : null}
      </div>
    );
  }

  return (
    <div className={pageClassName}>
      <AnimatePresence mode="wait" initial={false}>
        {!hasStarted ? (
          <motion.div
            key="start"
            initial={{ opacity: 0, y: 12, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.99 }}
            transition={transition}
          >
            {startScreen}
          </motion.div>
        ) : (
          <motion.div
            key={contentKey}
            className={contentClassName}
            initial={{ opacity: 0, y: 14, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.99 }}
            transition={transition}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GameShell;
