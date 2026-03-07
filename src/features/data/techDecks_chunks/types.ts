export interface TechCard {
  prompt: string;
  answer: string;
}

export interface TechDeck {
  id: string;
  name: string;
  cards: TechCard[];
}
