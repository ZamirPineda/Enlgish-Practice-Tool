import React, { useState, useEffect } from 'react';
import { MathRow, MathStudyStrategy } from '../types';
import LatexRenderer from './LatexRenderer';
import { shuffle } from '../utils/arrayUtils';

interface MathFlashCardProps {
    strategy: MathStudyStrategy;
    rows: MathRow[]; // Only the rows relevant to this strategy (filtered by section)
    onExit: () => void;
}

const MathFlashCard: React.FC<MathFlashCardProps> = ({ strategy, rows, onExit }) => {
    const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
    const [isFlipped, setIsFlipped] = useState<boolean>(false);
    const [randomizedRows, setRandomizedRows] = useState<MathRow[]>([]);

    // Initialize/Shuffle cards
    useEffect(() => {
        const shuffled = shuffle(rows);
        setRandomizedRows(shuffled);
        setCurrentCardIndex(0);
        setIsFlipped(false);
    }, [strategy, rows]);

    const handleNext = () => {
        setIsFlipped(false);
        setTimeout(() => {
            setCurrentCardIndex((prev) => (prev + 1) % randomizedRows.length);
        }, 150); // slight delay for smooth transition
    };

    if (randomizedRows.length === 0) return <div>Loading...</div>;

    const currentrow = randomizedRows[currentCardIndex];

    // Parse the template to mix Text and LaTeX
    const renderQuestion = () => {
        const parts = strategy.questionTemplate.split(/(\{col\d+\})/g);
        return parts.map((part, idx) => {
            const match = part.match(/\{col(\d+)\}/);
            if (match) {
                const colIndex = parseInt(match[1]);
                const cellContent = currentrow[colIndex];
                return (
                    <span key={idx} className="mx-2 inline-block">
                        <LatexRenderer formula={cellContent} />
                    </span>
                );
            }
            // Render text parts
            if (!part.trim()) return null;
            return <span key={idx} className="font-sans text-slate-300 mx-1">{part}</span>;
        });
    };

    const answerText = currentrow[strategy.answerColumnIndex];

    return (
        <div className="flex flex-col items-center justify-center p-6 h-full max-w-2xl mx-auto">

            {/* ... Header ... */}
            <div className="w-full flex justify-between items-center mb-6 text-slate-400 text-sm">
                <span>{strategy.name}</span>
                <span>{currentCardIndex + 1} / {randomizedRows.length}</span>
                <button onClick={onExit} className="text-slate-500 hover:text-white transition-colors">
                    ✕ Salir
                </button>
            </div>

            {/* Card Container */}
            <div
                className="w-full relative aspect-video cursor-pointer perspective-1000 group"
                style={{ perspective: '1000px' }}
                onClick={() => !isFlipped && setIsFlipped(true)}
            >
                <div
                    className={`relative w-full h-full duration-500 preserve-3d transition-transform ${isFlipped ? 'rotate-y-180' : ''}`}
                    style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
                >

                    {/* Front */}
                    <div
                        className="absolute w-full h-full backface-hidden bg-slate-800 rounded-2xl border-2 border-slate-600 shadow-2xl flex flex-col items-center justify-center p-8 text-center hover:border-sky-500 transition-colors"
                        style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                    >
                        <h3 className="text-slate-400 text-lg mb-4 font-semibold uppercase tracking-wider">Pregunta</h3>
                        <div className="flex flex-wrap justify-center items-center gap-2 text-xl md:text-3xl text-white font-medium max-w-full overflow-hidden break-words">
                            {renderQuestion()}
                        </div>
                        <p className="absolute bottom-6 text-slate-500 text-sm animate-pulse">Haz click para ver la respuesta</p>
                    </div>

                    {/* Back */}
                    <div
                        className="absolute w-full h-full backface-hidden bg-slate-900 rounded-2xl border-2 border-emerald-600 shadow-2xl flex flex-col items-center justify-center p-8 text-center rotate-y-180"
                        style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                    >
                        <h3 className="text-emerald-400 text-lg mb-4 font-semibold uppercase tracking-wider">Respuesta</h3>
                        <div className="text-2xl md:text-4xl text-white font-mono mb-8">
                            <LatexRenderer formula={answerText} block />
                        </div>

                        <div className="flex gap-4 absolute bottom-6 w-full px-8 justify-center">
                            <button
                                onClick={(e) => { e.stopPropagation(); handleNext(); }}
                                className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-2 rounded-full font-bold transition-all flex-1 max-w-[150px]"
                            >
                                Siguiente
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats / Motivation */}
            <div className="mt-8 text-center">
                <p className="text-slate-500 text-sm">
                    Ganarás XP al completar la sesión (Próximamente)
                </p>
            </div>
        </div>
    );
};

export default MathFlashCard;
