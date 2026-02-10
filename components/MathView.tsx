import React, { useState } from 'react';
import LatexRenderer from './LatexRenderer';
import { calculusTopic, geometryTopic, algebraTopic, solvedExamples } from '../data/math';
import { MathTopic, SolvedProblem } from '../types';

type MathTab = 'calculus' | 'geometry' | 'algebra' | 'examples';

const MathView: React.FC = () => {
    const [activeTab, setActiveTab] = useState<MathTab>('calculus');

    const renderTopicTable = (topic: MathTopic, colorClass: string, headerColor: string) => (
        <>
            <div className="text-center mb-6">
                <p className="text-slate-400 text-xs md:text-sm">
                    {topic.description}
                </p>
            </div>
            {topic.sections.map((section, idx) => (
                <div key={idx} className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden shadow-sm">
                    <div className="bg-slate-800/80 px-4 py-3 border-b border-slate-700">
                        <h3 className={`font-bold ${colorClass} text-lg`}>{section.title}</h3>
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
                                            <td key={cIdx} className={`p-3 text-slate-200 ${cIdx === 0 ? `font-bold ${headerColor}` : 'font-mono'}`}>
                                                {/* Render as LaTeX if it looks like a formula (contains special chars or numbers and is not just text) */}
                                                {(cIdx > 0 && (cell.includes('\\') || cell.includes('∫') || cell.includes('^') || cell.includes('='))) ? (
                                                    <LatexRenderer formula={cell} />
                                                ) : (
                                                    <span className="whitespace-pre-wrap">{cell}</span>
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ))}
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

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-900">
            {/* Header with Tabs */}
            <div className="flex-shrink-0 bg-slate-900 border-b border-slate-700/50 p-4 text-center">
                <h2 className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500 font-mono tracking-tight mb-4">
                    FORMULARIO MATEMÁTICO
                </h2>

                <div className="flex justify-center gap-4 flex-wrap">
                    <button
                        onClick={() => setActiveTab('calculus')}
                        className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${activeTab === 'calculus'
                            ? 'bg-sky-600 text-white shadow-lg shadow-sky-900/50'
                            : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                            }`}
                    >
                        ∫ Cálculo
                    </button>
                    <button
                        onClick={() => setActiveTab('geometry')}
                        className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${activeTab === 'geometry'
                            ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/50'
                            : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                            }`}
                    >
                        📐 Geometría
                    </button>
                    <button
                        onClick={() => setActiveTab('algebra')}
                        className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${activeTab === 'algebra'
                            ? 'bg-violet-600 text-white shadow-lg shadow-violet-900/50'
                            : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                            }`}
                    >
                        🧮 Álgebra
                    </button>
                    <button
                        onClick={() => setActiveTab('examples')}
                        className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${activeTab === 'examples'
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
                {activeTab === 'examples' && renderExamples(solvedExamples)}

                <div className="text-center text-slate-500 text-xs pt-8">
                    {activeTab === 'calculus' ? 'Formulario de cálculo integral y diferencial.' :
                        activeTab === 'geometry' ? 'Fórmulas geométricas esenciales.' :
                            activeTab === 'algebra' ? 'Fundamentos de álgebra.' :
                                'Ejemplos detallados de aplicación.'}
                </div>
            </div>
        </div>
    );
};

export default MathView;
