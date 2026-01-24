import React, { useState } from 'react';
import { playNativeTTS } from './utils/audioUtils';
import { createNewSrsItem } from './utils/srs';
import { SrsVocabularyItem, EnglishLevel } from './types';

// Views
import StopGameView from './components/StopGameView';
import StudyDeckView from './components/StudyDeckView';
import PersonalPhrasesView from './components/PersonalPhrasesView';

type ViewMode = 'stop' | 'study' | 'personal';

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
            default:
                return <StopGameView onPlayWord={playNativeTTS} isWordAudioLoading={null} onAddToVault={addToVault} />;
        }
    };

    return (
        <div className="h-screen flex flex-col bg-slate-900 text-white overflow-hidden font-sans">
            <header className="p-4 bg-slate-800 border-b border-slate-700 flex flex-wrap justify-between items-center gap-4 z-10 shadow-lg">
                <h1 className="text-xl font-black bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent">
                    ENGLISH PAL
                </h1>

                <nav className="flex gap-2">
                    <button
                        onClick={() => setCurrentView('stop')}
                        className={`px-4 py-2 rounded-lg font-bold transition-all ${currentView === 'stop' ? 'bg-sky-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                    >
                        🎮 STOP Game
                    </button>
                    <button
                        onClick={() => setCurrentView('study')}
                        className={`px-4 py-2 rounded-lg font-bold transition-all ${currentView === 'study' ? 'bg-sky-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                    >
                        📚 Study Deck
                    </button>
                    <button
                        onClick={() => setCurrentView('personal')}
                        className={`px-4 py-2 rounded-lg font-bold transition-all ${currentView === 'personal' ? 'bg-sky-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                    >
                        👤 Scripts
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
