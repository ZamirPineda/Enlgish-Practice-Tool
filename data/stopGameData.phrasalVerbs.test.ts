import { describe, expect, it } from "vitest";
import { stopGameData } from "./stopGameData";

const newAdvancedPhrasalVerbs = [
  "Bear up under",
  "Come in for",
  "Double down on",
  "Edge out",
  "Faze out",
  "Get round to",
  "Hammer out",
  "Harken back to",
  "Hold over",
  "Home in on",
  "Keep abreast of",
  "Latch on to",
  "Measure up to",
  "Opt out of",
  "Parlay into",
  "Pass off as",
  "Root out",
  "Stave off",
  "Tide over",
  "Wean off",
];

describe("stopGameData advanced phrasal verbs", () => {
  it("includes all 20 new advanced phrasal verbs", () => {
    const allPhrasalVerbs = Object.values(stopGameData)
      .flatMap((categories) => categories["Phrasal Verbs"] ?? [])
      .map((item) => item.word);

    for (const word of newAdvancedPhrasalVerbs) {
      expect(allPhrasalVerbs).toContain(word);
    }
  });

  it("does not repeat any of the 20 new advanced phrasal verbs in the dataset", () => {
    const allPhrasalVerbs = Object.values(stopGameData)
      .flatMap((categories) => categories["Phrasal Verbs"] ?? [])
      .map((item) => item.word);

    for (const word of newAdvancedPhrasalVerbs) {
      expect(allPhrasalVerbs.filter((value) => value === word)).toHaveLength(1);
    }
  });

  it("keeps required metadata and advanced level for the 20 new entries", () => {
    const phrasalVerbs = Object.values(stopGameData).flatMap(
      (categories) => categories["Phrasal Verbs"] ?? [],
    );

    for (const word of newAdvancedPhrasalVerbs) {
      const entry = phrasalVerbs.find((item) => item.word === word);
      expect(entry).toBeDefined();
      expect(entry?.translation).toBeTruthy();
      expect(entry?.ipa).toBeTruthy();
      expect(entry?.definition).toBeTruthy();
      expect(entry?.examSentence).toBeTruthy();
      expect(["C1", "C2"]).toContain(entry?.level);
    }
  });
});
