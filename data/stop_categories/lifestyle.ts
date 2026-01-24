
import { StopData } from '../../types';
import { foodAndDrinksData } from './lifestyle_food_and_drinks';
import { healthAndFitnessData } from './lifestyle_health_and_fitness';
import { personalityTraitsData } from './lifestyle_personality_traits';
import { relationshipsAndSocialData } from './lifestyle_relationships_and_social';

// This file aggregates all lifestyle data modules
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
export const lifestyleData: StopData = {};

alphabet.forEach(letter => {
    lifestyleData[letter] = {
        ...(foodAndDrinksData[letter] || {}),
        ...(healthAndFitnessData[letter] || {}),
        ...(personalityTraitsData[letter] || {}),
        ...(relationshipsAndSocialData[letter] || {})
    };
});
