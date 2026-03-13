import { AbilityScoreKey } from "./skills";

export const ABILITY_SCORES: AbilityScoreKey[] = [
  "STR",
  "DEX",
  "CON",
  "INT",
  "WIS",
  "CHA",
];

export const ABILITY_SCORE_NAMES: Record<AbilityScoreKey, string> = {
  STR: "Strength",
  DEX: "Dexterity",
  CON: "Constitution",
  INT: "Intelligence",
  WIS: "Wisdom",
  CHA: "Charisma",
};

export const STANDARD_ARRAY = [15, 14, 13, 12, 10, 8];

export const POINT_BUY = {
  totalPoints: 27,
  min: 8,
  max: 15,
  costs: {
    8: 0,
    9: 1,
    10: 2,
    11: 3,
    12: 4,
    13: 5,
    14: 7,
    15: 9,
  } as Record<number, number>,
};
