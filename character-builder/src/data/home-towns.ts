import { AbilityScoreKey } from "./skills";

export interface HomeTown {
  id: string;
  name: string;
  srdMapping: string;
  description: string;
  whatItTeaches: string;
  abilityScoreOptions: AbilityScoreKey[];
  grantedFeat: string;
  skillProficiencies: string[];
  toolProficiency: string;
  equipment: string;
}

export const HOME_TOWNS: HomeTown[] = [
  {
    id: "the-small-town",
    name: "The Small Town",
    srdMapping: "Acolyte",
    description:
      "A quiet place where everybody knows everybody. The church, the temple, the local gathering hall — that's the center of life here. Traditions run deep. Faith isn't questioned, it's assumed. People are kind, but they talk, and anyone who's different stands out immediately. If something strange chose you, this is the kind of place where it felt like a miracle or a curse, depending on who you asked. The Small Town produces people of faith, people of conviction, and people who couldn't wait to leave.",
    whatItTeaches:
      "Patience. How to read people. That community is everything — and that it can also suffocate you. You know how to listen, how to keep faith (or fake it), and how to spot when someone's hiding something behind a polite smile.",
    abilityScoreOptions: ["INT", "WIS", "CHA"],
    grantedFeat: "magic-initiate-cleric",
    skillProficiencies: ["intuition", "lore"],
    toolProficiency: "Calligrapher's Supplies",
    equipment:
      "Choose A or B: (A) Calligrapher's Supplies, Book (family bible, local history, or prayer book), Holy Symbol (or personal keepsake), Parchment (10 sheets), Simple Clothes, 8 GP; or (B) 50 GP",
  },
  {
    id: "the-industrial-city",
    name: "The Industrial City",
    srdMapping: "Criminal",
    description:
      "Smokestacks, rail yards, crumbling factories, and neighborhoods where the streetlights don't work. The Industrial City was built on labor — steel, coal, manufacturing — and when the jobs dried up, what was left was poverty, crime, and people doing whatever it takes to survive. The police are either absent or corrupt. The gangs run the blocks. Everyone knows someone who's inside, and everyone's got a hustle. The Industrial City produces survivors, criminals, and people who learned very young that no one is coming to help.",
    whatItTeaches:
      "How to move without being seen. How to take what you need. That trust is earned, not given, and that the law is just another system people use to control you. You know the streets — which alleys are dead ends, which cops are dirty, and which doors are never really locked.",
    abilityScoreOptions: ["DEX", "CON", "INT"],
    grantedFeat: "alert",
    skillProficiencies: ["sleight-of-hand", "stealth"],
    toolProficiency: "Thieves' Tools",
    equipment:
      "Choose A or B: (A) 2 Daggers (or knives), Thieves' Tools, Crowbar, 2 Pouches, Street Clothes, 16 GP; or (B) 50 GP",
  },
  {
    id: "the-metropolis",
    name: "The Metropolis",
    srdMapping: "Sage",
    description:
      "The biggest city in the country. Skyscrapers, universities, museums, financial districts, media headquarters, and more people than you can count. The Metropolis is where culture is made, where money flows, where ideas are born and argued over in lecture halls and newspaper columns. It's exciting, overwhelming, and indifferent — the city doesn't care about you, but if you're smart enough, it'll give you everything. The Metropolis produces scholars, researchers, journalists, analysts, and anyone whose weapon is knowledge.",
    whatItTeaches:
      "How to think. How to research. That knowledge is power, and that the answers are out there if you know where to look. You know how to navigate institutions — libraries, universities, bureaucracies, corporate offices — and how to find information that other people can't.",
    abilityScoreOptions: ["CON", "INT", "WIS"],
    grantedFeat: "magic-initiate-wizard",
    skillProficiencies: ["science", "history"],
    toolProficiency: "Calligrapher's Supplies",
    equipment:
      "Choose A or B: (A) Walking Stick (quarterstaff), Calligrapher's Supplies, Book (history, science, or philosophy), Parchment (8 sheets), Professional Clothes, 8 GP; or (B) 50 GP",
  },
  {
    id: "the-capitol",
    name: "The Capitol",
    srdMapping: "Soldier",
    description:
      "The seat of government. Military bases, intelligence agencies, embassies, monuments, and an entire population that exists to serve the state — or to profit from it. The Capitol is clean, orderly, and controlled. Everything here is about power: who has it, who wants it, and what they're willing to do to keep it. The military presence is visible. The political machinery is not. The Capitol produces soldiers, officers, agents, bureaucrats, and anyone who was forged in the machinery of the state.",
    whatItTeaches:
      "Discipline. Chain of command. That the world runs on orders, and the people who give them aren't always right — but the people who follow them stay alive. You know how to fight, how to follow (or give) orders, and how to survive the grind of institutional life without losing yourself.",
    abilityScoreOptions: ["STR", "DEX", "CON"],
    grantedFeat: "savage-attacker",
    skillProficiencies: ["athletics", "intimidation"],
    toolProficiency: "Gaming Set (player's choice)",
    equipment:
      "Choose A or B: (A) Spear (or baton), Shortbow (or sidearm), 20 Arrows (or ammunition), Gaming Set, Healer's Kit, Quiver (or holster), Duty Clothes, 14 GP; or (B) 50 GP",
  },
];
