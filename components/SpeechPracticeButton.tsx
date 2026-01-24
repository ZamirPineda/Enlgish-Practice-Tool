import React, { useState, useEffect } from 'react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';

interface SpeechPracticeButtonProps {
    targetText: string;
    onCorrect: () => void;
}

const MicIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
    </svg>
);

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
);

const SpeechPracticeButton: React.FC<SpeechPracticeButtonProps> = ({ targetText, onCorrect }) => {
    const [status, setStatus] = useState<'idle' | 'listening' | 'correct' | 'incorrect'>('idle');

    // Normalize text for comparison (remove punctuation, lowercase)
    const normalize = (text: string) => text.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "").trim();

    const handleTranscript = (transcript: string) => {
        if (!transcript) return;

        const spoken = normalize(transcript);
        const target = normalize(targetText);

        // Simple "includes" check or exact match
        if (spoken.includes(target) || target.includes(spoken)) {
            setStatus('correct');
            onCorrect();
            stopListening();
        } else {
            // Keep listening or maybe enable a timeout to show incorrect?
            // For now, let's just keep listening until match or stop
        }
    };

    const { micState, interimTranscript, startListening, stopListening } = useSpeechRecognition(handleTranscript);

    // Effect to reset status after correct
    useEffect(() => {
        if (status === 'correct') {
            const timer = setTimeout(() => setStatus('idle'), 2000);
            return () => clearTimeout(timer);
        }
    }, [status]);

    const handleClick = () => {
        if (micState === 'listening') {
            stopListening();
            setStatus('idle');
        } else {
            startListening();
            setStatus('listening');
        }
    };

    return (
        <div className="flex items-center gap-2">
            <button
                onClick={handleClick}
                className={`p-2 rounded-full transition-all duration-300 ${status === 'correct' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' :
                        micState === 'listening' ? 'bg-red-500 text-white animate-pulse shadow-lg shadow-red-500/30' :
                            'bg-slate-700 text-slate-400 hover:bg-slate-600 hover:text-white'
                    }`}
                title="Practice Pronunciation"
                disabled={status === 'correct'}
            >
                {status === 'correct' ? <CheckIcon /> : <MicIcon />}
            </button>

            {micState === 'listening' && (
                <div className="text-xs text-sky-400 font-mono animate-fade-in whitespace-nowrap overflow-hidden max-w-[100px] text-ellipsis">
                    {interimTranscript || "Listening..."}
                </div>
            )}
        </div>
    );
};

export default SpeechPracticeButton;
