import { useState, useEffect, useCallback, useRef } from "react";
import { Workbox } from "workbox-window";

export const isActiveSession = () => {
  if (typeof window === "undefined") return false;
  const hash = window.location.hash;
  return (
    hash.includes("mode=game") ||
    hash.includes("tab=game") ||
    hash.includes("mode=quiz") ||
    hash.includes("/speed-builder") ||
    hash.includes("/error-hunter") ||
    hash.includes("/paraphrase-duel") ||
    hash.includes("/collocation-sprint") ||
    hash.includes("/taboo-english") ||
    hash.includes("/sentence-transformer") ||
    hash.includes("/syntax-builder") ||
    hash.includes("/bug-hunter") ||
    hash.includes("/tech-hub") ||
    hash.includes("/diplomatic-reviewer")
  );
};

export const usePWAUpdate = () => {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const wbRef = useRef<Workbox | null>(null);
  const hasReloaded = useRef(false);

  useEffect(() => {
    const triggerUpdate = () => {
      if (isActiveSession()) {
        setUpdateAvailable(true);
      } else {
        if (!hasReloaded.current) {
          hasReloaded.current = true;
          if (wbRef.current) wbRef.current.messageSkipWaiting();
          window.location.reload();
        }
      }
    };
    (window as any).__TRIGGER_PWA_UPDATE = triggerUpdate;

    if ("serviceWorker" in navigator && import.meta.env.PROD) {
      const wb = new Workbox("/sw.js");
      wbRef.current = wb;





      wb.addEventListener("waiting", triggerUpdate);

      wb.addEventListener("installed", (event) => {
        if (event.isUpdate) {
          triggerUpdate();
        }
      });

      wb.addEventListener("controlling", triggerUpdate);

      wb.register().catch((err) => {
        console.error("Service worker registration failed:", err);
      });
    }
  }, []);

  const handleUpdate = useCallback(() => {
    if (wbRef.current) {
      wbRef.current.messageSkipWaiting();
    }
    window.location.reload();
  }, []);

  return {
    updateAvailable,
    handleUpdate,
  };
};
