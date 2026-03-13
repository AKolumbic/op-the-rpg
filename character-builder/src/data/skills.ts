export type AbilityScoreKey = "STR" | "DEX" | "CON" | "INT" | "WIS" | "CHA";

export interface Skill {
  id: string;
  name: string;
  ability: AbilityScoreKey;
  description: string;
}

export const SKILLS: Skill[] = [
  // Strength
  {
    id: "athletics",
    name: "Athletics",
    ability: "STR",
    description:
      "Physical exertion — climbing, swimming, jumping, lifting, grappling.",
  },

  // Dexterity
  {
    id: "acrobatics",
    name: "Acrobatics",
    ability: "DEX",
    description:
      "Balance, tumbling, aerial maneuvers, dodging through obstacles.",
  },
  {
    id: "sleight-of-hand",
    name: "Sleight of Hand",
    ability: "DEX",
    description:
      "Pickpocketing, planting objects, concealing items on your person, lockpicking.",
  },
  {
    id: "stealth",
    name: "Stealth",
    ability: "DEX",
    description:
      "Moving unseen and unheard, tailing targets, blending into crowds.",
  },

  // Intelligence
  {
    id: "history",
    name: "History",
    ability: "INT",
    description:
      "Knowledge of past events, wars, political movements, historical figures, and the alternate-USA timeline. Grounded in documented, factual events.",
  },
  {
    id: "investigation",
    name: "Investigation",
    ability: "INT",
    description:
      "Deductive reasoning, searching for clues, connecting evidence, analyzing crime scenes.",
  },
  {
    id: "lore",
    name: "Lore",
    ability: "INT",
    description:
      "Knowledge of myths, legends, folklore, occult traditions, supernatural phenomena, and ancient or esoteric knowledge that exists outside the historical record. Replaces Religion.",
  },
  {
    id: "science",
    name: "Science",
    ability: "INT",
    description:
      "Knowledge of physics, chemistry, biology, and their applications. Used to understand experimental technology, identify chemical compounds, analyze mutations, or comprehend the theoretical basis behind superpowers. Replaces Arcana.",
  },
  {
    id: "technology",
    name: "Technology",
    ability: "INT",
    description:
      "Knowledge of mechanical and electrical systems — radios, engines, early computers, surveillance equipment, weapons systems, industrial machinery. Used to operate, repair, jury-rig, or sabotage 20th century technology.",
  },

  // Wisdom
  {
    id: "intuition",
    name: "Intuition",
    ability: "WIS",
    description:
      "Reading people and situations — detecting lies, gauging intentions, understanding motives, sensing when something's off about a room, a plan, or a person. Replaces Insight.",
  },
  {
    id: "medicine",
    name: "Medicine",
    ability: "WIS",
    description:
      "First aid, diagnosing injuries and illness, stabilizing the dying, understanding anatomy.",
  },
  {
    id: "perception",
    name: "Perception",
    ability: "WIS",
    description:
      "Noticing details — spotting a hidden figure, hearing a distant conversation, catching something out of the corner of your eye.",
  },
  {
    id: "urban",
    name: "Urban",
    ability: "WIS",
    description:
      "Knowledge of how cities work at ground level — navigating neighborhoods, finding black markets, reading social dynamics, identifying undercover cops or gang affiliations. Also covers operating in disaster zones and navigating collapsed infrastructure. Replaces Animal Handling.",
  },
  {
    id: "wilderness",
    name: "Wilderness",
    ability: "WIS",
    description:
      "Tracking, foraging, navigating rural and wild areas, enduring harsh outdoor conditions, identifying plants and animals, reading weather patterns. Covers everything outside city limits. Replaces Nature.",
  },

  // Charisma
  {
    id: "deception",
    name: "Deception",
    ability: "CHA",
    description:
      "Lying convincingly, disguising yourself, forging documents, creating alibis.",
  },
  {
    id: "intimidation",
    name: "Intimidation",
    ability: "CHA",
    description:
      "Coercing through threats, physical presence, reputation, or demonstrated power.",
  },
  {
    id: "performance",
    name: "Performance",
    ability: "CHA",
    description:
      "Entertaining, public speaking, acting, maintaining a public persona or secret identity. In OP, Performance also covers managing your hero (or villain) persona in the media: press conferences, radio interviews, public appearances.",
  },
  {
    id: "persuasion",
    name: "Persuasion",
    ability: "CHA",
    description:
      "Influencing through charm, logic, or good faith negotiation.",
  },
];
