// =============================================================================
// Origin Story Features — Levels 1–12
// Each Origin Story maps 1:1 to an SRD 5.2 class. Features are reflavored
// for the OP the RPG superhero setting. Mechanics stay intact; fiction changes.
//
// Skill name mappings (SRD → OP):
//   Animal Handling → Urban | Arcana → Science | Insight → Intuition
//   Nature → Wilderness | Religion → Lore | Survival → (merged into Wilderness)
// =============================================================================

export interface OriginCoreTraits {
  primaryAbility: string;
  hitDie: string;
  savingThrows: [string, string];
  skillChoices: { count: number; options: string[] };
  weaponProficiencies: string;
  armorTraining: string;
  toolProficiencies?: string;
}

export interface SpellcastingInfo {
  ability: string;
  type: "full" | "half" | "pact";
  flavorName: string;
  focusFlavor: string;
}

export interface ClassScalingColumn {
  label: string;
  values: Record<number, string | number>;
}

export interface OriginFeature {
  name: string;
  srdName: string;
  level: number;
  description: string;
}

export interface OriginStoryFeatures {
  originId: string;
  srdClass: string;
  coreTraits: OriginCoreTraits;
  spellcasting: SpellcastingInfo | null;
  scaling: ClassScalingColumn[];
  features: OriginFeature[];
}

import { GROUP_1 } from "./_origin-features-group1";
import { GROUP_2 } from "./_origin-features-group2";
import { GROUP_3 } from "./_origin-features-group3";

export const ORIGIN_STORY_FEATURES: OriginStoryFeatures[] = [
  ...GROUP_1,
  ...GROUP_2,
  ...GROUP_3,
];
