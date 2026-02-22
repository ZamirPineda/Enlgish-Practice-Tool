import React, { useState, useEffect } from "react";

export type ToastType = "success" | "error" | "info";

export interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
}

class ToastManager {
  private listeners: ((toasts: ToastMessage[]) => void)[] = [];
  private toasts: ToastMessage[] = [];

  subscribe(listener: (toasts: ToastMessage[]) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach((l) => l([...this.toasts]));
  }

  show(message: string, type: ToastType = "info", duration = 3000) {
    const id = Math.random().toString(36).substring(2, 9);
    this.toasts.push({ id, message, type });
    this.notify();

    setTimeout(() => {
      this.remove(id);
    }, duration);
  }

  remove(id: string) {
    this.toasts = this.toasts.filter((t) => t.id !== id);
    this.notify();
  }
}

export const toastManager = new ToastManager();

export const toast = {
  success: (msg: string, duration?: number) =>
    toastManager.show(msg, "success", duration),
  error: (msg: string, duration?: number) =>
    toastManager.show(msg, "error", duration),
  info: (msg: string, duration?: number) =>
    toastManager.show(msg, "info", duration),
};

export const ToastContainer: React.FC = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    return toastManager.subscribe(setToasts);
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`animate-fade-in flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border pointer-events-auto transition-all transform hover:scale-105 ${
            t.type === "success"
              ? "bg-emerald-900/90 border-emerald-500/50 text-emerald-100"
              : t.type === "error"
                ? "bg-red-900/90 border-red-500/50 text-red-100"
                : "bg-slate-800/90 border-slate-600/50 text-slate-100"
          }`}
        >
          {t.type === "success" && <span>✅</span>}
          {t.type === "error" && <span>❌</span>}
          {t.type === "info" && <span>ℹ️</span>}
          <span className="font-medium text-sm">{t.message}</span>
          <button
            onClick={() => toastManager.remove(t.id)}
            className="ml-2 text-current opacity-50 hover:opacity-100 transition-opacity"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};
