import { AbilityScoreKey, AbilityScoreSet } from "./types";

export function abilityModifier(score: number): number {
  return Math.floor((score - 10) / 2);
}

export function formatModifier(mod: number): string {
  return mod >= 0 ? `+${mod}` : `${mod}`;
}

export function totalAbilityScore(
  base: AbilityScoreSet,
  bonuses: AbilityScoreSet,
  ability: AbilityScoreKey
): number {
  return base[ability] + bonuses[ability];
}
