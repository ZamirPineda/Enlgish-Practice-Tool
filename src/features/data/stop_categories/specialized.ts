import { StopData } from "@/types";
import { architectureData } from "@/features/data/stop_categories/specialized_architecture";
import { devTermsData } from "@/features/data/stop_categories/specialized_dev_terms";
import { abstractNounsData } from "@/features/data/stop_categories/specialized_abstract_nouns";
import { mythologyData } from "@/features/data/stop_categories/specialized_mythology";

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
