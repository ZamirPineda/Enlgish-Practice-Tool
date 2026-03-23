import React, { Suspense, lazy, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { playNativeTTS } from "@/lib/audioUtils";
import { AppSettings } from "@/lib/settingsStore";
import { setSentryRouteContext } from "@/lib/sentry";
import { VaultAddOptions } from "@/types";

// Views
const HomeView = lazy(() => import("@/pages/HomeView"));
const StopGameView = lazy(() => import("@/pages/StopGameView"));
const StudyDeckView = lazy(() => import("@/pages/StudyDeckView"));
const PersonalPhrasesView = lazy(() => import("@/pages/PersonalPhrasesView"));
const VocabularyVaultView = lazy(() => import("@/pages/VocabularyVaultView"));
const SpeedBuilderView = lazy(() => import("@/pages/SpeedBuilderView"));
const ErrorHunterView = lazy(() => import("@/pages/ErrorHunterView"));
const ParaphraseDuelView = lazy(() => import("@/pages/ParaphraseDuelView"));
const CollocationSprintView = lazy(
  () => import("@/pages/CollocationSprintView"),
);
const TabooEnglishView = lazy(() => import("@/pages/TabooEnglishView"));
const SentenceTransformerView = lazy(
  () => import("@/pages/SentenceTransformerView"),
);
const MathView = lazy(() => import("@/pages/MathView"));
const StudyDocsView = lazy(() => import("@/pages/StudyDocsView"));
const DailyLoopView = lazy(() => import("@/pages/DailyLoopView"));
const StatsView = lazy(() => import("@/pages/StatsView"));
const SettingsView = lazy(() => import("@/pages/SettingsView"));
const ProfileView = lazy(() => import("@/pages/ProfileView"));
const ContentCurationView = lazy(() => import("@/pages/ContentCurationView"));
const RoadmapView = lazy(() => import("@/pages/RoadmapView"));
const CodeSyntaxBuilderView = lazy(
  () => import("@/pages/CodeSyntaxBuilderView"),
);
const CodeBugHunterView = lazy(() => import("@/pages/CodeBugHunterView"));
const DiplomaticReviewerView = lazy(
  () => import("@/pages/DiplomaticReviewerView"),
);
const VerbPatternGameView = lazy(() => import("@/pages/VerbPatternGameView"));
const TriviaGameView = lazy(() => import("@/pages/TriviaGameView"));

// Tech Games
const TechHubView = lazy(() =>
  import("@/pages/tech-games/TechHubView").then((m) => ({
    default: m.TechHubView,
  })),
);
const TechFlashcardsView = lazy(() =>
  import("@/pages/tech-games/TechFlashcardsView").then((m) => ({
    default: m.TechFlashcardsView,
  })),
);
const TechTriviaSprintView = lazy(() =>
  import("@/pages/tech-games/TechTriviaSprintView").then((m) => ({
    default: m.TechTriviaSprintView,
  })),
);
const TechMatchUpView = lazy(() =>
  import("@/pages/tech-games/TechMatchUpView").then((m) => ({
    default: m.TechMatchUpView,
  })),
);
const TechBossView = lazy(() =>
  import("@/pages/tech-games/TechBossView").then((m) => ({
    default: m.TechBossView,
  })),
);

export const AnimatedRoutes = ({
  settings,
  addToVault,
  handleSettingsChange,
}: {
  settings: AppSettings;
  addToVault: (word: string, def: string, opts?: VaultAddOptions) => void;
  handleSettingsChange: (updates: Partial<AppSettings>) => void;
}) => {
  const location = useLocation();

  useEffect(() => {
    const route = `${location.pathname}${location.search}${location.hash}`;
    setSentryRouteContext(route);
  }, [location.pathname, location.search, location.hash]);

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
        <Route path="/content-curation" element={<ContentCurationView />} />
        <Route path="/roadmap" element={<RoadmapView />} />
        <Route
          path="/profile"
          element={
            <ProfileView
              settings={settings}
              onSettingsChange={handleSettingsChange}
            />
          }
        />
        <Route path="/calculus" element={<MathView />} />
        <Route path="/docs" element={<StudyDocsView />} />
        <Route path="/daily-loop" element={<DailyLoopView />} />
        <Route path="/syntax-builder" element={<CodeSyntaxBuilderView />} />
        <Route path="/bug-hunter" element={<CodeBugHunterView />} />
        <Route
          path="/diplomatic-reviewer"
          element={<DiplomaticReviewerView />}
        />
        <Route path="/verb-patterns" element={<VerbPatternGameView />} />
        <Route path="/trivia" element={<TriviaGameView />} />
        <Route path="/tech-hub" element={<TechHubView />} />
        <Route
          path="/tech-games/flashcards/:deckId"
          element={<TechFlashcardsView />}
        />
        <Route
          path="/tech-games/trivia/:deckId"
          element={<TechTriviaSprintView />}
        />
        <Route
          path="/tech-games/matchup/:deckId"
          element={<TechMatchUpView />}
        />
        <Route path="/tech-games/boss/:deckId" element={<TechBossView />} />
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
