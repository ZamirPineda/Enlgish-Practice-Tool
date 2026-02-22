import React, { useState, useMemo } from "react";
import LatexRenderer from "./LatexRenderer";
import {
  calculusTopic,
  geometryTopic,
  algebraTopic,
  solvedExamples,
} from "../data/math";
import { MathTopic, SolvedProblem } from "../types";

type MathTab = "calculus" | "geometry" | "algebra" | "examples";

import MathFlashCard from "./MathFlashCard";

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
  const [activeTab, setActiveTab] = useState<MathTab>("calculus");
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
        <div className="text-center py-12 bg-slate-800/50 rounded-2xl border border-slate-700 border-dashed">
          <p className="text-slate-400">
            No formulas found matching "{searchQuery}"
          </p>
        </div>
      );
    }

    return (
      <>
        <div className="text-center mb-6">
          <p className="text-slate-400 text-xs md:text-sm">
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
                    className={`px-4 py-2 rounded-full text-sm font-bold border ${colorClass.replace("text-", "border-")} hover:bg-slate-800 transition-all flex items-center gap-2`}
                  >
                    <span>⚡</span> {item.strategy.name}
                  </button>
                ))}
              {topic.sections.every((s) => !s.studyStrategies) && (
                <p className="text-slate-500 italic text-sm">
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
                className="bg-slate-800/50 rounded-2xl border border-slate-700 overflow-hidden shadow-lg mb-8 transition-all hover:border-slate-600"
              >
                <div className="bg-slate-800/80 px-5 py-4 border-b border-slate-700 flex items-center gap-3">
                  <div
                    className={`w-2 h-6 rounded-full ${colorClass.replace("text-", "bg-")}`}
                  ></div>
                  <h3 className={`font-black text-xl ${colorClass}`}>
                    {section.title}
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm md:text-base border-collapse">
                    <thead className="bg-slate-900/80 text-slate-400 font-bold text-xs uppercase tracking-wider">
                      <tr>
                        {section.headers.map((h, i) => (
                          <th
                            key={i}
                            className="p-4 border-b border-slate-700 min-w-[120px] whitespace-nowrap first:min-w-[100px]"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/50">
                      {section.rows.map((row, rIdx) => (
                        <tr
                          key={rIdx}
                          className="hover:bg-slate-700/40 transition-colors group"
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
                                className={`p-4 text-slate-200 relative ${cIdx === 0 ? "font-bold " + colorClass.replace("400", "200") : "font-mono"}`}
                              >
                                <div className="flex items-center justify-between gap-4">
                                  <div
                                    className={
                                      isFormula
                                        ? "bg-slate-900/50 px-3 py-3 rounded-lg border border-slate-700/50 inline-block overflow-visible"
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
                                      className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-500 hover:text-white hover:bg-slate-600 rounded-md transition-all"
                                      title="Copy LaTeX"
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
              <div className="flex flex-col items-center justify-center py-20 text-slate-500">
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
        <p className="text-slate-400 text-xs md:text-sm">
          Problemas resueltos paso a paso para entender la lógica.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {examples.map((ex, idx) => (
          <div
            key={idx}
            className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden shadow-lg flex flex-col"
          >
            <div className="bg-slate-800/80 px-4 py-3 border-b border-slate-700 flex justify-between items-center">
              <h3 className="font-bold text-amber-400 text-base">{ex.title}</h3>
            </div>
            <div className="p-4 bg-slate-900/30 flex-1">
              <div className="mb-4 text-center">
                <div className="text-lg font-mono text-white bg-slate-700 px-3 py-1 rounded-md inline-block">
                  <LatexRenderer formula={ex.problem} block />
                </div>
                <p className="text-slate-400 text-sm mt-2 italic">
                  {ex.description}
                </p>
              </div>
              <div className="space-y-3">
                {ex.steps.map((step, sIdx) => (
                  <div
                    key={sIdx}
                    className="text-sm border-l-2 border-slate-600 pl-3"
                  >
                    <p className="text-amber-200/80 font-semibold mb-1">
                      Paso {sIdx + 1}:
                    </p>
                    <p className="text-slate-300 mb-1">{step.explanation}</p>
                    <div className="text-sky-300 font-mono bg-slate-800/50 p-1 rounded inline-block">
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
      <div className="flex-1 flex flex-col h-full bg-slate-900">
        <MathFlashCard
          strategy={selectedStrategy.strategy}
          rows={selectedStrategy.rows}
          onExit={() => setSelectedStrategy(null)}
        />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-900">
      {/* Header with Tabs */}
      <div className="flex-shrink-0 bg-slate-900 border-b border-slate-700/50 p-4 text-center">
        <div className="flex items-center justify-center relative mb-4">
          <h2 className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500 font-mono tracking-tight">
            FORMULARIO MATEMÁTICO
          </h2>

          {/* Toggle Switch */}
          <div className="absolute right-0 top-0 md:top-1/2 md:-translate-y-1/2 flex items-center gap-2">
            <span
              className={`text-xs font-bold ${isStudyMode ? "text-slate-400" : "text-white"}`}
            >
              Leer
            </span>

            <button
              onClick={() => {
                setIsStudyMode(!isStudyMode);
                setSelectedStrategy(null);
              }}
              className={`w-12 h-6 rounded-full transition-colors flex items-center px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-500 ${isStudyMode ? "bg-amber-500" : "bg-slate-700"}`}
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
              className={`text-xs font-bold ${isStudyMode ? "text-amber-400" : "text-slate-400"}`}
            >
              Practicar
            </span>
          </div>
        </div>

        <div className="flex justify-center gap-4 overflow-x-auto pb-2 md:pb-0">
          <button
            onClick={() => setActiveTab("calculus")}
            className={`px-4 py-2 rounded-lg font-bold text-sm transition-all whitespace-nowrap ${
              activeTab === "calculus"
                ? "bg-sky-600 text-white shadow-lg shadow-sky-900/50"
                : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white"
            }`}
          >
            ∫ Cálculo
          </button>
          <button
            onClick={() => setActiveTab("geometry")}
            className={`px-4 py-2 rounded-lg font-bold text-sm transition-all whitespace-nowrap ${
              activeTab === "geometry"
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/50"
                : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white"
            }`}
          >
            📐 Geometría
          </button>
          <button
            onClick={() => setActiveTab("algebra")}
            className={`px-4 py-2 rounded-lg font-bold text-sm transition-all whitespace-nowrap ${
              activeTab === "algebra"
                ? "bg-violet-600 text-white shadow-lg shadow-violet-900/50"
                : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white"
            }`}
          >
            🧮 Álgebra
          </button>
          <button
            onClick={() => setActiveTab("examples")}
            className={`px-4 py-2 rounded-lg font-bold text-sm transition-all whitespace-nowrap ${
              activeTab === "examples"
                ? "bg-amber-500 text-white shadow-lg shadow-amber-900/50"
                : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white"
            }`}
          >
            💡 Ejemplos
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Quick Navigation Sidebar (Desktop only) */}
        {!isStudyMode && activeTab !== "examples" && (
          <div className="hidden lg:block w-64 bg-slate-900/80 border-r border-slate-800 p-4 overflow-y-auto">
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">
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
                  className="w-full text-left px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors truncate"
                >
                  {section.title}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-8 pb-20 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
          {/* Search Bar */}
          {!isStudyMode && activeTab !== "examples" && (
            <div className="relative max-w-2xl mx-auto mb-8">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <SearchIcon />
              </div>
              <input
                type="text"
                placeholder="Search formulas, names, or symbols..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all shadow-inner"
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
                <div className="text-center py-20 text-slate-500">
                  <p>
                    El modo práctica para ejemplos completos estará disponible
                    pronto.
                  </p>
                  <button
                    onClick={() => setIsStudyMode(false)}
                    className="mt-4 text-sky-400 underline"
                  >
                    Volver a modo lectura
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MathView;
