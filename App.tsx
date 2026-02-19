import React, { Suspense, lazy } from "react";
import { HashRouter, Routes, Route, NavLink, Navigate } from "react-router-dom";
import { playNativeTTS } from "./utils/audioUtils";
import { createNewSrsItem } from "./utils/srs";
import { SrsVocabularyItem } from "./types";
import { APP_VERSION } from "./utils/appVersion";
import { AppSettings, loadSettings, saveSettings } from "./utils/settingsStore";

// Views
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

const NavItem = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex-1 md:flex-none whitespace-nowrap px-3 md:px-4 py-2 rounded-lg font-bold text-sm md:text-base transition-all ${
        isActive ? "shadow-md" : ""
      }`
    }
    style={({ isActive }) => ({
      backgroundColor: isActive
        ? "var(--color-accent)"
        : "var(--color-surface-hover)",
      color: isActive
        ? "var(--color-text-primary)"
        : "var(--color-text-secondary)",
    })}
  >
    {children}
  </NavLink>
);

const App: React.FC = () => {
  const [settings, setSettings] = React.useState<AppSettings>(() =>
    loadSettings(),
  );

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

  // Vocabulary Vault Logic (Kept for compatibility with StopGame/StudyDeck)
  const addToVault = (word: string, definition: string) => {
    try {
      const saved = localStorage.getItem("vocab-vault-deck");
      const deck: Record<string, SrsVocabularyItem> = saved
        ? JSON.parse(saved)
        : {};

      // Simple duplicate check normalization
      const key = word.toLowerCase().trim();
      if (deck[key]) return;

      deck[key] = createNewSrsItem(word, definition);
      localStorage.setItem("vocab-vault-deck", JSON.stringify(deck));
      console.log(`Word added to vault: ${word}`);
    } catch (e) {
      console.error("Error saving to vault", e);
    }
  };

  return (
    <HashRouter>
      <div
        className="h-screen flex flex-col overflow-hidden font-sans"
        style={{
          backgroundColor: "var(--color-bg)",
          color: "var(--color-text-primary)",
        }}
      >
        <header
          className="p-4 border-b flex flex-wrap justify-between items-center gap-4 z-10 shadow-lg"
          style={{
            backgroundColor: "var(--color-surface-1)",
            borderColor: "var(--color-border)",
          }}
        >
          <h1 className="text-lg md:text-xl font-black bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent truncate">
            ENGLISH PAL
          </h1>

          <nav className="flex gap-2 overflow-x-auto pb-1 md:pb-0 w-full md:w-auto">
            <NavItem to="/stop">🎮 STOP Game</NavItem>
            <NavItem to="/study">📚 Study Deck</NavItem>
            <NavItem to="/personal">👤 Scripts</NavItem>
            <NavItem to="/vault">🧠 Vault</NavItem>
            <NavItem to="/stats">📊 Stats</NavItem>
            <NavItem to="/calculus">∫ Math</NavItem>
            <NavItem to="/docs">📖 Docs</NavItem>
            <NavItem to="/settings">⚙️ Settings</NavItem>
          </nav>
        </header>

        <main
          className="flex-1 flex flex-col min-h-0 relative"
          style={{ backgroundColor: "var(--color-surface-2)" }}
        >
          <Suspense
            fallback={
              <div
                className="flex-1 flex items-center justify-center"
                style={{ color: "var(--color-text-secondary)" }}
                role="status"
              >
                Loading section...
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Navigate to="/stop" replace />} />
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
        <footer
          className="px-4 py-2 text-xs border-t"
          style={{
            color: "var(--color-text-muted)",
            borderColor: "var(--color-border)",
            backgroundColor: "var(--color-surface-1)",
          }}
        >
          About · v{APP_VERSION}
        </footer>
      </div>
    </HashRouter>
  );
};

export default App;
