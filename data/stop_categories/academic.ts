import { StopData } from "../../types";
import { ieltsTrendsData } from "./academic_ielts";
import { environmentData } from "./academic_environment";
import { cultureData } from "./academic_culture";

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
