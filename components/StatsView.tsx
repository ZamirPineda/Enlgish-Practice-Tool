import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { SrsVocabularyItem } from "../types";
import { calculateStatsMetrics, VaultProgress } from "../utils/statsMetrics";
import Heatmap from "./Heatmap";

const VAULT_DECK_KEY = "vocab-vault-deck";
const VAULT_PROGRESS_KEY = "vocab-vault-progress";

const DEFAULT_PROGRESS: VaultProgress = {
  currentStreak: 0,
  bestStreak: 0,
  totalReviews: 0,
  lastReviewDate: null,
};

const readJson = <T,>(key: string, fallback: T): T => {
  const value = localStorage.getItem(key);
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
};

const StatsView: React.FC = () => {
  const [deck] = useState<Record<string, SrsVocabularyItem>>(() =>
    readJson<Record<string, SrsVocabularyItem>>(VAULT_DECK_KEY, {}),
  );
  const [progress] = useState<VaultProgress>(() =>
    readJson<VaultProgress>(VAULT_PROGRESS_KEY, DEFAULT_PROGRESS),
  );

  const metrics = useMemo(
    () => calculateStatsMetrics(deck, { ...DEFAULT_PROGRESS, ...progress }),
    [deck, progress],
  );

  return (
    <div className="flex-1 overflow-y-auto bg-slate-900 p-4 sm:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-4xl font-black text-white tracking-tight">Stats</h1>
        {metrics.totalCards === 0 && (
          <section className="bg-slate-800 border border-slate-700 rounded-2xl p-5">
            <h2 className="text-white text-xl font-black mb-2">No data yet</h2>
            <p className="text-slate-300 mb-4">
              Start your first review session in Vault to unlock your stats.
            </p>
            <Link
              to="/vault"
              className="inline-flex px-4 py-2 rounded-lg bg-sky-500 text-slate-900 text-sm font-black"
            >
              Start first session
            </Link>
          </section>
        )}

        {metrics.totalCards > 0 && (
          <>
            <section
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              aria-label="Resumen de progreso"
            >
              <article className="bg-slate-800 border border-slate-700 rounded-2xl p-5">
                <h2 className="text-sm uppercase text-slate-400 font-bold mb-2">
                  Streak
                </h2>
                <p className="text-white text-lg">
                  Actual: {metrics.currentStreak}
                </p>
                <p className="text-white text-lg">
                  Mejor: {metrics.bestStreak}
                </p>
              </article>

              <article className="bg-slate-800 border border-slate-700 rounded-2xl p-5">
                <h2 className="text-sm uppercase text-slate-400 font-bold mb-2">
                  Cards
                </h2>
                <p className="text-white text-lg">
                  Totales: {metrics.totalCards}
                </p>
                <p className="text-white text-lg">
                  Aprendidas: {metrics.learnedCards}
                </p>
                <p className="text-white text-lg">
                  Pendientes: {metrics.pendingCards}
                </p>
              </article>
            </section>

            <section className="bg-slate-800 border border-slate-700 rounded-2xl p-5">
              <h2 className="text-sm uppercase text-slate-400 font-bold mb-2">
                Accuracy
              </h2>
              <p className="text-white text-lg mb-3">
                Global: {metrics.globalAccuracy}%
              </p>
              {metrics.categoryAccuracy.length === 0 ? (
                <p className="text-slate-300">Sin datos por categoría.</p>
              ) : (
                <ul className="space-y-1" aria-label="Accuracy por categoría">
                  {metrics.categoryAccuracy.map((item) => (
                    <li key={item.category} className="text-slate-200">
                      {item.category}: {item.accuracy}% ({item.totalCards})
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <section className="bg-slate-800 border border-slate-700 rounded-2xl p-5">
              <h2 className="text-sm uppercase text-slate-400 font-bold mb-2">
                Tiempo de estudio estimado
              </h2>
              <p className="text-white text-lg">
                {metrics.estimatedStudyMinutes === null
                  ? "No disponible (faltan timestamps)."
                  : `${metrics.estimatedStudyMinutes} min`}
              </p>
            </section>

            <Heatmap
              deck={deck}
              progress={{ ...DEFAULT_PROGRESS, ...progress }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default StatsView;
