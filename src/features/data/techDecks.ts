export type {
  TechCard,
  TechDeck,
} from "@/features/data/techDecks_chunks/types";
import { techDecksPart1 } from "@/features/data/techDecks_chunks/part1";
import { techDecksPart2 } from "@/features/data/techDecks_chunks/part2";
import { techDecksPart3 } from "@/features/data/techDecks_chunks/part3";
import { techDecksPart4 } from "@/features/data/techDecks_chunks/part4";
import { techDecksPart5 } from "@/features/data/techDecks_chunks/part5";
import { techDecksPart6 } from "@/features/data/techDecks_chunks/part6";
import type { TechDeck } from "@/features/data/techDecks_chunks/types";

export const techDecks: TechDeck[] = [
  ...techDecksPart1,
  ...techDecksPart2,
  ...techDecksPart3,
  ...techDecksPart4,
  ...techDecksPart5,
  ...techDecksPart6,
];
