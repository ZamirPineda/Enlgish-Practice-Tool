import { StopData } from "@/types";
import { ieltsTrendsData } from "@/features/data/stop_categories/academic_ielts";
import { environmentData } from "@/features/data/stop_categories/academic_environment";
import { cultureData } from "@/features/data/stop_categories/academic_culture";

// This file aggregates all academic data modules
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
export const academicData: StopData = {};

alphabet.forEach((letter) => {
  academicData[letter] = {
    ...(ieltsTrendsData[letter] || {}),
    ...(environmentData[letter] || {}),
    ...(cultureData[letter] || {}),
  };
});
