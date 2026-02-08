
import React, { useState, useMemo, useEffect } from 'react';
import { stopGameData } from '../data/stopGameData';
import { StopCategory, StopItem } from '../types';
import { StopGameCard } from './StopGameCard';
import { StopItemModal } from './StopItemModal';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import {
    ChevronDownIcon, ChevronUpIcon, SearchIcon, HeartIcon, SparklesIcon, BookIcon, DiceIcon,
    getCategoryIcon, getCategoryTheme, GroupName, CATEGORY_GROUPS, PREDEFINED_ALL_ORDER
} from '../utils/stopGameHelpers';

interface StopGameBrowseProps {
    onPlayWord: (word: string) => void;
    isWordAudioLoading: string | null;
    onAddToVault: (word: string, definition: string) => void;
}

const StopGameBrowse: React.FC<StopGameBrowseProps> = ({ onPlayWord, isWordAudioLoading, onAddToVault }) => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');

    // Browse State
    const [selectedLetter, setSelectedLetter] = useState<string>('A');
    const [selectedGroup, setSelectedGroup] = useState<GroupName>('All');
    const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
    const [browseFilter, setBrowseFilter] = useState('');
    const [showSavedOnly, setShowSavedOnly] = useState(false);
    const [showSavedOnly, setShowSavedOnly] = useState(false);
    const [isHeaderCollapsed, setIsHeaderCollapsed] = useState(false);

    // Study Mode State
    const [isStudyMode, setIsStudyMode] = useState(false);
    const [selectedItemForModal, setSelectedItemForModal] = useState<{ item: StopItem, category: string } | null>(null);

    // Practice State
    const [practiceWord, setPracticeWord] = useState<string | null>(null);
    const [practiceFeedback, setPracticeFeedback] = useState<string | null>(null);
    const [isPracticing, setIsPracticing] = useState(false);
    const [savedWords, setSavedWords] = useState<Set<string>>(new Set());

    const currentData = stopGameData[selectedLetter];

    const visibleCategories = useMemo(() => {
        if (selectedGroup === 'All') {
            // In 'All' mode, we might still want to hide completely empty categories to avoid scrolling forever
            // BUT, to solve the jumping issue, we prefer stability. 
            // Let's rely on the filter logic below to decide visibility in 'All' mode.
            return PREDEFINED_ALL_ORDER;
        }
        return CATEGORY_GROUPS[selectedGroup];
    }, [selectedGroup]);

    useEffect(() => {
        setExpandedCategories({});
        setShowSavedOnly(false); // Reset saved filter on letter change
    }, [selectedLetter, selectedGroup]);

    const toggleCategory = (category: string) => {
        setExpandedCategories(prev => ({
            ...prev,
            [category]: !prev[category]
        }));
    };

    // --- PRACTICE & SPEECH ---
    const handleSpeechResult = (transcript: string) => {
        if (practiceWord && isPracticing) {
            const cleanTranscript = transcript.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim();
            const cleanTarget = practiceWord.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim();
            if (cleanTranscript.includes(cleanTarget) || cleanTarget.includes(cleanTranscript)) {
                setPracticeFeedback('Correct! 🎉');
                setIsPracticing(false);
                abortListening();
            } else {
                setPracticeFeedback(`You said: "${transcript}". Try again!`);
                setIsPracticing(false);
            }
        }
    };

    const { startListening, abortListening, micState, interimTranscript } = useSpeechRecognition(handleSpeechResult);

    const handlePracticeClick = (word: string) => {
        if (isPracticing && practiceWord === word) {
            abortListening();
            setIsPracticing(false);
            setPracticeFeedback('Stopped.');
        } else {
            if (isPracticing) abortListening();
            setPracticeWord(word);
            setPracticeFeedback(null);
            setIsPracticing(true);
            setTimeout(() => startListening(), 50);
        }
    };

    const handleSaveWord = (word: string, definition: string) => {
        if (onAddToVault) {
            onAddToVault(word, definition);
            setSavedWords(prev => new Set(prev).add(word));
        }
    };

    // --- RANDOM SURPRISE LOGIC ---
    const handleRandomPick = () => {
        if (!currentData) return;

        // 1. Pick a random category that has words
        const validCategories = visibleCategories.filter(cat => currentData[cat] && currentData[cat]!.length > 0);
        if (validCategories.length === 0) return;

        const randomCat = validCategories[Math.floor(Math.random() * validCategories.length)];
        const items = currentData[randomCat]!;
        const randomItem = items[Math.floor(Math.random() * items.length)];

        // 2. Expand that category
        setExpandedCategories(prev => ({ ...prev, [randomCat]: true }));

        // 3. Scroll logic (simplistic: scroll to category)
        setTimeout(() => {
            const el = document.getElementById(`cat-${randomCat}`);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // 4. Play audio (Surprise!)
            onPlayWord(randomItem.word);
        }, 100);
    };

    return (
        <>
            {/* COMPACT HEADER WITH COLLAPSE TOGGLE */}
            <div className="flex-shrink-0 bg-slate-900 border-b border-slate-700 z-10 shadow-md relative transition-all duration-300">

                {/* Collapse Toggle Button - Always visible, high z-index */}
                <button
                    onClick={() => setIsHeaderCollapsed(!isHeaderCollapsed)}
                    className="absolute top-2 right-2 p-1.5 bg-slate-800 rounded-full text-slate-400 hover:text-white hover:bg-slate-700 z-50 border border-slate-700 shadow-sm transition-all"
                    title={isHeaderCollapsed ? "Expand Header" : "Collapse Header"}
                >
                    {isHeaderCollapsed ? <ChevronDownIcon /> : <ChevronUpIcon />}
                </button>

                {/* Row 1: Title & Search (Collapsible) */}
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isHeaderCollapsed ? 'max-h-0 opacity-0' : 'max-h-40 opacity-100'}`}>
                    <div className="max-w-7xl mx-auto p-4 pb-2 flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="flex items-center gap-3 w-full md:w-auto">
                            <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
                                <span className="text-3xl">📚</span> Vocabulary Library
                            </h2>
                            {currentData && (
                                <span className="bg-slate-800 text-slate-400 px-2 py-1 rounded text-xs border border-slate-700 font-mono whitespace-nowrap">
                                    {Object.values(currentData).flat().length} words
                                </span>
                            )}
                        </div>

                        <div className="flex gap-2 w-full md:w-auto items-center">
                            {/* STUDY MODE TOGGLE */}
                            <div className="flex items-center gap-2 bg-slate-800 p-1 rounded-xl border border-slate-700 mr-2">
                                <button
                                    onClick={() => setIsStudyMode(false)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${!isStudyMode ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
                                >
                                    <DiceIcon /> Browse
                                </button>
                                <button
                                    onClick={() => setIsStudyMode(true)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${isStudyMode ? 'bg-sky-600 text-white shadow-lg shadow-sky-500/20' : 'text-slate-400 hover:text-slate-200'}`}
                                >
                                    <BookIcon /> Study
                                </button>
                            </div>

                            <div className="relative w-full md:w-64 group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                                    <SearchIcon />
                                </div>
                                <input
                                    type="text"
                                    placeholder={`Search in '${selectedLetter}'...`}
                                    value={browseFilter}
                                    onChange={(e) => setBrowseFilter(e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-700 text-white text-sm rounded-xl pl-10 pr-8 py-2.5 focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                                />
                                {browseFilter && (
                                    <button onClick={() => setBrowseFilter('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">
                                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>
                                )}
                            </div>

                            {/* New Discovery Buttons */}
                            <button
                                onClick={() => setShowSavedOnly(!showSavedOnly)}
                                className={`p-2.5 rounded-xl border transition-all ${showSavedOnly ? 'bg-pink-600 border-pink-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-pink-400'}`}
                                title="Show Saved Only"
                            >
                                <HeartIcon solid={showSavedOnly} />
                            </button>

                            <button
                                onClick={handleRandomPick}
                                className="p-2.5 rounded-xl border bg-gradient-to-r from-sky-600 to-purple-600 border-transparent text-white hover:opacity-90 transition-all shadow-lg shadow-purple-500/20"
                                title="Surprise Me!"
                            >
                                <SparklesIcon />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Row 2: Letters & Filters combined in a denser layout (Always Visible) */}
                <div className={`max-w-7xl mx-auto px-2 transition-all duration-300 ${isHeaderCollapsed ? 'pt-1' : 'pt-2'}`}>
                    {/* Letters */}
                    <div className="overflow-x-auto scrollbar-hide pb-2">
                        <div className="flex gap-1 min-w-max px-2">
                            {alphabet.map((letter) => {
                                const hasData = !!stopGameData[letter];
                                const isSelected = selectedLetter === letter;
                                return (
                                    <button
                                        key={letter}
                                        onClick={() => hasData && setSelectedLetter(letter)}
                                        disabled={!hasData}
                                        className={`
                                        h-9 w-8 rounded-md font-bold text-sm transition-all flex items-center justify-center border-b-2 relative overflow-hidden
                                        ${isSelected
                                                ? 'bg-sky-500 border-sky-400 text-white shadow-[0_0_15px_rgba(14,165,233,0.5)] scale-105'
                                                : hasData
                                                    ? 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-white hover:border-slate-500'
                                                    : 'bg-slate-800/30 border-transparent text-slate-700 cursor-not-allowed'}
                                    `}
                                    >
                                        {letter}
                                        {isSelected && <span className="absolute bottom-0 left-0 w-full h-1 bg-white/30 animate-pulse"></span>}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Categories */}
                    <div className="overflow-x-auto scrollbar-hide py-2 border-t border-slate-800">
                        <div className="flex gap-2 min-w-max px-2">
                            {(Object.keys(CATEGORY_GROUPS) as GroupName[]).map((group) => {
                                const isSelected = selectedGroup === group;
                                return (
                                    <button
                                        key={group}
                                        onClick={() => setSelectedGroup(group)}
                                        className={`
                                        px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all whitespace-nowrap border
                                        ${isSelected
                                                ? 'bg-emerald-600 border-emerald-500 text-white shadow-lg shadow-emerald-500/20 scale-105'
                                                : 'bg-slate-800 border-slate-700 text-slate-500 hover:border-slate-500 hover:text-slate-300 hover:bg-slate-700'}
                                    `}
                                    >
                                        {group}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-900/50">
                <div className="max-w-7xl mx-auto pb-20">
                    {currentData ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-fade-in">
                            {visibleCategories.map((category) => {
                                let items = currentData[category];

                                // If no items exist for this category/letter combination, we create an empty array 
                                // so we can render an "Empty State" card to maintain grid stability.
                                if (!items) items = [];

                                // Apply filters (only if items exist)
                                if (items.length > 0) {
                                    if (browseFilter) {
                                        items = items.filter(i => i.word.toLowerCase().includes(browseFilter.toLowerCase()) || i.translation.toLowerCase().includes(browseFilter.toLowerCase()));
                                    }
                                    if (showSavedOnly) {
                                        items = items.filter(i => savedWords.has(i.word));
                                    }
                                }

                                // If user is filtering and the result is empty, we MIGHT want to hide it to reduce clutter.
                                // However, to satisfy "visual stability" when changing letters, we will render the ghost card
                                // UNLESS we are in "All" mode where showing 50 empty cards is annoying.
                                const isEmpty = items.length === 0;
                                if (isEmpty && selectedGroup === 'All' && !browseFilter) return null;

                                // If searching/filtering, hide empty results to show only matches
                                if (isEmpty && (browseFilter || showSavedOnly)) return null;

                                const displayLimit = 6;
                                const isExpanded = expandedCategories[category];
                                const visibleItems = isExpanded ? items : items.slice(0, displayLimit);
                                const hiddenCount = items.length - displayLimit;
                                const hasMore = items.length > displayLimit;

                                const theme = getCategoryTheme(category);

                                // Ghost Card Styling (for empty categories)
                                if (isEmpty) {
                                    return (
                                        <div key={category} id={`cat-${category}`} className={`rounded-2xl border-2 border-dashed border-slate-800 bg-slate-900/20 flex flex-col h-full opacity-60`}>
                                            <div className={`px-5 py-4 flex items-center justify-between border-b border-transparent`}>
                                                <div className="flex items-center gap-3 grayscale">
                                                    <span className={`text-2xl w-10 h-10 flex items-center justify-center rounded-lg bg-slate-800`}>{getCategoryIcon(category)}</span>
                                                    <h3 className={`font-bold text-lg text-slate-600`}>{category}</h3>
                                                </div>
                                            </div>
                                            <div className="flex-1 p-6 flex items-center justify-center text-slate-700 text-sm italic font-medium">
                                                No {category.toLowerCase()} starting with '{selectedLetter}'
                                            </div>
                                        </div>
                                    );
                                }

                                // Normal Card Styling
                                const cardClass = `rounded-2xl border-t-4 ${theme.accentColor} bg-slate-800 border-x border-b border-slate-700/50 overflow-hidden flex flex-col h-full shadow-lg transition-all duration-300 hover:-translate-y-1 ${theme.glow} group`;
                                const headerClass = `${theme.headerGradient} px-5 py-4 flex items-center justify-between border-b border-white/5`;
                                const titleClass = `font-black text-lg ${theme.textClass} tracking-wide drop-shadow-sm`;

                                return (
                                    <div key={category} id={`cat-${category}`} className={cardClass}>
                                        <div className={headerClass}>
                                            <div className="flex items-center gap-3">
                                                <span className={`text-2xl w-10 h-10 flex items-center justify-center rounded-lg shadow-inner ${theme.iconBg}`}>{getCategoryIcon(category)}</span>
                                                <h3 className={titleClass}>{category}</h3>
                                            </div>
                                            <span className="text-xs font-bold text-slate-400 bg-slate-900/30 px-2.5 py-1 rounded-lg border border-white/5 min-w-[2rem] text-center backdrop-blur-sm">{items.length}</span>
                                        </div>
                                        <div className={`p-4 flex-1 flex flex-col gap-3 ${theme.bgGradient}`}>
                                            {visibleItems.map((item, idx) => (
                                                <StopGameCard
                                                    key={idx}
                                                    item={item}
                                                    category={category}
                                                    theme={theme}
                                                    onPlay={onPlayWord}
                                                    onPractice={handlePracticeClick}
                                                    onSave={handleSaveWord}
                                                    isAudioLoading={isWordAudioLoading === item.word}
                                                    isPracticing={practiceWord === item.word && isPracticing}
                                                    isSaved={savedWords.has(item.word)}
                                                    micState={micState}
                                                    transcript={interimTranscript}
                                                    feedback={practiceFeedback}
                                                    onDetailClick={isStudyMode ? (item) => setSelectedItemForModal({ item, category }) : undefined}
                                                />
                                            ))}
                                        </div>
                                        {hasMore && (
                                            <button onClick={() => toggleCategory(category)} className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 border-t border-slate-700/50">
                                                {isExpanded ? <><span>Collapse</span><ChevronUpIcon /></> : <><span>Show {hiddenCount} More</span><ChevronDownIcon /></>}
                                            </button>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-64 text-slate-500"><p className="text-xl">No words loaded for letter {selectedLetter} yet.</p></div>
                    )}
                </div>
            </div>
        </>
      {
        selectedItemForModal && (
            <StopItemModal
                item={selectedItemForModal.item}
                category={selectedItemForModal.category}
                onClose={() => setSelectedItemForModal(null)}
                onPlay={onPlayWord}
            />
        )
    }
      </>
  );
};

export default StopGameBrowse;
