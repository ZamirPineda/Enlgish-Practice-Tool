import { useState, useEffect } from "react";

const GLOBAL_XP_KEY = "english-pal-global-xp";
const XP_PER_LEVEL = 1000;

export const getGlobalXp = (): number => {
  if (typeof window === "undefined" || !window.localStorage) return 0;
  const raw = localStorage.getItem(GLOBAL_XP_KEY);
  if (!raw) return 0;
  try {
    return parseInt(raw, 10) || 0;
  } catch {
    return 0;
  }
};

export const saveGlobalXp = (xp: number) => {
  if (typeof window === "undefined" || !window.localStorage) return;
  localStorage.setItem(GLOBAL_XP_KEY, xp.toString());
  // Dispatch a custom event so other components (like the Navbar) can react to XP changes
  window.dispatchEvent(new Event("globalXpUpdated"));
};

export const addGlobalXp = (points: number) => {
  if (points <= 0) return;
  const currentXp = getGlobalXp();
  saveGlobalXp(currentXp + points);
};

export const useGlobalXp = () => {
  const [xp, setXp] = useState<number>(getGlobalXp);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === GLOBAL_XP_KEY) {
        setXp(parseInt(e.newValue || "0", 10) || 0);
      }
    };

    const handleCustomEvent = () => {
      setXp(getGlobalXp());
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("globalXpUpdated", handleCustomEvent);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("globalXpUpdated", handleCustomEvent);
    };
  }, []);

  const level = Math.floor(xp / XP_PER_LEVEL) + 1;
  const currentLevelXp = xp % XP_PER_LEVEL;
  const nextLevelXp = XP_PER_LEVEL;
  const progressPercentage = Math.min(
    100,
    Math.max(0, (currentLevelXp / nextLevelXp) * 100),
  );

  return {
    totalXp: xp,
    level,
    currentLevelXp,
    nextLevelXp,
    progressPercentage,
    addXp: addGlobalXp,
  };
};
