import React, { useState } from 'react';
import { playNativeTTS } from './utils/audioUtils';
import { createNewSrsItem } from './utils/srs';
import { SrsVocabularyItem, EnglishLevel } from './types';

// Views
import StopGameView from './components/StopGameView';
import StudyDeckView from './components/StudyDeckView';
import PersonalPhrasesView from './components/PersonalPhrasesView';
import VocabularyVaultView from './components/VocabularyVaultView';
import MathView from './components/MathView';
import StudyDocsView from './components/StudyDocsView';

type ViewMode = 'stop' | 'study' | 'personal' | 'vault' | 'calculus' | 'study-docs';

const App: React.FC = () => {
    const [currentView, setCurrentView] = useState<ViewMode>('stop');
    const [level, setLevel] = useState<EnglishLevel>(EnglishLevel.B1); // Default to a reasonable level

    // Vocabulary Vault Logic (Kept for compatibility with StopGame/StudyDeck)
    const addToVault = (word: string, definition: string) => {
        try {
            const saved = localStorage.getItem('vocab-vault-deck');
            const deck: Record<string, SrsVocabularyItem> = saved ? JSON.parse(saved) : {};

            // Simple duplicate check normalization
            const key = word.toLowerCase().trim();
            if (deck[key]) return;

            deck[key] = createNewSrsItem(word, definition);
            localStorage.setItem('vocab-vault-deck', JSON.stringify(deck));
            console.log(`Word added to vault: ${word}`);
        } catch (e) {
            console.error("Error saving to vault", e);
        }
    };

    const renderContent = () => {
        switch (currentView) {
            case 'stop':
                return <StopGameView onPlayWord={playNativeTTS} isWordAudioLoading={null} onAddToVault={addToVault} />;
            case 'study':
                return <StudyDeckView level={level} onPlayWord={playNativeTTS} isWordAudioLoading={null} onAddToVault={addToVault} />;
            case 'personal':
                return <PersonalPhrasesView onPlayAudio={playNativeTTS} />;
            case 'vault':
                return <VocabularyVaultView onPlayWord={playNativeTTS} />;
            case 'calculus':
                return <MathView />;
            case 'study-docs':
                return <StudyDocsView />;
            default:
                return <StopGameView onPlayWord={playNativeTTS} isWordAudioLoading={null} onAddToVault={addToVault} />;
        }
    };

    return (
        <div className="h-screen flex flex-col bg-slate-900 text-white overflow-hidden font-sans">
            <header className="p-4 bg-slate-800 border-b border-slate-700 flex flex-wrap justify-between items-center gap-4 z-10 shadow-lg">
                <h1 className="text-lg md:text-xl font-black bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent truncate">
                    ENGLISH PAL
                </h1>

                <nav className="flex gap-2 overflow-x-auto pb-1 md:pb-0 w-full md:w-auto">
                    <button
                        onClick={() => setCurrentView('stop')}
                        className={`flex-1 md:flex-none whitespace-nowrap px-3 md:px-4 py-2 rounded-lg font-bold text-sm md:text-base transition-all ${currentView === 'stop' ? 'bg-sky-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                    >
                        🎮 STOP Game
                    </button>
                    <button
                        onClick={() => setCurrentView('study')}
                        className={`flex-1 md:flex-none whitespace-nowrap px-3 md:px-4 py-2 rounded-lg font-bold text-sm md:text-base transition-all ${currentView === 'study' ? 'bg-sky-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                    >
                        📚 Study Deck
                    </button>
                    <button
                        onClick={() => setCurrentView('personal')}
                        className={`flex-1 md:flex-none whitespace-nowrap px-3 md:px-4 py-2 rounded-lg font-bold text-sm md:text-base transition-all ${currentView === 'personal' ? 'bg-sky-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                    >
                        👤 Scripts
                    </button>
                    <button
                        onClick={() => setCurrentView('vault')}
                        className={`flex-1 md:flex-none whitespace-nowrap px-3 md:px-4 py-2 rounded-lg font-bold text-sm md:text-base transition-all ${currentView === 'vault' ? 'bg-sky-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                    >
                        🧠 Vault
                    </button>
                    <button
                        onClick={() => setCurrentView('calculus')}
                        className={`flex-1 md:flex-none whitespace-nowrap px-3 md:px-4 py-2 rounded-lg font-bold text-sm md:text-base transition-all ${currentView === 'calculus' ? 'bg-sky-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                    >
                        ∫ Math
                    </button>
                    <button
                        onClick={() => setCurrentView('study-docs')}
                        className={`flex-1 md:flex-none whitespace-nowrap px-3 md:px-4 py-2 rounded-lg font-bold text-sm md:text-base transition-all ${currentView === 'study-docs' ? 'bg-sky-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                    >
                        📖 Docs
                    </button>
                </nav>
            </header>

            {currentView === 'study' && (
                <div className="bg-slate-800 px-4 py-2 border-b border-slate-700 flex justify-center">
                    <select
                        value={level}
                        onChange={(e) => setLevel(e.target.value as EnglishLevel)}
                        className="bg-slate-700 border border-slate-600 text-white text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block p-2.5"
                    >
                        {Object.values(EnglishLevel).map((l) => (
                            <option key={l} value={l}>{l}</option>
                        ))}
                    </select>
                </div>
            )}

            <main className="flex-1 flex flex-col min-h-0 bg-slate-900/50 relative">
                {renderContent()}
            </main>
        </div>
    );
};

export default App;
