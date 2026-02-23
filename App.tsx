import React, { Suspense, lazy } from "react";
import { HashRouter, Routes, Route, NavLink, Navigate } from "react-router-dom";
import { useRegisterSW } from "virtual:pwa-register/react";
import { playNativeTTS } from "./utils/audioUtils";
import { createNewSrsItem } from "./utils/srs";
import { SrsVocabularyItem } from "./types";
import { APP_VERSION } from "./utils/appVersion";
import { AppSettings, loadSettings, saveSettings } from "./utils/settingsStore";
import { ToastContainer, toast } from "./components/ui/Toast";

// Views
const HomeView = lazy(() => import("./components/HomeView"));
const StopGameView = lazy(() => import("./components/StopGameView"));
const StudyDeckView = lazy(() => import("./components/StudyDeckView"));
const PersonalPhrasesView = lazy(
  () => import("./components/PersonalPhrasesView"),
);
const VocabularyVaultView = lazy(
  () => import("./components/VocabularyVaultView"),
);
const MathView = lazy(() => import("./components/MathView"));
const StudyDocsView = lazy(() => import("./components/StudyDocsView"));
const StatsView = lazy(() => import("./components/StatsView"));
const SettingsView = lazy(() => import("./components/SettingsView"));

const ONBOARDING_STEPS = [
  {
    title: "Add words to your Vault",
    description: "Open Vault and tap + Add Word to save vocabulary fast.",
  },
  {
    title: "Start a review session",
    description: "In Vault, press Review Now to practice due cards.",
  },
  {
    title: "Keep backups ready",
    description: "Use Vault → Backup & Sync to export or import your data.",
  },
];

const NavItem = ({
  to,
  children,
  onClick,
}: {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
}) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `flex items-center gap-2 whitespace-nowrap px-3 md:px-4 py-2 rounded-lg font-bold text-sm md:text-base transition-all ${
        isActive
          ? "shadow-md bg-accent text-text-primary"
          : "bg-transparent hover:bg-surface-hover text-text-secondary"
      }`
    }
  >
    {children}
  </NavLink>
);

const NavGroup = ({
  title,
  icon,
  children,
}: {
  title: string;
  icon: string;
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 150);
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={handleClick}
        className={`flex items-center gap-2 whitespace-nowrap px-3 md:px-4 py-2 rounded-lg font-bold text-sm md:text-base transition-all ${
          isOpen
            ? "bg-surface-hover text-text-primary"
            : "bg-transparent hover:bg-surface-hover text-text-secondary"
        }`}
      >
        <span>{icon}</span>
        {title}
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-48 bg-surface-1 border border-border rounded-xl shadow-xl py-2 z-50 flex flex-col gap-1">
          {children}
        </div>
      )}
    </div>
  );
};

const MobileNavItem = ({
  to,
  icon,
  label,
}: {
  to: string;
  icon: string;
  label: string;
}) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex flex-col items-center justify-center w-16 h-14 rounded-xl transition-all ${
        isActive ? "text-accent" : "text-text-secondary hover:text-text-primary"
      }`
    }
  >
    <span className="text-xl mb-1">{icon}</span>
    <span className="text-[10px] font-bold">{label}</span>
  </NavLink>
);

const App: React.FC = () => {
  const [settings, setSettings] = React.useState<AppSettings>(() =>
    loadSettings(),
  );
  const [onboardingStep, setOnboardingStep] = React.useState(0);
  const [isOffline, setIsOffline] = React.useState(!navigator.onLine);
  const [deferredPrompt, setDeferredPrompt] = React.useState<any>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const {
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  React.useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setDeferredPrompt(null);
    }
  };

  React.useEffect(() => {
    document.documentElement.dataset.theme = settings.theme;
    document.documentElement.dataset.reducedMotion = settings.reducedMotion
      ? "reduce"
      : "no-preference";
    saveSettings(settings);
  }, [settings]);

  const handleSettingsChange = React.useCallback(
    (updates: Partial<AppSettings>) => {
      setSettings((previous) => ({ ...previous, ...updates }));
    },
    [],
  );
  const closeOnboarding = React.useCallback(() => {
    setOnboardingStep(0);
    handleSettingsChange({ hasCompletedOnboarding: true });
  }, [handleSettingsChange]);

  // Vocabulary Vault Logic (Kept for compatibility with StopGame/StudyDeck)
  const addToVault = (word: string, definition: string) => {
    try {
      const saved = localStorage.getItem("vocab-vault-deck");
      const deck: Record<string, SrsVocabularyItem> = saved
        ? JSON.parse(saved)
        : {};

      // Simple duplicate check normalization
      const key = word.toLowerCase().trim();
      if (deck[key]) {
        toast.info(`"${word}" is already in your Vault.`);
        return;
      }

      deck[key] = createNewSrsItem(word, definition);
      localStorage.setItem("vocab-vault-deck", JSON.stringify(deck));
      toast.success(`Added "${word}" to Vault!`);
    } catch (e) {
      console.error("Error saving to vault", e);
      toast.error("Failed to save word.");
    }
  };

  return (
    <HashRouter>
      <div className="h-screen flex flex-col overflow-hidden font-sans bg-background text-text-primary">
        <header className="p-4 border-b flex flex-wrap justify-between items-center gap-4 z-50 shadow-lg relative bg-surface-1 border-border">
          <div className="flex items-center gap-3">
            <h1 className="text-lg md:text-xl font-black bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent truncate">
              ENGLISH PAL
            </h1>
            {isOffline && (
              <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-xs font-bold rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse"></span>
                Offline
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 bg-surface-2 px-3 py-1.5 rounded-full border border-border">
              <div className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]"></div>
              <span className="text-xs font-bold text-text-secondary">
                Lvl 1
              </span>
              <div className="w-24 h-1.5 bg-border rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-sky-400 to-emerald-400 w-1/3"></div>
              </div>
              <span className="text-[10px] font-black text-text-secondary">
                350 XP
              </span>
            </div>
            {deferredPrompt && (
              <button
                onClick={handleInstallClick}
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-sky-500/20 text-sky-600 dark:text-sky-400 hover:bg-sky-500/30 rounded-lg text-sm font-bold transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Install App
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 text-text-secondary hover:text-text-primary hover:bg-surface-2 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex flex-wrap gap-2 w-full md:w-auto">
            <NavItem to="/">🏠 Home</NavItem>
            <NavGroup title="Aprender" icon="📚">
              <NavItem to="/vault">🧠 Vault</NavItem>
              <NavItem to="/study">📚 Study Deck</NavItem>
              <NavItem to="/personal">👤 Scripts</NavItem>
            </NavGroup>
            <NavGroup title="Jugar" icon="🎮">
              <NavItem to="/stop">🎮 STOP Game</NavItem>
            </NavGroup>
            <NavGroup title="Herramientas" icon="🛠️">
              <NavItem to="/calculus">∫ Math</NavItem>
              <NavItem to="/docs">📖 Docs</NavItem>
            </NavGroup>
            <NavGroup title="Perfil" icon="👤">
              <NavItem to="/stats">📊 Stats</NavItem>
              <NavItem to="/settings">⚙️ Settings</NavItem>
            </NavGroup>
          </nav>

          {/* Mobile Navigation Drawer */}
          {isMobileMenuOpen && (
            <div className="absolute top-full left-0 right-0 bg-surface-1 border-b border-border shadow-2xl md:hidden flex flex-col p-4 gap-2 z-50">
              {deferredPrompt && (
                <button
                  onClick={handleInstallClick}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-sky-500/20 text-sky-400 rounded-xl text-sm font-bold mb-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  Install App to Home Screen
                </button>
              )}
              <div
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex flex-col gap-2"
              >
                <NavItem to="/study">📚 Study Deck</NavItem>
                <NavItem to="/personal">👤 Scripts</NavItem>
                <NavItem to="/calculus">∫ Math</NavItem>
                <NavItem to="/docs">📖 Docs</NavItem>
              </div>
            </div>
          )}
        </header>

        <main className="flex-1 flex flex-col min-h-0 relative bg-surface-2">
          <Suspense
            fallback={
              <div
                className="flex-1 flex items-center justify-center text-text-secondary"
                role="status"
              >
                Loading section...
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<HomeView />} />
              <Route
                path="/stop"
                element={
                  <StopGameView
                    onPlayWord={playNativeTTS}
                    isWordAudioLoading={null}
                    ttsAutoPlay={settings.ttsAutoPlay}
                    onAddToVault={addToVault}
                  />
                }
              />
              <Route
                path="/study"
                element={
                  <StudyDeckView
                    onPlayWord={playNativeTTS}
                    isWordAudioLoading={null}
                    onAddToVault={addToVault}
                  />
                }
              />
              <Route
                path="/personal"
                element={<PersonalPhrasesView onPlayAudio={playNativeTTS} />}
              />
              <Route
                path="/vault"
                element={
                  <VocabularyVaultView
                    onPlayWord={playNativeTTS}
                    confirmDialogsEnabled={settings.confirmDialogs}
                  />
                }
              />
              <Route path="/stats" element={<StatsView />} />
              <Route path="/calculus" element={<MathView />} />
              <Route path="/docs" element={<StudyDocsView />} />
              <Route
                path="/settings"
                element={
                  <SettingsView
                    settings={settings}
                    onSettingsChange={handleSettingsChange}
                  />
                }
              />
            </Routes>
          </Suspense>
        </main>
        <footer className="hidden md:block px-4 py-2 text-xs border-t bg-surface-1 border-border text-text-muted">
          About · v{APP_VERSION}
        </footer>

        {/* Mobile Bottom Navigation */}
        <nav className="md:hidden flex items-center justify-around bg-surface-1 border-t border-border pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-1 px-2 z-50">
          <MobileNavItem to="/" icon="🏠" label="Home" />
          <MobileNavItem to="/vault" icon="🧠" label="Vault" />
          <MobileNavItem to="/stop" icon="🎮" label="STOP" />
          <MobileNavItem to="/settings" icon="👤" label="Perfil" />
        </nav>

        {needRefresh && (
          <div className="absolute bottom-4 right-4 z-50 rounded-xl border border-sky-400 bg-slate-900/95 p-3 shadow-2xl">
            <p className="text-sm font-semibold text-slate-100">
              Update available
            </p>
            <button
              onClick={() => updateServiceWorker(true)}
              className="mt-2 rounded-lg bg-sky-500 px-3 py-1.5 text-sm font-bold text-slate-900"
            >
              Refresh
            </button>
          </div>
        )}
        {!settings.hasCompletedOnboarding && (
          <div className="absolute inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl">
              <p className="text-xs font-bold uppercase tracking-widest text-sky-400">
                Quick start · {onboardingStep + 1}/{ONBOARDING_STEPS.length}
              </p>
              <h2 className="mt-2 text-2xl font-black text-white">
                {ONBOARDING_STEPS[onboardingStep].title}
              </h2>
              <p className="mt-3 text-sm text-slate-300">
                {ONBOARDING_STEPS[onboardingStep].description}
              </p>
              <div className="mt-6 flex gap-2">
                <button
                  onClick={closeOnboarding}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-200 text-sm font-bold"
                >
                  Skip
                </button>
                {onboardingStep < ONBOARDING_STEPS.length - 1 ? (
                  <button
                    onClick={() => setOnboardingStep((step) => step + 1)}
                    className="ml-auto px-4 py-2 rounded-lg bg-sky-500 text-slate-900 text-sm font-black"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={closeOnboarding}
                    className="ml-auto px-4 py-2 rounded-lg bg-emerald-400 text-slate-900 text-sm font-black"
                  >
                    Let’s go
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
        <ToastContainer />
      </div>
    </HashRouter>
  );
};

export default App;
