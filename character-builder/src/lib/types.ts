export type AbilityScoreKey = "STR" | "DEX" | "CON" | "INT" | "WIS" | "CHA";

export interface AbilityScoreSet {
  STR: number;
  DEX: number;
  CON: number;
  INT: number;
  WIS: number;
  CHA: number;
}

export interface NarrativeResponses {
  variant: {
    specific1: string;
    specific2: string;
    firstImpression: string;
    noticeableTraits: string;
  };
  homeTown: {
    neighborhood: string;
    importantPerson: string;
    memory: string;
    specific1: string;
  };
  origin: {
    whatHappened: string;
    where: string;
    whoElse: string;
    whatYouLost: string;
    whatYouGained: string;
    howYouFeel: string;
  };
  abilities: {
    physicalStrength: string;
    mentalStrength: string;
  };
  feats: Record<string, string>;
}

export const EMPTY_NARRATIVE: NarrativeResponses = {
  variant: { specific1: "", specific2: "", firstImpression: "", noticeableTraits: "" },
  homeTown: { neighborhood: "", importantPerson: "", memory: "", specific1: "" },
  origin: { whatHappened: "", where: "", whoElse: "", whatYouLost: "", whatYouGained: "", howYouFeel: "" },
  abilities: { physicalStrength: "", mentalStrength: "" },
  feats: {},
};

export interface CharacterData {
  humanVariant: string;
  variantOptions: Record<string, string>;
  homeTown: string;
  originStory: string;
  alias: string;
  avatarUrl: string;
  abilityScoreMethod: "standard-array" | "point-buy";
  abilityScores: AbilityScoreSet;
  abilityScoreBonuses: AbilityScoreSet;
  skillProficiencies: string[];
  toolProficiency: string;
  feats: string[];
  homeTownFeat: string;
  level: number;
  narrative: NarrativeResponses;
}

export interface Character {
  id: string;
  user_id: string;
  name: string;
  data: CharacterData;
  created_at: string;
  updated_at: string;
}

export const EMPTY_ABILITY_SCORES: AbilityScoreSet = {
  STR: 0, DEX: 0, CON: 0, INT: 0, WIS: 0, CHA: 0,
};

export const DEFAULT_CHARACTER_DATA: CharacterData = {
  humanVariant: "",
  variantOptions: {},
  homeTown: "",
  originStory: "",
  alias: "",
  avatarUrl: "",
  abilityScoreMethod: "standard-array",
  abilityScores: { STR: 8, DEX: 8, CON: 8, INT: 8, WIS: 8, CHA: 8 },
  abilityScoreBonuses: { ...EMPTY_ABILITY_SCORES },
  skillProficiencies: [],
  toolProficiency: "",
  feats: [],
  homeTownFeat: "",
  level: 1,
  narrative: JSON.parse(JSON.stringify(EMPTY_NARRATIVE)),
};
