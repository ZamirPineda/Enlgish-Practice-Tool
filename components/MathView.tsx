import React, { useState } from 'react';
import LatexRenderer from './LatexRenderer';
import { calculusTopic, geometryTopic, algebraTopic, solvedExamples } from '../data/math';
import { MathTopic, SolvedProblem } from '../types';

type MathTab = 'calculus' | 'geometry' | 'algebra' | 'examples';

import MathFlashCard from './MathFlashCard';

const MathView: React.FC = () => {
    const [activeTab, setActiveTab] = useState<MathTab>('calculus');
    const [isStudyMode, setIsStudyMode] = useState<boolean>(false);
    const [selectedStrategy, setSelectedStrategy] = useState<{ strategy: any, rows: any[] } | null>(null);

    const renderTopicTable = (topic: MathTopic, colorClass: string, headerColor: string) => (
        <>
            <div className="text-center mb-6">
                <p className="text-slate-400 text-xs md:text-sm">
                    {topic.description}
                </p>
                {/* Available Strategies for this Topic */}
                {isStudyMode && (
                    <div className="mt-4 flex flex-wrap justify-center gap-3">
                        {topic.sections.flatMap(section =>
                            (section.studyStrategies || []).map(strategy => ({
                                strategy,
                                rows: section.rows
                            }))
                        ).map((item, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedStrategy(item)}
                                className={`px-4 py-2 rounded-full text-sm font-bold border ${colorClass.replace('text-', 'border-')} hover:bg-slate-800 transition-all flex items-center gap-2`}
                            >
                                <span>⚡</span> {item.strategy.name}
                            </button>
                        ))}
                        {topic.sections.every(s => !s.studyStrategies) && (
                            <p className="text-slate-500 italic text-sm">No hay modos de estudio disponibles para este tema aún.</p>
                        )}
                    </div>
                )}
            </div>

            {!isStudyMode ? (
                // NORMAL VIEW: Tables
                topic.sections.map((section, idx) => (
                    <div key={idx} className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden shadow-sm mb-8">
                        {/* ... Existing Table Code ... */}
                        <div className="bg-slate-800/80 px-4 py-3 border-b border-slate-700">
                            <h3 className={`font-bold text-lg ${colorClass}`}>{section.title}</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm md:text-base border-collapse">
                                <thead className="bg-slate-900/50 text-slate-300 font-semibold">
                                    <tr>
                                        {section.headers.map((h, i) => (
                                            <th key={i} className="p-3 border-b border-slate-700 min-w-[120px] whitespace-nowrap first:min-w-[100px]">
                                                {h}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-700/50">
                                    {section.rows.map((row, rIdx) => (
                                        <tr key={rIdx} className="hover:bg-slate-700/30 transition-colors">
                                            {row.map((cell, cIdx) => (
                                                <td key={cIdx} className={`p-3 text-slate-200 ${cIdx === 0 ? 'font-bold ' + colorClass.replace('400', '200') : 'font-mono'}`}>
                                                    {/* Render as LaTeX if it looks like a formula (contains special chars or numbers and is not just text) */}
                                                    {(cIdx > 0 && (cell.includes('\\') || cell.includes('∫') || cell.includes('^') || cell.includes('='))) ? (
                                                        <LatexRenderer formula={cell} />
                                                    ) : (
                                                        cell
                                                    )}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))
            ) : (
                // STUDY MODE: Placeholder if no strategy selected
                !selectedStrategy && (
                    <div className="flex flex-col items-center justify-center py-20 text-slate-500">
                        <div className="text-4xl mb-4">👈</div>
                        <p>Selecciona una opción arriba para empezar a practicar</p>
                    </div>
                )
            )}
        </>
    );

    const renderExamples = (examples: SolvedProblem[]) => (
        <>
            <div className="text-center mb-6">
                <p className="text-slate-400 text-xs md:text-sm">
                    Problemas resueltos paso a paso para entender la lógica.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {examples.map((ex, idx) => (
                    <div key={idx} className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden shadow-lg flex flex-col">
                        <div className="bg-slate-800/80 px-4 py-3 border-b border-slate-700 flex justify-between items-center">
                            <h3 className="font-bold text-amber-400 text-base">{ex.title}</h3>
                        </div>
                        <div className="p-4 bg-slate-900/30 flex-1">
                            <div className="mb-4 text-center">
                                <div className="text-lg font-mono text-white bg-slate-700 px-3 py-1 rounded-md inline-block">
                                    <LatexRenderer formula={ex.problem} block />
                                </div>
                                <p className="text-slate-400 text-sm mt-2 italic">{ex.description}</p>
                            </div>
                            <div className="space-y-3">
                                {ex.steps.map((step, sIdx) => (
                                    <div key={sIdx} className="text-sm border-l-2 border-slate-600 pl-3">
                                        <p className="text-amber-200/80 font-semibold mb-1">Paso {sIdx + 1}:</p>
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
                        <span className={`text-xs font-bold ${isStudyMode ? 'text-slate-400' : 'text-white'}`}>Leer</span>

                        <button
                            onClick={() => { setIsStudyMode(!isStudyMode); setSelectedStrategy(null); }}
                            className={`w-12 h-6 rounded-full transition-colors flex items-center px-1 ${isStudyMode ? 'bg-amber-500' : 'bg-slate-700'}`}
                        >
                            <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${isStudyMode ? 'translate-x-6' : 'translate-x-0'}`} />
                        </button>

                        <span className={`text-xs font-bold ${isStudyMode ? 'text-amber-400' : 'text-slate-400'}`}>Practicar</span>
                    </div>
                </div>

                <div className="flex justify-center gap-4 overflow-x-auto pb-2 md:pb-0">
                    <button
                        onClick={() => setActiveTab('calculus')}
                        className={`px-4 py-2 rounded-lg font-bold text-sm transition-all whitespace-nowrap ${activeTab === 'calculus'
                            ? 'bg-sky-600 text-white shadow-lg shadow-sky-900/50'
                            : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                            }`}
                    >
                        ∫ Cálculo
                    </button>
                    <button
                        onClick={() => setActiveTab('geometry')}
                        className={`px-4 py-2 rounded-lg font-bold text-sm transition-all whitespace-nowrap ${activeTab === 'geometry'
                            ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/50'
                            : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                            }`}
                    >
                        📐 Geometría
                    </button>
                    <button
                        onClick={() => setActiveTab('algebra')}
                        className={`px-4 py-2 rounded-lg font-bold text-sm transition-all whitespace-nowrap ${activeTab === 'algebra'
                            ? 'bg-violet-600 text-white shadow-lg shadow-violet-900/50'
                            : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                            }`}
                    >
                        🧮 Álgebra
                    </button>
                    <button
                        onClick={() => setActiveTab('examples')}
                        className={`px-4 py-2 rounded-lg font-bold text-sm transition-all whitespace-nowrap ${activeTab === 'examples'
                            ? 'bg-amber-500 text-white shadow-lg shadow-amber-900/50'
                            : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                            }`}
                    >
                        💡 Ejemplos
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-8 pb-20 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">

                {activeTab === 'calculus' && renderTopicTable(calculusTopic, 'text-sky-400', 'text-sky-200')}
                {activeTab === 'geometry' && renderTopicTable(geometryTopic, 'text-emerald-400', 'text-emerald-200')}
                {activeTab === 'algebra' && renderTopicTable(algebraTopic, 'text-violet-400', 'text-violet-200')}

                {activeTab === 'examples' && (
                    !isStudyMode ? renderExamples(solvedExamples) : (
                        <div className="text-center py-20 text-slate-500">
                            <p>El modo práctica para ejemplos completos estará disponible pronto.</p>
                            <button onClick={() => setIsStudyMode(false)} className="mt-4 text-sky-400 underline">Volver a modo lectura</button>
                        </div>
                    )
                )}

                <div className="text-center text-slate-500 text-xs pt-8">
                    {/* Footer text */}
                </div>
            </div>
        </div>
    );
};

export default MathView;
