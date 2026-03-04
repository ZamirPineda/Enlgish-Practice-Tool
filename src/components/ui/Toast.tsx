import React from "react";
import { Toaster, toast as sonnerToast } from "sonner";
import "sonner/dist/styles.css";

export type ToastType = "success" | "error" | "info";

const resolveDuration = (duration?: number) =>
  typeof duration === "number" ? duration : 3000;

const showToast = (message: string, type: ToastType, duration?: number) => {
  const toastDuration = resolveDuration(duration);

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

export const ToastContainer: React.FC = () => (
  <Toaster
    closeButton
    richColors
    position="bottom-right"
    duration={3000}
    offset={{
      right: "0.75rem",
      bottom: "calc(env(safe-area-inset-bottom) + 5rem)",
    }}
  />
);
