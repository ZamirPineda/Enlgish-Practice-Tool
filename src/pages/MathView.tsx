import React, { useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import LatexRenderer from "@/components/LatexRenderer";
import {
  calculusTopic,
  geometryTopic,
  algebraTopic,
  solvedExamples,
} from "@/features/data/math";
import { MathTopic, SolvedProblem } from "@/types";

import MathFlashCard from "@/components/MathFlashCard";
import MathGameView from "@/pages/MathGameView";

type MathTab = "calculus" | "geometry" | "algebra" | "examples" | "game";

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-slate-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

const CopyIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
    />
  </svg>
);

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4 text-emerald-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 13l4 4L19 7"
    />
  </svg>
);

const MathView: React.FC = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<MathTab>(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get("tab") as MathTab;
    return tab || "calculus";
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get("tab") as MathTab;
    if (tab) setActiveTab(tab);
  }, [location.search]);
  const [isStudyMode, setIsStudyMode] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedFormula, setCopiedFormula] = useState<string | null>(null);
  const [selectedStrategy, setSelectedStrategy] = useState<{
    strategy: any;
    rows: any[];
  } | null>(null);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedFormula(text);
      setTimeout(() => setCopiedFormula(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const filterTopic = (topic: MathTopic, query: string): MathTopic => {
    if (!query.trim()) return topic;
    const lowerQuery = query.toLowerCase();

    const filteredSections = topic.sections
      .map((section) => {
        const filteredRows = section.rows.filter((row) =>
          row.some((cell) => cell.toLowerCase().includes(lowerQuery)),
        );
        return { ...section, rows: filteredRows };
      })
      .filter((section) => section.rows.length > 0);

    return { ...topic, sections: filteredSections };
  };

  const renderTopicTable = (
    topic: MathTopic,
    colorClass: string,
    headerColor: string,
  ) => {
    const filteredTopic = filterTopic(topic, searchQuery);

    if (filteredTopic.sections.length === 0) {
      return (
        <div className="text-center py-12 bg-surface-2 rounded-2xl border border-border border-dashed">
          <p className="text-text-muted">
            No formulas found matching "{searchQuery}"
          </p>
        </div>
      );
    }

    return (
      <>
        <div className="text-center mb-6">
          <p className="text-text-muted text-xs md:text-sm">
            {topic.description}
          </p>
          {/* Available Strategies for this Topic */}
          {isStudyMode && (
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              {topic.sections
                .flatMap((section) =>
                  (section.studyStrategies || []).map((strategy) => ({
                    strategy,
                    rows: section.rows,
                  })),
                )
                .map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedStrategy(item)}
                    className={`px-4 py-2 min-h-[40px] rounded-full text-sm font-bold border ${colorClass.replace("text-", "border-")} hover:bg-surface-hover active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-focus focus-visible:outline-none transition-all flex items-center gap-2`}
                  >
                    <span>⚡</span> {item.strategy.name}
                  </button>
                ))}
              {topic.sections.every((s) => !s.studyStrategies) && (
                <p className="text-text-muted italic text-sm">
                  No hay modos de estudio disponibles para este tema aún.
                </p>
              )}
            </div>
          )}
        </div>

        {!isStudyMode
          ? // NORMAL VIEW: Tables
            filteredTopic.sections.map((section, idx) => (
              <div
                key={idx}
                id={`section-${idx}`}
                className="bg-surface-1 rounded-2xl border border-border overflow-hidden shadow-lg mb-8 transition-all hover:border-text-muted"
              >
                <div className="bg-surface-2 px-5 py-4 border-b border-border flex items-center gap-3">
                  <div
                    className={`w-2 h-6 rounded-full ${colorClass.replace("text-", "bg-")}`}
                  ></div>
                  <h3 className={`font-black text-xl ${colorClass}`}>
                    {section.title}
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm md:text-base border-collapse">
                    <thead className="bg-surface-2 text-text-muted font-bold text-xs uppercase tracking-wider">
                      <tr>
                        {section.headers.map((h, i) => (
                          <th
                            key={i}
                            className="p-4 border-b border-border min-w-[120px] whitespace-nowrap first:min-w-[100px]"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {section.rows.map((row, rIdx) => (
                        <tr
                          key={rIdx}
                          className="hover:bg-surface-hover transition-colors group"
                        >
                          {row.map((cell, cIdx) => {
                            const isFormula =
                              cell.includes("\\") ||
                              cell.includes("∫") ||
                              cell.includes("^") ||
                              cell.includes("=");
                            return (
                              <td
                                key={cIdx}
                                className={`p-4 text-text-primary relative ${cIdx === 0 ? "font-bold " + colorClass.replace("400", "200") : "font-mono"}`}
                              >
                                <div className="flex items-center justify-between gap-4">
                                  <div
                                    className={
                                      isFormula
                                        ? "bg-surface-2 px-3 py-3 rounded-lg border border-border inline-block overflow-visible"
                                        : ""
                                    }
                                  >
                                    {isFormula ? (
                                      <LatexRenderer formula={cell} />
                                    ) : (
                                      cell
                                    )}
                                  </div>
                                  {isFormula && (
                                    <button
                                      onClick={() => handleCopy(cell)}
                                      className="opacity-0 group-hover:opacity-100 p-1.5 text-text-muted hover:text-text-primary hover:bg-surface-hover rounded-md active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-focus focus-visible:outline-none transition-all"
                                      title="Copy LaTeX"
                                      aria-label="Copy LaTeX"
                                    >
                                      {copiedFormula === cell ? (
                                        <CheckIcon />
                                      ) : (
                                        <CopyIcon />
                                      )}
                                    </button>
                                  )}
                                </div>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))
          : // STUDY MODE: Placeholder if no strategy selected
            !selectedStrategy && (
              <div className="flex flex-col items-center justify-center py-20 text-text-muted">
                <div className="text-4xl mb-4">👈</div>
                <p>Selecciona una opción arriba para empezar a practicar</p>
              </div>
            )}
      </>
    );
  };

  const renderExamples = (examples: SolvedProblem[]) => (
    <>
      <div className="text-center mb-6">
        <p className="text-text-muted text-xs md:text-sm">
          Problemas resueltos paso a paso para entender la lógica.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {examples.map((ex, idx) => (
          <div
            key={idx}
            className="bg-surface-1 rounded-xl border border-border overflow-hidden shadow-lg flex flex-col"
          >
            <div className="bg-surface-2 px-4 py-3 border-b border-border flex justify-between items-center">
              <h3 className="font-bold text-amber-500 text-base">{ex.title}</h3>
            </div>
            <div className="p-4 bg-surface-1 flex-1">
              <div className="mb-4 text-center">
                <div className="text-lg font-mono text-text-primary bg-surface-2 px-3 py-1 rounded-md inline-block">
                  <LatexRenderer formula={ex.problem} block />
                </div>
                <p className="text-text-secondary text-sm mt-2 italic">
                  {ex.description}
                </p>
              </div>
              <div className="space-y-3">
                {ex.steps.map((step, sIdx) => (
                  <div
                    key={sIdx}
                    className="text-sm border-l-2 border-border pl-3"
                  >
                    <p className="text-amber-500/80 font-semibold mb-1">
                      Paso {sIdx + 1}:
                    </p>
                    <p className="text-text-secondary mb-1">
                      {step.explanation}
                    </p>
                    <div className="text-sky-500 font-mono bg-surface-2 p-1 rounded inline-block">
                      <LatexRenderer formula={step.math} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );

  if (selectedStrategy && isStudyMode) {
    return (
      <div className="flex-1 flex flex-col h-full bg-background">
        <MathFlashCard
          strategy={selectedStrategy.strategy}
          rows={selectedStrategy.rows}
          onExit={() => setSelectedStrategy(null)}
        />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-background">
      {/* Header with Tabs */}
      <div className="flex-shrink-0 bg-surface-1 border-b border-border p-4 text-center">
        <div className="flex items-center justify-center relative mb-4">
          <h2 className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500 font-mono tracking-tight">
            FORMULARIO MATEMÁTICO
          </h2>

          {/* Toggle Switch */}
          {activeTab !== "game" && (
            <div className="absolute right-0 top-0 md:top-1/2 md:-translate-y-1/2 flex items-center gap-2">
              <span
                className={`text-xs font-bold ${isStudyMode ? "text-text-muted" : "text-text-primary"}`}
              >
                Leer
              </span>

              <button
                onClick={() => {
                  setIsStudyMode(!isStudyMode);
                  setSelectedStrategy(null);
                }}
                className={`w-12 h-6 rounded-full transition-colors active:scale-[0.98] flex items-center px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-500 ${isStudyMode ? "bg-amber-500" : "bg-surface-hover"}`}
                role="switch"
                aria-checked={isStudyMode}
                aria-label="Modo práctica"
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${isStudyMode ? "translate-x-6" : "translate-x-0"}`}
                  aria-hidden="true"
                />
              </button>

              <span
                className={`text-xs font-bold ${isStudyMode ? "text-amber-500" : "text-text-muted"}`}
              >
                Practicar
              </span>
            </div>
          )}
        </div>

        <div
          className="flex justify-center gap-4 overflow-x-auto pb-2 md:pb-0"
          role="tablist"
          aria-label="Math topics"
        >
          <button
            onClick={() => setActiveTab("calculus")}
            role="tab"
            aria-selected={activeTab === "calculus"}
            className={`px-4 py-2 min-h-[40px] rounded-lg font-bold text-sm transition-all active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-focus focus-visible:outline-none whitespace-nowrap ${
              activeTab === "calculus"
                ? "bg-sky-600 text-white shadow-lg shadow-sky-900/50"
                : "bg-surface-2 text-text-muted hover:bg-surface-hover hover:text-text-primary"
            }`}
          >
            ∫ Cálculo
          </button>
          <button
            onClick={() => setActiveTab("geometry")}
            role="tab"
            aria-selected={activeTab === "geometry"}
            className={`px-4 py-2 min-h-[40px] rounded-lg font-bold text-sm transition-all active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-focus focus-visible:outline-none whitespace-nowrap ${
              activeTab === "geometry"
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/50"
                : "bg-surface-2 text-text-muted hover:bg-surface-hover hover:text-text-primary"
            }`}
          >
            📐 Geometría
          </button>
          <button
            onClick={() => setActiveTab("algebra")}
            role="tab"
            aria-selected={activeTab === "algebra"}
            className={`px-4 py-2 min-h-[40px] rounded-lg font-bold text-sm transition-all active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-focus focus-visible:outline-none whitespace-nowrap ${
              activeTab === "algebra"
                ? "bg-violet-600 text-white shadow-lg shadow-violet-900/50"
                : "bg-surface-2 text-text-muted hover:bg-surface-hover hover:text-text-primary"
            }`}
          >
            🧮 Álgebra
          </button>
          <button
            onClick={() => setActiveTab("examples")}
            role="tab"
            aria-selected={activeTab === "examples"}
            className={`px-4 py-2 min-h-[40px] rounded-lg font-bold text-sm transition-all active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-focus focus-visible:outline-none whitespace-nowrap ${
              activeTab === "examples"
                ? "bg-amber-500 text-white shadow-lg shadow-amber-900/50"
                : "bg-surface-2 text-text-muted hover:bg-surface-hover hover:text-text-primary"
            }`}
          >
            💡 Ejemplos
          </button>
          <button
            onClick={() => {
              setActiveTab("game");
              setIsStudyMode(false);
            }}
            role="tab"
            aria-selected={activeTab === "game"}
            className={`px-4 py-2 min-h-[40px] rounded-lg font-bold text-sm transition-all active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-focus focus-visible:outline-none whitespace-nowrap ${
              activeTab === "game"
                ? "bg-rose-600 text-white shadow-lg shadow-rose-900/50"
                : "bg-surface-2 text-text-muted hover:bg-surface-hover hover:text-text-primary"
            }`}
          >
            🎮 Juego
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Quick Navigation Sidebar (Desktop only) */}
        {!isStudyMode && activeTab !== "examples" && activeTab !== "game" && (
          <div className="hidden lg:block w-64 bg-surface-1 border-r border-border p-4 overflow-y-auto">
            <h3 className="text-xs font-black text-text-muted uppercase tracking-widest mb-4">
              Quick Navigation
            </h3>
            <div className="space-y-1">
              {(activeTab === "calculus"
                ? calculusTopic
                : activeTab === "geometry"
                  ? geometryTopic
                  : algebraTopic
              ).sections.map((section, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    const el = document.getElementById(`section-${idx}`);
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="w-full text-left px-3 py-2 min-h-[40px] text-sm text-text-secondary hover:text-text-primary hover:bg-surface-hover active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-focus focus-visible:outline-none rounded-lg transition-colors truncate"
                >
                  {section.title}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto overscroll-y-contain p-4 md:p-6 space-y-8 pb-4 md:pb-6 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
          {/* Search Bar */}
          {!isStudyMode && activeTab !== "examples" && activeTab !== "game" && (
            <div className="relative max-w-2xl mx-auto mb-8">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-muted">
                <SearchIcon />
              </div>
              <input
                type="text"
                placeholder="Search formulas, names, or symbols..."
                aria-label="Search math formulas"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-surface-2 border border-border rounded-2xl text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-focus focus:border-transparent transition-all shadow-inner"
              />
            </div>
          )}

          <div className="max-w-5xl mx-auto">
            {activeTab === "calculus" &&
              renderTopicTable(calculusTopic, "text-sky-400", "text-sky-200")}
            {activeTab === "geometry" &&
              renderTopicTable(
                geometryTopic,
                "text-emerald-400",
                "text-emerald-200",
              )}
            {activeTab === "algebra" &&
              renderTopicTable(
                algebraTopic,
                "text-violet-400",
                "text-violet-200",
              )}

            {activeTab === "examples" &&
              (!isStudyMode ? (
                renderExamples(solvedExamples)
              ) : (
                <div className="text-center py-20 text-text-muted">
                  <p>
                    El modo práctica para ejemplos completos estará disponible
                    pronto.
                  </p>
                  <button
                    onClick={() => setIsStudyMode(false)}
                    className="mt-4 text-accent underline rounded-md px-2 py-1 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-focus focus-visible:outline-none"
                  >
                    Volver a modo lectura
                  </button>
                </div>
              ))}

            {activeTab === "game" && <MathGameView />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MathView;
