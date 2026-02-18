import React, { useState, useMemo, useEffect } from 'react';
import { EnglishLevel, DrillExample, WordPart } from '../types';
import { drillTopicsByLevel } from '../data/drills';
import { getCategoryStyle } from '../utils/categoryStyles';
import { getFullTextFromParts } from '../utils/textUtils';
import ToggleSwitch from './ToggleSwitch';
import { PlayIcon, TranslateIcon, LoadingSpinner, EyeIcon, EyeOffIcon, ShuffleIcon, BookmarkIcon, CheckIcon } from './Icons';

interface StudyDeckViewProps {
    level: EnglishLevel;
    onPlayWord: (word: string) => void;
    isWordAudioLoading: string | null;
    onAddToVault: (word: string, definition: string) => void;
}

interface DisplayExample extends DrillExample {
    uniqueKey: string;
    fullText?: string;
    textA?: string;
    textB?: string;
}

const getFullTextFromParts = (parts: WordPart[]) => parts.map(p => p.word).join(' ');


const Sentence = ({ parts, isHidden, onReveal }: { parts: WordPart[], isHidden: boolean, onReveal?: () => void }) => {
    if (isHidden) {
        return (
            <div
                onClick={onReveal}
                className="group cursor-pointer select-none rounded-lg bg-slate-700/50 p-3 border border-slate-600 border-dashed hover:bg-slate-700 hover:border-sky-500 transition-all relative overflow-hidden"
            >
                <div className="absolute inset-0 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="bg-slate-900/80 text-sky-400 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
                        <EyeIcon /> Click to Reveal
                    </span>
                </div>
                <p className="text-lg text-transparent bg-slate-600/20 blur-sm font-medium leading-relaxed truncate" aria-hidden="true">
                    {parts.map(p => p.word).join(' ')}
                </p>
            </div>
        );
    }

    return (
        <p className="text-lg text-white font-medium leading-relaxed">
            {parts.map((part, i) =>
                part.category ? (
                    <span key={i} className={`relative group cursor-pointer transition-colors ${getCategoryStyle(part.category)}`}>
                        {part.word}
                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2 py-1 bg-slate-900 text-white text-xs font-bold rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 border border-slate-600 shadow-lg">
                            {part.category}
                        </span>
                    </span>
                ) : (
                    <span key={i}>{part.word}</span>
                )
            ).reduce((prev, curr) => <>{prev} {curr}</>)}
        </p>
    );
};

const StudyDeckView: React.FC<StudyDeckViewProps> = ({ level, onPlayWord, isWordAudioLoading, onAddToVault }) => {
    const topicsForLevel = useMemo(() => drillTopicsByLevel[level] || [], [level]);
    const [selectedTopicId, setSelectedTopicId] = useState<string | null>(topicsForLevel.length > 0 ? topicsForLevel[0].id : null);
    const [isPracticeMode, setIsPracticeMode] = useState(false);
    const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());
    const [savedItems, setSavedItems] = useState<Set<string>>(new Set());

    // Handling Shuffle
    const [isShuffled, setIsShuffled] = useState(false);
    const [displayExamples, setDisplayExamples] = useState<DisplayExample[]>([]);

    // Reset state when topic or level changes
    useEffect(() => {
        if (topicsForLevel.length > 0) {
            setSelectedTopicId(topicsForLevel[0].id);
        } else {
            setSelectedTopicId(null);
        }
        setRevealedIndices(new Set());
        setSavedItems(new Set());
        setIsShuffled(false);
    }, [topicsForLevel]);

    const selectedTopic = useMemo(() => {
        return topicsForLevel.find(t => t.id === selectedTopicId);
    }, [topicsForLevel, selectedTopicId]);

    // Update display items when topic or shuffle changes
    useEffect(() => {
        if (selectedTopic) {
            let examples: DisplayExample[] = selectedTopic.examples.map((example, index) => {
                const precalculated: DisplayExample = { ...example, uniqueKey: '' };
                if (example.parts) {
                    precalculated.fullText = getFullTextFromParts(example.parts);
                    precalculated.uniqueKey = `ex-${index}-${precalculated.fullText}`;
                } else if (example.comparison) {
                    precalculated.textA = getFullTextFromParts(example.comparison[0].parts);
                    precalculated.textB = getFullTextFromParts(example.comparison[1].parts);
                    precalculated.uniqueKey = `ex-${index}-${precalculated.textA}-${precalculated.textB}`;
                } else {
                    precalculated.uniqueKey = `ex-${index}`;
                }
                return precalculated;
            });

            if (isShuffled) {
                // Simple Fisher-Yates shuffle
                for (let i = examples.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [examples[i], examples[j]] = [examples[j], examples[i]];
                }
            }
            setDisplayExamples(examples);
        }
    }, [selectedTopic, isShuffled]);


    const handleReveal = (index: number) => {
        const newRevealed = new Set(revealedIndices);
        newRevealed.add(index);
        setRevealedIndices(newRevealed);
    };

    const togglePracticeMode = (enabled: boolean) => {
        setIsPracticeMode(enabled);
        if (!enabled) {
            setRevealedIndices(new Set()); // Reset reveals when turning off
        }
    };

    const handleSave = (phrase: string, translation: string | undefined) => {
        onAddToVault(phrase, translation || "Phrase from Study Deck");
        setSavedItems(prev => new Set(prev).add(phrase));
    };

    if (topicsForLevel.length === 0) {
        return (
            <div className="flex-1 flex items-center justify-center text-center p-4">
                <div className="bg-slate-800 p-8 rounded-lg">
                    <h2 className="text-xl font-semibold text-slate-300">No Study Decks Available</h2>
                    <p className="text-slate-400 mt-2">There are no study decks for the {level} level yet. Please check back later!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-6">
                    <div className="w-full md:w-auto flex-1">
                        {topicsForLevel.length > 1 && (
                            <div className="mb-2">
                                <label htmlFor="study-topic-select" className="block text-sm font-medium text-slate-300 mb-1">
                                    Select Study Topic:
                                </label>
                                <select
                                    id="study-topic-select"
                                    value={selectedTopicId ?? ''}
                                    onChange={(e) => setSelectedTopicId(e.target.value)}
                                    className="bg-slate-700 border border-slate-600 text-white text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5"
                                >
                                    {topicsForLevel.map((topic) => (
                                        <option key={topic.id} value={topic.id}>
                                            {topic.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>

                    <div className="flex gap-2 w-full md:w-auto">
                        <button
                            onClick={() => setIsShuffled(!isShuffled)}
                            className={`p-3 rounded-lg border flex items-center gap-2 transition-all ${isShuffled ? 'bg-purple-600 border-purple-500 text-white shadow-md' : 'bg-slate-700 border-slate-600 text-slate-400 hover:bg-slate-600'}`}
                            title="Shuffle Deck"
                        >
                            <ShuffleIcon />
                            <span className="text-sm font-bold hidden sm:inline">Shuffle</span>
                        </button>

                        <div className="bg-slate-800 p-3 rounded-lg border border-slate-700 flex items-center gap-3 shadow-sm flex-1 md:flex-initial justify-center">
                            <div className={`p-2 rounded-full ${isPracticeMode ? 'bg-sky-500/20 text-sky-400' : 'bg-slate-700 text-slate-400'}`}>
                                {isPracticeMode ? <EyeOffIcon /> : <EyeIcon />}
                            </div>
                            <div>
                                <ToggleSwitch
                                    label="Practice Mode"
                                    checked={isPracticeMode}
                                    onChange={togglePracticeMode}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {selectedTopic && (
                    <div className="animate-fade-in">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h1 className="text-3xl font-bold text-white mb-2">{selectedTopic.name}</h1>
                                <p className="text-slate-400 max-w-2xl">{selectedTopic.description}</p>
                            </div>
                            {isShuffled && (
                                <span className="bg-purple-900/40 text-purple-300 text-xs px-2 py-1 rounded border border-purple-500/30">
                                    Shuffled
                                </span>
                            )}
                        </div>

                        <div className="space-y-4">
                            {displayExamples.map((example, index) => {
                                // Unique ID for this item pre-calculated to handle shuffle rendering and performance
                                const uniqueKey = example.uniqueKey;
                                const isRevealed = revealedIndices.has(index);

                                // Section Header (Skip if shuffled to avoid confusion)
                                if (example.parts && example.parts[0].word.startsWith('---')) {
                                    if (isShuffled) return null;
                                    const title = example.parts[0].word.replace(/---/g, '').trim();
                                    return (
                                        <div key={uniqueKey} className="pt-6 pb-2">
                                            <h2 className="text-xl font-semibold text-sky-300 border-b-2 border-sky-300/20 pb-2">{title}</h2>
                                        </div>
                                    );
                                }

                                // Minimal Pair Card
                                if (example.comparison) {
                                    const [itemA, itemB] = example.comparison;
                                    const textA = example.textA || '';
                                    const textB = example.textB || '';

                                    return (
                                        <div key={uniqueKey} className="bg-slate-800 p-4 rounded-lg border border-slate-700/50">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                                                {/* Item A */}
                                                <div className="flex flex-col justify-between gap-2 border-b md:border-b-0 md:border-r border-slate-700 pb-3 md:pb-0 md:pr-4 h-full">
                                                    <div className="flex-1">
                                                        {isPracticeMode && itemA.translation_es && !isRevealed ? (
                                                            <div className="mb-3">
                                                                <p className="text-emerald-400 font-medium text-lg mb-2">{itemA.translation_es}</p>
                                                                <Sentence parts={itemA.parts} isHidden={true} onReveal={() => handleReveal(index)} />
                                                            </div>
                                                        ) : (
                                                            <>
                                                                <Sentence parts={itemA.parts} isHidden={false} />
                                                                <p className="text-cyan-300 font-mono text-sm tracking-wider mt-1">{itemA.ipa}</p>
                                                                {itemA.translation_es && <p className="text-slate-400 text-sm mt-1 italic">{itemA.translation_es}</p>}
                                                            </>
                                                        )}
                                                    </div>
                                                    <div className="flex justify-end mt-2">
                                                        <button
                                                            onClick={() => onPlayWord(textA)}
                                                            disabled={!!isWordAudioLoading}
                                                            className="h-9 w-9 flex items-center justify-center rounded-full bg-slate-700 text-slate-300 hover:bg-sky-500 hover:text-white transition-colors disabled:opacity-50"
                                                            aria-label={`Listen to "${textA}"`}
                                                        >
                                                            {isWordAudioLoading === textA ? <LoadingSpinner /> : <PlayIcon />}
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Item B */}
                                                <div className="flex flex-col justify-between gap-2 h-full">
                                                    <div className="flex-1">
                                                        {isPracticeMode && itemB.translation_es && !isRevealed ? (
                                                            <div className="mb-3">
                                                                <p className="text-emerald-400 font-medium text-lg mb-2">{itemB.translation_es}</p>
                                                                <Sentence parts={itemB.parts} isHidden={true} onReveal={() => handleReveal(index)} />
                                                            </div>
                                                        ) : (
                                                            <>
                                                                <Sentence parts={itemB.parts} isHidden={false} />
                                                                <p className="text-cyan-300 font-mono text-sm tracking-wider mt-1">{itemB.ipa}</p>
                                                                {itemB.translation_es && <p className="text-slate-400 text-sm mt-1 italic">{itemB.translation_es}</p>}
                                                            </>
                                                        )}
                                                    </div>
                                                    <div className="flex justify-end mt-2">
                                                        <button
                                                            onClick={() => onPlayWord(textB)}
                                                            disabled={!!isWordAudioLoading}
                                                            className="h-9 w-9 flex items-center justify-center rounded-full bg-slate-700 text-slate-300 hover:bg-sky-500 hover:text-white transition-colors disabled:opacity-50"
                                                        >
                                                            {isWordAudioLoading === textB ? <LoadingSpinner /> : <PlayIcon />}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }

                                // Standard Card
                                if (example.parts) {
                                    const fullText = example.fullText || '';
                                    const isSaved = savedItems.has(fullText);

                                    return (
                                        <div key={uniqueKey} className={`p-4 rounded-lg border transition-all duration-300 ${isPracticeMode && !isRevealed ? 'bg-slate-800/50 border-sky-500/30 ring-1 ring-sky-500/20' : 'bg-slate-800 border-slate-700/50'}`}>
                                            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                                                <div className="flex-1 order-2 sm:order-1">
                                                    {isPracticeMode && !isRevealed ? (
                                                        <div>
                                                            {example.translation_es && (
                                                                <p className="text-emerald-400 font-semibold text-xl mb-3 animate-fade-in">
                                                                    {example.translation_es}
                                                                </p>
                                                            )}
                                                            {example.definition && !example.translation_es && (
                                                                <p className="text-yellow-300 text-lg mb-3 italic">
                                                                    "{example.definition}"
                                                                </p>
                                                            )}
                                                            <Sentence parts={example.parts} isHidden={true} onReveal={() => handleReveal(index)} />
                                                        </div>
                                                    ) : (
                                                        <div className="animate-fade-in">
                                                            <Sentence parts={example.parts} isHidden={false} />
                                                            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 items-baseline">
                                                                <p className="text-cyan-300 font-mono text-sm tracking-wider">{example.ipa}</p>
                                                                {example.translation_es && <p className="text-slate-400 text-sm italic">{example.translation_es}</p>}
                                                            </div>
                                                            {example.definition && (
                                                                <div className="mt-2 pt-2 border-t border-slate-700/50">
                                                                    <p className="text-sm text-yellow-300/90"><span className="font-semibold text-yellow-200">Meaning:</span> {example.definition}</p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="flex items-center gap-2 order-1 sm:order-2 self-end sm:self-start">
                                                    <button
                                                        onClick={() => handleSave(fullText, example.translation_es || example.definition)}
                                                        className={`h-10 w-10 flex items-center justify-center rounded-full transition-colors ${isSaved ? 'text-emerald-400 bg-emerald-900/20' : 'text-slate-500 hover:text-white hover:bg-slate-700'}`}
                                                        title={isSaved ? "Saved to Vault" : "Save to Vocabulary Vault"}
                                                        disabled={isSaved}
                                                    >
                                                        {isSaved ? <CheckIcon /> : <BookmarkIcon />}
                                                    </button>

                                                    {!isPracticeMode && example.translation_es && (
                                                        <div className="relative group hidden sm:block">
                                                            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-700/50 text-slate-300 cursor-help">
                                                                <TranslateIcon />
                                                            </div>
                                                            <div className="absolute bottom-full right-0 mb-2 w-max max-w-xs px-3 py-1.5 bg-slate-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 border border-slate-600 shadow-lg">
                                                                {example.translation_es}
                                                            </div>
                                                        </div>
                                                    )}
                                                    <button
                                                        onClick={() => onPlayWord(fullText)}
                                                        disabled={!!isWordAudioLoading}
                                                        className={`h-10 w-10 flex items-center justify-center rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                                                        ${isPracticeMode && !isRevealed
                                                                ? 'bg-sky-600 text-white hover:bg-sky-500 shadow-lg shadow-sky-500/20'
                                                                : 'bg-slate-700/50 text-slate-300 hover:bg-sky-500 hover:text-white'
                                                            }
                                                    `}
                                                        aria-label={`Listen to "${fullText}"`}
                                                        title={isPracticeMode && !isRevealed ? "Listen for a hint" : "Listen"}
                                                    >
                                                        {isWordAudioLoading === fullText ? <LoadingSpinner /> : <PlayIcon />}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                return null;
                            })}
                        </div>
                    </div>
                )}
            </div>
            <style>{`
            @keyframes fade-in {
                from { opacity: 0; transform: translateY(5px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        `}</style>
        </div>
    );
};

export default StudyDeckView;
