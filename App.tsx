import React, { Suspense, lazy } from "react";
import {
  HashRouter,
  Routes,
  Route,
  NavLink,
  Link,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useRegisterSW } from "virtual:pwa-register/react";
import { playNativeTTS } from "./utils/audioUtils";
import { createNewSrsItem } from "./utils/srs";
import { SrsVocabularyItem } from "./types";
import { APP_VERSION } from "./utils/appVersion";
import { AppSettings, loadSettings, saveSettings } from "./utils/settingsStore";
import { useGlobalXp } from "./utils/xpStore";
import { ToastContainer, toast } from "./components/ui/Toast";
import { getRankForLevel } from "./utils/levelRanks";

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
const SpeedBuilderView = lazy(() => import("./components/SpeedBuilderView"));
const ErrorHunterView = lazy(() => import("./components/ErrorHunterView"));
const ParaphraseDuelView = lazy(
  () => import("./components/ParaphraseDuelView"),
);
const CollocationSprintView = lazy(
  () => import("./components/CollocationSprintView"),
);
const TabooEnglishView = lazy(() => import("./components/TabooEnglishView"));
const SentenceTransformerView = lazy(
  () => import("./components/SentenceTransformerView"),
);
const MathView = lazy(() => import("./components/MathView"));
const StudyDocsView = lazy(() => import("./components/StudyDocsView"));
const StatsView = lazy(() => import("./components/StatsView"));
const SettingsView = lazy(() => import("./components/SettingsView"));
const CodeSyntaxBuilderView = lazy(
  () => import("./components/CodeSyntaxBuilderView"),
);
const CodeBugHunterView = lazy(() => import("./components/CodeBugHunterView"));

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
}) => {
  const location = useLocation();

  const isQueryMatch = React.useMemo(() => {
    const [targetPathname, targetSearch = ""] = to.split("?");

    if (location.pathname !== targetPathname) {
      return false;
    }

    if (!targetSearch) {
      return true;
    }

    const targetParams = new URLSearchParams(targetSearch);
    const currentParams = new URLSearchParams(location.search);

    for (const [key, value] of targetParams.entries()) {
      if (currentParams.get(key) !== value) {
        return false;
      }
    }

    return true;
  }, [location.pathname, location.search, to]);

  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={() =>
        `flex items-center gap-2 whitespace-nowrap px-3 md:px-4 py-2 min-h-[44px] rounded-lg font-bold text-sm md:text-base transition-all active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-focus focus-visible:outline-none ${
          isQueryMatch
            ? "shadow-md bg-accent text-white"
            : "bg-transparent hover:bg-surface-hover text-text-secondary"
        }`
      }
    >
      {children}
    </NavLink>
  );
};

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
    timeoutRef.current = setTimeout(() => setIsOpen(false), 300);
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Escape") {
      setIsOpen(false);
      event.currentTarget.blur();
    }
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={`flex items-center gap-2 whitespace-nowrap px-3 md:px-4 py-2 min-h-[44px] rounded-lg font-bold text-sm md:text-base transition-all active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-focus focus-visible:outline-none ${
          isOpen
            ? "bg-surface-hover text-text-primary"
            : "bg-transparent hover:bg-surface-hover text-text-secondary"
        }`}
        aria-expanded={isOpen}
        aria-haspopup="menu"
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
      `flex flex-col items-center justify-center w-16 h-16 rounded-xl transition-all active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-focus focus-visible:outline-none ${
        isActive
          ? "text-accent bg-accent/10"
          : "text-text-secondary hover:text-text-primary hover:bg-surface-hover"
      }`
    }
  >
    {({ isActive }) => (
      <>
        <span
          className={`text-xl mb-1 transition-transform ${isActive ? "scale-110" : ""}`}
        >
          {icon}
        </span>
        <span className="text-[10px] font-bold">{label}</span>
      </>
    )}
  </NavLink>
);

const AnimatedRoutes = ({
  settings,
  addToVault,
  handleSettingsChange,
}: {
  settings: AppSettings;
  addToVault: (word: string, def: string, opts?: any) => void;
  handleSettingsChange: (updates: Partial<AppSettings>) => void;
}) => {
  const location = useLocation();

  return (
    <div
      key={location.pathname}
      className="animate-fade-in flex-1 flex flex-col min-h-0"
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
        <Route path="/speed-builder" element={<SpeedBuilderView />} />
        <Route path="/error-hunter" element={<ErrorHunterView />} />
        <Route path="/paraphrase-duel" element={<ParaphraseDuelView />} />
        <Route path="/collocation-sprint" element={<CollocationSprintView />} />
        <Route path="/taboo-english" element={<TabooEnglishView />} />
        <Route
          path="/sentence-transformer"
          element={<SentenceTransformerView />}
        />
        <Route path="/stats" element={<StatsView />} />
        <Route path="/calculus" element={<MathView />} />
        <Route path="/docs" element={<StudyDocsView />} />
        <Route path="/syntax-builder" element={<CodeSyntaxBuilderView />} />
        <Route path="/bug-hunter" element={<CodeBugHunterView />} />
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
    </div>
  );
};

const App: React.FC = () => {
  const [settings, setSettings] = React.useState<AppSettings>(() =>
    loadSettings(),
  );
  const [onboardingStep, setOnboardingStep] = React.useState(0);
  const [isOffline, setIsOffline] = React.useState(!navigator.onLine);
  const [deferredPrompt, setDeferredPrompt] = React.useState<any>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { level, currentLevelXp, nextLevelXp, progressPercentage } =
    useGlobalXp();

  const currentRank = React.useMemo(() => getRankForLevel(level), [level]);

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
    if (!deferredPrompt) {
      toast.info(
        "Install is not available right now. Open this app in a supported browser and use Add to Home Screen.",
      );
      return;
    }
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

  React.useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isMobileMenuOpen]);

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
  const addToVault = (
    word: string,
    definition: string,
    options?: {
      category?: string;
      tags?: string[];
    },
  ) => {
    try {
      const saved = localStorage.getItem("vocab-vault-deck");
      const deck: Record<string, SrsVocabularyItem> = saved
        ? JSON.parse(saved)
        : {};

      // Simple duplicate check normalization
      const key = word.toLowerCase().trim();
      if (deck[key]) {
        const existing = deck[key];
        const metadataTags = [
          ...(options?.tags || []),
          ...(options?.category ? [options.category] : []),
        ]
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0);

        if (metadataTags.length > 0) {
          const mergedTags = Array.from(
            new Set([...(existing.tags || []), ...metadataTags]),
          );
          deck[key] = {
            ...existing,
            tags: mergedTags,
          };
          localStorage.setItem("vocab-vault-deck", JSON.stringify(deck));
          toast.info(`Updated "${word}" with category info.`);
          return;
        }

        toast.info(`"${word}" is already in your Vault.`);
        return;
      }

      const metadataTags = [
        ...(options?.tags || []),
        ...(options?.category ? [options.category] : []),
      ]
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      deck[key] = {
        ...createNewSrsItem(word, definition),
        tags: metadataTags.length > 0 ? Array.from(new Set(metadataTags)) : [],
      };
      localStorage.setItem("vocab-vault-deck", JSON.stringify(deck));
      const categorySuffix = options?.category ? ` (${options.category})` : "";
      toast.success(`Added "${word}"${categorySuffix} to Vault!`);
    } catch (e) {
      console.error("Error saving to vault", e);
      toast.error("Failed to save word.");
    }
  };

  return (
    <HashRouter>
      <div className="h-[100dvh] min-h-[100dvh] flex flex-col overflow-hidden font-sans bg-background text-text-primary">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-surface-1 focus:text-text-primary focus:rounded-lg focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-accent focus:font-bold"
        >
          Skip to main content
        </a>
        <header className="sticky top-0 p-3 sm:p-4 border-b flex flex-wrap justify-between items-center gap-3 sm:gap-4 z-50 shadow-lg relative bg-surface-1/95 backdrop-blur border-border">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus rounded-lg"
            >
              <h1 className="text-lg md:text-xl font-black bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent truncate cursor-pointer flex items-center gap-0.5">
                <span className="text-sky-500">S</span>ki
                <span className="text-emerald-400 text-xl md:text-2xl -mt-0.5">
                  LL
                </span>
                Pal
              </h1>
            </Link>
            {isOffline && (
              <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-xs font-bold rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse"></span>
                Offline
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/stats"
              className="hidden md:flex items-center gap-2 bg-surface-2 px-3 py-1.5 rounded-full border border-border hover:bg-surface-hover hover:scale-105 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus cursor-pointer"
              title={`${currentRank.title} (Level ${level})`}
            >
              <div className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)] animate-pulse"></div>
              <span
                className={`text-[10px] font-black uppercase tracking-wider ${currentRank.color}`}
              >
                Lvl {level} • {currentRank.emoji} {currentRank.title}
              </span>
              <div className="w-24 h-1.5 bg-surface-1 rounded-full overflow-hidden shadow-inner border border-border">
                <div
                  className="h-full bg-gradient-to-r from-sky-400 to-emerald-400 transition-all duration-1000 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <span className="text-[10px] font-black text-text-muted">
                {currentLevelXp}/{nextLevelXp}
              </span>
            </Link>
            <button
              onClick={handleInstallClick}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-sky-500/20 text-sky-600 dark:text-sky-400 hover:bg-sky-500/30 rounded-lg text-sm font-bold transition-colors"
              aria-label="Install app"
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

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 text-text-secondary hover:text-text-primary hover:bg-surface-2 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav-drawer"
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
          <nav
            className="hidden md:flex flex-wrap gap-2 w-full md:w-auto"
            aria-label="Main navigation"
          >
            <NavItem to="/">🏠 Home</NavItem>
            <NavGroup title="Aprender" icon="📚">
              <NavItem to="/vault">🧠 Vault</NavItem>
              <NavItem to="/study">📚 Study Deck</NavItem>
              <NavItem to="/personal">👤 Scripts</NavItem>
            </NavGroup>
            <NavGroup title="Jugar" icon="🎮">
              <NavItem to="/stop?mode=browse">🎲 Browse</NavItem>
              <NavItem to="/stop?mode=study">📚 Study</NavItem>
              <NavItem to="/stop?mode=game">🎮 Game</NavItem>
              <NavItem to="/speed-builder">⚡ Speed Builder</NavItem>
              <NavItem to="/error-hunter">🕵️ Error Hunter</NavItem>
              <NavItem to="/paraphrase-duel">🧠 Paraphrase Duel</NavItem>
              <NavItem to="/collocation-sprint">🔗 Collocation Sprint</NavItem>
              <NavItem to="/taboo-english">🚫 Taboo English</NavItem>
              <NavItem to="/calculus?tab=game">🔢 Math Quiz</NavItem>
              <NavItem to="/docs?mode=quiz">📝 Docs Quiz</NavItem>
              <NavItem to="/docs?mode=game">🎯 Docs Hunt</NavItem>
              <NavItem to="/syntax-builder">⌨️ Syntax Builder</NavItem>
              <NavItem to="/bug-hunter">🐛 Bug Hunter</NavItem>
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
            <>
              <div
                className="fixed inset-0 bg-black/50 z-40 md:hidden"
                onClick={() => setIsMobileMenuOpen(false)}
              />
              <div
                id="mobile-nav-drawer"
                className="absolute top-full left-0 right-0 bg-surface-1 border-b border-border shadow-2xl md:hidden flex flex-col p-4 gap-2 z-50 max-h-[calc(100dvh-4.25rem)] overflow-y-auto"
                role="dialog"
                aria-label="Mobile navigation"
                aria-modal="true"
              >
                <button
                  onClick={handleInstallClick}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-accent/20 text-accent rounded-xl text-sm font-bold mb-2 transition-colors hover:bg-accent/30"
                  aria-label="Install app to home screen"
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
                <div
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex flex-col gap-2"
                >
                  <NavItem to="/">🏠 Home</NavItem>
                  <NavItem to="/vault">🧠 Vault</NavItem>
                  {/* Use a dropdown-like structure or just links for STOP modes on mobile drawer to match desktop */}
                  <div className="pl-4 border-l-2 border-surface-2 ml-2 flex flex-col gap-2">
                    <span className="text-xs font-bold text-text-secondary uppercase tracking-widest pl-2 pt-2">
                      Games
                    </span>
                    <NavItem to="/stop?mode=browse">
                      🎲 Browse Dictionary
                    </NavItem>
                    <NavItem to="/stop?mode=study">📚 Flashcards</NavItem>
                    <NavItem to="/stop?mode=game">🎮 Stop Game</NavItem>
                    <NavItem to="/speed-builder">⚡ Speed Builder</NavItem>
                    <NavItem to="/error-hunter">🕵️ Error Hunter</NavItem>
                    <NavItem to="/paraphrase-duel">🧠 Paraphrase Duel</NavItem>
                    <NavItem to="/collocation-sprint">
                      🔗 Collocation Sprint
                    </NavItem>
                    <NavItem to="/taboo-english">🚫 Taboo English</NavItem>
                    <NavItem to="/sentence-transformer">
                      🧬 Sentence Transformer
                    </NavItem>
                    <NavItem to="/calculus?tab=game">🔢 Math Quiz</NavItem>
                    <NavItem to="/docs?mode=quiz">📝 Docs Quiz</NavItem>
                    <NavItem to="/docs?mode=game">🎯 Docs Hunt</NavItem>
                    <NavItem to="/syntax-builder">⌨️ Syntax Builder</NavItem>
                    <NavItem to="/bug-hunter">🐛 Bug Hunter</NavItem>
                  </div>

                  <NavItem to="/study">📚 Review Deck</NavItem>
                  <NavItem to="/personal">👤 Scripts</NavItem>
                  <NavItem to="/calculus">∫ Math Tools</NavItem>
                  <NavItem to="/docs">📖 Docs Tools</NavItem>
                  <NavItem to="/stats">📊 Stats</NavItem>
                  <NavItem to="/settings">⚙️ Settings</NavItem>
                </div>
              </div>
            </>
          )}
        </header>

        <main
          id="main-content"
          tabIndex={-1}
          className="flex-1 flex flex-col min-h-0 relative bg-background pb-[calc(env(safe-area-inset-bottom)+5rem)] md:pb-0"
        >
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
            <AnimatedRoutes
              settings={settings}
              addToVault={addToVault}
              handleSettingsChange={handleSettingsChange}
            />
          </Suspense>
        </main>
        <footer className="hidden md:block px-4 py-2 text-xs border-t bg-surface-1 border-border text-text-muted">
          About · v{APP_VERSION}
        </footer>

        {/* Mobile Bottom Navigation */}
        <nav
          className="md:hidden sticky bottom-0 flex items-center justify-around bg-surface-1/95 backdrop-blur border-t border-border pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-1 px-2 z-50"
          aria-label="Bottom navigation"
        >
          <MobileNavItem to="/" icon="🏠" label="Home" />
          <MobileNavItem to="/vault" icon="🧠" label="Vault" />
          <MobileNavItem to="/stop?mode=game" icon="🎮" label="STOP" />
          <MobileNavItem to="/settings" icon="👤" label="Perfil" />
        </nav>

        {needRefresh && (
          <div className="absolute right-4 bottom-[calc(env(safe-area-inset-bottom)+5.5rem)] md:bottom-4 z-50 rounded-xl border border-accent bg-surface-1 p-3 shadow-2xl">
            <p className="text-sm font-semibold text-text-primary">
              Update available
            </p>
            <button
              onClick={() => updateServiceWorker(true)}
              className="mt-2 rounded-lg bg-accent hover:bg-accent-hover px-3 py-1.5 text-sm font-bold text-white transition-colors"
            >
              Refresh
            </button>
          </div>
        )}
        {!settings.hasCompletedOnboarding && (
          <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-md rounded-2xl border border-border bg-surface-1 p-6 shadow-2xl">
              <p className="text-xs font-bold uppercase tracking-widest text-accent">
                Quick start · {onboardingStep + 1}/{ONBOARDING_STEPS.length}
              </p>
              <h2 className="mt-2 text-2xl font-black text-text-primary">
                {ONBOARDING_STEPS[onboardingStep].title}
              </h2>
              <p className="mt-3 text-sm text-text-secondary">
                {ONBOARDING_STEPS[onboardingStep].description}
              </p>
              <div className="mt-6 flex gap-2">
                <button
                  onClick={closeOnboarding}
                  className="px-4 py-2 rounded-lg bg-surface-2 hover:bg-surface-hover text-text-primary text-sm font-bold transition-colors"
                >
                  Skip
                </button>
                {onboardingStep < ONBOARDING_STEPS.length - 1 ? (
                  <button
                    onClick={() => setOnboardingStep((step) => step + 1)}
                    className="ml-auto px-4 py-2 rounded-lg bg-accent hover:bg-accent-hover text-white text-sm font-black transition-colors"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={closeOnboarding}
                    className="ml-auto px-4 py-2 rounded-lg bg-success hover:bg-success-hover text-white text-sm font-black transition-colors"
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
