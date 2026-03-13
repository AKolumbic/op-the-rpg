import type { AbilityScoreKey } from "./skills";
import type { AbilityScoreSet } from "@/lib/types";
import { STANDARD_ARRAY, POINT_BUY } from "./ability-scores";

// ── Per-origin ability score priority (best → worst) ─────────────────────

const ORIGIN_PRIORITIES: Record<string, AbilityScoreKey[]> = {
  "the-bereaved":  ["STR", "CON", "DEX", "WIS", "CHA", "INT"],
  "the-celebrity": ["CHA", "DEX", "CON", "WIS", "INT", "STR"],
  "the-chosen":    ["WIS", "STR", "CON", "CHA", "DEX", "INT"],
  "the-shifter":   ["WIS", "CON", "DEX", "INT", "STR", "CHA"],
  "the-soldier":   ["STR", "CON", "DEX", "WIS", "CHA", "INT"],
  "the-disciple":  ["DEX", "WIS", "CON", "STR", "CHA", "INT"],
  "the-oathsworn": ["STR", "CHA", "CON", "WIS", "DEX", "INT"],
  "the-hunter":    ["DEX", "WIS", "CON", "INT", "STR", "CHA"],
  "the-scoundrel": ["DEX", "CHA", "CON", "INT", "WIS", "STR"],
  "the-mutant":    ["CHA", "CON", "DEX", "WIS", "INT", "STR"],
  "the-pactbound": ["CHA", "CON", "DEX", "WIS", "INT", "STR"],
  "the-genius":    ["INT", "CON", "DEX", "WIS", "CHA", "STR"],
};

// ── Variant nudges — bump one ability up in priority ─────────────────────

const VARIANT_NUDGES: Record<string, AbilityScoreKey> = {
  brute:     "STR",
  rascal:    "DEX",
  savant:    "INT",
  roughneck: "CON",
  ancient:   "STR",
  elemental: "CON",
  // scion/cursed depend on subclass spellcasting choice — no generic nudge
  // everyman is flexible — no nudge
};

// ── Narrative flavor per origin ──────────────────────────────────────────

const ORIGIN_FLAVOR: Record<string, string> = {
  "the-bereaved":
    "The Bereaved fights through raw fury — Strength keeps you hitting, Constitution keeps you standing. Everything else is secondary to staying in the fight.",
  "the-celebrity":
    "The Celebrity's power is presence — Charisma commands the room, Dexterity keeps you graceful under pressure. You don't need to be the strongest; you need to be the most compelling.",
  "the-chosen":
    "The Chosen channels an unknown power through faith and will — Wisdom fuels your gifts. Strength and Constitution keep you alive long enough to use them.",
  "the-shifter":
    "The Shifter draws on instinct and primal connection — Wisdom guides the transformation, Constitution anchors the body through the strain of shifting.",
  "the-soldier":
    "The Soldier relies on training, not powers — Strength and Constitution are the foundation of everything. You outlast, outfight, and outwork everyone else.",
  "the-disciple":
    "The Disciple's body is the weapon — Dexterity for speed and precision, Wisdom for focus and discipline. The mind guides the fist.",
  "the-oathsworn":
    "The Oathsworn draws power from conviction — Strength to enforce the oath, Charisma to inspire it. Your word is literally your weapon.",
  "the-hunter":
    "The Hunter is methodical and precise — Dexterity for the shot, Wisdom for the patience. You don't miss, and you don't quit.",
  "the-scoundrel":
    "The Scoundrel survives on speed and instinct — Dexterity keeps you alive, Charisma gets you out of everything else. Never fight fair.",
  "the-mutant":
    "The Mutant's power is innate and volatile — Charisma channels the mutation, Constitution endures its toll. The power is you; the question is whether you can handle it.",
  "the-pactbound":
    "The Pactbound channels borrowed power — Charisma is the conduit, Constitution bears the cost. The deal keeps giving, but so does the strain.",
  "the-genius":
    "The Genius builds everything from intellect — Intelligence is your superpower, everything else is just staying alive long enough to use it. Keep your brain sharp and your body intact.",
};

// ── Suggestion engine ────────────────────────────────────────────────────

function applyVariantNudge(
  priorities: AbilityScoreKey[],
  variantId: string
): AbilityScoreKey[] {
  const nudge = VARIANT_NUDGES[variantId];
  if (!nudge) return [...priorities];

  const list = [...priorities];
  const idx = list.indexOf(nudge);
  // If the nudged ability isn't already #1, move it up one slot
  if (idx > 0) {
    [list[idx - 1], list[idx]] = [list[idx], list[idx - 1]];
  }
  return list;
}

function buildStandardArray(priorities: AbilityScoreKey[]): AbilityScoreSet {
  const scores: Partial<AbilityScoreSet> = {};
  const sorted = [...STANDARD_ARRAY].sort((a, b) => b - a); // [15, 14, 13, 12, 10, 8]
  for (let i = 0; i < 6; i++) {
    scores[priorities[i]] = sorted[i];
  }
  return scores as AbilityScoreSet;
}

function buildPointBuy(priorities: AbilityScoreKey[]): AbilityScoreSet {
  // Optimize: max out top 2, then spread. Target: 15/15/13/10/10/8 = 27 pts
  const template = [15, 15, 13, 10, 10, 8];
  const scores: Partial<AbilityScoreSet> = {};
  for (let i = 0; i < 6; i++) {
    scores[priorities[i]] = template[i];
  }
  return scores as AbilityScoreSet;
}

function buildHomeTownBonuses(
  priorities: AbilityScoreKey[],
  homeTownOptions: AbilityScoreKey[]
): AbilityScoreSet {
  const bonuses: AbilityScoreSet = { STR: 0, DEX: 0, CON: 0, INT: 0, WIS: 0, CHA: 0 };

  if (homeTownOptions.length === 0) return bonuses;

  // Sort the home town's 3 options by priority rank (lower index = higher priority)
  const ranked = [...homeTownOptions].sort(
    (a, b) => priorities.indexOf(a) - priorities.indexOf(b)
  );

  // +2 to the highest priority, +1 to the second
  bonuses[ranked[0]] = 2;
  if (ranked.length > 1) {
    bonuses[ranked[1]] = 1;
  }

  return bonuses;
}

export interface AbilitySuggestion {
  scores: AbilityScoreSet;
  bonuses: AbilityScoreSet;
  method: "standard-array" | "point-buy";
  flavor: string;
  priorities: AbilityScoreKey[];
}

export function getSuggestion(
  originId: string,
  variantId: string,
  homeTownOptions: AbilityScoreKey[],
  method: "standard-array" | "point-buy"
): AbilitySuggestion | null {
  const basePriorities = ORIGIN_PRIORITIES[originId];
  if (!basePriorities) return null;

  const priorities = applyVariantNudge(basePriorities, variantId);
  const scores =
    method === "standard-array"
      ? buildStandardArray(priorities)
      : buildPointBuy(priorities);
  const bonuses = buildHomeTownBonuses(priorities, homeTownOptions);
  const flavor = ORIGIN_FLAVOR[originId] ?? "";

  return { scores, bonuses, method, flavor, priorities };
}
