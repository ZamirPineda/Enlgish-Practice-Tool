import React, { useState, useMemo } from "react";
import { personalPhrasesData } from "../data/personalPhrases";

interface PersonalPhrasesViewProps {
  onPlayAudio: (text: string) => void;
}

const PlayIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
      clipRule="evenodd"
    />
  </svg>
);

const BulbIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-yellow-400"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
  </svg>
);

const CopyIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
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
    className="h-5 w-5 text-green-400"
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

const EyeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
);

const EyeOffIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
    />
  </svg>
);

const PersonalPhrasesView: React.FC<PersonalPhrasesViewProps> = ({
  onPlayAudio,
}) => {
  const initialCategory =
    personalPhrasesData.length > 0 ? personalPhrasesData[0].title : null;
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(initialCategory ? [initialCategory] : []),
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [isPracticeMode, setIsPracticeMode] = useState(false);
  const [revealedScripts, setRevealedScripts] = useState<Set<string>>(
    new Set(),
  );
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const toggleCategory = (title: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(title)) {
      newExpanded.delete(title);
    } else {
      newExpanded.add(title);
    }
    setExpandedCategories(newExpanded);
  };

  const expandAll = () => {
    setExpandedCategories(new Set(personalPhrasesData.map((c) => c.title)));
  };

  const collapseAll = () => {
    setExpandedCategories(new Set());
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      setTimeout(() => setCopiedText(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const toggleReveal = (scriptId: string, type: "formal" | "casual") => {
    if (!isPracticeMode) return;
    const key = `${scriptId}-${type}`;
    const newRevealed = new Set(revealedScripts);
    if (newRevealed.has(key)) {
      newRevealed.delete(key);
    } else {
      newRevealed.add(key);
    }
    setRevealedScripts(newRevealed);
  };

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return personalPhrasesData;

    const query = searchQuery.toLowerCase();
    return personalPhrasesData
      .map((category) => {
        const filteredScripts = category.scripts.filter(
          (script) =>
            script.question.toLowerCase().includes(query) ||
            script.context.toLowerCase().includes(query) ||
            script.formal.toLowerCase().includes(query) ||
            script.casual.toLowerCase().includes(query),
        );
        return { ...category, scripts: filteredScripts };
      })
      .filter((category) => category.scripts.length > 0);
  }, [searchQuery]);

  // Auto-expand categories when searching
  React.useEffect(() => {
    if (searchQuery.trim()) {
      setExpandedCategories(new Set(filteredData.map((c) => c.title)));
    }
  }, [searchQuery, filteredData]);

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-900 text-white">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-sky-400 mb-2">
            My Personal Scripts
          </h1>
          <p className="text-slate-400">
            Customized responses for{" "}
            <span className="font-semibold text-white">Zamir Pineda</span>.
            Learn to sound like a native when talking about your own life.
          </p>
        </div>

        {/* Controls Section */}
        <div className="mb-6 space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="Search scripts, questions, or contexts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-800/50 p-3 rounded-xl border border-slate-700/50">
            <div className="flex items-center gap-2">
              <button
                onClick={expandAll}
                className="px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
              >
                Expand All
              </button>
              <button
                onClick={collapseAll}
                className="px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
              >
                Collapse All
              </button>
            </div>

            <button
              onClick={() => {
                setIsPracticeMode(!isPracticeMode);
                if (isPracticeMode) setRevealedScripts(new Set());
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                isPracticeMode
                  ? "bg-sky-500/20 text-sky-400 border border-sky-500/50"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600 border border-transparent"
              }`}
            >
              {isPracticeMode ? <EyeOffIcon /> : <EyeIcon />}
              Practice Mode {isPracticeMode ? "ON" : "OFF"}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {filteredData.length === 0 ? (
            <div className="text-center py-12 bg-slate-800/50 rounded-2xl border border-slate-700 border-dashed">
              <p className="text-slate-400">
                No scripts found matching "{searchQuery}"
              </p>
            </div>
          ) : (
            filteredData.map((category) => (
              <div
                key={category.title}
                className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden"
              >
                <button
                  onClick={() => toggleCategory(category.title)}
                  className="w-full px-6 py-4 flex justify-between items-center bg-slate-700/50 hover:bg-slate-700 transition-colors text-left"
                >
                  <h2 className="text-xl font-bold text-white">
                    {category.title}
                  </h2>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium bg-slate-800 text-slate-400 px-2.5 py-1 rounded-full">
                      {category.scripts.length}
                    </span>
                    <svg
                      className={`w-6 h-6 text-slate-400 transform transition-transform ${expandedCategories.has(category.title) ? "rotate-180" : ""}`}
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
                  </div>
                </button>

                {expandedCategories.has(category.title) && (
                  <div className="p-6 grid gap-6">
                    {category.scripts.map((script) => (
                      <div
                        key={script.id}
                        className="bg-slate-900/50 rounded-xl p-5 border border-slate-700 shadow-sm"
                      >
                        <div className="flex items-start justify-between mb-4 border-b border-slate-700/50 pb-3">
                          <div>
                            <span className="text-xs font-bold text-sky-500 uppercase tracking-wider">
                              The Question / Situation
                            </span>
                            <h3 className="text-lg font-semibold text-white mt-1">
                              "{script.question}"
                            </h3>
                            <p className="text-xs text-slate-500 mt-1">
                              Context: {script.context}
                            </p>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          {/* Formal Answer */}
                          <div
                            className={`bg-slate-800 rounded-lg p-4 border-l-4 border-purple-500 transition-all ${isPracticeMode && !revealedScripts.has(`${script.id}-formal`) ? "cursor-pointer hover:bg-slate-700" : ""}`}
                            onClick={() => toggleReveal(script.id, "formal")}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <span className="text-xs font-bold text-purple-300 uppercase">
                                Formal / Professional
                              </span>
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleCopy(script.formal);
                                  }}
                                  className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded-md transition-colors"
                                  title="Copy to clipboard"
                                >
                                  {copiedText === script.formal ? (
                                    <CheckIcon />
                                  ) : (
                                    <CopyIcon />
                                  )}
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onPlayAudio(script.formal);
                                  }}
                                  className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded-md transition-colors"
                                  title="Listen"
                                >
                                  <PlayIcon />
                                </button>
                              </div>
                            </div>
                            <div
                              className={`transition-all duration-300 ${isPracticeMode && !revealedScripts.has(`${script.id}-formal`) ? "blur-sm opacity-50 select-none" : "blur-none opacity-100"}`}
                            >
                              <p className="text-slate-200 leading-relaxed">
                                "{script.formal}"
                              </p>
                            </div>
                            {isPracticeMode &&
                              !revealedScripts.has(`${script.id}-formal`) && (
                                <div className="mt-2 text-center text-xs text-purple-400 font-medium">
                                  Click to reveal
                                </div>
                              )}
                          </div>

                          {/* Casual Answer */}
                          <div
                            className={`bg-slate-800 rounded-lg p-4 border-l-4 border-emerald-500 transition-all ${isPracticeMode && !revealedScripts.has(`${script.id}-casual`) ? "cursor-pointer hover:bg-slate-700" : ""}`}
                            onClick={() => toggleReveal(script.id, "casual")}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <span className="text-xs font-bold text-emerald-300 uppercase">
                                Casual / Friends
                              </span>
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleCopy(script.casual);
                                  }}
                                  className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded-md transition-colors"
                                  title="Copy to clipboard"
                                >
                                  {copiedText === script.casual ? (
                                    <CheckIcon />
                                  ) : (
                                    <CopyIcon />
                                  )}
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onPlayAudio(script.casual);
                                  }}
                                  className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded-md transition-colors"
                                  title="Listen"
                                >
                                  <PlayIcon />
                                </button>
                              </div>
                            </div>
                            <div
                              className={`transition-all duration-300 ${isPracticeMode && !revealedScripts.has(`${script.id}-casual`) ? "blur-sm opacity-50 select-none" : "blur-none opacity-100"}`}
                            >
                              <p className="text-slate-200 leading-relaxed">
                                "{script.casual}"
                              </p>
                            </div>
                            {isPracticeMode &&
                              !revealedScripts.has(`${script.id}-casual`) && (
                                <div className="mt-2 text-center text-xs text-emerald-400 font-medium">
                                  Click to reveal
                                </div>
                              )}
                          </div>
                        </div>

                        {/* Native Tip */}
                        <div className="mt-4 bg-yellow-900/20 rounded-lg p-3 border border-yellow-500/20 flex items-start gap-3">
                          <div className="mt-0.5 flex-shrink-0">
                            <BulbIcon />
                          </div>
                          <div>
                            <span className="text-xs font-bold text-yellow-400 uppercase block mb-1">
                              Native Nuance
                            </span>
                            <p className="text-sm text-slate-300">
                              {script.nativeTip}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalPhrasesView;
