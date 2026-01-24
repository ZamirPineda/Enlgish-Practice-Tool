
import React, { useState } from 'react';
import { personalPhrasesData } from '../data/personalPhrases';

interface PersonalPhrasesViewProps {
  onPlayAudio: (text: string) => void;
}

const PlayIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
    </svg>
);

const BulbIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
        <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
    </svg>
);

const PersonalPhrasesView: React.FC<PersonalPhrasesViewProps> = ({ onPlayAudio }) => {
  const initialCategory = personalPhrasesData.length > 0 ? personalPhrasesData[0].title : null;
  const [expandedCategory, setExpandedCategory] = useState<string | null>(initialCategory);

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-900 text-white">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-sky-400 mb-2">My Personal Scripts</h1>
            <p className="text-slate-400">
                Customized responses for <span className="font-semibold text-white">Zamir Pineda</span>. 
                Learn to sound like a native when talking about your own life.
            </p>
        </div>

        <div className="space-y-6">
            {personalPhrasesData.map((category) => (
                <div key={category.title} className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
                    <button 
                        onClick={() => setExpandedCategory(expandedCategory === category.title ? null : category.title)}
                        className="w-full px-6 py-4 flex justify-between items-center bg-slate-700/50 hover:bg-slate-700 transition-colors text-left"
                    >
                        <h2 className="text-xl font-bold text-white">{category.title}</h2>
                        <svg 
                            className={`w-6 h-6 text-slate-400 transform transition-transform ${expandedCategory === category.title ? 'rotate-180' : ''}`} 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {expandedCategory === category.title && (
                        <div className="p-6 grid gap-6">
                            {category.scripts.map((script) => (
                                <div key={script.id} className="bg-slate-900/50 rounded-xl p-5 border border-slate-700 shadow-sm">
                                    <div className="flex items-start justify-between mb-4 border-b border-slate-700/50 pb-3">
                                        <div>
                                            <span className="text-xs font-bold text-sky-500 uppercase tracking-wider">The Question / Situation</span>
                                            <h3 className="text-lg font-semibold text-white mt-1">"{script.question}"</h3>
                                            <p className="text-xs text-slate-500 mt-1">Context: {script.context}</p>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        {/* Formal Answer */}
                                        <div className="bg-slate-800 rounded-lg p-4 border-l-4 border-purple-500">
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="text-xs font-bold text-purple-300 uppercase">Formal / Professional</span>
                                                <button 
                                                    onClick={() => onPlayAudio(script.formal)}
                                                    className="text-slate-400 hover:text-white transition-colors"
                                                    title="Listen"
                                                >
                                                    <PlayIcon />
                                                </button>
                                            </div>
                                            <p className="text-slate-200 leading-relaxed">"{script.formal}"</p>
                                        </div>

                                        {/* Casual Answer */}
                                        <div className="bg-slate-800 rounded-lg p-4 border-l-4 border-emerald-500">
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="text-xs font-bold text-emerald-300 uppercase">Casual / Friends</span>
                                                <button 
                                                    onClick={() => onPlayAudio(script.casual)}
                                                    className="text-slate-400 hover:text-white transition-colors"
                                                    title="Listen"
                                                >
                                                    <PlayIcon />
                                                </button>
                                            </div>
                                            <p className="text-slate-200 leading-relaxed">"{script.casual}"</p>
                                        </div>
                                    </div>

                                    {/* Native Tip */}
                                    <div className="mt-4 bg-yellow-900/20 rounded-lg p-3 border border-yellow-500/20 flex items-start gap-3">
                                        <div className="mt-0.5 flex-shrink-0">
                                            <BulbIcon />
                                        </div>
                                        <div>
                                            <span className="text-xs font-bold text-yellow-400 uppercase block mb-1">Native Nuance</span>
                                            <p className="text-sm text-slate-300">{script.nativeTip}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PersonalPhrasesView;
