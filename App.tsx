import React, { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { playNativeTTS } from './utils/audioUtils';
import { createNewSrsItem } from './utils/srs';
import { SrsVocabularyItem } from './types';

// Views
const StopGameView = lazy(() => import('./components/StopGameView'));
const StudyDeckView = lazy(() => import('./components/StudyDeckView'));
const PersonalPhrasesView = lazy(() => import('./components/PersonalPhrasesView'));
const VocabularyVaultView = lazy(() => import('./components/VocabularyVaultView'));
const MathView = lazy(() => import('./components/MathView'));
const StudyDocsView = lazy(() => import('./components/StudyDocsView'));

const NavItem = ({ to, children }: { to: string, children: React.ReactNode }) => (
    <NavLink
        to={to}
        className={({ isActive }) =>
            `flex-1 md:flex-none whitespace-nowrap px-3 md:px-4 py-2 rounded-lg font-bold text-sm md:text-base transition-all ${isActive ? 'bg-sky-600 text-white shadow-md' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`
        }
    >
        {children}
    </NavLink>
);

const App: React.FC = () => {
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

    return (
        <HashRouter>
            <div className="h-screen flex flex-col bg-slate-900 text-white overflow-hidden font-sans">
                <header className="p-4 bg-slate-800 border-b border-slate-700 flex flex-wrap justify-between items-center gap-4 z-10 shadow-lg">
                    <h1 className="text-lg md:text-xl font-black bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent truncate">
                        ENGLISH PAL
                    </h1>

                    <nav className="flex gap-2 overflow-x-auto pb-1 md:pb-0 w-full md:w-auto">
                        <NavItem to="/stop">🎮 STOP Game</NavItem>
                        <NavItem to="/study">📚 Study Deck</NavItem>
                        <NavItem to="/personal">👤 Scripts</NavItem>
                        <NavItem to="/vault">🧠 Vault</NavItem>
                        <NavItem to="/calculus">∫ Math</NavItem>
                        <NavItem to="/docs">📖 Docs</NavItem>
                    </nav>
                </header>

                <main className="flex-1 flex flex-col min-h-0 bg-slate-900/50 relative">
                    <Suspense fallback={<div className="flex-1 flex items-center justify-center text-slate-300" role="status">Loading section...</div>}>
                        <Routes>
                            <Route path="/" element={<Navigate to="/stop" replace />} />
                            <Route path="/stop" element={<StopGameView onPlayWord={playNativeTTS} isWordAudioLoading={null} onAddToVault={addToVault} />} />
                            <Route path="/study" element={<StudyDeckView onPlayWord={playNativeTTS} isWordAudioLoading={null} onAddToVault={addToVault} />} />
                            <Route path="/personal" element={<PersonalPhrasesView onPlayAudio={playNativeTTS} />} />
                            <Route path="/vault" element={<VocabularyVaultView onPlayWord={playNativeTTS} />} />
                            <Route path="/calculus" element={<MathView />} />
                            <Route path="/docs" element={<StudyDocsView />} />
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </HashRouter>
    );
};

export default App;
