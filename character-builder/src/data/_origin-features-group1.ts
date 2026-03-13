import type { OriginStoryFeatures } from "./origin-story-features";

// =============================================================================
// Group 1: The Bereaved (Barbarian), The Celebrity (Bard),
//           The Chosen (Cleric), The Shifter (Druid)
//
// Levels 1-12 only. All SRD features reflavored for OP superhero setting.
// Skill mappings: Animal Handling -> Urban, Arcana -> Science,
//   Insight -> Intuition, Nature -> Wilderness, Religion -> Lore,
//   Survival -> merged into Wilderness
// =============================================================================

export const GROUP_1: OriginStoryFeatures[] = [
  // ===========================================================================
  // THE BEREAVED — Mapped from SRD 5.2 Barbarian
  // ===========================================================================
  {
    originId: "the-bereaved",
    srdClass: "Barbarian",
    coreTraits: {
      primaryAbility: "Strength",
      hitDie: "d12",
      savingThrows: ["Strength", "Constitution"],
      skillChoices: {
        count: 2,
        options: [
          "Urban",
          "Athletics",
          "Intimidation",
          "Wilderness",
          "Perception",
        ],
      },
      weaponProficiencies: "Simple and Martial weapons",
      armorTraining: "Light and Medium armor and Shields",
    },
    spellcasting: null,
    scaling: [
      {
        label: "Rages",
        values: {
          1: 2,
          2: 2,
          3: 3,
          4: 3,
          5: 3,
          6: 4,
          7: 4,
          8: 4,
          9: 4,
          10: 4,
          11: 4,
          12: 5,
        },
      },
      {
        label: "Rage Damage",
        values: {
          1: "+2",
          2: "+2",
          3: "+2",
          4: "+2",
          5: "+2",
          6: "+2",
          7: "+2",
          8: "+2",
          9: "+3",
          10: "+3",
          11: "+3",
          12: "+3",
        },
      },
      {
        label: "Weapon Mastery",
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
    ],
    features: [
      // --- Level 1 ---
      {
        name: "Grief",
        srdName: "Rage",
        level: 1,
        description:
          "Your loss has left a well of fury inside you that you can tap in battle. As a Bonus Action, you enter a state of grief-fueled rage, gaining Resistance to Bludgeoning, Piercing, and Slashing damage, a bonus to Strength-based damage rolls (see the Rage Damage scaling column), and Advantage on Strength checks and saves. While in Grief, you cannot maintain Concentration or cast spells. Grief lasts until the end of your next turn and can be extended by attacking, forcing a save, or using a Bonus Action. You can use Grief the number of times shown in the Rages column, regaining one use on a Short Rest and all uses on a Long Rest.",
      },
      {
        name: "Pain Tolerance",
        srdName: "Unarmored Defense",
        level: 1,
        description:
          "The trauma you carry has hardened your body against punishment. While you are not wearing armor, your AC equals 10 + your Dexterity modifier + your Constitution modifier. You can use a Shield and still gain this benefit.",
      },
      {
        name: "Weapon Mastery",
        srdName: "Weapon Mastery",
        level: 1,
        description:
          "Your grief drives you to wield weapons with devastating precision. You can use the mastery properties of a number of weapon types shown in the Weapon Mastery column. When you finish a Long Rest, you can change your weapon mastery choices.",
      },
      // --- Level 2 ---
      {
        name: "Danger Sense",
        srdName: "Danger Sense",
        level: 2,
        description:
          "Your heightened awareness -- born from always expecting the worst -- gives you Advantage on Dexterity saving throws against effects you can see, such as traps and spells, unless you have the Incapacitated condition.",
      },
      {
        name: "Reckless Attack",
        srdName: "Reckless Attack",
        level: 2,
        description:
          "You can throw caution aside, attacking with the ferocity of someone who has nothing left to lose. When you make your first attack roll on your turn, you can attack recklessly, gaining Advantage on all Strength-based attack rolls that turn, but attack rolls against you have Advantage until the start of your next turn.",
      },
      // --- Level 3 ---
      {
        name: "Bereaved Subclass",
        srdName: "Barbarian Subclass",
        level: 3,
        description:
          "You gain a Bereaved subclass of your choice. Subclasses are specializations not yet detailed in the current version.",
      },
      {
        name: "Trauma Knowledge",
        srdName: "Primal Knowledge",
        level: 3,
        description:
          "Your suffering has forced you to learn things most people never need to know. You gain proficiency in one additional skill from the Bereaved skill list. While your Grief is active, you can channel that raw intensity into unlikely competence; whenever you make an ability check using Acrobatics, Intimidation, Perception, Stealth, or Wilderness, you can use Strength for the check even if it normally uses a different ability.",
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
        name: "Extra Attack",
        srdName: "Extra Attack",
        level: 5,
        description:
          "Your relentless aggression lets you strike twice in rapid succession. You can attack twice instead of once whenever you take the Attack action on your turn.",
      },
      {
        name: "Relentless",
        srdName: "Fast Movement",
        level: 5,
        description:
          "You move with the urgency of someone who cannot afford to stop. Your Speed increases by 10 feet while you are not wearing Heavy armor.",
      },
      // --- Level 6 ---
      {
        name: "Bereaved Subclass Feature",
        srdName: "Subclass Feature",
        level: 6,
        description:
          "You gain a feature from your Bereaved subclass. Subclasses are specializations not yet detailed in the current version.",
      },
      // --- Level 7 ---
      {
        name: "Feral Instinct",
        srdName: "Feral Instinct",
        level: 7,
        description:
          "Your survival instincts are razor-sharp, honed by loss and constant vigilance. You have Advantage on Initiative rolls.",
      },
      {
        name: "Instinctive Pounce",
        srdName: "Instinctive Pounce",
        level: 7,
        description:
          "When you enter your Grief, your body surges forward on pure instinct. As part of the Bonus Action you use to enter Grief, you can move up to half your Speed.",
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
        name: "Brutal Strike",
        srdName: "Brutal Strike",
        level: 9,
        description:
          "Your grief explodes into devastating blows. When you use Reckless Attack, you can forgo Advantage on one Strength-based attack roll to deal an extra 1d10 damage of the weapon's type if it hits. The target must not have Disadvantage on the roll. You may also apply one Brutal Strike effect: Forceful Blow (push target 15 feet and move up to half your Speed toward them) or Hamstring Blow (reduce target's Speed by 15 feet until your next turn).",
      },
      // --- Level 10 ---
      {
        name: "Bereaved Subclass Feature",
        srdName: "Subclass Feature",
        level: 10,
        description:
          "You gain a feature from your Bereaved subclass. Subclasses are specializations not yet detailed in the current version.",
      },
      // --- Level 11 ---
      {
        name: "Relentless Grief",
        srdName: "Relentless Rage",
        level: 11,
        description:
          "Your grief refuses to let you fall. If you drop to 0 Hit Points while your Grief is active and do not die outright, you can make a DC 10 Constitution saving throw. On a success, your Hit Points instead change to a number equal to twice your Bereaved level. Each time you use this feature after the first, the DC increases by 5. The DC resets to 10 when you finish a Short or Long Rest.",
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
  // THE CELEBRITY — Mapped from SRD 5.2 Bard
  // ===========================================================================
  {
    originId: "the-celebrity",
    srdClass: "Bard",
    coreTraits: {
      primaryAbility: "Charisma",
      hitDie: "d8",
      savingThrows: ["Dexterity", "Charisma"],
      skillChoices: {
        count: 3,
        options: [
          "Acrobatics",
          "Athletics",
          "Urban",
          "Deception",
          "History",
          "Intimidation",
          "Intuition",
          "Investigation",
          "Medicine",
          "Wilderness",
          "Perception",
          "Performance",
          "Persuasion",
          "Lore",
          "Science",
          "Sleight of Hand",
          "Stealth",
        ],
      },
      weaponProficiencies: "Simple weapons",
      armorTraining: "Light armor",
      toolProficiencies: "Choose 3 Musical Instruments",
    },
    spellcasting: {
      ability: "Charisma",
      type: "full",
      flavorName: "Connections",
      focusFlavor:
        "a media device, instrument, or personal brand",
    },
    scaling: [
      {
        label: "Bardic Die",
        values: {
          1: "d6",
          2: "d6",
          3: "d6",
          4: "d6",
          5: "d8",
          6: "d8",
          7: "d8",
          8: "d8",
          9: "d8",
          10: "d10",
          11: "d10",
          12: "d10",
        },
      },
      {
        label: "Cantrips",
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
        label: "Prepared Spells",
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
        name: "Star Power",
        srdName: "Bardic Inspiration",
        level: 1,
        description:
          "Your fame and force of personality inspire those around you. As a Bonus Action, you can inspire a creature within 60 feet that can see or hear you, granting it a Star Power die (see the Bardic Die scaling column). Once within the next hour, the creature can roll the die and add it to one ability check, attack roll, or saving throw. A creature can hold only one Star Power die at a time. You can use this feature a number of times equal to your Charisma modifier (minimum of once), and you regain all expended uses when you finish a Long Rest.",
      },
      {
        name: "Connections",
        srdName: "Spellcasting",
        level: 1,
        description:
          "Your influence, resources, and media presence let you produce effects others would call impossible. You know cantrips and prepare spells from the Celebrity (Bard) spell list as shown in the scaling columns. Charisma is your spellcasting ability, and you can use a media device, instrument, or personal brand as a spellcasting focus.",
      },
      // --- Level 2 ---
      {
        name: "Expertise",
        srdName: "Expertise",
        level: 2,
        description:
          "Your time in the spotlight has made you exceptionally skilled in specific areas. You gain Expertise in two of your skill proficiencies of your choice. Performance and Persuasion are recommended if you have proficiency in them.",
      },
      {
        name: "Jack of All Trades",
        srdName: "Jack of All Trades",
        level: 2,
        description:
          "Fame opens every door. You can add half your Proficiency Bonus (round down) to any ability check you make that does not already use your Proficiency Bonus.",
      },
      // --- Level 3 ---
      {
        name: "Celebrity Subclass",
        srdName: "Bard Subclass",
        level: 3,
        description:
          "You gain a Celebrity subclass of your choice. Subclasses are specializations not yet detailed in the current version.",
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
        name: "Font of Inspiration",
        srdName: "Font of Inspiration",
        level: 5,
        description:
          "Your presence is endlessly energizing. You now regain all expended uses of Star Power when you finish a Short or Long Rest. In addition, you can expend a spell slot (no action required) to regain one expended use of Star Power.",
      },
      // --- Level 6 ---
      {
        name: "Celebrity Subclass Feature",
        srdName: "Subclass Feature",
        level: 6,
        description:
          "You gain a feature from your Celebrity subclass. Subclasses are specializations not yet detailed in the current version.",
      },
      // --- Level 7 ---
      {
        name: "Media Spin",
        srdName: "Countercharm",
        level: 7,
        description:
          "You can use your public presence and sharp rhetoric to disrupt mind-influencing effects. If you or a creature within 30 feet fails a saving throw against an effect that applies the Charmed or Frightened condition, you can use a Reaction to cause the save to be rerolled, and the new roll has Advantage.",
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
        name: "Expertise",
        srdName: "Expertise",
        level: 9,
        description:
          "Your reputation precedes you in ever more domains. You gain Expertise in two more of your skill proficiencies of your choice.",
      },
      // --- Level 10 ---
      {
        name: "Insider Knowledge",
        srdName: "Magical Secrets",
        level: 10,
        description:
          "You have learned secrets from every corner of your vast network. Whenever you reach a Celebrity level (including this one) and the Prepared Spells number increases, you can choose any of your new prepared spells from the Celebrity, Chosen (Cleric), Shifter (Druid), or Genius (Wizard) spell lists. The chosen spells count as Celebrity spells for you.",
      },
      // --- Level 11 ---
      // No new feature at level 11 per the SRD Bard table
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
  // THE CHOSEN — Mapped from SRD 5.2 Cleric
  // ===========================================================================
  {
    originId: "the-chosen",
    srdClass: "Cleric",
    coreTraits: {
      primaryAbility: "Wisdom",
      hitDie: "d8",
      savingThrows: ["Wisdom", "Charisma"],
      skillChoices: {
        count: 2,
        options: [
          "History",
          "Intuition",
          "Medicine",
          "Persuasion",
          "Lore",
        ],
      },
      weaponProficiencies: "Simple weapons",
      armorTraining: "Light and Medium armor and Shields",
    },
    spellcasting: {
      ability: "Wisdom",
      type: "full",
      flavorName: "Channeled Power",
      focusFlavor:
        "a token or symbol of unknown significance",
    },
    scaling: [
      {
        label: "Channel Gift",
        values: {
          1: "-",
          2: 2,
          3: 2,
          4: 2,
          5: 2,
          6: 3,
          7: 3,
          8: 3,
          9: 3,
          10: 3,
          11: 3,
          12: 3,
        },
      },
      {
        label: "Cantrips",
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
        label: "Prepared Spells",
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
        name: "Channeled Power",
        srdName: "Spellcasting",
        level: 1,
        description:
          "You channel power from an unknown source to produce extraordinary effects. You know cantrips and prepare spells from the Chosen (Cleric) spell list as shown in the scaling columns. Wisdom is your spellcasting ability, and you can use a token or symbol of unknown significance as a spellcasting focus.",
      },
      {
        name: "Sacred Role",
        srdName: "Divine Order",
        level: 1,
        description:
          "Your mysterious gift has shaped how you engage with the world. Choose one of the following roles. Protector: trained for battle, you gain proficiency with Martial weapons and training with Heavy armor. Thaumaturge: your mystical connection deepens your understanding -- you know one extra cantrip from the Chosen spell list and gain a bonus to your Intelligence (Science or Lore) checks equal to your Wisdom modifier (minimum +1).",
      },
      // --- Level 2 ---
      {
        name: "Channel Gift",
        srdName: "Channel Divinity",
        level: 2,
        description:
          "You can channel your mysterious power directly to produce potent effects. You have two Channel Gift options: Power Surge and Banish the Unnatural. Each time you use Channel Gift, you choose which effect to create. You can use Channel Gift the number of times shown in the Channel Gift scaling column, regaining one use on a Short Rest and all uses on a Long Rest. If a Channel Gift effect requires a saving throw, the DC equals your Chosen spell save DC.",
      },
      {
        name: "Power Surge",
        srdName: "Divine Spark",
        level: 2,
        description:
          "As a Magic action, you direct a surge of your unknown power at a creature you can see within 30 feet. Roll 1d8 and add your Wisdom modifier. You either restore Hit Points to the creature equal to that total, or force the creature to make a Constitution saving throw, taking Necrotic or Radiant damage (your choice) equal to the total on a failure, or half on a success. You roll an additional d8 at Chosen levels 7 (2d8), 13 (3d8), and 18 (4d8).",
      },
      {
        name: "Banish the Unnatural",
        srdName: "Turn Undead",
        level: 2,
        description:
          "As a Magic action, you present your token or symbol and channel your gift to repel unnatural creatures. Each Undead of your choice within 30 feet must make a Wisdom saving throw. On a failure, the creature has the Frightened and Incapacitated conditions for 1 minute, moving as far from you as possible on its turns. The effect ends early if the creature takes damage, if you have the Incapacitated condition, or if you die.",
      },
      // --- Level 3 ---
      {
        name: "Chosen Subclass",
        srdName: "Cleric Subclass",
        level: 3,
        description:
          "You gain a Chosen subclass of your choice. Subclasses are specializations not yet detailed in the current version.",
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
        name: "Sear the Unnatural",
        srdName: "Sear Undead",
        level: 5,
        description:
          "Your gift burns creatures that defy the natural order. Whenever you use Banish the Unnatural, you can roll a number of d8s equal to your Wisdom modifier (minimum 1d8) and add them together. Each Undead that fails its saving throw against Banish the Unnatural takes Radiant damage equal to the roll's total. This damage does not end the Banish the Unnatural effect.",
      },
      // --- Level 6 ---
      {
        name: "Chosen Subclass Feature",
        srdName: "Subclass Feature",
        level: 6,
        description:
          "You gain a feature from your Chosen subclass. Subclasses are specializations not yet detailed in the current version.",
      },
      // --- Level 7 ---
      {
        name: "Empowered Strikes",
        srdName: "Blessed Strikes",
        level: 7,
        description:
          "Your unknown power now infuses your combat abilities. Choose one of the following options (if you have an older subclass option, use only one). Divine Strike: once per turn when you hit a creature with a weapon attack, you deal an extra 1d8 Necrotic or Radiant damage (your choice). Potent Spellcasting: you add your Wisdom modifier to the damage you deal with any Chosen cantrip.",
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
      // No new feature at level 9 per the SRD Cleric table
      // --- Level 10 ---
      {
        name: "Desperate Plea",
        srdName: "Divine Intervention",
        level: 10,
        description:
          "In your darkest moment, you can call upon whatever gave you this power. As a Magic action, you can choose any Chosen spell of level 5 or lower that does not require a Reaction to cast. You cast it without expending a spell slot or needing Material components. You cannot use this feature again until you finish a Long Rest.",
      },
      // --- Level 11 ---
      // No new feature at level 11 per the SRD Cleric table
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
  // THE SHIFTER — Mapped from SRD 5.2 Druid
  // ===========================================================================
  {
    originId: "the-shifter",
    srdClass: "Druid",
    coreTraits: {
      primaryAbility: "Wisdom",
      hitDie: "d8",
      savingThrows: ["Intelligence", "Wisdom"],
      skillChoices: {
        count: 2,
        options: [
          "Urban",
          "Science",
          "Intuition",
          "Medicine",
          "Wilderness",
          "Perception",
          "Lore",
        ],
      },
      weaponProficiencies: "Simple weapons",
      armorTraining: "Light armor and Shields",
      toolProficiencies: "Herbalism Kit",
    },
    spellcasting: {
      ability: "Wisdom",
      type: "full",
      flavorName: "Instinctual Abilities",
      focusFlavor:
        "a natural object or body part that resonates with the shift",
    },
    scaling: [
      {
        label: "Wild Shape",
        values: {
          1: "-",
          2: 2,
          3: 2,
          4: 2,
          5: 2,
          6: 3,
          7: 3,
          8: 3,
          9: 3,
          10: 3,
          11: 3,
          12: 3,
        },
      },
      {
        label: "Cantrips",
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
        label: "Prepared Spells",
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
        name: "Instinctual Abilities",
        srdName: "Spellcasting",
        level: 1,
        description:
          "Your shifting nature grants you instinctual command over primal forces. You know cantrips and prepare spells from the Shifter (Druid) spell list as shown in the scaling columns. Wisdom is your spellcasting ability, and you can use a natural object or body part that resonates with the shift as a spellcasting focus.",
      },
      {
        name: "Primal Tongue",
        srdName: "Druidic",
        level: 1,
        description:
          "You know Primal Tongue, an instinctual language shared by those who shift. Learning this tongue also unlocked the ability to communicate with animals; you always have the Speak with Animals spell prepared. You can use Primal Tongue to leave hidden messages that other shifters automatically spot; others can detect them with a successful DC 15 Intelligence (Investigation) check but cannot decipher them without this ability.",
      },
      {
        name: "Primal Instinct",
        srdName: "Primal Order",
        level: 1,
        description:
          "Your shifting bond has shaped how you interact with the world. Choose one of the following instincts. Magician: you know one extra cantrip from the Shifter spell list, and your connection to the primal gives you a bonus to Intelligence (Science or Wilderness) checks equal to your Wisdom modifier (minimum +1). Warden: trained for survival, you gain proficiency with Martial weapons and training with Medium armor.",
      },
      // --- Level 2 ---
      {
        name: "Shift Form",
        srdName: "Wild Shape",
        level: 2,
        description:
          "You can physically transform into animals. As a Bonus Action, you shape-shift into a Beast form you have learned, gaining Temporary Hit Points equal to your Shifter level. You stay in that form for a number of hours equal to half your Shifter level (rounded down), or until you use Shift Form again, have the Incapacitated condition, or die. You can leave the form early as a Bonus Action. You can use Shift Form the number of times shown in the Wild Shape scaling column, regaining one use on a Short Rest and all uses on a Long Rest. You know 4 Beast forms at level 2 (max CR 1/4, no Fly Speed), gaining more known forms and higher max CR at levels 4 (6 forms, CR 1/2) and 8 (8 forms, CR 1, Fly Speed allowed).",
      },
      {
        name: "Bonded Creature",
        srdName: "Wild Companion",
        level: 2,
        description:
          "You can summon an animal bonded to your shifting nature. As a Magic action, you can expend a spell slot or a use of Shift Form to cast Find Familiar without Material components. The familiar is a Fey creature that disappears when you finish a Long Rest.",
      },
      // --- Level 3 ---
      {
        name: "Shifter Subclass",
        srdName: "Druid Subclass",
        level: 3,
        description:
          "You gain a Shifter subclass of your choice. Subclasses are specializations not yet detailed in the current version.",
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
        name: "Adaptive Shift",
        srdName: "Wild Resurgence",
        level: 5,
        description:
          "Your shifting biology adapts in the heat of the moment. On each of your turns, if you have no uses of Shift Form left, you can give yourself one use by expending a spell slot (no action required). Additionally, you can expend one use of Shift Form (no action required) to give yourself a level 1 spell slot, but you cannot do so again until you finish a Long Rest.",
      },
      // --- Level 6 ---
      {
        name: "Shifter Subclass Feature",
        srdName: "Subclass Feature",
        level: 6,
        description:
          "You gain a feature from your Shifter subclass. Subclasses are specializations not yet detailed in the current version.",
      },
      // --- Level 7 ---
      {
        name: "Elemental Fury",
        srdName: "Elemental Fury",
        level: 7,
        description:
          "The raw elements flow through your shifting form. Choose one of the following options. Potent Spellcasting: you add your Wisdom modifier to the damage you deal with any Shifter cantrip. Primal Strike: once on each of your turns when you hit a creature with an attack roll using a weapon or a Beast form's attack in Shift Form, you deal an extra 1d8 Cold, Fire, Lightning, or Thunder damage (your choice).",
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
      // No new feature at level 9 per the SRD Druid table
      // --- Level 10 ---
      {
        name: "Shifter Subclass Feature",
        srdName: "Subclass Feature",
        level: 10,
        description:
          "You gain a feature from your Shifter subclass. Subclasses are specializations not yet detailed in the current version.",
      },
      // --- Level 11 ---
      // No new feature at level 11 per the SRD Druid table
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
