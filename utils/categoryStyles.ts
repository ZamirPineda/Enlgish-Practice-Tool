import { WordCategory } from '../types';

export const categoryStyles: Partial<Record<WordCategory, string>> = {
    'Simple Present (3rd Person)': 'border-b border-dotted border-green-400/50 hover:border-green-400',
    'Simple Past': 'border-b border-dotted border-green-400/50 hover:border-green-400',
    'Verb + Gerund': 'border-b border-dotted border-purple-400/50 hover:border-purple-400',
    'Verb + Infinitive': 'border-b border-dotted border-purple-400/50 hover:border-purple-400',
    'Idiom': 'border-b border-dotted border-amber-400/50 hover:border-amber-400',
    'Negative Adverb': 'border-b border-dotted border-red-400/50 hover:border-red-400',
    'Auxiliary': 'border-b border-dotted border-pink-400/50 hover:border-pink-400',
    'Subject': 'border-b border-dotted border-indigo-400/50 hover:border-indigo-400',
    'Quantifier': 'border-b border-dotted border-fuchsia-400/50 hover:border-fuchsia-400 text-fuchsia-100',
    'Adverb of Frequency': 'border-b border-dotted border-orange-400/50 hover:border-orange-400 text-orange-100',
    'Demonstrative': 'border-b border-dotted border-blue-400/50 hover:border-blue-400 text-blue-100',
    'Question Word': 'border-b border-dotted border-teal-400/50 hover:border-teal-400 text-teal-100',
    // IELTS Categories
    'Trend Verb': 'border-b-2 border-red-500/70 hover:border-red-500 text-red-200 font-semibold',
    'Trend Adjective': 'border-b-2 border-orange-500/70 hover:border-orange-500 text-orange-200',
    'Environmental Term': 'border-b-2 border-emerald-500/70 hover:border-emerald-500 text-emerald-200 font-semibold',
    'Academic Noun': 'border-b-2 border-indigo-500/70 hover:border-indigo-500 text-indigo-200 font-serif italic',
    'Cultural Concept': 'border-b-2 border-purple-500/70 hover:border-purple-500 text-purple-200 font-serif',
    'Connectors': 'border-b-2 border-yellow-500/70 hover:border-yellow-500 text-yellow-200 font-semibold',
    'Adjectives': 'border-b-2 border-cyan-500/70 hover:border-cyan-500 text-cyan-200',
    // Adjective Order Categories
    'Determiner': 'border-b-2 border-gray-400/70 hover:border-gray-300 text-gray-300',
    'Quantity': 'border-b-2 border-slate-400/70 hover:border-slate-300 text-slate-200',
    'Opinion': 'border-b-2 border-pink-500/70 hover:border-pink-400 text-pink-200',
    'Size': 'border-b-2 border-blue-500/70 hover:border-blue-400 text-blue-200',
    'Condition': 'border-b-2 border-teal-500/70 hover:border-teal-400 text-teal-200',
    'Age': 'border-b-2 border-amber-500/70 hover:border-amber-400 text-amber-200',
    'Shape': 'border-b-2 border-indigo-500/70 hover:border-indigo-400 text-indigo-200',
    'Color': 'border-b-2 border-rose-500/70 hover:border-rose-400 text-rose-200',
    'Origin': 'border-b-2 border-green-500/70 hover:border-green-400 text-green-200',
    'Material': 'border-b-2 border-orange-500/70 hover:border-orange-400 text-orange-200',
    'Purpose': 'border-b-2 border-violet-500/70 hover:border-violet-400 text-violet-200',
};

export const DEFAULT_CATEGORY_STYLE = 'border-b border-dotted border-sky-400/50 hover:border-sky-400';

/**
 * Returns the CSS classes for a given word category to be used in StudyDeckView.
 */
export const getCategoryStyle = (category: WordCategory): string => {
    return categoryStyles[category] || DEFAULT_CATEGORY_STYLE;
};
