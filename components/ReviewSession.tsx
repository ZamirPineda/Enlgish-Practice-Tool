import React, { useState } from 'react';
import { SrsVocabularyItem } from '../types';

interface ReviewSessionProps {
    item: SrsVocabularyItem;
    progress: { current: number; total: number };
    onComplete: (wasCorrect: boolean) => void;
    onFinishSession: () => void;
    onPlayAudio: (text: string) => void;
}

const ReviewSession: React.FC<ReviewSessionProps> = ({ item, progress, onComplete, onFinishSession, onPlayAudio }) => {
    const [isRevealed, setIsRevealed] = useState(false);

    const handleResult = (correct: boolean) => {
        onComplete(correct);
        setIsRevealed(false);
    };

    return (
        <div className="flex-1 flex flex-col pt-8 pb-4 max-w-2xl mx-auto w-full animate-fade-in">
            <div className="flex justify-between items-center mb-6">
                <button onClick={onFinishSession} className="text-slate-500 hover:text-white transition-colors">← Quit</button>
                <span className="text-slate-500 font-bold uppercase text-xs tracking-widest">Review {progress.current} / {progress.total}</span>
            </div>

            <div className="flex-1 bg-slate-800 border border-slate-700 rounded-3xl p-8 shadow-2xl flex flex-col items-center justify-center text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-slate-700">
                    <div className="bg-sky-500 h-full transition-all duration-500" style={{ width: `${(progress.current / progress.total) * 100}%` }}></div>
                </div>

                <div className="mb-8">
                    <h2 className="text-4xl font-black text-white mb-4">{item.word}</h2>
                    <button
                        onClick={() => onPlayAudio(item.word)}
                        className="bg-slate-700 hover:bg-sky-600 text-white p-3 rounded-full transition-all inline-flex items-center justify-center"
                        aria-label={`Listen to pronunciation of ${item.word}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                        </svg>
                    </button>
                    {item.ipa && <p className="text-slate-500 font-mono mt-4">{item.ipa}</p>}
                </div>

                {!isRevealed ? (
                    <button
                        onClick={() => setIsRevealed(true)}
                        className="w-full max-w-xs bg-sky-600 hover:bg-sky-500 text-white font-bold py-4 rounded-xl shadow-lg transition-all"
                    >
                        Show Answer
                    </button>
                ) : (
                    <div className="w-full animate-fade-in">
                        <div className="mb-8 bg-slate-900/50 p-6 rounded-xl border border-slate-700">
                            <h3 className="text-amber-400 font-bold uppercase text-xs mb-2">Meaning</h3>
                            <p className="text-lg text-slate-200">{item.definition}</p>
                            {item.example && (
                                <div className="mt-4 pt-4 border-t border-slate-700/50">
                                    <p className="text-slate-400 italic">"{item.example}"</p>
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={() => handleResult(false)}
                                className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 font-bold py-4 rounded-xl transition-all"
                            >
                                Forgot it 😓
                            </button>
                            <button
                                onClick={() => handleResult(true)}
                                className="bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-bold py-4 rounded-xl transition-all"
                            >
                                Got it! 🚀
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReviewSession;
