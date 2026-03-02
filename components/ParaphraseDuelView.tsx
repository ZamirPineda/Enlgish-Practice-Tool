import React, { useRef, useEffect, useMemo, useState } from "react";
import Card from "./ui/Card";
import Button from "./ui/Button";
import {
  paraphraseDuelRounds,
  type ParaphraseDuelRound,
} from "../data/paraphraseDuel";
import { addGlobalXp, progressQuest } from "../utils/xpStore";
import { trackAnalyticsEvent } from "../utils/analytics";
import { playGameSound } from "../utils/audioUtils";
import { Plus } from "lucide-react";

type DuelLevel = ParaphraseDuelRound["level"];

const LEVEL_ORDER: DuelLevel[] = ["A2", "B1", "B2", "C1"];
const ROUND_TIME_SECONDS: Record<DuelLevel, number> = {
  A2: 45,
  B1: 38,
  B2: 32,
  C1: 28,
};
const LEVEL_SCORE_MULTIPLIER: Record<DuelLevel, number> = {
  A2: 1.1,
  B1: 1.25,
  B2: 1.5,
  C1: 1.75,
};

const normalizeText = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9'\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const getTokenSimilarity = (left: string, right: string): number => {
  const leftTokens = new Set(normalizeText(left).split(" ").filter(Boolean));
  const rightTokens = new Set(normalizeText(right).split(" ").filter(Boolean));

  if (leftTokens.size === 0 || rightTokens.size === 0) {
    return 0;
  }

  let common = 0;
  leftTokens.forEach((token) => {
    if (rightTokens.has(token)) {
      common += 1;
    }
  });

  return (2 * common) / (leftTokens.size + rightTokens.size);
};

const ParaphraseDuelView: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<DuelLevel>("B1");
  const [roundIndex, setRoundIndex] = useState(0);
  const sessionStartTime = useRef<number>(Date.now());
  useEffect(() => {
    trackAnalyticsEvent("session_start", { game: "paraphrase_duel" });
  }, []);
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(ROUND_TIME_SECONDS.B1);
  const [totalScore, setTotalScore] = useState(0);

  const rounds = useMemo(() => {
    const levelRounds = paraphraseDuelRounds.filter(
      (item) => item.level === selectedLevel,
    );
    // Simple Fisher-Yates shuffle for replayability
    const shuffled = [...levelRounds];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, [selectedLevel]);

  const round = rounds[roundIndex];
  const roundTime = ROUND_TIME_SECONDS[selectedLevel];

  useEffect(() => {
    setRoundIndex(0);
    setAnswer("");
    setSubmitted(false);
    setCorrectCount(0);
    setTotalScore(0);
    setTimeLeft(roundTime);
  }, [selectedLevel, roundTime]);

  useEffect(() => {
    if (submitted || !round) return;

    const timerId = window.setInterval(() => {
      setTimeLeft((previous) => {
        if (previous <= 1) {
          window.clearInterval(timerId);
          if (previous === 1 && !submitted) {
            playGameSound("timeout");
          }
          return 0;
        }
        return previous - 1;
      });
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [submitted, roundIndex, round]);

  useEffect(() => {
    if (submitted || timeLeft !== 0 || !round) return;

    trackAnalyticsEvent("item_wrong", {
      game: "paraphrase_duel",
      level: round.level,
      roundId: round.id,
      errorType: "timeout",
    });
    setSubmitted(true);
  }, [submitted, timeLeft, round]);

  if (!round) {
    return (
      <div className="flex-1 overflow-y-auto bg-background p-4 sm:p-8 pb-4 sm:pb-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <p className="text-sm text-text-secondary">No rounds available.</p>
          </Card>
        </div>
      </div>
    );
  }

  const normalizedAnswer = normalizeText(answer);
  const normalizedAccepted = round.acceptedAnswers.map(normalizeText);
  const includesConnector = normalizedAnswer.includes(
    normalizeText(round.targetConnector),
  );
  const hasCloseMeaning = round.acceptedAnswers.some(
    (accepted) => getTokenSimilarity(accepted, answer) >= 0.82,
  );
  const passesFlexibleValidation =
    includesConnector &&
    (normalizedAccepted.includes(normalizedAnswer) || hasCloseMeaning);
  const isCorrect = submitted && passesFlexibleValidation;

  const handleCheck = () => {
    if (!answer.trim() || submitted) return;

    setSubmitted(true);
    if (passesFlexibleValidation) {
      playGameSound("correct");
      const multiplier = LEVEL_SCORE_MULTIPLIER[round.level];
      const points = Math.round((100 + timeLeft * 2) * multiplier);
      setCorrectCount((previous) => previous + 1);
      setTotalScore((previous) => previous + points);
      trackAnalyticsEvent("item_correct", {
        game: "paraphrase_duel",
        level: round.level,
        roundId: round.id,
        score: points,
        usedFlexibleMatch: !normalizedAccepted.includes(normalizedAnswer),
      });
      return;
    }

    playGameSound("wrong");
    const errorType = !includesConnector
      ? "connector_missing"
      : "similarity_low";
    trackAnalyticsEvent("item_wrong", {
      game: "paraphrase_duel",
      level: round.level,
      roundId: round.id,
      errorType,
    });
  };

  const handleNext = () => {
    if (roundIndex >= rounds.length - 1) return;
    setRoundIndex((previous) => previous + 1);
    setAnswer("");
    setSubmitted(false);
    setTimeLeft(roundTime);
  };

  const handleRestart = () => {
    trackAnalyticsEvent("session_end", {
      game: "paraphrase_duel",
      duration: Math.round((Date.now() - sessionStartTime.current) / 1000),
    });
    sessionStartTime.current = Date.now();
    trackAnalyticsEvent("session_start", { game: "paraphrase_duel" });
    setRoundIndex(0);
    setAnswer("");
    setSubmitted(false);
    setCorrectCount(0);
    setTotalScore(0);
    setTimeLeft(roundTime);
  };

  const isComplete = roundIndex === rounds.length - 1 && submitted;

  useEffect(() => {
    if (isComplete) {
      trackAnalyticsEvent("session_end", {
        game: "paraphrase_duel",
        duration: Math.round((Date.now() - sessionStartTime.current) / 1000),
      });
    }
  }, [isComplete]);

  useEffect(() => {
    if (isComplete && totalScore > 0) {
      addGlobalXp(totalScore);
      progressQuest("play_game", 1, "any");
      progressQuest("play_game", 1, "paraphrase");
    }
  }, [isComplete, totalScore]);

  return (
    <div className="flex-1 overflow-y-auto bg-background p-4 sm:p-8 pb-4 sm:pb-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card elevated>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-text-primary tracking-tight">
                Paraphrase Duel
              </h1>
              <p className="text-text-secondary text-sm mt-1">
                Reescribe con el mismo significado usando el conector objetivo.
              </p>
              <div className="mt-3 flex items-center gap-2 flex-wrap">
                {LEVEL_ORDER.map((level) => (
                  <Button
                    key={level}
                    size="sm"
                    variant={selectedLevel === level ? "primary" : "secondary"}
                    onClick={() => setSelectedLevel(level)}
                    aria-label={`Set paraphrase level ${level}`}
                  >
                    {level}
                  </Button>
                ))}
              </div>
            </div>
            <div className="w-full sm:w-auto flex-1 max-w-xs">
              <div className="flex justify-between text-xs font-black uppercase tracking-widest text-amber-400 mb-1">
                <span>⏱ Tiempo</span>
                <span>{timeLeft}s</span>
              </div>
              <div className="w-full h-2 bg-surface-2 rounded-full overflow-hidden shadow-inner border border-border">
                <div
                  className={`h-full transition-all duration-1000 ease-linear rounded-full ${timeLeft <= 10 ? "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)] animate-pulse" : timeLeft <= roundTime / 2 ? "bg-amber-400" : "bg-success"}`}
                  style={{ width: `${(timeLeft / roundTime) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </Card>

        <Card className="space-y-4">
          <p className="text-xs uppercase tracking-widest font-bold text-text-secondary">
            Frase original
          </p>
          <p className="text-lg font-semibold text-text-primary">
            "{round.sentence}"
          </p>
          <p className="text-xs uppercase tracking-widest font-bold text-text-muted">
            Conector objetivo: {round.targetConnector}
          </p>

          <textarea
            value={answer}
            onChange={(event) => setAnswer(event.target.value)}
            disabled={submitted}
            className="w-full min-h-[96px] rounded-xl border border-border bg-surface-1 p-3 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-focus"
            placeholder="Write your paraphrase..."
            aria-label="Paraphrase answer"
          />

          {submitted ? (
            <div
              className={`rounded-xl border px-4 py-3 text-sm font-semibold ${isCorrect ? "border-success/40 bg-success/10 text-success" : "border-amber-500/40 bg-amber-500/10 text-amber-400"}`}
            >
              {isCorrect
                ? "✅ Correct paraphrase."
                : `❌ Keep trying. Example accepted answer: "${round.acceptedAnswers[0]}"`}
            </div>
          ) : null}

          <div className="flex flex-wrap gap-3">
            <Button
              onClick={handleCheck}
              variant="primary"
              size="lg"
              disabled={!answer.trim() || submitted || timeLeft === 0}
            >
              Check paraphrase
            </Button>
            <Button
              onClick={() => setAnswer("")}
              variant="secondary"
              size="lg"
              disabled={!answer.trim() || submitted}
            >
              Clear
            </Button>
            {submitted && !isComplete ? (
              <Button onClick={handleNext} variant="success" size="lg">
                Next round
              </Button>
            ) : null}
            {submitted && !isCorrect && round ? (
              <Button
                onClick={() => {
                  import("../utils/srs").then(({ createNewSrsItem }) => {
                    const deck = JSON.parse(
                      localStorage.getItem("vocab-vault-deck") || "{}",
                    );
                    const newId = `para-${Date.now()}`;
                    deck[newId] = createNewSrsItem(
                      `Paraphrase: ${round.sentence}`,
                      `Accepted: ${round.acceptedAnswers[0]}`,
                    );
                    localStorage.setItem(
                      "vocab-vault-deck",
                      JSON.stringify(deck),
                    );

                    import("./ui/Toast").then(({ toast }) => {
                      toast.success("Frase agregada a tu Vocabulary Vault");
                    });
                  });
                }}
                variant="secondary"
                size="md"
                title="Save this paraphrase to review later"
              >
                <Plus size={16} className="mr-1" />
                Add to Vault
              </Button>
            ) : null}
            {isComplete ? (
              <Button onClick={handleRestart} variant="success" size="lg">
                Play again
              </Button>
            ) : null}
          </div>
        </Card>

        <Card>
          {isComplete ? (
            <div className="text-center space-y-6 animate-fade-in py-4">
              {(() => {
                const percentage = correctCount / rounds.length;
                let grade = "D";
                let gradeColor = "text-slate-400";
                let message = "Keep practicing!";
                if (percentage >= 0.9) {
                  grade = "S";
                  gradeColor = "text-fuchsia-400";
                  message = "Grammar Master!";
                } else if (percentage >= 0.75) {
                  grade = "A";
                  gradeColor = "text-emerald-400";
                  message = "Great Expression!";
                } else if (percentage >= 0.5) {
                  grade = "B";
                  gradeColor = "text-sky-400";
                  message = "Solid Work!";
                } else if (percentage >= 0.25) {
                  grade = "C";
                  gradeColor = "text-amber-400";
                  message = "Good Effort!";
                }

                return (
                  <>
                    <div>
                      <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400 mb-1">
                        Sesión Completada
                      </h2>
                      <p className="text-text-secondary">{message}</p>
                    </div>

                    <div className="flex justify-center items-center py-2">
                      <div className="text-center">
                        <div className="text-xs font-bold text-text-muted uppercase tracking-widest mb-1">
                          Rango
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
                    Score Final
                  </div>
                  <div className="text-2xl font-black text-success-hover">
                    {totalScore}
                  </div>
                </div>
                <div className="bg-surface-2 p-3 rounded-xl border border-border">
                  <div className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-1">
                    Aciertos
                  </div>
                  <div className="text-2xl font-black text-accent-hover">
                    {correctCount}/{rounds.length}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-sm text-text-secondary">
                Score total:{" "}
                <span className="font-black text-text-primary">
                  {totalScore}
                </span>{" "}
                pts
              </p>
              <p className="text-sm text-text-secondary mt-1">
                Aciertos:{" "}
                <span className="font-black text-text-primary">
                  {correctCount}
                </span>{" "}
                / {roundIndex + (submitted ? 1 : 0)}
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ParaphraseDuelView;
