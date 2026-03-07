import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import {
  arrow,
  autoUpdate,
  FloatingArrow,
  FloatingPortal,
  offset,
  Placement,
  shift,
  flip,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Button from "@/components/ui/Button";

const COACHMARK_STORAGE_KEY = "dismissed-coachmarks";

const loadDismissedCoachmarks = (): string[] => {
  if (typeof window === "undefined" || !window.localStorage) {
    return [];
  }

  try {
    const rawValue = localStorage.getItem(COACHMARK_STORAGE_KEY);
    if (!rawValue) {
      return [];
    }

    const parsedValue = JSON.parse(rawValue);
    return Array.isArray(parsedValue)
      ? parsedValue.filter((value): value is string => typeof value === "string")
      : [];
  } catch {
    return [];
  }
};

const saveDismissedCoachmarks = (ids: string[]) => {
  if (typeof window === "undefined" || !window.localStorage) {
    return;
  }

  localStorage.setItem(COACHMARK_STORAGE_KEY, JSON.stringify(ids));
};

const dismissCoachmark = (id: string) => {
  const currentIds = loadDismissedCoachmarks();
  if (currentIds.includes(id)) {
    return;
  }

  saveDismissedCoachmarks([...currentIds, id]);
};

interface CoachmarkProps {
  id: string;
  title: string;
  description: string;
  children: React.ReactNode;
  enabled?: boolean;
  placement?: Placement;
  accentLabel?: string;
  dismissLabel?: string;
  className?: string;
}

const Coachmark: React.FC<CoachmarkProps> = ({
  id,
  title,
  description,
  children,
  enabled = true,
  placement = "bottom",
  accentLabel = "Ayuda rapida",
  dismissLabel = "Entendido",
  className = "",
}) => {
  const titleId = useId();
  const descriptionId = useId();
  const arrowRef = useRef<SVGSVGElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const shouldReduceMotion =
    prefersReducedMotion ||
    (typeof document !== "undefined" &&
      document.documentElement.dataset.reducedMotion === "reduce");
  const disableAnimations =
    shouldReduceMotion || process.env.NODE_ENV === "test";
  const [isDismissed, setIsDismissed] = useState(() =>
    loadDismissedCoachmarks().includes(id),
  );

  useEffect(() => {
    setIsDismissed(loadDismissedCoachmarks().includes(id));
  }, [id]);

  const isOpen = enabled && !isDismissed;
  const {
    refs,
    floatingStyles,
    context,
    placement: resolvedPlacement,
  } = useFloating({
    open: isOpen,
    onOpenChange: (nextOpen) => {
      if (!nextOpen && enabled && !isDismissed) {
        dismissCoachmark(id);
        setIsDismissed(true);
      }
    },
    placement,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(14),
      flip({ padding: 16 }),
      shift({ padding: 16 }),
      arrow({ element: arrowRef }),
    ],
  });

  const dismiss = useDismiss(context, {
    outsidePress: true,
    outsidePressEvent: "mousedown",
    escapeKey: true,
  });
  const role = useRole(context, { role: "dialog" });
  const { getReferenceProps, getFloatingProps } = useInteractions([
    dismiss,
    role,
  ]);

  const pulseAnimation = useMemo(() => {
    if (!isOpen || disableAnimations) {
      return undefined;
    }

    return {
      scale: [1, 1.01, 1],
      y: [0, -2, 0],
    };
  }, [disableAnimations, isOpen]);

  const transition = disableAnimations
    ? { duration: 0 }
    : { duration: 0.2, ease: [0.22, 1, 0.36, 1] as const };
  const pulseTransition = disableAnimations
    ? { duration: 0 }
    : { duration: 1.8, repeat: Infinity, repeatDelay: 1 };

  const handleDismiss = () => {
    dismissCoachmark(id);
    setIsDismissed(true);
  };

  const side = resolvedPlacement.split("-")[0];
  const coachmarkPanel = (
    <div className="relative rounded-2xl border border-border bg-surface-1/95 px-4 py-3 shadow-2xl shadow-black/20 backdrop-blur-xl">
      <FloatingArrow
        ref={arrowRef}
        context={context}
        className="fill-surface-1 stroke-border"
        strokeWidth={1}
      />
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-accent">
              {accentLabel}
            </p>
            <h3 id={titleId} className="text-sm font-black text-text-primary">
              {title}
            </h3>
          </div>
          <button
            type="button"
            onClick={handleDismiss}
            className="text-xs font-bold uppercase tracking-widest text-text-muted transition-colors hover:text-text-primary"
            aria-label={`Cerrar ayuda: ${title}`}
          >
            Cerrar
          </button>
        </div>
        <p
          id={descriptionId}
          className="text-sm leading-6 text-text-secondary"
        >
          {description}
        </p>
        <div className="flex justify-end">
          <Button size="sm" variant="primary" onClick={handleDismiss}>
            {dismissLabel}
          </Button>
        </div>
      </div>
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute h-3 w-3 rounded-full bg-accent/80 blur-sm ${
          side === "top"
            ? "bottom-3 right-3"
            : side === "bottom"
              ? "top-3 right-3"
              : "top-3 left-3"
        }`}
      />
    </div>
  );

  return (
    <>
      <motion.div
        ref={refs.setReference}
        className={className}
        animate={pulseAnimation}
        transition={pulseTransition}
        {...getReferenceProps()}
      >
        {children}
      </motion.div>

      <FloatingPortal>
        {disableAnimations ? (
          isOpen ? (
            <div
              ref={refs.setFloating}
              style={floatingStyles}
              className="z-[80] w-[min(22rem,calc(100vw-1.5rem))]"
              {...getFloatingProps({
                "aria-labelledby": titleId,
                "aria-describedby": descriptionId,
              })}
            >
              {coachmarkPanel}
            </div>
          ) : null
        ) : (
          <AnimatePresence>
            {isOpen ? (
            <motion.div
              ref={refs.setFloating}
              style={floatingStyles}
              className="z-[80] w-[min(22rem,calc(100vw-1.5rem))]"
              initial={{ opacity: 0, y: disableAnimations ? 0 : 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: disableAnimations ? 0 : 4, scale: 0.98 }}
              transition={transition}
              {...getFloatingProps({
                "aria-labelledby": titleId,
                "aria-describedby": descriptionId,
              })}
            >
              {coachmarkPanel}
            </motion.div>
            ) : null}
          </AnimatePresence>
        )}
      </FloatingPortal>
    </>
  );
};

export default Coachmark;
