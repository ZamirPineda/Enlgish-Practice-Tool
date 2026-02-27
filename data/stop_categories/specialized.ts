import { StopData } from "../../types";
import { architectureData } from "./specialized_architecture";
import { devTermsData } from "./specialized_dev_terms";
import { abstractNounsData } from "./specialized_abstract_nouns";
import { mythologyData } from "./specialized_mythology";

// This file aggregates all specialized data modules
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
export const specializedData: StopData = {};

alphabet.forEach((letter) => {
  specializedData[letter] = {
    ...(architectureData[letter] || {}),
    ...(devTermsData[letter] || {}),
    ...(abstractNounsData[letter] || {}),
    ...(mythologyData[letter] || {}),
  };
});
