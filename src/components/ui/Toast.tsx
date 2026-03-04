import React, { useEffect, useState } from "react";
import { Toaster, toast as sonnerToast } from "sonner";
import "sonner/dist/styles.css";

export type ToastType = "success" | "error" | "info";

const DEFAULT_DURATION: Record<ToastType, number> = {
  success: 1700,
  error: 2200,
  info: 1800,
};

const resolveDuration = (type: ToastType, duration?: number) =>
  typeof duration === "number" ? duration : DEFAULT_DURATION[type];

const showToast = (message: string, type: ToastType, duration?: number) => {
  const toastDuration = resolveDuration(type, duration);

  if (type === "success") {
    sonnerToast.success(message, { duration: toastDuration });
    return;
  }

  if (type === "error") {
    sonnerToast.error(message, { duration: toastDuration });
    return;
  }

  sonnerToast(message, { duration: toastDuration });
};

export const toast = {
  success: (message: string, duration?: number) =>
    showToast(message, "success", duration),
  error: (message: string, duration?: number) =>
    showToast(message, "error", duration),
  info: (message: string, duration?: number) =>
    showToast(message, "info", duration),
};

const MOBILE_QUERY = "(max-width: 768px)";

export const ToastContainer: React.FC = () => {
  const getMediaQuery = () => {
    if (typeof window === "undefined") return null;
    if (typeof window.matchMedia !== "function") return null;
    return window.matchMedia(MOBILE_QUERY);
  };

  const [isMobile, setIsMobile] = useState(() => {
    return getMediaQuery()?.matches ?? false;
  });

  useEffect(() => {
    const mediaQuery = getMediaQuery();
    if (!mediaQuery) return;

    const onChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    setIsMobile(mediaQuery.matches);
    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", onChange);
      return () => mediaQuery.removeEventListener("change", onChange);
    }

    mediaQuery.addListener(onChange);
    return () => mediaQuery.removeListener(onChange);
  }, []);

  return (
    <Toaster
      theme="dark"
      richColors={false}
      closeButton={!isMobile}
      position={isMobile ? "top-center" : "bottom-right"}
      visibleToasts={isMobile ? 1 : 3}
      expand={false}
      gap={8}
      duration={2000}
      offset={
        isMobile
          ? { top: "calc(env(safe-area-inset-top) + 0.75rem)" }
          : {
              right: "0.75rem",
              bottom: "calc(env(safe-area-inset-bottom) + 5rem)",
            }
      }
      toastOptions={{
        style: {
          background: "var(--color-surface-1)",
          color: "var(--color-text-primary)",
          border: "1px solid var(--color-border)",
          boxShadow: "var(--shadow-md)",
        },
      }}
    />
  );
};
