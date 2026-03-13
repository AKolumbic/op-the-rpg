// ── Name pools — 20th century American, genre-appropriate ────────────────

const FIRST_NAMES = [
  // Classic American (mixed)
  "Jack", "Frank", "Mae", "Ruby", "Hank", "Dolores", "Ray", "Vivian",
  "Earl", "Lorraine", "Clyde", "Bettie", "Virgil", "Maxine", "Floyd",
  "Gloria", "Chester", "Mabel", "Leroy", "Irene", "Archie", "Pearl",
  "Gus", "Hazel", "Otis", "Blanche", "Amos", "Opal", "Silas", "Faye",
  // Mid-century
  "James", "Diana", "Clark", "Barbara", "Victor", "Jean", "Marcus",
  "Selina", "Wade", "Wanda", "Luke", "Jessica", "Sam", "Natasha",
  "Scott", "Ororo", "Reed", "Janet", "Tony", "Carol",
  // Later 20th century
  "Malik", "Keisha", "Dante", "Esperanza", "Isaiah", "Rosa", "Joaquin",
  "Yuki", "Andre", "Mei", "Deshawn", "Lucia", "Tyrell", "Nina",
  "Omar", "Carmen", "Ravi", "Ingrid", "Diego", "Anika",
  // Gritty / genre
  "Boone", "Sloane", "Harlow", "Mercer", "Lennox", "Corbin", "Dagny",
  "Mace", "Briar", "Calloway", "Kit", "Zeke", "Nola", "Dutch",
  "Sable", "Rook", "Jinx", "Colt", "Wren", "Flint",
];

const LAST_NAMES = [
  // Anglo/European
  "Callahan", "Beckett", "Morrow", "Voss", "Graves", "Ashford", "Drake",
  "Langley", "Slade", "Bishop", "Thorne", "Mercer", "Cross", "Wren",
  "Blackwell", "Stone", "Crane", "Wolfe", "Frost", "Nash",
  // Diverse American
  "Reyes", "Okafor", "Chen", "Petrov", "Morales", "Nakamura", "Singh",
  "Alvarez", "Kim", "Baptiste", "Delgado", "Okonkwo", "Tanaka", "Rivera",
  "Hassan", "Kowalski", "Gutierrez", "Park", "Osei", "Villanueva",
  // Working class / industrial
  "Steele", "Mason", "Irons", "Cole", "Flint", "Hammer", "Burns",
  "Cash", "Locke", "Ward", "Fox", "Sharp", "Hunter", "Knox",
  "Briggs", "Holt", "Raines", "Dalton", "Marsh", "Sawyer",
];

// ── Alias components — keyed by origin + variant for flavor ─────────────

const ALIAS_PREFIXES: Record<string, string[]> = {
  // By origin story
  "the-bereaved":  ["Grief", "Fury", "Wraith", "Sorrow", "Havoc", "Rage", "Ruin", "Blight"],
  "the-celebrity": ["Dazzle", "Glam", "Star", "Lux", "Prime", "Icon", "Flash", "Hype"],
  "the-chosen":    ["Oracle", "Virtue", "Halo", "Sanctum", "Grace", "Hymn", "Vigil", "Covenant"],
  "the-shifter":   ["Feral", "Chimera", "Flux", "Morph", "Prowl", "Skin", "Phase", "Primal"],
  "the-soldier":   ["Iron", "Valor", "Duty", "Steel", "Sentinel", "Bastion", "Rampart", "Arsenal"],
  "the-disciple":  ["Zen", "Ghost", "Silence", "Jade", "Mantis", "Serpent", "Crane", "Whisper"],
  "the-oathsworn": ["Justice", "Shield", "Bulwark", "Honor", "Ward", "Aegis", "Oath", "Radiant"],
  "the-hunter":    ["Shadow", "Venom", "Stalker", "Reaper", "Talon", "Scope", "Prey", "Snare"],
  "the-scoundrel": ["Trick", "Ace", "Smoke", "Alias", "Ghost", "Hustle", "Shade", "Grift"],
  "the-mutant":    ["Nova", "Flux", "Surge", "Volt", "Apex", "Cascade", "Rift", "Pulse"],
  "the-pactbound": ["Hex", "Bane", "Dusk", "Pyre", "Omen", "Void", "Curse", "Relic"],
  "the-genius":    ["Axiom", "Cipher", "Vector", "Logic", "Mech", "Arc", "Synth", "Vertex"],
};

const ALIAS_SUFFIXES: Record<string, string[]> = {
  // By variant
  brute:     ["breaker", "fist", "maul", "smash", "force", "hammer"],
  rascal:    ["step", "jack", "fox", "dart", "spark", "trick"],
  savant:    ["mind", "brain", "spark", "eye", "wit", "lens"],
  roughneck: ["wall", "stone", "iron", "hide", "root", "anvil"],
  scion:     ["blood", "heir", "line", "shade", "veil", "mark"],
  ancient:   ["titan", "colossus", "monolith", "peak", "giant", "mountain"],
  elemental: ["burn", "storm", "bolt", "frost", "wave", "blast"],
  cursed:    ["blight", "thorn", "hollow", "scar", "wound", "brand"],
  everyman:  ["hawk", "wolf", "strike", "guard", "edge", "runner"],
};

// Standalone alias patterns (The [X] style)
const STANDALONE_ALIASES = [
  "The Ace", "The Hammer", "The Ghost", "The Fixer", "The Torch",
  "The Widow", "The Shark", "The Phantom", "The Viper", "The Bull",
  "The Raven", "The Blade", "The Surgeon", "The Warden", "The Jackal",
  "The Exile", "The Hound", "The Specter", "The Hornet", "The Lynx",
  "Blindside", "Killswitch", "Lockjaw", "Overwatch", "Rebound",
  "Blackout", "Deadbolt", "Longshot", "Ricochet", "Aftershock",
  "Backfire", "Bulkhead", "Coldsnap", "Fallout", "Gutshot",
  "Hardcase", "Ironside", "Knuckledust", "Livewire", "Nightfall",
];

// ── Generator functions ─────────────────────────────────────────────────

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateRealName(): string {
  return `${pick(FIRST_NAMES)} ${pick(LAST_NAMES)}`;
}

export function generateAlias(originId?: string, variantId?: string): string {
  // 40% chance of a standalone alias, 60% compound
  if (Math.random() < 0.4 || (!originId && !variantId)) {
    return pick(STANDALONE_ALIASES);
  }

  const prefixes = originId && ALIAS_PREFIXES[originId]
    ? ALIAS_PREFIXES[originId]
    : Object.values(ALIAS_PREFIXES).flat();

  const suffixes = variantId && ALIAS_SUFFIXES[variantId]
    ? ALIAS_SUFFIXES[variantId]
    : Object.values(ALIAS_SUFFIXES).flat();

  const prefix = pick(prefixes);
  const suffix = pick(suffixes);

  // Vary the format
  const roll = Math.random();
  if (roll < 0.35) {
    // Compound: "Griefbreaker"
    return prefix + suffix.toLowerCase();
  } else if (roll < 0.6) {
    // Two words: "Iron Titan"
    return `${prefix} ${suffix[0].toUpperCase()}${suffix.slice(1)}`;
  } else if (roll < 0.8) {
    // "The [Prefix]"
    return `The ${prefix}`;
  } else {
    // Hyphenated: "Hex-Storm"
    return `${prefix}-${suffix[0].toUpperCase()}${suffix.slice(1)}`;
  }
}
