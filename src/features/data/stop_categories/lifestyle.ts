import { StopData } from "@/types";
import { foodData } from "@/features/data/stop_categories/lifestyle_food_and_drinks";
import { healthData } from "@/features/data/stop_categories/lifestyle_health_and_fitness";
import { personalityData } from "@/features/data/stop_categories/lifestyle_personality_traits";
import { relationshipsData } from "@/features/data/stop_categories/lifestyle_relationships_and_social";

// This file aggregates all lifestyle data modules
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
export const lifestyleData: StopData = {};

alphabet.forEach((letter) => {
  lifestyleData[letter] = {
    ...(foodData[letter] || {}),
    ...(healthData[letter] || {}),
    ...(personalityData[letter] || {}),
    ...(relationshipsData[letter] || {}),
  };
});
