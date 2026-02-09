
import { StopData } from '../types';
import { countriesData } from './stop_categories/countries';
import { citiesData } from './stop_categories/cities';
import { capitalsData } from './stop_categories/capitals';
import { grammarData } from './stop_categories/grammar';
import { natureData } from './stop_categories/nature';
import { scienceData } from './stop_categories/science';
import { animalsData } from './stop_categories/animals';
import { fruitsData } from './stop_categories/fruits';
import { vegetablesData } from './stop_categories/vegetables';
import { colorsData } from './stop_categories/colors';
import { dailyData } from './stop_categories/daily';
import { mediaData } from './stop_categories/media';
import { academicData } from './stop_categories/academic';
import { specializedData } from './stop_categories/specialized';
import { landmarksData } from './stop_categories/landmarks';
import { historyData } from './stop_categories/history';
import { lifestyleData } from './stop_categories/lifestyle';
import { technologyData } from './stop_categories/technology';
import { languageExtrasData } from './stop_categories/language_extras';
import { educationData } from './stop_categories/education';
import { vocabularyChallengeData } from './stop_categories/vocabulary_challenge';
import { philosophyData } from './stop_categories/philosophy';
import { floraAndGeologyData } from './stop_categories/flora_and_geology';

// This file aggregates all the categorized data into the master structure used by the UI
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
export const stopGameData: StopData = {};

alphabet.forEach(letter => {
    // Merge Fruits & Vegetables arrays if they exist in both files
    const fruitList = fruitsData[letter]?.['Fruits & Vegetables'] || [];
    const vegList = vegetablesData[letter]?.['Fruits & Vegetables'] || [];
    const mergedFood = [...fruitList, ...vegList];

    stopGameData[letter] = {
        // Merge Geography (Countries, Cities, Capitals) from separate files
        ...(countriesData[letter] || {}),
        ...(citiesData[letter] || {}),
        ...(capitalsData[letter] || {}),

        // Merge Landmarks
        ...(landmarksData[letter] || {}),

        // Merge Grammar (Verbs, Adj, Phrasal, Connectors, Emotions)
        ...(grammarData[letter] || {}),

        // Merge Nature (General Nature, Science, Animals, Colors)
        ...(natureData[letter] || {}),
        ...(scienceData[letter] || {}),
        ...(animalsData[letter] || {}),
        ...(colorsData[letter] || {}),

        // Merge Fruits & Vegetables (combined key)
        ...(mergedFood.length > 0 ? { 'Fruits & Vegetables': mergedFood } : {}),

        // Merge Daily (Objects, Clothing, Body, Tools, Occupations, Business)
        ...(dailyData[letter] || {}),

        // Merge Media (Movies, Songs, Sports, Colors - note: Colors moved to separate file but kept in Media grouping logic if needed, though strictly it's usually Nature/Art)
        ...(mediaData[letter] || {}),

        // Merge Academic (Trends, Environment, Culture, Emphasis)
        ...(academicData[letter] || {}),

        // Merge Specialized (Architecture, Dev Terms, Abstract, Mythology)
        ...(specializedData[letter] || {}),

        // Merge History
        ...(historyData[letter] || {}),

        // Merge Lifestyle (Food, Health, Personality, Relationships)
        ...(lifestyleData[letter] || {}),

        // Merge Technology
        ...(technologyData[letter] || {}),

        // Merge Language Extras (Collocations, Idioms)
        ...(languageExtrasData[letter] || {}),

        // Merge Education
        ...(educationData[letter] || {}),

        // Merge Vocabulary Challenges
        ...(vocabularyChallengeData[letter] || {}),

        // Merge Philosophy
        ...(philosophyData[letter] || {}),

        // Merge Flora & Geology (Flowers, Plants, Trees, Mushrooms, Spices, Space, Minerals)
        ...(floraAndGeologyData[letter] || {}),
    };
});
