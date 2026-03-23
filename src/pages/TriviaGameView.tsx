import React, {
  useRef,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import GameStartPanel from "@/components/GameStartPanel";
import GameShell from "@/components/game/GameShell";
import GameHudCard from "@/components/game/GameHudCard";
import DailySessionInsights from "@/components/game/DailySessionInsights";
import CountryMapCard from "@/components/game/CountryMapCard";
import {
  triviaQuestions,
  ALL_TRIVIA_CATEGORIES,
  TRIVIA_CATEGORY_LABEL,
  type TriviaQuestion,
  type TriviaCategory,
  type TriviaDifficulty,
  type TriviaLang,
  COUNTRY_INFO,
} from "@/features/data/triviaData";
import { addGlobalXp, progressQuest } from "@/lib/xpStore";
import { trackAnalyticsEvent } from "@/lib/analytics";
import { playGameSound } from "@/lib/audioUtils";
import {
  getTimeByPreset,
  TIME_PRESET_LABEL,
  TimePreset,
} from "@/lib/gameSessionConfig";

/* ── Constants ── */
const SESSION_ROUND_LIMIT = 10;
const BASE_POINTS = 100;
const TIME_BONUS_MULTIPLIER = 3;
const DIFFICULTY_MULTIPLIER: Record<TriviaDifficulty, number> = {
  easy: 1,
  medium: 1.3,
  hard: 1.6,
};
const ROUND_TIME_SECONDS: Record<TriviaDifficulty, number> = {
  easy: 30,
  medium: 25,
  hard: 20,
};
const DIFFICULTY_ORDER: TriviaDifficulty[] = ["easy", "medium", "hard"];
const DIFFICULTY_LABEL: Record<TriviaDifficulty, { en: string; es: string }> = {
  easy: { en: "Easy", es: "Fácil" },
  medium: { en: "Medium", es: "Medio" },
  hard: { en: "Hard", es: "Difícil" },
};

const OPTION_LETTERS = ["A", "B", "C", "D"];
const OPTION_COLORS_IDLE = [
  "border-blue-500/30 bg-blue-500/5 hover:bg-blue-500/15",
  "border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/15",
  "border-amber-500/30 bg-amber-500/5 hover:bg-amber-500/15",
  "border-purple-500/30 bg-purple-500/5 hover:bg-purple-500/15",
];
const OPTION_LETTER_COLORS = [
  "bg-blue-500/20 text-blue-400",
  "bg-emerald-500/20 text-emerald-400",
  "bg-amber-500/20 text-amber-400",
  "bg-purple-500/20 text-purple-400",
];

/* ── Helpers ── */
const shuffleArray = <T,>(arr: T[]): T[] => {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const TriviaGameView: React.FC = () => {
  /* ── Setup state ── */
  const [lang, setLang] = useState<TriviaLang>("es");
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    TriviaDifficulty | "mixed"
  >("mixed");
  const [selectedCategories, setSelectedCategories] = useState<
    Set<TriviaCategory>
  >(new Set(ALL_TRIVIA_CATEGORIES));
  const [timePreset, setTimePreset] = useState<TimePreset>("normal");
  const [hasStarted, setHasStarted] = useState(false);

  /* ── Game state ── */
  const [roundIndex, setRoundIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [lastRoundPoints, setLastRoundPoints] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [timeoutReached, setTimeoutReached] = useState(false);
  const sessionStartTime = useRef(Date.now());

  /* ── Build rounds ── */
  const rounds = useMemo(() => {
    let pool = triviaQuestions.filter((q) =>
      selectedCategories.has(q.category),
    );
    if (selectedDifficulty !== "mixed") {
      const filtered = pool.filter((q) => q.difficulty === selectedDifficulty);
      if (filtered.length > 0) pool = filtered;
    }
    return shuffleArray(pool).slice(0, SESSION_ROUND_LIMIT);
  }, [selectedCategories, selectedDifficulty]);

  const round: TriviaQuestion | undefined = rounds[roundIndex];
  const effectiveDifficulty = round?.difficulty ?? "medium";
  const baseRoundTime = ROUND_TIME_SECONDS[effectiveDifficulty];
  const roundTime = getTimeByPreset(baseRoundTime, timePreset);
  const multiplier = DIFFICULTY_MULTIPLIER[effectiveDifficulty];

  /* ── Category toggle ── */
  const toggleCategory = (cat: TriviaCategory) => {
    setSelectedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) {
        if (next.size > 1) next.delete(cat);
      } else {
        next.add(cat);
      }
      return next;
    });
  };

  const toggleAllCategories = () => {
    if (selectedCategories.size === ALL_TRIVIA_CATEGORIES.length) {
      setSelectedCategories(new Set([ALL_TRIVIA_CATEGORIES[0]]));
    } else {
      setSelectedCategories(new Set(ALL_TRIVIA_CATEGORIES));
    }
  };

  /* ── Start session ── */
  const startSession = useCallback(() => {
    sessionStartTime.current = Date.now();
    setHasStarted(true);
    setRoundIndex(0);
    setSelectedOption(null);
    setSubmitted(false);
    setCorrectCount(0);
    setTotalScore(0);
    setLastRoundPoints(0);
    setTimeLeft(roundTime);
    setTimeoutReached(false);
    trackAnalyticsEvent("session_start", {
      game: "trivia_quiz",
      lang,
      difficulty: selectedDifficulty,
      categories: Array.from(selectedCategories),
    });
  }, [lang, selectedDifficulty, selectedCategories, roundTime]);

  /* ── Timer ── */
  useEffect(() => {
    if (!hasStarted || submitted || !round) return;
    setTimeLeft(roundTime);
  }, [hasStarted, roundIndex, roundTime, round]);

  useEffect(() => {
    if (!hasStarted || submitted || !round) return;
    const timerId = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(timerId);
          if (prev === 1) playGameSound("timeout");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(timerId);
  }, [hasStarted, submitted, roundIndex, round]);

  /* ── Timeout handler ── */
  useEffect(() => {
    if (!hasStarted || submitted || timeLeft !== 0 || !round) return;
    setSubmitted(true);
    setTimeoutReached(true);
    setLastRoundPoints(0);
    trackAnalyticsEvent("item_wrong", {
      game: "trivia_quiz",
      question: round.id,
      errorType: "timeout",
    });
  }, [hasStarted, submitted, timeLeft, round]);

  /* ── Select option ── */
  const handleSelectOption = (index: number) => {
    if (submitted || !round) return;
    setSelectedOption(index);
    setSubmitted(true);
    setTimeoutReached(false);

    const isCorrect = index === round.correctIndex;
    if (isCorrect) {
      playGameSound("correct");
      const pts = Math.round(
        BASE_POINTS * multiplier +
          timeLeft * TIME_BONUS_MULTIPLIER * multiplier,
      );
      setCorrectCount((p) => p + 1);
      setLastRoundPoints(pts);
      setTotalScore((p) => p + pts);
      progressQuest("correct_answers", 1, "any");
      trackAnalyticsEvent("item_correct", {
        game: "trivia_quiz",
        question: round.id,
      });
    } else {
      playGameSound("wrong");
      setLastRoundPoints(0);
      trackAnalyticsEvent("item_wrong", {
        game: "trivia_quiz",
        question: round.id,
        errorType: "wrong_answer",
      });
    }
  };

  /* ── Next / Restart ── */
  const handleNextRound = () => {
    if (roundIndex >= rounds.length - 1) return;
    setRoundIndex((p) => p + 1);
    setSelectedOption(null);
    setSubmitted(false);
    setTimeoutReached(false);
    setLastRoundPoints(0);
  };

  const handleRestart = () => {
    trackAnalyticsEvent("session_end", {
      game: "trivia_quiz",
      duration: Math.round((Date.now() - sessionStartTime.current) / 1000),
    });
    sessionStartTime.current = Date.now();
    trackAnalyticsEvent("session_start", { game: "trivia_quiz" });
    setRoundIndex(0);
    setSelectedOption(null);
    setSubmitted(false);
    setCorrectCount(0);
    setTimeLeft(roundTime);
    setTotalScore(0);
    setLastRoundPoints(0);
    setTimeoutReached(false);
  };

  const isComplete = roundIndex === rounds.length - 1 && submitted;

  /* ── XP on complete ── */
  useEffect(() => {
    if (hasStarted && isComplete) {
      trackAnalyticsEvent("session_end", {
        game: "trivia_quiz",
        duration: Math.round((Date.now() - sessionStartTime.current) / 1000),
      });
    }
  }, [hasStarted, isComplete]);

  useEffect(() => {
    if (isComplete && totalScore > 0) {
      addGlobalXp(totalScore);
      progressQuest("play_game", 1, "any");
      progressQuest("play_game", 1, "trivia");
    }
  }, [isComplete, totalScore]);

  /* ── Localized helpers ── */
  const t = (en: string, es: string) => (lang === "en" ? en : es);
  const qText = round
    ? lang === "en"
      ? round.question_en
      : round.question_es
    : "";
  const qOptions = round
    ? lang === "en"
      ? round.options_en
      : round.options_es
    : [];
  const qExplanation = round
    ? lang === "en"
      ? round.explanation_en
      : round.explanation_es
    : undefined;
  const qFunFact = round
    ? lang === "en"
      ? round.funFact_en
      : round.funFact_es
    : undefined;
  const categoryLabel = round
    ? `${TRIVIA_CATEGORY_LABEL[round.category].emoji} ${lang === "en" ? TRIVIA_CATEGORY_LABEL[round.category].en : TRIVIA_CATEGORY_LABEL[round.category].es}`
    : "";

  if (!round && hasStarted) return null;

  /* ── Start Screen ── */
  const startScreen = (
    <GameStartPanel
      title={t("🧠 Trivia Quiz", "🧠 Trivia Quiz")}
      description={t(
        "Test your general knowledge in English or Spanish!",
        "¡Pon a prueba tu cultura general en inglés o español!",
      )}
      onStart={startSession}
      startLabel={t("Start Quiz!", "¡Comenzar Quiz!")}
    >
      {/* Language Toggle */}
      <div className="space-y-3">
        <p className="text-xs font-bold uppercase tracking-widest text-text-muted">
          {t("Language", "Idioma")}
        </p>
        <div className="flex justify-center gap-2">
          <Button
            size="sm"
            variant={lang === "es" ? "primary" : "secondary"}
            onClick={() => setLang("es")}
          >
            🇪🇸 Español
          </Button>
          <Button
            size="sm"
            variant={lang === "en" ? "primary" : "secondary"}
            onClick={() => setLang("en")}
          >
            🇬🇧 English
          </Button>
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <p className="text-xs font-bold uppercase tracking-widest text-text-muted">
          {t("Categories", "Categorías")}
        </p>
        <div className="flex justify-center flex-wrap gap-2">
          <Button
            size="sm"
            variant={
              selectedCategories.size === ALL_TRIVIA_CATEGORIES.length
                ? "primary"
                : "secondary"
            }
            onClick={toggleAllCategories}
          >
            {t("All", "Todas")}
          </Button>
          {ALL_TRIVIA_CATEGORIES.map((cat) => (
            <Button
              key={cat}
              size="sm"
              variant={selectedCategories.has(cat) ? "primary" : "secondary"}
              onClick={() => toggleCategory(cat)}
            >
              {TRIVIA_CATEGORY_LABEL[cat].emoji}{" "}
              {lang === "en"
                ? TRIVIA_CATEGORY_LABEL[cat].en
                : TRIVIA_CATEGORY_LABEL[cat].es}
            </Button>
          ))}
        </div>
      </div>

      {/* Difficulty */}
      <div className="space-y-3">
        <p className="text-xs font-bold uppercase tracking-widest text-text-muted">
          {t("Difficulty", "Dificultad")}
        </p>
        <div className="flex justify-center flex-wrap gap-2">
          <Button
            size="sm"
            variant={selectedDifficulty === "mixed" ? "primary" : "secondary"}
            onClick={() => setSelectedDifficulty("mixed")}
          >
            {t("Mixed", "Mixta")}
          </Button>
          {DIFFICULTY_ORDER.map((d) => (
            <Button
              key={d}
              size="sm"
              variant={selectedDifficulty === d ? "primary" : "secondary"}
              onClick={() => setSelectedDifficulty(d)}
            >
              {lang === "en" ? DIFFICULTY_LABEL[d].en : DIFFICULTY_LABEL[d].es}
            </Button>
          ))}
        </div>
      </div>

      {/* Time */}
      <div className="space-y-3">
        <p className="text-xs font-bold uppercase tracking-widest text-text-muted">
          {t("Time Pace", "Ritmo de tiempo")}
        </p>
        <div className="flex justify-center flex-wrap gap-2">
          {(Object.keys(TIME_PRESET_LABEL) as TimePreset[]).map((preset) => (
            <Button
              key={`time-${preset}`}
              size="sm"
              variant={timePreset === preset ? "primary" : "secondary"}
              onClick={() => setTimePreset(preset)}
            >
              {TIME_PRESET_LABEL[preset]}
            </Button>
          ))}
        </div>
      </div>
    </GameStartPanel>
  );

  /* ── Render ── */
  const isCorrect = submitted && selectedOption === round?.correctIndex;

  return (
    <GameShell
      hasStarted={hasStarted}
      startScreen={startScreen}
      contentKey={isComplete ? "summary" : "active"}
    >
      {/* HUD */}
      <GameHudCard
        title={t("Trivia Quiz", "Trivia Quiz")}
        description={t(
          "Choose the correct answer before time runs out!",
          "¡Elige la respuesta correcta antes de que se acabe el tiempo!",
        )}
        meta={
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs text-text-muted">{categoryLabel}</span>
            <span className="text-xs text-text-muted">
              {t("Difficulty", "Dificultad")}:{" "}
              {lang === "en"
                ? DIFFICULTY_LABEL[effectiveDifficulty].en
                : DIFFICULTY_LABEL[effectiveDifficulty].es}
            </span>
            {/* inline language toggle */}
            <button
              onClick={() => setLang(lang === "en" ? "es" : "en")}
              className="text-xs px-2 py-0.5 rounded-full border border-border bg-surface-2 text-text-secondary hover:bg-surface-hover transition-colors"
            >
              {lang === "en" ? "🇬🇧 EN" : "🇪🇸 ES"}
            </button>
          </div>
        }
        timeLeft={timeLeft}
        roundTime={roundTime}
        status={`${t("Round", "Ronda")} ${roundIndex + 1} / ${rounds.length}`}
      />

      {/* Question Card */}
      <Card className="space-y-5">
        <div className="rounded-xl border border-border bg-surface-2 px-5 py-4">
          <p className="text-lg font-bold text-text-primary leading-relaxed">
            {qText}
          </p>
        </div>

        {/* Options */}
        <div className="grid gap-3">
          {qOptions.map((option, index) => {
            const isSelected = selectedOption === index;
            const isAnswer = index === round?.correctIndex;

            let optionClasses = `${OPTION_COLORS_IDLE[index]} cursor-pointer`;
            if (submitted) {
              optionClasses =
                "cursor-default opacity-40 border-border bg-surface-1";
              if (isAnswer) {
                optionClasses =
                  "border-success/60 bg-success/10 text-success opacity-100 ring-2 ring-success/30";
              }
              if (isSelected && !isAnswer) {
                optionClasses =
                  "border-red-500/60 bg-red-500/10 text-red-400 opacity-100 line-through";
              }
            }

            return (
              <button
                key={index}
                onClick={() => handleSelectOption(index)}
                disabled={submitted}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl border text-left transition-all ${optionClasses}`}
              >
                <span
                  className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black ${
                    submitted && isAnswer
                      ? "bg-success/20 text-success"
                      : submitted && isSelected
                        ? "bg-red-500/20 text-red-400"
                        : OPTION_LETTER_COLORS[index]
                  }`}
                >
                  {OPTION_LETTERS[index]}
                </span>
                <span className="text-sm font-medium text-text-primary">
                  {option}
                </span>
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {submitted && (
          <div
            className={`rounded-xl border px-4 py-3 text-sm font-semibold ${
              isCorrect
                ? "border-success/40 bg-success/10 text-success"
                : "border-amber-500/40 bg-amber-500/10 text-amber-400"
            }`}
          >
            {isCorrect ? (
              <div className="space-y-1">
                <p>✅ {t("Correct!", "¡Correcto!")}</p>
                <p className="text-xs font-black uppercase tracking-widest">
                  +{lastRoundPoints} pts
                </p>
                {qExplanation && (
                  <p className="text-xs font-normal text-text-primary mt-2 opacity-90 border-t border-success/20 pt-2">
                    {qExplanation}
                  </p>
                )}
                {qFunFact && (
                  <p className="text-xs font-normal text-text-secondary mt-1 italic">
                    💡 {qFunFact}
                  </p>
                )}
              </div>
            ) : timeoutReached ? (
              <div className="space-y-1">
                <p>⏰ {t("Time's up!", "¡Tiempo agotado!")}</p>
                <p className="text-xs font-normal text-text-primary mt-1">
                  {t("Correct answer", "Respuesta correcta")}:{" "}
                  <strong>{round ? qOptions[round.correctIndex] : ""}</strong>
                </p>
                {qExplanation && (
                  <p className="text-xs font-normal text-text-primary mt-2 opacity-90 border-t border-amber-500/20 pt-2">
                    {qExplanation}
                  </p>
                )}
              </div>
            ) : (
              <div className="space-y-1">
                <p>❌ {t("Incorrect!", "¡Incorrecto!")}</p>
                <p className="text-xs font-normal text-text-primary mt-1">
                  {t("Correct answer", "Respuesta correcta")}:{" "}
                  <strong>{round ? qOptions[round.correctIndex] : ""}</strong>
                </p>
                {qExplanation && (
                  <p className="text-xs font-normal text-text-primary mt-2 opacity-90 border-t border-amber-500/20 pt-2">
                    {qExplanation}
                  </p>
                )}
                {qFunFact && (
                  <p className="text-xs font-normal text-text-secondary mt-1 italic">
                    💡 {qFunFact}
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-3">
          {submitted && !isComplete && (
            <Button onClick={handleNextRound} variant="success" size="lg">
              {t("Next Question", "Siguiente Pregunta")}
            </Button>
          )}
          {isComplete && (
            <Button onClick={handleRestart} variant="success" size="lg">
              {t("Play Again", "Jugar de nuevo")}
            </Button>
          )}
        </div>
      </Card>

      {/* Country Map (geography questions with countryCode) */}
      {submitted && round?.countryCode && COUNTRY_INFO[round.countryCode] && (
        <CountryMapCard
          country={COUNTRY_INFO[round.countryCode]}
          countryCode={round.countryCode}
          lang={lang}
        />
      )}

      {/* Score Card / Summary */}
      <Card>
        {isComplete ? (
          <div className="text-center space-y-6 animate-fade-in py-4">
            {(() => {
              const percentage = correctCount / rounds.length;
              let grade = "D";
              let gradeColor = "text-slate-400";
              let message = t("Keep learning!", "¡Sigue aprendiendo!");
              if (percentage >= 0.9) {
                grade = "S";
                gradeColor = "text-fuchsia-400";
                message = t("Genius Level!", "¡Nivel Genio!");
              } else if (percentage >= 0.75) {
                grade = "A";
                gradeColor = "text-emerald-400";
                message = t("Brilliant!", "¡Brillante!");
              } else if (percentage >= 0.5) {
                grade = "B";
                gradeColor = "text-sky-400";
                message = t("Good knowledge!", "¡Buen conocimiento!");
              } else if (percentage >= 0.25) {
                grade = "C";
                gradeColor = "text-amber-400";
                message = t("Nice try!", "¡Buen intento!");
              }

              return (
                <>
                  <div>
                    <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-fuchsia-400 mb-1">
                      {t("Quiz Completed", "Quiz Completado")}
                    </h2>
                    <p className="text-text-secondary">{message}</p>
                  </div>

                  <div className="flex justify-center items-center py-2">
                    <div className="text-center">
                      <div className="text-xs font-bold text-text-muted uppercase tracking-widest mb-1">
                        {t("Grade", "Evaluación")}
                      </div>
                      <div
                        className={`text-6xl font-black ${gradeColor} drop-shadow-lg animate-bounce`}
                      >
                        {grade}
                      </div>
                    </div>
                  </div>
                </>
              );
            })()}

            <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
              <div className="bg-surface-2 p-3 rounded-xl border border-border">
                <div className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-1">
                  {t("Final Score", "Score Final")}
                </div>
                <div className="text-2xl font-black text-success-hover">
                  {totalScore}
                </div>
              </div>
              <div className="bg-surface-2 p-3 rounded-xl border border-border">
                <div className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-1">
                  {t("Correct Answers", "Respuestas Correctas")}
                </div>
                <div className="text-2xl font-black text-accent-hover">
                  {correctCount}/{rounds.length}
                </div>
              </div>
            </div>
            <DailySessionInsights className="mt-4 text-left" />
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-sm text-text-secondary">
              {t("Score", "Score")}:{" "}
              <span className="font-black text-text-primary">{totalScore}</span>{" "}
              pts
            </p>
            <p className="text-sm text-text-secondary">
              {t("Correct", "Correctas")}:{" "}
              <span className="font-black text-text-primary">
                {correctCount}
              </span>{" "}
              / {roundIndex + (submitted ? 1 : 0)}
            </p>
          </div>
        )}
      </Card>
    </GameShell>
  );
};

export default TriviaGameView;
