import { ORIGIN_STORY_FEATURES } from "@/data/origin-story-features";
import type { OriginFeature, OriginStoryFeatures } from "@/data/origin-story-features";
import type { CharacterData } from "./types";
import { abilityModifier } from "./utils";

// SRD 5.2 proficiency bonus by level
export function proficiencyBonus(level: number): number {
  if (level <= 4) return 2;
  if (level <= 8) return 3;
  return 4; // levels 9-12
}

// Levels that grant a half-feat pick (ASI levels in SRD 5.2)
export const FEAT_LEVELS = [4, 8, 12] as const;

export function isFeatLevel(level: number): boolean {
  return (FEAT_LEVELS as readonly number[]).includes(level);
}

// Parse hit die string ("d8", "d12") into numeric max
function hitDieMax(hitDie: string): number {
  return parseInt(hitDie.replace("d", ""), 10);
}

// Average hit die roll (rounded up) for levels 2+
function hitDieAverage(hitDie: string): number {
  return Math.ceil(hitDieMax(hitDie) / 2) + 1;
}

// Get the origin features data for a given origin story
export function getOriginData(originId: string): OriginStoryFeatures | undefined {
  return ORIGIN_STORY_FEATURES.find((o) => o.originId === originId);
}

// Get features gained at a specific level
export function getFeaturesAtLevel(originId: string, level: number): OriginFeature[] {
  const origin = getOriginData(originId);
  if (!origin) return [];
  return origin.features.filter((f) => f.level === level);
}

// Get all features up to and including a level
export function getFeaturesUpToLevel(originId: string, level: number): OriginFeature[] {
  const origin = getOriginData(originId);
  if (!origin) return [];
  return origin.features.filter((f) => f.level <= level);
}

// Compute max HP for a character at their current level
export function computeHP(data: CharacterData): number {
  const origin = getOriginData(data.originStory);
  if (!origin) return 0;

  const conScore = data.abilityScores.CON + data.abilityScoreBonuses.CON;
  const conMod = abilityModifier(conScore);
  const die = origin.coreTraits.hitDie;

  // Level 1: max hit die + CON mod
  let hp = hitDieMax(die) + conMod;

  // Levels 2+: average + CON mod per level
  for (let i = 2; i <= data.level; i++) {
    hp += hitDieAverage(die) + conMod;
  }

  return Math.max(hp, 1); // minimum 1 HP
}

// Get scaling column values at a specific level for an origin
export function getScalingValues(
  originId: string,
  level: number
): { label: string; value: string | number }[] {
  const origin = getOriginData(originId);
  if (!origin) return [];

  return origin.scaling
    .map((col) => {
      // Find the highest defined level <= current level
      const definedLevels = Object.keys(col.values)
        .map(Number)
        .filter((l) => l <= level)
        .sort((a, b) => b - a);

      if (definedLevels.length === 0) return null;
      return { label: col.label, value: col.values[definedLevels[0]] };
    })
    .filter((v): v is NonNullable<typeof v> => v != null);
}

// Check if leveling up is valid (no gaps)
export function canLevelUp(data: CharacterData): { ok: boolean; reason?: string } {
  if (data.level >= 12) {
    return { ok: false, reason: "Already at max level (12)." };
  }

  const nextLevel = data.level + 1;
  const prevFeatLevel = FEAT_LEVELS.filter((l) => l <= data.level);

  // Check that all prior feat levels have a feat chosen
  for (const fl of prevFeatLevel) {
    if (!data.levelFeats?.[String(fl)]) {
      return { ok: false, reason: `You need to choose a feat for level ${fl} first.` };
    }
  }

  return { ok: true };
}

// Summary of what happens at a given level
export function levelUpSummary(originId: string, level: number) {
  const features = getFeaturesAtLevel(originId, level);
  const hasFeatPick = isFeatLevel(level);
  const profBonus = proficiencyBonus(level);
  const prevProfBonus = level > 1 ? proficiencyBonus(level - 1) : 0;
  const profBonusIncreased = profBonus > prevProfBonus;

  return {
    level,
    features,
    hasFeatPick,
    profBonus,
    profBonusIncreased,
  };
}
