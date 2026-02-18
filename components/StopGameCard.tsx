import React, { useState } from 'react';
import { StopItem, WordFamily, StopCategory, IrregularVerb } from '../types';
import {
    getCategoryIcon, getCategoryTheme, GroupName, CATEGORY_GROUPS, PREDEFINED_ALL_ORDER,
    getFlagUrl
} from '../utils/stopGameHelpers';
import { irregularVerbs } from '../data/verbs';
import { PlayIcon, LoadingSpinner, MicrophoneIcon, SaveIcon, ChevronDownIcon, SpeakerWaveIcon } from './Icons';


const getLevelBadgeColor = (level: string) => {
    switch (level) {
        case 'A1': return 'bg-green-900/50 text-green-400 border-green-500/30';
        case 'A2': return 'bg-emerald-900/50 text-emerald-400 border-emerald-500/30';
        case 'B1': return 'bg-blue-900/50 text-blue-400 border-blue-500/30';
        case 'B2': return 'bg-yellow-900/50 text-yellow-400 border-yellow-500/30';
        case 'C1': return 'bg-red-900/50 text-red-400 border-red-500/30';
        case 'C2': return 'bg-purple-900/50 text-purple-400 border-purple-500/30';
        default: return 'bg-slate-800 text-slate-400 border-slate-700';
    }
};

interface StopGameCardProps {
    item: StopItem;
    category: StopCategory;
    theme: any;
    onPlay: (word: string) => void;
    onPractice: (word: string) => void;
    onSave: (word: string, def: string) => void;
    isAudioLoading: boolean;
    isPracticing: boolean;
    isSaved: boolean;
    micState: string;
    transcript: string;
    feedback: string | null;
    onDetailClick?: (item: StopItem) => void;
}

const WordFamilyViewer = ({ family }: { family: WordFamily }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="mt-3 border-t border-slate-700/50 pt-2">
            <button onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }} className="text-[10px] uppercase font-bold text-slate-400 hover:text-sky-300 flex items-center gap-1 transition-colors">
                {isOpen ? 'Hide Family' : 'Show Family 👨‍👩‍👧‍👦'}
                <ChevronDownIcon className={`w-3 h-3 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="mt-2 grid grid-cols-2 gap-2 text-xs bg-slate-900/40 p-2 rounded animate-fade-in">
                    {family.noun && <div><span className="text-slate-500 font-bold block text-[9px] uppercase">Noun</span><span className="text-white">{family.noun}</span></div>}
                    {family.verb && <div><span className="text-slate-500 font-bold block text-[9px] uppercase">Verb</span><span className="text-white">{family.verb}</span></div>}
                    {family.adj && <div><span className="text-slate-500 font-bold block text-[9px] uppercase">Adj</span><span className="text-white">{family.adj}</span></div>}
                    {family.adv && <div><span className="text-slate-500 font-bold block text-[9px] uppercase">Adv</span><span className="text-white">{family.adv}</span></div>}
                </div>
            )}
        </div>
    );
};

export const StopGameCard: React.FC<StopGameCardProps> = ({
    item, category, theme, onPlay, onPractice, onSave,
    isAudioLoading, isPracticing, isSaved, micState, transcript, feedback,
    onDetailClick
}) => {
    const [layer, setLayer] = useState(1);

    // Determine Logic for Layers
    const isVerbOrAdjective = ['Verbs', 'Adjectives'].includes(category);
    const isComplexGrammar = ['Phrasal Verbs', 'Connectors', 'Emphasis', 'Collocations', 'Idioms'].includes(category);
    const isCreative = ['Compound Words', 'Sounds & Noise', 'Philosophy & Concepts', 'Slang & Colloquial'].includes(category);

    // Minimal Pairs should strictly have 1 layer (maxLayers = 1) so it doesn't cycle.
    // Creative categories (Slang, Compound, etc.) should have 2 layers (Definition -> Example).
    const maxLayers = isVerbOrAdjective ? 2 :
        (isComplexGrammar && item.definition ? 3 :
            (isCreative && item.example ? 2 : 1));

    const isMinimalPair = category === 'Minimal Pairs';
    // Force the "fancy card" layout for Minimal Pairs even though it has 1 layer
    const showCardLayout = maxLayers > 1 || (isMinimalPair && item.definition?.includes('vs.'));

    const handleToggleLayer = () => {
        if (maxLayers > 1) {
            setLayer(prev => prev === maxLayers ? 1 : prev + 1);
        }
    };

    // Metadata Logic
    let flagUrl = null;
    if (category === 'Countries') { flagUrl = getFlagUrl(item.word); }
    else if (['Cities', 'Capitals', 'World Landmarks'].includes(category) && item.country) { flagUrl = getFlagUrl(item.country); }

    const isIrregularVerb = category === 'Verbs' && item.tag === 'Irregular';
    const irregularVerbData: IrregularVerb | undefined = isIrregularVerb ? irregularVerbs.find(v => v.base.toLowerCase() === item.word.toLowerCase()) : undefined;

    return (
        <div
            onClick={() => onDetailClick && onDetailClick(item)}
            className={`flex flex-col group bg-slate-900/40 p-2.5 rounded-lg border transition-all hover:bg-slate-800 hover:shadow-lg ${theme.glow} ${isPracticing ? 'border-sky-500/50 bg-slate-800' : isSaved ? 'border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.1)]' : 'border-transparent hover:border-slate-600'} ${onDetailClick ? 'cursor-pointer hover:scale-[1.02]' : ''}`}
        >
            <div className="flex items-center justify-between">
                <div className="min-w-0 pr-2 flex-1">
                    {/* Top Row: Flag/Color/Word/Level */}
                    <div className="flex items-center gap-2 mb-0.5">
                        {flagUrl && <img src={flagUrl} alt="flag" className="w-5 h-auto rounded-sm shadow-sm object-cover" />}
                        {category === 'Colors' && <span className="w-3 h-3 rounded-full border border-slate-500/50 shadow-sm flex-shrink-0" style={{ backgroundColor: item.hex ?? 'transparent' }} aria-hidden="true" />}
                        <p className={`font-bold truncate text-lg group-hover:text-white transition-colors ${theme.textClass}`}>{item.word}</p>
                        {item.level && <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-wide ${getLevelBadgeColor(item.level)}`}>{item.level}</span>}
                        {isIrregularVerb && <span className="text-[9px] font-bold bg-amber-900/40 text-amber-400 px-1.5 py-0.5 rounded border border-amber-600/30 uppercase tracking-wide">Irregular</span>}

                        {/* RESTORED: Tags for Animals, Nature, etc. */}
                        {item.tag && !isIrregularVerb && (
                            <span className="text-[9px] font-bold bg-slate-700 text-slate-300 px-1.5 py-0.5 rounded border border-slate-600 uppercase tracking-wide">{item.tag}</span>
                        )}
                    </div>

                    {/* IPA & Translation */}
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                        <span className="text-cyan-400 font-mono text-xs tracking-wide">{item.ipa}</span>
                        {item.translation && <span className="text-slate-400 text-xs italic truncate max-w-full">• {item.translation}</span>}
                    </div>

                    {/* RESTORED: Rich Metadata Badges */}
                    <div className="flex flex-wrap gap-2 mt-1.5">
                        {item.country && <span className="text-[10px] text-slate-400 flex items-center gap-1 bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">📍 {item.country}</span>}
                        {item.clothingType && <span className="text-[9px] uppercase font-bold text-pink-300 bg-pink-900/30 px-1.5 py-0.5 rounded">{item.clothingType}</span>}
                        {item.toolType && <span className="text-[9px] uppercase font-bold text-amber-300 bg-amber-900/30 px-1.5 py-0.5 rounded">{item.toolType}</span>}
                        {item.roomType && <span className="text-[9px] uppercase font-bold text-indigo-300 bg-indigo-900/30 px-1.5 py-0.5 rounded">{item.roomType}</span>}
                        {item.location && <span className="text-[9px] uppercase font-bold text-emerald-300 bg-emerald-900/30 px-1.5 py-0.5 rounded">Loc: {item.location}</span>}
                        {item.artist && <span className="text-[10px] text-purple-300">🎤 {item.artist}</span>}
                        {item.genre && <span className="text-[9px] uppercase font-bold text-slate-500 border border-slate-600 px-1.5 py-0.5 rounded">{item.genre}</span>}
                        {item.director && <span className="text-[10px] text-orange-300">🎬 {item.director}</span>}
                        {item.production && <span className="text-[9px] text-slate-500">({item.production})</span>}
                    </div>

                    {/* Interactive Layers (Definitions/Examples) */}
                    {showCardLayout ? (
                        <div onClick={handleToggleLayer} className={`mt-2 p-2 rounded cursor-pointer transition-all duration-300 relative group/layer ${isMinimalPair ? 'bg-indigo-900/20 border border-indigo-500/20 cursor-default' : layer === 1 ? 'bg-sky-900/20 border border-sky-500/20' : layer === 2 ? 'bg-emerald-900/20 border border-emerald-500/20' : 'bg-purple-900/20 border border-purple-500/20'}`}>
                            <div className="flex justify-between items-center mb-1">
                                <span className={`text-[9px] uppercase font-bold tracking-widest ${isMinimalPair ? 'text-indigo-400' : layer === 1 ? 'text-sky-400' : layer === 2 ? 'text-emerald-400' : 'text-purple-400'}`}>
                                    {isMinimalPair ? 'Listen & Compare' : (layer === 1 ? (category === 'Verbs' ? 'Conjugations' : 'Definition') : layer === 2 ? 'Example' : 'Formal Swap')}
                                </span>
                                {maxLayers > 1 && <span className="text-[9px] text-slate-500 opacity-0 group-hover/layer:opacity-100 transition-opacity">Flip ⟳</span>}
                            </div>
                            <div className="text-xs">
                                {(layer === 1 || isMinimalPair) && (
                                    category === 'Verbs' ? (
                                        isIrregularVerb && irregularVerbData ? (
                                            <div className="space-y-2 mt-1">
                                                <div className="flex items-center justify-between bg-black/20 p-1.5 rounded">
                                                    <span className="text-[10px] uppercase font-bold text-slate-400">Past</span>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-sky-100 font-medium">{irregularVerbData.past}</span>
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); onPlay(irregularVerbData.past.split('/')[0]); }}
                                                            className="p-1 hover:bg-white/10 rounded-full text-sky-400 transition-colors"
                                                            title="Play Past Tense"
                                                            aria-label={`Listen to past tense: ${irregularVerbData.past}`}
                                                        >
                                                            <PlayIcon className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between bg-black/20 p-1.5 rounded">
                                                    <span className="text-[10px] uppercase font-bold text-slate-400">Participle</span>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-sky-100 font-medium">{irregularVerbData.participle}</span>
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); onPlay(irregularVerbData.participle.split('/')[0]); }}
                                                            className="p-1 hover:bg-white/10 rounded-full text-sky-400 transition-colors"
                                                            title="Play Participle"
                                                            aria-label={`Listen to participle: ${irregularVerbData.participle}`}
                                                        >
                                                            <PlayIcon className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <p className="text-sky-100">{item.definition || "Regular Verb"}</p>
                                        )
                                    ) :
                                        <div className="space-y-1">
                                            {category === 'Minimal Pairs' && item.definition?.includes('vs.') ? (
                                                <div className="mt-1">
                                                    <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Compare vs:</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {item.definition.replace('vs.', '').split('/').map((pairWord) => {
                                                            const w = pairWord.trim();
                                                            return (
                                                                <button
                                                                    key={w}
                                                                    onClick={(e) => { e.stopPropagation(); onPlay(w); }}
                                                                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-indigo-500/20 hover:bg-indigo-500/40 border border-indigo-500/30 text-indigo-200 text-xs font-medium transition-all"
                                                                    aria-label={`Listen to compare: ${w}`}
                                                                >
                                                                    <SpeakerWaveIcon className="h-3 w-3" />
                                                                    {w}
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            ) : (
                                                item.definition ? <p className="text-sky-100">{item.definition}</p> : <p className="text-sky-100 italic">{item.translation}</p>
                                            )}
                                            {item.synonyms && <p className="text-sky-500 font-bold text-[10px]">Syn: {item.synonyms.join(', ')}</p>}
                                        </div>
                                )}
                                {!isMinimalPair && layer === 2 && <p className="text-emerald-100 italic">"{item.examSentence || item.example || "..."}"</p>}
                                {!isMinimalPair && layer === 3 && (
                                    <div className="space-y-1">
                                        <p className="text-purple-100">{item.transformation || "No structure shift available."}</p>
                                        {item.writingSwap && <p className="text-[10px] text-purple-300">Formal: "{item.writingSwap}"</p>}
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : item.definition ? (
                        <p className="text-xs text-slate-400 mt-2 pt-2 border-t border-slate-700/50 italic leading-tight">{item.definition}</p>
                    ) : null}

                    {item.wordFamily && <WordFamilyViewer family={item.wordFamily} />}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 self-start mt-1">
                    <button onClick={() => onPlay(item.word)} disabled={isAudioLoading} className="h-8 w-8 flex items-center justify-center rounded-full bg-slate-700 text-sky-400 hover:bg-sky-500 hover:text-white transition-colors disabled:opacity-50" title="Listen" aria-label={`Listen to ${item.word}`}>
                        {isAudioLoading ? <LoadingSpinner /> : <PlayIcon />}
                    </button>
                    <button onClick={() => onPractice(item.word)} className={`h-8 w-8 flex items-center justify-center rounded-full transition-colors ${isPracticing ? 'bg-red-500 text-white animate-pulse' : 'bg-slate-700 text-purple-400 hover:bg-purple-500 hover:text-white'}`} title="Practice" aria-label={`Practice pronunciation for ${item.word}`}>
                        <MicrophoneIcon className={`h-5 w-5 ${isPracticing ? 'text-white' : 'text-slate-400'}`} />
                    </button>
                    <button onClick={() => onSave(item.word, item.definition || item.translation)} disabled={isSaved} className={`h-8 w-8 flex items-center justify-center rounded-full transition-colors ${isSaved ? 'bg-emerald-900/30 text-emerald-400' : 'bg-slate-700 text-emerald-400 hover:bg-emerald-500 hover:text-white'}`} title="Save" aria-label={isSaved ? `Already saved ${item.word}` : `Save ${item.word} to vault`}>
                        <SaveIcon className={`h-5 w-5 ${isSaved ? 'text-emerald-400' : 'text-slate-400'}`} />
                    </button>
                </div>
            </div>

            {/* Practice Feedback Area */}
            {isPracticing && (
                <div className="mt-2 pt-2 border-t border-slate-700/50">
                    <div className="flex items-center justify-between mb-1"><span className={`text-[10px] uppercase font-bold ${micState === 'listening' ? 'text-sky-400 animate-pulse' : 'text-slate-400'}`}>{micState === 'listening' ? 'Listening...' : 'Tap mic to speak'}</span>{micState === 'listening' && <button onClick={() => { }} className="text-[10px] text-slate-400 hover:text-white underline font-bold">Done</button>}</div>
                    <div className="min-h-[1.5em] text-sm font-medium text-white break-words bg-slate-900/50 p-1.5 rounded border border-slate-600/50 mb-2">
                        {transcript ? <span className="text-emerald-300">{transcript}</span> : <span className="text-slate-500 italic">Say "{item.word}"...</span>}
                    </div>
                    {feedback && <p className={`text-sm font-bold ${feedback.includes('Correct') ? 'text-emerald-400' : 'text-amber-400'}`}>{feedback}</p>}
                </div>
            )}
        </div>
    );
};
