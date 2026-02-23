import React, { useEffect, useMemo, useState } from "react";
import Card from "./ui/Card";
import Button from "./ui/Button";
import {
  collocationSprintRounds,
  type CollocationSprintRound,
} from "../data/collocationSprint";

type SprintLevel = CollocationSprintRound["level"];

const LEVEL_ORDER: SprintLevel[] = ["A2", "B1", "B2", "C1"];
const ROUND_TIME_SECONDS: Record<SprintLevel, number> = {
  A2: 40,
  B1: 34,
  B2: 30,
  C1: 26,
};
const LEVEL_SCORE_MULTIPLIER: Record<SprintLevel, number> = {
  A2: 1.1,
  B1: 1.25,
  B2: 1.5,
  C1: 1.75,
};

const CollocationSprintView: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<SprintLevel>("B1");
  const [roundIndex, setRoundIndex] = useState(0);
  const [selectedVerb, setSelectedVerb] = useState("");
  const [selectedNoun, setSelectedNoun] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(ROUND_TIME_SECONDS.B1);

  const rounds = useMemo(
    () =>
      collocationSprintRounds.filter((item) => item.level === selectedLevel),
    [selectedLevel],
  );

  const round = rounds[roundIndex];
  const roundTime = ROUND_TIME_SECONDS[selectedLevel];

  useEffect(() => {
    setRoundIndex(0);
    setSelectedVerb("");
    setSelectedNoun("");
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
          return 0;
        }
        return previous - 1;
      });
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [submitted, roundIndex, round]);

  useEffect(() => {
    if (submitted || timeLeft !== 0 || !round) return;
    setSubmitted(true);
  }, [submitted, timeLeft, round]);

  if (!round) {
    return (
      <div className="flex-1 overflow-y-auto bg-background p-4 sm:p-8 pb-24 sm:pb-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <p className="text-sm text-text-secondary">No rounds available.</p>
          </Card>
        </div>
      </div>
    );
  }

  const isCorrect =
    submitted &&
    selectedVerb === round.correctVerb &&
    selectedNoun === round.correctNoun;

  const handleCheck = () => {
    if (!selectedVerb || !selectedNoun || submitted) return;
    setSubmitted(true);

    if (
      selectedVerb === round.correctVerb &&
      selectedNoun === round.correctNoun
    ) {
      const multiplier = LEVEL_SCORE_MULTIPLIER[round.level];
      const points = Math.round((90 + timeLeft * 2) * multiplier);
      setCorrectCount((previous) => previous + 1);
      setTotalScore((previous) => previous + points);
    }
  };

  const handleNext = () => {
    if (roundIndex >= rounds.length - 1) return;

    setRoundIndex((previous) => previous + 1);
    setSelectedVerb("");
    setSelectedNoun("");
    setSubmitted(false);
    setTimeLeft(roundTime);
  };

  const handleRestart = () => {
    setRoundIndex(0);
    setSelectedVerb("");
    setSelectedNoun("");
    setSubmitted(false);
    setCorrectCount(0);
    setTotalScore(0);
    setTimeLeft(roundTime);
  };

  const isComplete = roundIndex === rounds.length - 1 && submitted;

  return (
    <div className="flex-1 overflow-y-auto bg-background p-4 sm:p-8 pb-24 sm:pb-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card elevated>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-text-primary tracking-tight">
                Collocation Sprint
              </h1>
              <p className="text-text-secondary text-sm mt-1">
                Une verbo + sustantivo correcto bajo presión.
              </p>
              <div className="mt-3 flex items-center gap-2 flex-wrap">
                {LEVEL_ORDER.map((level) => (
                  <Button
                    key={level}
                    size="sm"
                    variant={selectedLevel === level ? "primary" : "secondary"}
                    onClick={() => setSelectedLevel(level)}
                    aria-label={`Set collocation level ${level}`}
                  >
                    {level}
                  </Button>
                ))}
              </div>
            </div>
            <div className="text-xs font-black uppercase tracking-widest text-amber-400">
              ⏱ {timeLeft}s
            </div>
          </div>
        </Card>

        <Card className="space-y-5">
          <p className="text-sm font-semibold text-text-primary">
            {round.prompt}
          </p>

          <div>
            <p className="text-xs uppercase tracking-widest font-bold text-text-secondary mb-2">
              Verb
            </p>
            <div className="flex flex-wrap gap-2">
              {round.verbOptions.map((verb) => (
                <Button
                  key={verb}
                  size="sm"
                  variant={selectedVerb === verb ? "primary" : "secondary"}
                  onClick={() => setSelectedVerb(verb)}
                  disabled={submitted}
                >
                  {verb}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest font-bold text-text-secondary mb-2">
              Noun
            </p>
            <div className="flex flex-wrap gap-2">
              {round.nounOptions.map((noun) => (
                <Button
                  key={noun}
                  size="sm"
                  variant={selectedNoun === noun ? "primary" : "secondary"}
                  onClick={() => setSelectedNoun(noun)}
                  disabled={submitted}
                >
                  {noun}
                </Button>
              ))}
            </div>
          </div>

          {submitted ? (
            <div
              className={`rounded-xl border px-4 py-3 text-sm font-semibold ${isCorrect ? "border-success/40 bg-success/10 text-success" : "border-amber-500/40 bg-amber-500/10 text-amber-400"}`}
            >
              {isCorrect
                ? "✅ Correct collocation."
                : `❌ Correct answer: ${round.correctVerb} ${round.correctNoun}`}
            </div>
          ) : null}

          <div className="flex flex-wrap gap-3">
            <Button
              onClick={handleCheck}
              variant="primary"
              size="lg"
              disabled={
                !selectedVerb || !selectedNoun || submitted || timeLeft === 0
              }
            >
              Check pair
            </Button>
            <Button
              onClick={() => {
                setSelectedVerb("");
                setSelectedNoun("");
              }}
              variant="secondary"
              size="lg"
              disabled={submitted || (!selectedVerb && !selectedNoun)}
            >
              Clear
            </Button>
            {submitted && !isComplete ? (
              <Button onClick={handleNext} variant="success" size="lg">
                Next round
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
          <p className="text-sm text-text-secondary">
            Score total:{" "}
            <span className="font-black text-text-primary">{totalScore}</span>{" "}
            pts
          </p>
          <p className="text-sm text-text-secondary mt-1">
            Aciertos:{" "}
            <span className="font-black text-text-primary">{correctCount}</span>{" "}
            / {roundIndex + (submitted ? 1 : 0)}
          </p>
        </Card>
      </div>
    </div>
  );
};

export default CollocationSprintView;
