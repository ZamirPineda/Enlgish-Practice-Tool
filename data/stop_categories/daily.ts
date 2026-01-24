
import { StopData } from '../../types';
import { objectsData } from './daily_objects';
import { clothingData } from './daily_clothing';
import { bodyPartsData } from './daily_body_parts';
import { occupationsData } from './daily_occupations';
import { toolsData } from './daily_tools';
import { householdData } from './daily_household';
import { housingData } from './daily_housing';
import { businessData } from './daily_business';

// This file aggregates all daily data modules
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
export const dailyData: StopData = {};

alphabet.forEach(letter => {
    dailyData[letter] = {
        ...(objectsData[letter] || {}),
        ...(clothingData[letter] || {}),
        ...(bodyPartsData[letter] || {}),
        ...(occupationsData[letter] || {}),
        ...(toolsData[letter] || {}),
        ...(householdData[letter] || {}),
        ...(housingData[letter] || {}),
        ...(businessData[letter] || {})
    };
});
