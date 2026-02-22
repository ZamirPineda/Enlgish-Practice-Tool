import { EnglishLevel, TopicsByLevel } from "../types";

export const structureTopicsByLevel: TopicsByLevel = {
  [EnglishLevel.A1]: [
    { id: "introducing-yourself", name: 'Introducing Yourself (Verb "to be")' },
    {
      id: "daily-routines",
      name: "Talking about Daily Routines (Simple Present)",
    },
    { id: "likes-dislikes", name: "Expressing Likes & Dislikes" },
    { id: "shopping-basics", name: "Shopping for Basics (Quantifiers)" },
  ],
  [EnglishLevel.A2]: [
    {
      id: "describing-past-event",
      name: "Describing a Past Holiday (Simple Past)",
    },
    { id: "making-plans", name: "Making Weekend Plans (be going to)" },
    { id: "giving-directions", name: "Giving Simple Directions" },
    { id: "comparing-things", name: "Comparing Two Cities (Comparatives)" },
  ],
  [EnglishLevel.B1]: [
    {
      id: "talking-about-experiences",
      name: "Talking About Life Experiences (Present Perfect)",
    },
    { id: "giving-advice", name: "Giving Advice to a Friend (Modals)" },
    {
      id: "telling-a-story",
      name: "Telling a Story About a Funny Event (Past Tenses)",
    },
    { id: "making-predictions", name: "Making Predictions (will / might)" },
  ],
  [EnglishLevel.B2]: [
    {
      id: "hypothetical-situations",
      name: "Discussing Hypothetical Situations (Conditionals)",
    },
    { id: "expressing-opinions", name: "Expressing & Defending an Opinion" },
    {
      id: "discussing-advantages-disadvantages",
      name: "Discussing Advantages & Disadvantages",
    },
    { id: "complaining-politely", name: "Complaining Politely" },
    {
      id: "describing-processes",
      name: "Describing Processes (Passive Voice)",
    },
  ],
  [EnglishLevel.C1]: [
    {
      id: "debating-a-topic",
      name: "Debating a Complex Topic (Advanced Language)",
    },
    {
      id: "speculating-about-past",
      name: "Speculating About Past Events (Modals)",
    },
    {
      id: "negotiating-a-solution",
      name: "Negotiating a Solution to a Problem",
    },
    { id: "presenting-an-argument", name: "Presenting a Coherent Argument" },
  ],
};
