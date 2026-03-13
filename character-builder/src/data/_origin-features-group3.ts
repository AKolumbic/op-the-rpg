import type { OriginStoryFeatures } from "./origin-story-features";

// =============================================================================
// Group 3: The Scoundrel (Rogue), The Mutant (Sorcerer),
//           The Pactbound (Warlock), The Genius (Wizard)
// Levels 1-12 only. All SRD features reflavored for OP superhero setting.
// =============================================================================

export const GROUP_3: OriginStoryFeatures[] = [
  // ===========================================================================
  // THE SCOUNDREL — Mapped from SRD 5.2 Rogue
  // "Nobody was coming to save me, so I saved myself."
  // ===========================================================================
  {
    originId: "the-scoundrel",
    srdClass: "Rogue",
    coreTraits: {
      primaryAbility: "Dexterity",
      hitDie: "d8",
      savingThrows: ["Dexterity", "Intelligence"],
      skillChoices: {
        count: 4,
        options: [
          "Acrobatics",
          "Athletics",
          "Deception",
          "Intuition",
          "Intimidation",
          "Investigation",
          "Perception",
          "Persuasion",
          "Sleight of Hand",
          "Stealth",
        ],
      },
      weaponProficiencies:
        "Simple weapons and Martial weapons that have the Finesse or Light property",
      armorTraining: "Light armor",
      toolProficiencies: "Thieves' Tools",
    },
    spellcasting: null,
    scaling: [
      {
        label: "Exploit Weakness (Sneak Attack)",
        values: {
          1: "1d6",
          2: "1d6",
          3: "2d6",
          4: "2d6",
          5: "3d6",
          6: "3d6",
          7: "4d6",
          8: "4d6",
          9: "5d6",
          10: "5d6",
          11: "6d6",
          12: "6d6",
        },
      },
    ],
    features: [
      // --- Level 1 ---
      {
        name: "Expertise",
        srdName: "Expertise",
        level: 1,
        description:
          "You've honed specific skills to a razor edge. You gain Expertise in two of your skill proficiencies of your choice. Sleight of Hand and Stealth are recommended if you have proficiency in them.",
      },
      {
        name: "Exploit Weakness",
        srdName: "Sneak Attack",
        level: 1,
        description:
          "You know how to find and exploit a foe's vulnerabilities. Once per turn, you can deal extra damage (see the Exploit Weakness scaling column) to one creature you hit with an attack roll if you have Advantage, or if the attack uses a Finesse or Ranged weapon and an ally is within 5 feet of the target. The extra damage increases as you gain Scoundrel levels.",
      },
      {
        name: "Street Code",
        srdName: "Thieves' Cant",
        level: 1,
        description:
          "You know the coded language of the streets -- slang, hand signals, graffiti tags, and covert shorthand used by criminals, informants, and underground networks. You know Street Code and one other language of your choice.",
      },
      {
        name: "Weapon Mastery",
        srdName: "Weapon Mastery",
        level: 1,
        description:
          "Your street-honed training lets you use the mastery properties of two kinds of weapons you have proficiency with, such as Daggers and Shortbows. You can change your selections whenever you finish a Long Rest.",
      },
      // --- Level 2 ---
      {
        name: "Quick Thinking",
        srdName: "Cunning Action",
        level: 2,
        description:
          "Your quick thinking and agility let you move and act on instinct. On your turn, you can take one of the following as a Bonus Action: Dash, Disengage, or Hide.",
      },
      // --- Level 3 ---
      {
        name: "Scoundrel Subclass",
        srdName: "Rogue Subclass",
        level: 3,
        description:
          "You gain a Scoundrel subclass of your choice. Subclasses are specializations not yet detailed in the current version.",
      },
      {
        name: "Steady Aim",
        srdName: "Steady Aim",
        level: 3,
        description:
          "You can line up the perfect shot by holding your ground. As a Bonus Action, you give yourself Advantage on your next attack roll this turn, but only if you haven't moved during this turn. After using this feature, your Speed is 0 until the end of the current turn.",
      },
      // --- Level 4 ---
      {
        name: "Ability Score Improvement",
        srdName: "Ability Score Improvement",
        level: 4,
        description:
          "You gain a feat of your choice. In OP, all level-up feats are half-feats that include a +1 ability score increase.",
      },
      // --- Level 5 ---
      {
        name: "Cunning Strike",
        srdName: "Cunning Strike",
        level: 5,
        description:
          "You've developed cunning ways to use your attacks. When you deal Exploit Weakness damage, you can add one Cunning Strike effect. Each effect has a die cost -- you forgo that many Exploit Weakness dice to apply it. Options include Poison (1d6 cost), Trip (1d6 cost), and Withdraw (1d6 cost). The save DC equals 8 + your Dexterity modifier + your Proficiency Bonus.",
      },
      {
        name: "Uncanny Dodge",
        srdName: "Uncanny Dodge",
        level: 5,
        description:
          "Your instincts are almost supernatural. When an attacker you can see hits you with an attack roll, you can use your Reaction to halve the attack's damage against you (round down).",
      },
      // --- Level 6 ---
      {
        name: "Expertise",
        srdName: "Expertise",
        level: 6,
        description:
          "You gain Expertise in two more of your skill proficiencies of your choice, further sharpening the tools of your trade.",
      },
      // --- Level 7 ---
      {
        name: "Evasion",
        srdName: "Evasion",
        level: 7,
        description:
          "You can nimbly dodge out of the way of certain dangers. When you are subjected to an effect that allows a Dexterity saving throw to take only half damage, you instead take no damage on a success, and only half damage on a failure. You can't use this feature if you have the Incapacitated condition.",
      },
      {
        name: "Reliable Talent",
        srdName: "Reliable Talent",
        level: 7,
        description:
          "You have refined your skills to near perfection. Whenever you make an ability check that uses one of your skill or tool proficiencies, you can treat a d20 roll of 9 or lower as a 10.",
      },
      // --- Level 8 ---
      {
        name: "Ability Score Improvement",
        srdName: "Ability Score Improvement",
        level: 8,
        description:
          "You gain a feat of your choice. In OP, all level-up feats are half-feats that include a +1 ability score increase.",
      },
      // --- Level 9 ---
      {
        name: "Scoundrel Subclass Feature",
        srdName: "Subclass Feature",
        level: 9,
        description:
          "You gain a feature from your Scoundrel subclass. Subclass features are not yet detailed in the current version.",
      },
      // --- Level 10 ---
      {
        name: "Ability Score Improvement",
        srdName: "Ability Score Improvement",
        level: 10,
        description:
          "You gain a feat of your choice. In OP, all level-up feats are half-feats that include a +1 ability score increase.",
      },
      // --- Level 11 ---
      {
        name: "Improved Cunning Strike",
        srdName: "Improved Cunning Strike",
        level: 11,
        description:
          "You can apply up to two Cunning Strike effects when you deal Exploit Weakness damage, paying the die cost for each effect separately.",
      },
      // --- Level 12 ---
      {
        name: "Ability Score Improvement",
        srdName: "Ability Score Improvement",
        level: 12,
        description:
          "You gain a feat of your choice. In OP, all level-up feats are half-feats that include a +1 ability score increase.",
      },
    ],
  },

  // ===========================================================================
  // THE MUTANT — Mapped from SRD 5.2 Sorcerer
  // "I've always been like this."
  // ===========================================================================
  {
    originId: "the-mutant",
    srdClass: "Sorcerer",
    coreTraits: {
      primaryAbility: "Charisma",
      hitDie: "d6",
      savingThrows: ["Constitution", "Charisma"],
      skillChoices: {
        count: 2,
        options: [
          "Science",
          "Deception",
          "Intuition",
          "Intimidation",
          "Persuasion",
          "Lore",
        ],
      },
      weaponProficiencies: "Simple weapons",
      armorTraining: "None",
    },
    spellcasting: {
      ability: "Charisma",
      type: "full",
      flavorName: "Innate Abilities",
      focusFlavor:
        "an innate focus -- the power comes from within",
    },
    scaling: [
      {
        label: "Cantrips Known",
        values: {
          1: 4,
          2: 4,
          3: 4,
          4: 5,
          5: 5,
          6: 5,
          7: 5,
          8: 5,
          9: 5,
          10: 6,
          11: 6,
          12: 6,
        },
      },
      {
        label: "Prepared Abilities (Spells)",
        values: {
          1: 2,
          2: 3,
          3: 6,
          4: 7,
          5: 9,
          6: 10,
          7: 11,
          8: 12,
          9: 14,
          10: 15,
          11: 16,
          12: 16,
        },
      },
      {
        label: "Power Points (Sorcery Points)",
        values: {
          1: "-",
          2: 2,
          3: 3,
          4: 4,
          5: 5,
          6: 6,
          7: 7,
          8: 8,
          9: 9,
          10: 10,
          11: 11,
          12: 12,
        },
      },
    ],
    features: [
      // --- Level 1 ---
      {
        name: "Innate Abilities",
        srdName: "Spellcasting",
        level: 1,
        description:
          "Your powers are innate -- born into your DNA, manifesting as raw energy, elemental force, or biological mutation. You know four cantrips and prepare a number of abilities (spells) from the Sorcerer list as shown in the Prepared Abilities column. Charisma is your ability modifier. The power comes from within; no external focus is needed.",
      },
      {
        name: "Power Surge",
        srdName: "Innate Sorcery",
        level: 1,
        description:
          "You can unleash the simmering power inside you. As a Bonus Action, you activate a Power Surge for 1 minute: your ability save DC increases by 1, you have Advantage on attack rolls for your innate abilities, and you can use this feature twice, regaining all uses after a Long Rest.",
      },
      // --- Level 2 ---
      {
        name: "Wellspring",
        srdName: "Font of Magic",
        level: 2,
        description:
          "You can tap into the deep wellspring of mutant energy within you, represented by Power Points. You have 2 Power Points (increasing as shown in the Power Points column). You can convert expended spell slots into Power Points (equal to the slot's level), or spend Power Points to create spell slots (cost: 2 for 1st, 3 for 2nd, 5 for 3rd, 6 for 4th, 7 for 5th). Created slots vanish after a Long Rest.",
      },
      {
        name: "Power Modulation",
        srdName: "Metamagic",
        level: 2,
        description:
          "Because your powers flow from within, you can bend and overload them to suit the moment. You gain two Power Modulation options of your choice (e.g., Careful Spell, Distant Spell, Empowered Spell, Extended Spell, Heightened Spell, Quickened Spell, Seeking Spell, Subtle Spell, Transmuted Spell, Twinned Spell). You spend Power Points to apply a modulation when you use an ability. You gain two more options at level 10.",
      },
      // --- Level 3 ---
      {
        name: "Mutant Subclass",
        srdName: "Sorcerer Subclass",
        level: 3,
        description:
          "You gain a Mutant subclass of your choice, representing the specific nature of your mutation. Subclasses are specializations not yet detailed in the current version.",
      },
      // --- Level 4 ---
      {
        name: "Ability Score Improvement",
        srdName: "Ability Score Improvement",
        level: 4,
        description:
          "You gain a feat of your choice. In OP, all level-up feats are half-feats that include a +1 ability score increase.",
      },
      // --- Level 5 ---
      {
        name: "Power Restoration",
        srdName: "Sorcerous Restoration",
        level: 5,
        description:
          "Your body naturally regenerates its mutant energy. When you finish a Short Rest, you regain expended Power Points equal to half your Sorcerer level (round down). Once you use this feature, you can't do so again until you finish a Long Rest.",
      },
      // --- Level 6 ---
      {
        name: "Mutant Subclass Feature",
        srdName: "Subclass Feature",
        level: 6,
        description:
          "You gain a feature from your Mutant subclass. Subclass features are not yet detailed in the current version.",
      },
      // --- Level 7 ---
      {
        name: "Overcharge",
        srdName: "Sorcery Incarnate",
        level: 7,
        description:
          "Your mutation reaches a new threshold of power. If you have no uses of Power Surge left, you can spend 2 Power Points as a Bonus Action to activate it. While Power Surge is active, you can use up to two Power Modulation options on each ability you use, instead of one.",
      },
      // --- Level 8 ---
      {
        name: "Ability Score Improvement",
        srdName: "Ability Score Improvement",
        level: 8,
        description:
          "You gain a feat of your choice. In OP, all level-up feats are half-feats that include a +1 ability score increase.",
      },
      // --- Level 10 ---
      {
        name: "Power Modulation",
        srdName: "Metamagic",
        level: 10,
        description:
          "You gain two additional Power Modulation options of your choice, further expanding the ways you can bend and overload your innate abilities.",
      },
      // --- Level 12 ---
      {
        name: "Ability Score Improvement",
        srdName: "Ability Score Improvement",
        level: 12,
        description:
          "You gain a feat of your choice. In OP, all level-up feats are half-feats that include a +1 ability score increase.",
      },
    ],
  },

  // ===========================================================================
  // THE PACTBOUND — Mapped from SRD 5.2 Warlock
  // "Something offered me power. I said yes."
  // ===========================================================================
  {
    originId: "the-pactbound",
    srdClass: "Warlock",
    coreTraits: {
      primaryAbility: "Charisma",
      hitDie: "d8",
      savingThrows: ["Wisdom", "Charisma"],
      skillChoices: {
        count: 2,
        options: [
          "Science",
          "Deception",
          "History",
          "Intimidation",
          "Investigation",
          "Wilderness",
          "Lore",
        ],
      },
      weaponProficiencies: "Simple weapons",
      armorTraining: "Light armor",
    },
    spellcasting: {
      ability: "Charisma",
      type: "pact",
      flavorName: "Granted Power",
      focusFlavor:
        "a pact token or arcane focus granted by the patron",
    },
    scaling: [
      {
        label: "Cantrips Known",
        values: {
          1: 2,
          2: 2,
          3: 2,
          4: 3,
          5: 3,
          6: 3,
          7: 3,
          8: 3,
          9: 3,
          10: 4,
          11: 4,
          12: 4,
        },
      },
      {
        label: "Prepared Abilities (Spells)",
        values: {
          1: 2,
          2: 3,
          3: 4,
          4: 5,
          5: 6,
          6: 7,
          7: 8,
          8: 9,
          9: 10,
          10: 10,
          11: 11,
          12: 11,
        },
      },
      {
        label: "Pact Slots",
        values: {
          1: 1,
          2: 2,
          3: 2,
          4: 2,
          5: 2,
          6: 2,
          7: 2,
          8: 2,
          9: 2,
          10: 2,
          11: 3,
          12: 3,
        },
      },
      {
        label: "Slot Level",
        values: {
          1: 1,
          2: 1,
          3: 2,
          4: 2,
          5: 3,
          6: 3,
          7: 4,
          8: 4,
          9: 5,
          10: 5,
          11: 5,
          12: 5,
        },
      },
      {
        label: "Pact Manifestations (Invocations)",
        values: {
          1: 1,
          2: 3,
          3: 3,
          4: 3,
          5: 5,
          6: 5,
          7: 6,
          8: 6,
          9: 7,
          10: 7,
          11: 7,
          12: 8,
        },
      },
    ],
    features: [
      // --- Level 1 ---
      {
        name: "Granted Power",
        srdName: "Pact Magic",
        level: 1,
        description:
          "Your patron grants you the ability to channel power through the pact. You know two cantrips and prepare a number of abilities (spells) from the Warlock list as shown in the Prepared Abilities column. Charisma is your ability modifier. Unlike other casters, your spell slots are all the same level (see Slot Level column) and recharge on a Short or Long Rest.",
      },
      {
        name: "Pact Manifestations",
        srdName: "Eldritch Invocations",
        level: 1,
        description:
          "Your pact manifests as fragments of forbidden knowledge and granted abilities. You gain one Pact Manifestation of your choice, and more as shown in the Pact Manifestations column. Options include Pact Boons (Pact of the Blade, Pact of the Chain, Pact of the Tome) and other invocations such as Agonizing Blast, Armor of Shadows, Devil's Sight, and more. Some have prerequisites. Whenever you gain a Pactbound level, you can replace one manifestation with another you qualify for.",
      },
      // --- Level 2 ---
      {
        name: "Dark Ritual",
        srdName: "Magical Cunning",
        level: 2,
        description:
          "You can perform an esoteric rite for 1 minute to draw deeper on your patron's power. At the end, you regain expended Pact Magic spell slots equal to half your maximum (round up). Once you use this feature, you can't do so again until you finish a Long Rest.",
      },
      // --- Level 3 ---
      {
        name: "Pactbound Subclass",
        srdName: "Warlock Subclass",
        level: 3,
        description:
          "You gain a Pactbound subclass of your choice, representing the nature of the entity behind your deal. Subclasses are specializations not yet detailed in the current version.",
      },
      // --- Level 4 ---
      {
        name: "Ability Score Improvement",
        srdName: "Ability Score Improvement",
        level: 4,
        description:
          "You gain a feat of your choice. In OP, all level-up feats are half-feats that include a +1 ability score increase.",
      },
      // --- Level 6 ---
      {
        name: "Pactbound Subclass Feature",
        srdName: "Subclass Feature",
        level: 6,
        description:
          "You gain a feature from your Pactbound subclass. Subclass features are not yet detailed in the current version.",
      },
      // --- Level 8 ---
      {
        name: "Ability Score Improvement",
        srdName: "Ability Score Improvement",
        level: 8,
        description:
          "You gain a feat of your choice. In OP, all level-up feats are half-feats that include a +1 ability score increase.",
      },
      // --- Level 9 ---
      {
        name: "Contact Patron",
        srdName: "Contact Patron",
        level: 9,
        description:
          "You can now reach your patron directly, without intermediaries. You always have Contact Other Plane prepared. You can cast it without expending a spell slot to contact your patron, and you automatically succeed on the spell's saving throw. Once you cast it this way, you can't do so again until you finish a Long Rest.",
      },
      // --- Level 10 ---
      {
        name: "Pactbound Subclass Feature",
        srdName: "Subclass Feature",
        level: 10,
        description:
          "You gain a feature from your Pactbound subclass. Subclass features are not yet detailed in the current version.",
      },
      // --- Level 11 ---
      {
        name: "Forbidden Knowledge",
        srdName: "Mystic Arcanum",
        level: 11,
        description:
          "Your patron grants you a forbidden secret -- a level 6 Warlock ability (spell) as your first arcanum. You can cast this ability once without expending a spell slot, and you must finish a Long Rest before casting it this way again.",
      },
      // --- Level 12 ---
      {
        name: "Ability Score Improvement",
        srdName: "Ability Score Improvement",
        level: 12,
        description:
          "You gain a feat of your choice. In OP, all level-up feats are half-feats that include a +1 ability score increase.",
      },
    ],
  },

  // ===========================================================================
  // THE GENIUS — Mapped from SRD 5.2 Wizard
  // "I built this with my own mind."
  // ===========================================================================
  {
    originId: "the-genius",
    srdClass: "Wizard",
    coreTraits: {
      primaryAbility: "Intelligence",
      hitDie: "d6",
      savingThrows: ["Intelligence", "Wisdom"],
      skillChoices: {
        count: 2,
        options: [
          "Science",
          "History",
          "Intuition",
          "Investigation",
          "Medicine",
          "Wilderness",
          "Lore",
        ],
      },
      weaponProficiencies: "Simple weapons",
      armorTraining: "None",
    },
    spellcasting: {
      ability: "Intelligence",
      type: "full",
      flavorName: "Inventions",
      focusFlavor:
        "a workshop, lab equipment, or technical schematics",
    },
    scaling: [
      {
        label: "Cantrips Known",
        values: {
          1: 3,
          2: 3,
          3: 3,
          4: 4,
          5: 4,
          6: 4,
          7: 4,
          8: 4,
          9: 4,
          10: 5,
          11: 5,
          12: 5,
        },
      },
      {
        label: "Prepared Inventions (Spells)",
        values: {
          1: 4,
          2: 5,
          3: 6,
          4: 7,
          5: 9,
          6: 10,
          7: 11,
          8: 12,
          9: 14,
          10: 15,
          11: 16,
          12: 16,
        },
      },
    ],
    features: [
      // --- Level 1 ---
      {
        name: "Inventions",
        srdName: "Spellcasting",
        level: 1,
        description:
          "You don't cast spells -- you deploy inventions, gadgets, chemical compounds, and engineered solutions. You know three cantrips and prepare a number of inventions (spells) from your Schematics as shown in the Prepared Inventions column. Intelligence is your ability modifier. Your Schematics (spellbook) starts with 6 level 1 inventions and gains 2 more each time you gain a Genius level.",
      },
      {
        name: "Methodical Preparation",
        srdName: "Ritual Adept",
        level: 1,
        description:
          "You can deploy any invention (spell) as a ritual if it has the Ritual tag and is in your Schematics. You don't need to have the invention prepared, but you must read from the blueprints to use it this way.",
      },
      {
        name: "Rapid Prototyping",
        srdName: "Arcane Recovery",
        level: 1,
        description:
          "You can perform field repairs and rapid prototyping between engagements. When you finish a Short Rest, you can recover expended spell slots with a combined level equal to no more than half your Genius level (round up), and none of the recovered slots can be level 6 or higher. Once you use this feature, you can't do so again until you finish a Long Rest.",
      },
      // --- Level 2 ---
      {
        name: "Field of Study",
        srdName: "Scholar",
        level: 2,
        description:
          "While studying your inventions, you've also specialized in another field. Choose one of the following skills in which you have proficiency: Science, History, Intuition, Investigation, Medicine, Wilderness, or Lore. You have Expertise in the chosen skill.",
      },
      // --- Level 3 ---
      {
        name: "Genius Subclass",
        srdName: "Wizard Subclass",
        level: 3,
        description:
          "You gain a Genius subclass of your choice, representing your area of technical expertise. Subclasses are specializations not yet detailed in the current version.",
      },
      // --- Level 4 ---
      {
        name: "Ability Score Improvement",
        srdName: "Ability Score Improvement",
        level: 4,
        description:
          "You gain a feat of your choice. In OP, all level-up feats are half-feats that include a +1 ability score increase.",
      },
      // --- Level 5 ---
      {
        name: "Breakthrough Design",
        srdName: "Memorize Spell",
        level: 5,
        description:
          "Whenever you finish a Short Rest, you can study your Schematics and swap one of the level 1+ inventions you have prepared for another level 1+ invention from your Schematics.",
      },
      // --- Level 6 ---
      {
        name: "Genius Subclass Feature",
        srdName: "Subclass Feature",
        level: 6,
        description:
          "You gain a feature from your Genius subclass. Subclass features are not yet detailed in the current version.",
      },
      // --- Level 8 ---
      {
        name: "Ability Score Improvement",
        srdName: "Ability Score Improvement",
        level: 8,
        description:
          "You gain a feat of your choice. In OP, all level-up feats are half-feats that include a +1 ability score increase.",
      },
      // --- Level 10 ---
      {
        name: "Genius Subclass Feature",
        srdName: "Subclass Feature",
        level: 10,
        description:
          "You gain a feature from your Genius subclass. Subclass features are not yet detailed in the current version.",
      },
      // --- Level 12 ---
      {
        name: "Ability Score Improvement",
        srdName: "Ability Score Improvement",
        level: 12,
        description:
          "You gain a feat of your choice. In OP, all level-up feats are half-feats that include a +1 ability score increase.",
      },
    ],
  },
];
