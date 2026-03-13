import type { SubclassDefinition } from "./subclasses";

// =============================================================================
// Group 1: The Bereaved (Barbarian), The Celebrity (Bard),
//           The Chosen (Cleric), The Shifter (Druid)
// =============================================================================

export const SUBCLASS_GROUP_1: SubclassDefinition[] = [
  // ===========================================================================
  // THE BEREAVED — Path of Unending Fury
  // Mapped from: SRD 5.2 Path of the Berserker
  // Subclass feature levels: 3, 6, 10
  // ===========================================================================
  {
    id: "path-of-unending-fury",
    name: "Path of Unending Fury",
    srdName: "Path of the Berserker",
    originId: "the-bereaved",
    description:
      "Your grief doesn't just empower you — it consumes you. When the pain hits, you don't hold back. You throw yourself into the fight with reckless, terrifying abandon, burning through your body to inflict maximum devastation. You've learned to weaponize your own suffering.",
    quote: "I don't fight to win. I fight because stopping means feeling it all again.",
    features: [
      {
        name: "Frenzy",
        srdName: "Frenzy",
        level: 3,
        description:
          "If you use Reckless Attack while your Grief (Rage) is active, you deal extra damage with the first Strength-based attack you hit with on each of your turns. The extra damage equals your Rage Damage bonus. Additionally, when you use your Reckless Attack while raging, you gain Temporary Hit Points equal to your Proficiency Bonus. These vanish when the Grief ends.",
      },
      {
        name: "Mindless Fury",
        srdName: "Mindless Rage",
        level: 6,
        description:
          "You can't be Charmed or Frightened while your Grief (Rage) is active. If you are Charmed or Frightened when you enter Grief, the condition ends on you.",
      },
      {
        name: "Retaliation",
        srdName: "Retaliation",
        level: 10,
        description:
          "When you take damage from a creature that is within 5 feet of you, you can take a Reaction to make one melee attack against that creature, using a weapon or an Unarmed Strike.",
      },
    ],
  },

  // ===========================================================================
  // THE CELEBRITY — School of Acclaim
  // Mapped from: SRD 5.2 College of Lore
  // Subclass feature levels: 3, 6
  // ===========================================================================
  {
    id: "school-of-acclaim",
    name: "School of Acclaim",
    srdName: "College of Lore",
    originId: "the-celebrity",
    description:
      "You didn't just become famous — you studied fame itself. You know how to read a crowd, cut someone down with a word, and learn just enough about anything to sound like an expert. Your celebrity comes with real knowledge and the ability to weaponize it.",
    quote: "I know a little about everything and a lot about making you look foolish.",
    features: [
      {
        name: "Bonus Proficiencies",
        srdName: "Bonus Proficiencies",
        level: 3,
        description:
          "You gain proficiency with three skills of your choice. Your natural charisma and fame give you access to circles of knowledge most people never see.",
      },
      {
        name: "Cutting Words",
        srdName: "Cutting Words",
        level: 3,
        description:
          "When a creature that you can see within 60 feet of you makes a damage roll, an attack roll, or an ability check, you can take a Reaction to expend one use of your Star Power (Bardic Inspiration) and roll the die. Subtract the number rolled from the creature's roll. You can use this feature after the creature makes its roll but before the GM determines whether the roll succeeds or fails.",
      },
      {
        name: "Insider Knowledge",
        srdName: "Additional Magical Secrets",
        level: 6,
        description:
          "You learn two spells of your choice from any spell list. The chosen spells count as powers for you but don't count against the number of powers you know. These represent secrets, tricks, and insider knowledge you've picked up from your wide social network.",
      },
    ],
  },

  // ===========================================================================
  // THE CHOSEN — Domain of Life
  // Mapped from: SRD 5.2 Life Domain
  // Subclass feature levels: 3, 6
  // ===========================================================================
  {
    id: "domain-of-life",
    name: "Domain of Life",
    srdName: "Life Domain",
    originId: "the-chosen",
    description:
      "Whatever chose you, it chose you to preserve life. Your unknown power manifests as an extraordinary ability to heal, protect, and sustain. Whether this is divine grace, alien biology, or something else entirely is unknown — but when you lay hands on the wounded, they get back up.",
    quote: "I don't know why I can do this. I just know people stop dying when I'm around.",
    features: [
      {
        name: "Disciple of Life",
        srdName: "Disciple of Life",
        level: 3,
        description:
          "Your healing powers are especially potent. Whenever you use a spell of 1st level or higher to restore Hit Points to a creature, the creature regains additional Hit Points equal to 2 + the spell's level.",
      },
      {
        name: "Domain Spells",
        srdName: "Domain Spells",
        level: 3,
        description:
          "Your domain grants you additional spells. You always have the following spells prepared: Bless, Cure Wounds (level 3); Aid, Lesser Restoration (level 5); Mass Healing Word, Revivify (level 7); Aura of Life, Death Ward (level 9).",
      },
      {
        name: "Blessed Healer",
        srdName: "Blessed Healer",
        level: 6,
        description:
          "The healing energy you channel also sustains you. When you cast a spell that restores Hit Points to another creature, you regain Hit Points equal to 2 + the spell's level.",
      },
    ],
  },

  // ===========================================================================
  // THE SHIFTER — Circle of Adaptation
  // Mapped from: SRD 5.2 Circle of the Land
  // Subclass feature levels: 3, 6, 10
  // ===========================================================================
  {
    id: "circle-of-adaptation",
    name: "Circle of Adaptation",
    srdName: "Circle of the Land",
    originId: "the-shifter",
    description:
      "Your shifting abilities are tied to the world around you. You draw power from specific environments, adapting your abilities to match the terrain. Urban jungles, frozen tundras, scorched deserts — each landscape unlocks different facets of your power.",
    quote: "The land remembers. And through me, it fights back.",
    features: [
      {
        name: "Bonus Cantrip",
        srdName: "Bonus Cantrip",
        level: 3,
        description:
          "You learn one additional cantrip of your choice from the Druid spell list. This cantrip doesn't count against the number of cantrips you know.",
      },
      {
        name: "Natural Recovery",
        srdName: "Natural Recovery",
        level: 3,
        description:
          "You can regain some of your magical energy by communing with your environment. Once per day when you finish a Short Rest, you can choose expended spell slots to recover. The spell slots can have a combined level that is equal to or less than half your Shifter level (rounded up), and none of the slots can be 6th level or higher.",
      },
      {
        name: "Circle Spells",
        srdName: "Circle Spells",
        level: 3,
        description:
          "Your connection to a specific type of environment grants you additional spells. Choose one land type (Arctic, Coast, Desert, Forest, Grassland, Mountain, Swamp, or Underdark). You always have the associated spells prepared, and they don't count against the number of spells you can prepare.",
      },
      {
        name: "Land's Stride",
        srdName: "Land's Stride",
        level: 6,
        description:
          "Moving through nonmagical Difficult Terrain costs you no extra movement. You can also pass through nonmagical plants without being slowed by them and without taking damage from them if they have thorns, spines, or a similar hazard. In addition, you have Advantage on saving throws against plants that are magically created or manipulated to impede movement.",
      },
      {
        name: "Nature's Ward",
        srdName: "Nature's Ward",
        level: 10,
        description:
          "You are immune to the Poisoned condition, and you have Resistance to Poison damage. Your body has adapted to shrug off natural toxins and environmental hazards that would fell others.",
      },
    ],
  },
];
