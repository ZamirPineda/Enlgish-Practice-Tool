import { StopData } from "@/types";
import { objectsData } from "@/features/data/stop_categories/daily_objects";
import { clothingData } from "@/features/data/stop_categories/daily_clothing";
import { bodyPartsData } from "@/features/data/stop_categories/daily_body_parts";
import { occupationsData } from "@/features/data/stop_categories/daily_occupations";
import { toolsData } from "@/features/data/stop_categories/daily_tools";
import { householdData } from "@/features/data/stop_categories/daily_household";
import { housingData } from "@/features/data/stop_categories/daily_housing";
import { businessData } from "@/features/data/stop_categories/daily_business";

// This file aggregates all daily data modules
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
export const dailyData: StopData = {};

alphabet.forEach((letter) => {
  dailyData[letter] = {
    ...(objectsData[letter] || {}),
    ...(clothingData[letter] || {}),
    ...(bodyPartsData[letter] || {}),
    ...(occupationsData[letter] || {}),
    ...(toolsData[letter] || {}),
    ...(householdData[letter] || {}),
    ...(housingData[letter] || {}),
    ...(businessData[letter] || {}),
  };
});
