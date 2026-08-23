import re

with open("src/hooks/usePWAUpdate.ts", "r") as f:
    content = f.read()

content = content.replace("""    if ("serviceWorker" in navigator && import.meta.env.PROD) {""", """    const triggerUpdate = () => {
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

    // Expose to window for Playwright E2E tests to mock SW update ALWAYS
    (window as any).__TRIGGER_PWA_UPDATE = triggerUpdate;

    if ("serviceWorker" in navigator && import.meta.env.PROD) {""")

content = content.replace("""      const triggerUpdate = () => {
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

      // Expose to window for Playwright E2E tests to mock SW update
      (window as any).__TRIGGER_PWA_UPDATE = triggerUpdate;""", "")


with open("src/hooks/usePWAUpdate.ts", "w") as f:
    f.write(content)
