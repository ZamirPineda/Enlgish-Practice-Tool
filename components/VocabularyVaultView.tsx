
import React, { useState, useMemo, useEffect } from 'react';
import { SrsVocabularyItem } from '../types';
import { starterKits } from '../data/vocabularyVault';
import { createNewSrsItem, getDueReviewItems, calculateSrsData } from '../utils/srs';
import ReviewSession from './ReviewSession';
import { generateVocabularyDetails } from '../services/geminiService';

interface VocabularyVaultViewProps {
  onPlayWord: (text: string) => void;
}

const PlayIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
    </svg>
);

const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

const MagicWandIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
    </svg>
);

const Spinner = () => (
    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

const MemoryBar = ({ interval }: { interval: number }) => {
    const percentage = Math.min(100, (interval / 30) * 100);
    const color = percentage > 80 ? 'bg-emerald-500' : percentage > 40 ? 'bg-sky-500' : 'bg-amber-500';
    return (
        <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden mt-2" title={`Memory Strength: ${Math.round(percentage)}%`}>
            <div className={`${color} h-full transition-all duration-1000`} style={{ width: `${percentage}%` }}></div>
        </div>
    );
};

const VocabularyVaultView: React.FC<VocabularyVaultViewProps> = ({ onPlayWord }) => {
  const [deck, setDeck] = useState<Record<string, SrsVocabularyItem>>({});
  const [isReviewing, setIsReviewing] = useState(false);
  const [activeTab, setActiveTab] = useState<'study' | 'collection' | 'sync'>('study');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [importText, setImportText] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newWord, setNewWord] = useState('');
  const [newContext, setNewContext] = useState('');
  const [newDef, setNewDef] = useState('');
  const [generatedData, setGeneratedData] = useState<any>(null); // Store full API response
  const [isMagicLoading, setIsMagicLoading] = useState(false);

  const [reviewItems, setReviewItems] = useState<SrsVocabularyItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('vocab-vault-deck');
    if (saved) {
        try {
            setDeck(JSON.parse(saved));
        } catch (e) {
            console.error("Failed to parse deck", e);
        }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('vocab-vault-deck', JSON.stringify(deck));
  }, [deck]);

  const deckList = useMemo(() => Object.values(deck) as SrsVocabularyItem[], [deck]);
  const dueItems = useMemo(() => getDueReviewItems(deck), [deck]);
  
  const filteredCollection = useMemo(() => {
    return deckList.filter(item => 
        item.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
    ).sort((a, b) => a.word.localeCompare(b.word));
  }, [deckList, searchTerm]);

  const handleAddToDeck = (item: { word: string; definition: string; ipa?: string; example?: string; partOfSpeech?: string; tags?: string[]; originalContext?: string }) => {
    const wordKey = item.word.trim();
    if (deck[wordKey]) {
        alert("Word already in your vault!");
        return;
    }
    const newItem = {
        ...createNewSrsItem(wordKey, item.definition.trim()),
        ipa: item.ipa,
        example: item.example,
        partOfSpeech: item.partOfSpeech,
        tags: item.tags,
        originalContext: item.originalContext
    };
    setDeck(prev => ({ ...prev, [wordKey]: newItem }));
    resetAddForm();
    setIsAddOpen(false);
  };

  const resetAddForm = () => {
      setNewWord('');
      setNewContext('');
      setNewDef('');
      setGeneratedData(null);
  };

  const handleMagicFill = async () => {
      if (!newWord.trim()) return;
      setIsMagicLoading(true);
      const details = await generateVocabularyDetails(newWord.trim(), newContext.trim());
      if (details) {
          setGeneratedData(details); // Store structured data
          setNewWord(newWord.trim()); 
          setNewDef(details.definition); // Show simplified definition in textarea
      }
      setIsMagicLoading(false);
  };

  const handleSaveFromModal = () => {
      if(generatedData) {
          handleAddToDeck({
              word: newWord,
              definition: newDef, // Allow user editing
              ipa: generatedData.ipa,
              example: generatedData.example,
              partOfSpeech: generatedData.partOfSpeech,
              tags: generatedData.tags,
              originalContext: newContext.trim()
          });
      } else {
          // Manual entry
          handleAddToDeck({ word: newWord, definition: newDef });
      }
  };

  const handleDelete = (word: string) => {
      if (confirm(`Remove "${word}"?`)) {
          const newDeck = { ...deck };
          delete newDeck[word];
          setDeck(newDeck);
      }
  };

  const handleExport = () => {
      navigator.clipboard.writeText(JSON.stringify(deck)).then(() => {
          setCopySuccess(true);
          setTimeout(() => setCopySuccess(false), 3000);
      });
  };

  const handleImport = () => {
      try {
          const parsed = JSON.parse(importText);
          if (parsed && typeof parsed === 'object') {
              setDeck(parsed);
              setImportText('');
              alert("Import successful!");
              setActiveTab('collection');
          }
      } catch (e) {
          alert("Invalid backup code.");
      }
  };

  const handleReviewComplete = (wasCorrect: boolean) => {
      const item = reviewItems[currentIndex];
      const updatedItem = calculateSrsData(item, wasCorrect);
      setDeck(prev => ({ ...prev, [item.word]: updatedItem }));
      if (currentIndex < reviewItems.length - 1) {
          setCurrentIndex(currentIndex + 1);
      } else {
          setIsReviewing(false);
      }
  };

  if (isReviewing && reviewItems[currentIndex]) {
      return (
          <ReviewSession 
            item={reviewItems[currentIndex]} 
            progress={{ current: currentIndex + 1, total: reviewItems.length }}
            onComplete={handleReviewComplete}
            onFinishSession={() => setIsReviewing(false)}
            onPlayAudio={onPlayWord}
          />
      );
  }

  const masteredCount = deckList.filter(i => i.status === 'mastered').length;
  const learningCount = deckList.filter(i => i.status !== 'new').length;
  const totalInDeck = deckList.length;
  const progressPercent = totalInDeck > 0 ? (learningCount / totalInDeck) * 100 : 0;

  return (
    <div className="flex-1 overflow-y-auto bg-slate-900 p-4 sm:p-8">
        <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10 border-b border-slate-800 pb-8">
                <div>
                    <h1 className="text-5xl font-black text-white tracking-tighter mb-4">Vocabulary Vault</h1>
                    <nav className="flex flex-wrap gap-4">
                        <button onClick={() => setActiveTab('study')} className={`text-xs font-bold uppercase tracking-widest pb-2 transition-all ${activeTab === 'study' ? 'text-sky-400 border-b-2 border-sky-400' : 'text-slate-500 hover:text-slate-300'}`}>Daily Study</button>
                        <button onClick={() => setActiveTab('collection')} className={`text-xs font-bold uppercase tracking-widest pb-2 transition-all ${activeTab === 'collection' ? 'text-sky-400 border-b-2 border-sky-400' : 'text-slate-500 hover:text-slate-300'}`}>My Collection ({totalInDeck})</button>
                        <button onClick={() => setActiveTab('sync')} className={`text-xs font-bold uppercase tracking-widest pb-2 transition-all ${activeTab === 'sync' ? 'text-amber-400 border-b-2 border-amber-400' : 'text-slate-500 hover:text-slate-300'}`}>Backup & Sync 🔄</button>
                    </nav>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <button onClick={() => { resetAddForm(); setIsAddOpen(true); }} className="flex-1 md:flex-none bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-6 rounded-2xl border border-slate-700 transition-all flex items-center justify-center gap-2">+ Add Word</button>
                    <button 
                        onClick={() => { setReviewItems(dueItems); setCurrentIndex(0); setIsReviewing(true); }}
                        disabled={dueItems.length === 0}
                        className={`flex-1 md:flex-none py-3 px-8 rounded-2xl font-black transition-all shadow-2xl flex items-center justify-center gap-3 ${dueItems.length > 0 ? 'bg-sky-600 hover:bg-sky-500 text-white scale-105' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}
                    >
                        {dueItems.length > 0 ? `Review Now (${dueItems.length})` : 'All caught up!'}
                    </button>
                </div>
            </div>

            {activeTab === 'study' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6 shadow-xl">
                            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-6">Learning Pulse</h3>
                            <div className="space-y-6">
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-slate-400 text-xs font-bold uppercase mb-1">Due for review</p>
                                        <span className="text-5xl font-black text-sky-400">{dueItems.length}</span>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-emerald-400 text-xs font-bold uppercase mb-1">Mastered</p>
                                        <span className="text-2xl font-black text-white">{masteredCount}</span>
                                    </div>
                                </div>
                                <div className="h-4 w-full bg-slate-900/50 rounded-full p-1 border border-slate-700 overflow-hidden">
                                    <div className="bg-sky-500 h-full rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(14,165,233,0.5)]" style={{ width: `${progressPercent}%` }}></div>
                                </div>
                                <p className="text-[10px] text-center text-slate-500 font-bold uppercase tracking-widest">{learningCount} of {totalInDeck} words started</p>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-amber-600/10 to-orange-600/10 border border-amber-500/20 rounded-3xl p-6">
                            <h4 className="text-amber-400 font-bold text-sm mb-2 flex items-center gap-2">💡 Zamir's Study Tip</h4>
                            <p className="text-slate-400 text-xs leading-relaxed">Add whole sentences as "Context" when adding a new word. The AI will give you a better definition!</p>
                        </div>
                    </div>

                    <div className="lg:col-span-2 space-y-12">
                        <section>
                            <h2 className="text-xl font-black text-white mb-6 flex items-center gap-3">🚀 High-Frequency Starter Kit</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {starterKits.highFrequency.map(item => (
                                    <div key={item.word} className="bg-slate-800/40 border border-slate-800 p-5 rounded-2xl hover:border-sky-500/30 transition-all group">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="text-lg font-black text-white group-hover:text-sky-400 transition-colors">{item.word}</h4>
                                                <p className="text-slate-500 text-xs line-clamp-2">{item.definition}</p>
                                            </div>
                                            <button onClick={() => handleAddToDeck(item)} disabled={!!deck[item.word]} className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${deck[item.word] ? 'bg-emerald-500/20 text-emerald-500' : 'bg-slate-800 text-slate-500 hover:bg-sky-600 hover:text-white'}`}>{deck[item.word] ? '✓' : '+'}</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            )}

            {activeTab === 'collection' && (
                <div className="animate-fade-in space-y-6">
                    <div className="relative flex-1 mb-8">
                        <input type="text" placeholder="Search by word, definition or tag..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-6 py-3 text-white focus:ring-2 focus:ring-sky-500 outline-none" />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">🔍</div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-20">
                        {filteredCollection.map(item => (
                            <div key={item.word} className="bg-slate-800 border border-slate-700 p-5 rounded-2xl hover:shadow-2xl transition-all group relative flex flex-col">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-xl font-black text-white">{item.word}</h3>
                                        <button onClick={() => onPlayWord(item.word)} className="text-slate-500 hover:text-sky-400"><PlayIcon/></button>
                                    </div>
                                    <button onClick={() => handleDelete(item.word)} className="opacity-0 group-hover:opacity-100 p-2 hover:bg-red-500/10 rounded-lg transition-all"><TrashIcon /></button>
                                </div>
                                <div className="flex flex-wrap gap-1 mb-3">
                                    {item.partOfSpeech && <span className="text-[10px] bg-slate-700 text-slate-300 px-1.5 py-0.5 rounded border border-slate-600 uppercase">{item.partOfSpeech}</span>}
                                    {item.tags?.map(tag => (
                                        <span key={tag} className="text-[10px] bg-sky-900/30 text-sky-400 px-1.5 py-0.5 rounded border border-sky-800/30">{tag}</span>
                                    ))}
                                </div>
                                <p className="text-slate-400 text-sm mb-4 line-clamp-2 italic flex-1">"{item.definition}"</p>
                                <div className="flex justify-between items-center text-[10px] font-black uppercase text-slate-500">
                                    <span>Strength</span>
                                    <span className={item.status === 'mastered' ? 'text-emerald-500' : 'text-sky-500'}>{item.status}</span>
                                </div>
                                <MemoryBar interval={item.interval} />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'sync' && (
                <div className="animate-fade-in space-y-10 max-w-2xl mx-auto py-8">
                    <section className="bg-slate-800 border border-slate-700 rounded-3xl p-8 shadow-xl">
                        <h2 className="text-2xl font-black text-white mb-2">Export Vault</h2>
                        <p className="text-slate-400 text-sm mb-6">Store this code to keep your progress safe.</p>
                        <button onClick={handleExport} className={`w-full py-4 rounded-2xl font-black transition-all ${copySuccess ? 'bg-emerald-600 text-white' : 'bg-sky-600 hover:bg-sky-500 text-white'}`}>{copySuccess ? '✅ DATA COPIED' : 'COPY BACKUP CODE'}</button>
                    </section>
                    <section className="bg-slate-800 border border-slate-700 rounded-3xl p-8 shadow-xl">
                        <h2 className="text-2xl font-black text-white mb-2">Import Vault</h2>
                        <textarea value={importText} onChange={(e) => setImportText(e.target.value)} placeholder="Paste code here..." className="w-full h-32 bg-slate-900 border border-slate-700 rounded-2xl p-4 text-slate-300 text-xs font-mono mb-4 focus:ring-2 focus:ring-amber-500 outline-none" />
                        <button onClick={handleImport} disabled={!importText.trim()} className="w-full py-4 bg-slate-700 hover:bg-slate-600 disabled:opacity-30 text-white rounded-2xl font-black">RESTORE VAULT</button>
                    </section>
                </div>
            )}
        </div>

        {isAddOpen && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-[70] animate-fade-in">
                <div className="bg-slate-800 rounded-3xl p-8 w-full max-w-md border border-slate-700 shadow-2xl">
                    <h2 className="text-2xl font-black text-white mb-4">Add New Word</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">Word to learn</label>
                            <div className="flex gap-2">
                                <input 
                                    type="text" 
                                    value={newWord} 
                                    onChange={(e) => setNewWord(e.target.value)} 
                                    className="flex-1 bg-slate-900 border border-slate-700 rounded-xl p-3 text-white outline-none focus:ring-2 focus:ring-sky-500" 
                                    placeholder="e.g. Ubiquitous" 
                                />
                                <button
                                    onClick={handleMagicFill}
                                    disabled={!newWord.trim() || isMagicLoading}
                                    className="bg-gradient-to-r from-purple-600 to-sky-600 hover:from-purple-500 hover:to-sky-500 text-white px-4 rounded-xl flex items-center justify-center transition-all disabled:opacity-50"
                                    title="Auto-fill with AI"
                                >
                                    {isMagicLoading ? <Spinner /> : <MagicWandIcon />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">Context / Source Sentence (Optional)</label>
                            <input 
                                type="text" 
                                value={newContext} 
                                onChange={(e) => setNewContext(e.target.value)} 
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-slate-300 outline-none focus:ring-2 focus:ring-sky-500" 
                                placeholder="Where did you see it? e.g. 'The wifi was ubiquitous in the city.'" 
                            />
                            <p className="text-[10px] text-slate-500 mt-1 ml-1">Providing context helps the AI give you the *correct* definition.</p>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">Definition & Notes</label>
                            <textarea 
                                value={newDef} 
                                onChange={(e) => setNewDef(e.target.value)} 
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white outline-none focus:ring-2 focus:ring-sky-500 h-24" 
                                placeholder="Meaning, Example, etc." 
                            />
                        </div>

                        {generatedData && (
                            <div className="bg-sky-900/20 border border-sky-500/20 p-3 rounded-lg flex flex-wrap gap-2">
                                <span className="text-xs text-sky-300 font-mono">{generatedData.ipa}</span>
                                {generatedData.partOfSpeech && <span className="text-xs text-slate-400 border border-slate-600 px-1 rounded">{generatedData.partOfSpeech}</span>}
                                {generatedData.tags?.map((t: string) => <span key={t} className="text-xs text-emerald-400">#{t}</span>)}
                            </div>
                        )}
                    </div>
                    <div className="flex gap-3 mt-8">
                        <button onClick={() => setIsAddOpen(false)} className="flex-1 py-3 text-slate-400 font-bold hover:text-white transition-colors">Cancel</button>
                        <button disabled={!newWord || !newDef} onClick={handleSaveFromModal} className="flex-1 bg-sky-600 hover:bg-sky-500 text-white font-bold py-3 rounded-2xl disabled:opacity-30 transition-all">Save Word</button>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};

export default VocabularyVaultView;
