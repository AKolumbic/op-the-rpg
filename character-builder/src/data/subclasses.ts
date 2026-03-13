// =============================================================================
// Subclass Definitions — One SRD 5.2 subclass per Origin Story
//
// Each Origin Story (class) gets at least one subclass. Features are reflavored
// for the OP the RPG superhero setting. Mechanics stay intact; fiction changes.
// =============================================================================

export interface SubclassFeature {
  name: string;
  srdName: string;
  level: number;
  description: string;
}

export interface SubclassDefinition {
  id: string;
  name: string;
  srdName: string;
  originId: string;
  description: string;
  quote: string;
  features: SubclassFeature[];
}

import { SUBCLASS_GROUP_1 } from "./_subclasses-group1";
import { SUBCLASS_GROUP_2 } from "./_subclasses-group2";
import { SUBCLASS_GROUP_3 } from "./_subclasses-group3";

export const SUBCLASSES: SubclassDefinition[] = [
  ...SUBCLASS_GROUP_1,
  ...SUBCLASS_GROUP_2,
  ...SUBCLASS_GROUP_3,
];

export function getSubclassesForOrigin(originId: string): SubclassDefinition[] {
  return SUBCLASSES.filter((s) => s.originId === originId);
}

export function getSubclass(subclassId: string): SubclassDefinition | undefined {
  return SUBCLASSES.find((s) => s.id === subclassId);
}

export function getSubclassFeaturesAtLevel(
  subclassId: string,
  level: number
): SubclassFeature[] {
  const sc = getSubclass(subclassId);
  if (!sc) return [];
  return sc.features.filter((f) => f.level === level);
}

export function getSubclassFeaturesUpToLevel(
  subclassId: string,
  level: number
): SubclassFeature[] {
  const sc = getSubclass(subclassId);
  if (!sc) return [];
  return sc.features.filter((f) => f.level <= level);
}
