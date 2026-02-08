
import React from 'react';
import { StopItem, WordFamily } from '../types';
import { getCategoryTheme, getCategoryIcon, getFlagUrl } from '../utils/stopGameHelpers';

interface StopItemModalProps {
    item: StopItem;
    category: string;
    onClose: () => void;
    onPlay: (word: string) => void;
}

// Helper to parse verb definitions into structured data
const parseVerbDefinition = (def: string | undefined): { past?: string, participle?: string } => {
    if (!def) return {};
    const parts = def.split('•').map(s => s.trim());
    const result: { past?: string, participle?: string } = {};

    parts.forEach(part => {
        if (part.toLowerCase().startsWith('past:')) {
            result.past = part.replace(/past:/i, '').trim();
        } else if (part.toLowerCase().startsWith('part:')) {
            result.participle = part.replace(/part:/i, '').trim();
        }
    });

    return result;
};

export const StopItemModal: React.FC<StopItemModalProps> = ({ item, category, onClose, onPlay }) => {
    const theme = getCategoryTheme(category);
    const isVerb = category === 'Verbs';
    const verbForms = isVerb ? parseVerbDefinition(item.definition) : {};

    const countryName = category === 'Countries' ? item.word : item.country;
    const flagUrl = getFlagUrl(countryName);
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in" onClick={onClose}>
            <div
                className={`w-full max-w-lg bg-slate-900 border-2 ${theme.borderColor} rounded-2xl shadow-2xl overflow-hidden relative transform transition-all scale-100`}
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className={`${theme.headerGradient} p-6 flex items-start justify-between border-b border-white/10`}>
                    <div className="flex items-center gap-4">
                        <span className={`text-4xl w-16 h-16 flex items-center justify-center rounded-2xl shadow-inner ${theme.iconBg} relative overflow-hidden`}>
                            {flagUrl ? (
                                <img src={flagUrl} alt="" className="w-full h-full object-cover" />
                            ) : (
                                getCategoryIcon(category)
                            )}
                        </span>
                        <div>
                            <h2 className={`text-3xl font-black text-white tracking-tight ${theme.textClass}`}>
                                {item.word}
                            </h2>
                            <p className="text-slate-300 text-lg font-medium italic">{item.translation}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 bg-black/20 hover:bg-black/40 rounded-full text-white/70 hover:text-white transition-colors">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">

                    {/* Audio Playback */}
                    <div className="flex justify-center">
                        <button
                            onClick={() => onPlay(item.word)}
                            className="flex items-center gap-3 px-6 py-3 bg-sky-600 hover:bg-sky-500 text-white rounded-full font-bold shadow-lg shadow-sky-500/30 transition-all hover:scale-105"
                        >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
                            <span>Listen Pronunciation</span>
                        </button>
                    </div>

                    {/* IPA */}
                    <div className="text-center">
                        <span className="font-mono text-2xl text-cyan-400 bg-cyan-950/30 px-4 py-2 rounded-lg border border-cyan-500/20">
                            {item.ipa}
                        </span>
                    </div>

                    {/* Content Section */}
                    <div className="space-y-4">
                        {/* Special Layout for Verbs */}
                        {isVerb && (verbForms.past || verbForms.participle) ? (
                            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Conjugation</h3>
                                <div className="grid grid-cols-3 gap-2 text-center">
                                    <div className="p-2 bg-slate-800 rounded border border-slate-700">
                                        <div className="text-xs text-slate-500 mb-1">Base</div>
                                        <div className="font-bold text-white text-lg">{item.word}</div>
                                    </div>
                                    <div className="p-2 bg-slate-800 rounded border border-slate-700">
                                        <div className="text-xs text-slate-500 mb-1">Past (V2)</div>
                                        <div className="font-bold text-amber-400 text-lg">{verbForms.past || '-'}</div>
                                    </div>
                                    <div className="p-2 bg-slate-800 rounded border border-slate-700">
                                        <div className="text-xs text-slate-500 mb-1">Participle (V3)</div>
                                        <div className="font-bold text-emerald-400 text-lg">{verbForms.participle || '-'}</div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            /* Generic Definition */
                            item.definition && (
                                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Definition & Context</h3>
                                    <p className="text-slate-200 leading-relaxed">{item.definition}</p>
                                </div>
                            )
                        )}

                        {/* Examples */}
                        {(item.example || item.examSentence) && (
                            <div className="bg-gradient-to-r from-slate-800 to-slate-800/50 rounded-xl p-4 border-l-4 border-l-purple-500 border-y border-r border-slate-700">
                                <h3 className="text-sm font-bold text-purple-400 uppercase tracking-wider mb-2">Example</h3>
                                <p className="text-white text-lg font-serif italic">"{item.examSentence || item.example}"</p>
                            </div>
                        )}

                        {/* Visual Associations (e.g. Colors, Countries placeholder) */}
                        {category === 'Colors' && item.hex && (
                            <div className="flex items-center gap-4 bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                                <div className="w-16 h-16 rounded-full shadow-lg border-2 border-slate-600" style={{ backgroundColor: item.hex }}></div>
                                <div>
                                    <h3 className="text-sm font-bold text-slate-400 uppercase">Visual Color</h3>
                                    <p className="font-mono text-white">{item.hex}</p>
                                </div>
                            </div>
                        )}

                        {/* Word Family */}
                        {item.wordFamily && (
                            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Word Family</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {Object.entries(item.wordFamily).map(([pos, word]) => (
                                        word && (
                                            <div key={pos} className="flex justify-between items-center bg-slate-900/50 px-3 py-2 rounded">
                                                <span className="text-xs font-bold text-slate-500 uppercase">{pos}</span>
                                                <span className="text-sky-300 font-medium">{word}</span>
                                            </div>
                                        )
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Metadata Tag */}
                        <div className="flex flex-wrap gap-2 pt-2">
                            {item.level && <span className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-400 border border-slate-700">Level: {item.level}</span>}
                            {item.tag && <span className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-400 border border-slate-700">Tag: {item.tag}</span>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
