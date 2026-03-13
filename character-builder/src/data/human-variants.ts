export interface VariantTrait {
  name: string;
  description: string;
}

export interface SubChoiceOption {
  id: string;
  name: string;
  description?: string;
}

export interface SubChoice {
  id: string;
  label: string;
  options: SubChoiceOption[];
}

export interface HumanVariant {
  id: string;
  name: string;
  srdMapping: string;
  tagline: string;
  description: string;
  traits: VariantTrait[];
  subChoices: SubChoice[];
  size: "Medium" | "Small" | "Medium or Small";
  speed: number;
}

export const HUMAN_VARIANTS: HumanVariant[] = [
  // ─── Everyman ───────────────────────────────────────────────
  {
    id: "everyman",
    name: "Everyman",
    srdMapping: "Human",
    tagline:
      "No particular genetic edge — just drive, adaptability, and the ability to pick things up fast.",
    description:
      "The default. No particular genetic edge — just drive, adaptability, and the ability to pick things up fast. Most people in the world are Everymen.",
    traits: [
      {
        name: "Resourceful",
        description:
          "You gain Heroic Inspiration whenever you finish a Long Rest.",
      },
      {
        name: "Skillful",
        description: "You gain proficiency in one skill of your choice.",
      },
      {
        name: "Versatile",
        description: "You gain one Origin Feat of your choice.",
      },
    ],
    subChoices: [],
    size: "Medium",
    speed: 30,
  },

  // ─── Brute ──────────────────────────────────────────────────
  {
    id: "brute",
    name: "Brute",
    srdMapping: "Orc",
    tagline:
      "Big, tough, and hard to keep down. Built for punishment.",
    description:
      "Big, tough, and hard to keep down. Brutes are the people who played linebacker, worked construction since age 16, or just got in a lot of fights growing up. They're built for punishment.",
    traits: [
      {
        name: "Adrenaline Rush",
        description:
          "You can take the Dash action as a Bonus Action. When you do so, you gain Temporary Hit Points equal to your Proficiency Bonus. Usable a number of times equal to your Proficiency Bonus; recharges on a Short or Long Rest.",
      },
      {
        name: "Hard to Kill",
        description:
          "When you are reduced to 0 HP but not killed outright, you can drop to 1 HP instead. Once used, recharges on a Long Rest.",
      },
      {
        name: "Low-Light Awareness",
        description:
          "You have Darkvision with a range of 120 feet. (Heightened spatial awareness in dim environments — not supernatural sight.)",
      },
    ],
    subChoices: [],
    size: "Medium",
    speed: 30,
  },

  // ─── Rascal ─────────────────────────────────────────────────
  {
    id: "rascal",
    name: "Rascal",
    srdMapping: "Halfling",
    tagline:
      "Small, quick, and hard to pin down. Speed and cunning beat size.",
    description:
      "Small, quick, and hard to pin down. Rascals are the people who learned early that speed and cunning beat size. They slip through gaps, dodge what they shouldn't be able to dodge, and always seem to land on their feet.",
    traits: [
      {
        name: "Brave",
        description:
          "You have Advantage on saving throws to avoid or end the Frightened condition.",
      },
      {
        name: "Slippery",
        description:
          "You can move through the space of any creature one size larger than you, but can't stop there.",
      },
      {
        name: "Lucky",
        description:
          "When you roll a 1 on the d20 of a D20 Test, you can reroll the die and must use the new roll.",
      },
      {
        name: "Naturally Stealthy",
        description:
          "You can take the Hide action even when obscured only by a creature at least one size larger than you.",
      },
    ],
    subChoices: [
      {
        id: "rascal-size",
        label: "Size",
        options: [
          { id: "small", name: "Small" },
          { id: "medium", name: "Medium" },
        ],
      },
    ],
    size: "Medium or Small",
    speed: 30,
  },

  // ─── Savant ─────────────────────────────────────────────────
  {
    id: "savant",
    name: "Savant",
    srdMapping: "Gnome",
    tagline:
      "Sharp, fast-thinking, and difficult to manipulate. The geniuses and prodigies.",
    description:
      "Sharp, fast-thinking, and difficult to manipulate. Savants are the geniuses, the prodigies, the people who see through illusions — literal and figurative — faster than anyone else in the room.",
    traits: [
      {
        name: "Mental Fortitude",
        description:
          "You have Advantage on Intelligence, Wisdom, and Charisma saving throws. (Sheer mental discipline and clarity of thought.)",
      },
    ],
    subChoices: [
      {
        id: "savant-specialty",
        label: "Savant Specialty",
        options: [
          {
            id: "inventor",
            name: "Inventor",
            description:
              "You know the Mending and Minor Arcana cantrips. You can spend 10 minutes casting Minor Arcana to create a Tiny mechanical device (AC 5, 1 HP) — a lockpick, a listening device, a noisemaker, a fire starter. You choose its function when you create it. You can have three devices at a time; each breaks down after 8 hours or when you dismantle it.",
          },
          {
            id: "illusionist",
            name: "Illusionist",
            description:
              "You know the Minor Illusion cantrip (reflavored as misdirection — throwing your voice, creating distracting sounds or visual tricks). You can also communicate telepathically with animals within 30 feet. (Preternatural read on animal body language and behavior, bordering on uncanny.)",
          },
        ],
      },
      {
        id: "savant-size",
        label: "Size",
        options: [
          { id: "small", name: "Small" },
          { id: "medium", name: "Medium" },
        ],
      },
    ],
    size: "Medium or Small",
    speed: 30,
  },

  // ─── Roughneck ──────────────────────────────────────────────
  {
    id: "roughneck",
    name: "Roughneck",
    srdMapping: "Dwarf",
    tagline:
      "Dense, sturdy, and almost impossible to poison. Compact and immovable.",
    description:
      "Dense, sturdy, and almost impossible to poison. Roughnecks are the people with iron constitutions — career boxers, industrial workers who shrugged off toxic exposure, people who just don't go down. Compact and immovable.",
    traits: [
      {
        name: "Low-Light Awareness",
        description:
          "You have Darkvision with a range of 120 feet. (Heightened awareness in dim conditions.)",
      },
      {
        name: "Iron Constitution",
        description:
          "You have Resistance to Poison damage and Advantage on saving throws to avoid or end the Poisoned condition. (Robust immune system, high toxin tolerance.)",
      },
      {
        name: "Tough as Nails",
        description:
          "Your HP maximum increases by 1, and increases by 1 again each time you gain a level.",
      },
      {
        name: "Structural Sense",
        description:
          "As a Bonus Action, you gain Tremorsense with a range of 60 feet for 10 minutes. You must be on or touching a solid surface. Usable a number of times equal to your Proficiency Bonus; recharges on a Long Rest. (Feeling vibrations through floors and walls — footsteps, machinery, movement in adjacent rooms.)",
      },
    ],
    subChoices: [],
    size: "Medium",
    speed: 30,
  },

  // ─── Scion ──────────────────────────────────────────────────
  {
    id: "scion",
    name: "Scion",
    srdMapping: "Elf",
    tagline:
      "The last of an old bloodline. Graceful, perceptive, and almost unnervingly composed.",
    description:
      "The last of an old bloodline — or one of the few who still carry it. Scions are descendants of ancient lineages that grant innate, inherited abilities no one fully understands. Graceful, perceptive, and almost unnervingly composed. They don't sleep much and they never seem rattled.",
    traits: [
      {
        name: "Low-Light Awareness",
        description: "You have Darkvision with a range of 60 feet.",
      },
      {
        name: "Cool Under Pressure",
        description:
          "You have Advantage on saving throws to avoid or end the Charmed condition. (Mental composure, resistance to manipulation and panic.)",
      },
      {
        name: "Sharp Senses",
        description:
          "You gain proficiency in Intuition, Perception, or Wilderness.",
      },
      {
        name: "Light Sleeper",
        description:
          "You don't need a full night's sleep. You can finish a Long Rest in 4 hours of light meditation/rest, during which you remain conscious.",
      },
    ],
    subChoices: [
      {
        id: "scion-bloodline",
        label: "Scion Bloodline",
        options: [
          {
            id: "shadow",
            name: "Shadow",
            description:
              "Level 1: Low-Light Awareness range increases to 120 ft. You know the Dancing Lights cantrip. Level 3: Faerie Fire. Level 5: Darkness.",
          },
          {
            id: "arcane",
            name: "Arcane",
            description:
              "Level 1: You know the Minor Arcana cantrip. On each Long Rest, you can swap it for a different Wizard cantrip. Level 3: Detect Magic. Level 5: Misty Step.",
          },
          {
            id: "wild",
            name: "Wild",
            description:
              "Level 1: Your Speed increases to 35 ft. You know the Druidcraft cantrip. Level 3: Longstrider. Level 5: Pass without Trace.",
          },
        ],
      },
      {
        id: "scion-spellcasting-ability",
        label: "Spellcasting Ability",
        options: [
          { id: "int", name: "Intelligence" },
          { id: "wis", name: "Wisdom" },
          { id: "cha", name: "Charisma" },
        ],
      },
    ],
    size: "Medium",
    speed: 30,
  },

  // ─── Ancient ────────────────────────────────────────────────
  {
    id: "ancient",
    name: "Ancient",
    srdMapping: "Goliath",
    tagline:
      "Huge, powerful, and descended from a lineage that traces back further than anyone can explain.",
    description:
      "Huge, powerful, and descended from a lineage that traces back further than anyone can explain. Ancients are the 6'8\" former athletes, the circus strongmen, the people who were always the biggest person in every room. Their bloodline carries something old. Some of them are gentle. All of them are dangerous.",
    traits: [
      {
        name: "Large Frame",
        description:
          "At character level 5, you can use a Bonus Action to become Large for 10 minutes (if space permits). While Large, you have Advantage on Strength checks and +10 ft. Speed. Once used, recharges on a Long Rest. (Fully unleashing your physical potential — adrenaline surge, hulking posture.)",
      },
      {
        name: "Powerful Build",
        description:
          "You have Advantage on checks to end the Grappled condition. You count as one size larger for carrying capacity.",
      },
    ],
    subChoices: [
      {
        id: "ancient-heritage",
        label: "Ancient Heritage",
        options: [
          {
            id: "blink-reflex",
            name: "Blink Reflex",
            description:
              "As a Bonus Action, you can move up to 30 feet to an unoccupied space you can see. (Explosive burst of movement, not teleportation.) Usable a number of times equal to your Proficiency Bonus; recharges on a Long Rest.",
          },
          {
            id: "haymaker",
            name: "Haymaker",
            description:
              "When you hit with an attack roll and deal damage, you can deal an extra 1d10 damage. (Devastating follow-through.) Usable a number of times equal to your Proficiency Bonus; recharges on a Long Rest.",
          },
          {
            id: "freezing-grip",
            name: "Freezing Grip",
            description:
              "When you hit and deal damage, you can deal an extra 1d6 Cold damage and reduce the target's Speed by 10 feet until the start of your next turn. (Crushing grip / joint lock that limits movement.) Usable a number of times equal to your Proficiency Bonus; recharges on a Long Rest.",
          },
          {
            id: "bulldozer",
            name: "Bulldozer",
            description:
              "When you hit a Large or smaller creature and deal damage, you can knock it Prone. (Sheer physical force.) Usable a number of times equal to your Proficiency Bonus; recharges on a Long Rest.",
          },
          {
            id: "stone-wall",
            name: "Stone Wall",
            description:
              "When you take damage, you can use your Reaction to roll 1d12 + CON modifier and reduce the damage by that total. (Bracing for impact, absorbing the blow.) Usable a number of times equal to your Proficiency Bonus; recharges on a Long Rest.",
          },
          {
            id: "thunderclap",
            name: "Thunderclap",
            description:
              "When you take damage from a creature within 60 feet, you can use your Reaction to deal 1d8 Thunder damage to it. (Retaliatory strike — thrown object, shockwave from impact, etc.) Usable a number of times equal to your Proficiency Bonus; recharges on a Long Rest.",
          },
        ],
      },
    ],
    size: "Medium",
    speed: 35,
  },

  // ─── Elemental ──────────────────────────────────────────────
  {
    id: "elemental",
    name: "Elemental",
    srdMapping: "Dragonborn",
    tagline:
      "Intense, volatile, and capable of things that blur the line between human and something else.",
    description:
      "Intense, volatile, and capable of things that blur the line between human and something else. Elementals come from bloodlines touched by something — old experiments, ancestral mutations, exposure to unknown forces generations back. They carry an elemental edge in their physiology.",
    traits: [
      {
        name: "Elemental Blast",
        description:
          "When you take the Attack action, you can replace one attack with a burst of elemental energy in a 15-foot Cone or 30-foot Line (5 ft. wide). DEX save (DC = 8 + CON mod + Proficiency Bonus). Deals 1d10 damage of your element type on a failed save, half on success. Damage scales: 2d10 at level 5, 3d10 at level 11. Usable a number of times equal to your Proficiency Bonus; recharges on a Long Rest.",
      },
      {
        name: "Damage Resistance",
        description:
          "You have Resistance to your element's damage type.",
      },
      {
        name: "Low-Light Awareness",
        description: "You have Darkvision with a range of 60 feet.",
      },
      {
        name: "Elemental Surge",
        description:
          "At character level 5, you can use a Bonus Action to manifest energy wings (spectral/translucent, matching your element) for 10 minutes, gaining a Fly Speed equal to your Speed. Once used, recharges on a Long Rest. (Latent mutation fully expressing itself.)",
      },
    ],
    subChoices: [
      {
        id: "elemental-bloodline",
        label: "Elemental Bloodline",
        options: [
          {
            id: "acidic",
            name: "Acidic",
            description: "Damage Type: Acid",
          },
          {
            id: "pyretic",
            name: "Pyretic",
            description: "Damage Type: Fire",
          },
          {
            id: "voltaic",
            name: "Voltaic",
            description: "Damage Type: Lightning",
          },
          {
            id: "toxic",
            name: "Toxic",
            description: "Damage Type: Poison",
          },
          {
            id: "cryogenic",
            name: "Cryogenic",
            description: "Damage Type: Cold",
          },
        ],
      },
    ],
    size: "Medium",
    speed: 30,
  },

  // ─── Cursed ─────────────────────────────────────────────────
  {
    id: "cursed",
    name: "Cursed",
    srdMapping: "Tiefling",
    tagline:
      "Something in the family tree isn't right. Unsettling presence and unusual abilities.",
    description:
      "Something in the family tree isn't right. The Cursed carry a legacy that marks them — not horns and tails, but an unsettling presence, unusual abilities, and a sense that they're operating on a different wavelength. Could be a government experiment on a grandparent, exposure to unknown radiation, or a lineage that traces back to something no one talks about.",
    traits: [
      {
        name: "Low-Light Awareness",
        description: "You have Darkvision with a range of 60 feet.",
      },
      {
        name: "Unsettling Presence",
        description:
          "You know the Thaumaturgy cantrip (reflavored as minor telekinesis, flickering lights, temperature drops, voice distortion — the creepy factor). Uses the same ability as your Dark Legacy.",
      },
    ],
    subChoices: [
      {
        id: "cursed-legacy",
        label: "Dark Legacy",
        options: [
          {
            id: "corrosive",
            name: "Corrosive",
            description:
              "Level 1: Resistance to Poison damage. You know the Poison Spray cantrip (toxin exhalation / corrosive touch). Level 3: Ray of Sickness (wave of nausea / toxic projection). Level 5: Hold Person (nerve agent / paralytic touch).",
          },
          {
            id: "necrotic",
            name: "Necrotic",
            description:
              "Level 1: Resistance to Necrotic damage. You know the Chill Touch cantrip (life-draining grip / entropy touch). Level 3: False Life (pain suppression / undead endurance). Level 5: Ray of Enfeeblement (vitality drain / weakening aura).",
          },
          {
            id: "infernal",
            name: "Infernal",
            description:
              "Level 1: Resistance to Fire damage. You know the Fire Bolt cantrip (pyrokinesis / heat generation). Level 3: Hellish Rebuke (heat burst retaliation). Level 5: Darkness (shadow manipulation / light absorption).",
          },
        ],
      },
      {
        id: "cursed-spellcasting-ability",
        label: "Spellcasting Ability",
        options: [
          { id: "int", name: "Intelligence" },
          { id: "wis", name: "Wisdom" },
          { id: "cha", name: "Charisma" },
        ],
      },
      {
        id: "cursed-size",
        label: "Size",
        options: [
          { id: "medium", name: "Medium" },
          { id: "small", name: "Small" },
        ],
      },
    ],
    size: "Medium or Small",
    speed: 30,
  },
];
