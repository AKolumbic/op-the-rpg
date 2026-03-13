import type { SubclassDefinition } from "./subclasses";

// =============================================================================
// Group 3: The Scoundrel (Rogue), The Mutant (Sorcerer),
//           The Pactbound (Warlock), The Genius (Wizard)
// =============================================================================

export const SUBCLASS_GROUP_3: SubclassDefinition[] = [
  // ===========================================================================
  // THE SCOUNDREL — Shadow Operative
  // Mapped from: SRD 5.2 Thief
  // Subclass feature levels: 3, 9
  // ===========================================================================
  {
    id: "shadow-operative",
    name: "Shadow Operative",
    srdName: "Thief",
    originId: "the-scoundrel",
    description:
      "You're fast, you're quiet, and you can get into anywhere. While other Scoundrels rely on charm or intimidation, you've perfected the art of the break-in, the heist, and the clean getaway. Locks, traps, walls — they're all just puzzles waiting to be solved.",
    quote: "If they didn't want me to take it, they should have built a better vault.",
    features: [
      {
        name: "Fast Hands",
        srdName: "Fast Hands",
        level: 3,
        description:
          "You can use the Bonus Action granted by your Cunning Action to make a Dexterity (Sleight of Hand) check, use Thieves' Tools to disarm a trap or open a lock, or take the Use an Object action.",
      },
      {
        name: "Second-Story Work",
        srdName: "Second-Story Work",
        level: 3,
        description:
          "You've trained for vertical infiltration. You gain a Climb Speed equal to your walking speed. Additionally, when you make a running jump, the distance you cover increases by a number of feet equal to your Dexterity modifier.",
      },
      {
        name: "Supreme Sneak",
        srdName: "Supreme Sneak",
        level: 9,
        description:
          "You move like a ghost. You have Advantage on every Dexterity (Stealth) check you make, provided you aren't wearing Medium or Heavy armor.",
      },
    ],
  },

  // ===========================================================================
  // THE MUTANT — Volatile Genome
  // Mapped from: SRD 5.2 Draconic Bloodline (reflavored as mutation type)
  // Subclass feature levels: 3, 6
  // ===========================================================================
  {
    id: "volatile-genome",
    name: "Volatile Genome",
    srdName: "Draconic Bloodline",
    originId: "the-mutant",
    description:
      "Your mutation has a specific elemental signature — fire, lightning, acid, cold, or something stranger. Your body physically manifests this mutation: scales, discolored skin, luminous veins, or other visible markers. The power is raw and volatile, but unmistakably yours.",
    quote: "I didn't choose what I became. But I've learned to make it count.",
    features: [
      {
        name: "Mutant Resilience",
        srdName: "Draconic Resilience",
        level: 3,
        description:
          "Your mutation has toughened your body. Your Hit Point maximum increases by 3, and it increases by 1 again whenever you gain a level in this Origin Story. Additionally, when you aren't wearing armor, your AC equals 13 + your Dexterity modifier. Your skin has visibly hardened — scales, chitinous plates, or thickened tissue.",
      },
      {
        name: "Mutation Type",
        srdName: "Draconic Resilience (Damage Type)",
        level: 3,
        description:
          "Choose one damage type that represents your mutation's elemental signature: Acid, Cold, Fire, Lightning, or Poison. This choice affects features you gain at higher levels. The choice also determines a visible physical trait — frost patterns on your skin for Cold, faintly glowing veins for Fire, and so on.",
      },
      {
        name: "Elemental Affinity",
        srdName: "Elemental Affinity",
        level: 6,
        description:
          "When you cast a spell that deals damage of your chosen mutation type, you can add your Charisma modifier to one damage roll of that spell. At the same time, you can spend 1 Sorcery Point to gain Resistance to that damage type for 1 hour.",
      },
    ],
  },

  // ===========================================================================
  // THE PACTBOUND — The Dark Patron
  // Mapped from: SRD 5.2 The Fiend
  // Subclass feature levels: 3, 6, 10
  // ===========================================================================
  {
    id: "the-dark-patron",
    name: "The Dark Patron",
    srdName: "The Fiend",
    originId: "the-pactbound",
    description:
      "Whatever you made your deal with, it's something dark. Not necessarily evil — but dangerous, ancient, and hungry. It feeds you power drawn from destruction, suffering, and entropy. Every enemy you drop makes you stronger. That's the bargain.",
    quote: "Every soul I take pays down the debt. And the debt is very, very large.",
    features: [
      {
        name: "Dark One's Blessing",
        srdName: "Dark One's Blessing",
        level: 3,
        description:
          "When you reduce a hostile creature to 0 Hit Points, you gain Temporary Hit Points equal to your Charisma modifier + your Pactbound level (minimum of 1). The borrowed power surges through you — a taste of what your patron feeds on.",
      },
      {
        name: "Patron Spells",
        srdName: "Fiend Expanded Spells",
        level: 3,
        description:
          "Your patron grants you access to additional spells. You always have the following spells prepared: Burning Hands, Command (level 1); Blindness/Deafness, Scorching Ray (level 2); Fireball, Stinking Cloud (level 3); Fire Shield, Wall of Fire (level 4); Flame Strike, Hallow (level 5).",
      },
      {
        name: "Dark One's Own Luck",
        srdName: "Dark One's Own Luck",
        level: 6,
        description:
          "You can call on your patron to alter fate in your favor. When you make an ability check or a saving throw, you can use this feature to add a d10 to your roll. You can do so after seeing the initial roll but before any of the roll's effects occur. Once you use this feature, you can't use it again until you finish a Short or Long Rest.",
      },
      {
        name: "Fiendish Resilience",
        srdName: "Fiendish Resilience",
        level: 10,
        description:
          "Your patron's dark power has seeped into your body. When you finish a Short or Long Rest, you can choose one damage type (other than Force). You gain Resistance to that damage type until you choose a different one with this feature. Damage from magical weapons or silver weapons ignores this Resistance.",
      },
    ],
  },

  // ===========================================================================
  // THE GENIUS — Applied Sciences
  // Mapped from: SRD 5.2 School of Evocation
  // Subclass feature levels: 3, 6, 10
  // ===========================================================================
  {
    id: "applied-sciences",
    name: "Applied Sciences",
    srdName: "School of Evocation",
    originId: "the-genius",
    description:
      "You specialize in the practical application of energy — kinetic, thermal, electromagnetic, and exotic. Your inventions don't just solve problems; they reshape battlefields. You've learned to aim your destructive output with surgical precision.",
    quote: "Controlled demolition is still demolition. I'm just very good at the 'controlled' part.",
    features: [
      {
        name: "Evocation Savant",
        srdName: "Evocation Savant",
        level: 3,
        description:
          "Copying Evocation spells into your Schematics (Spellbook) takes half the usual time and cost. Your expertise in energy manipulation means you can reverse-engineer destructive devices faster than anyone.",
      },
      {
        name: "Sculpt Devices",
        srdName: "Sculpt Spells",
        level: 3,
        description:
          "You can create pockets of relative safety within the effects of your evocation spells. When you cast an evocation spell that affects other creatures you can see, you can choose a number of them equal to 1 + the spell's level. The chosen creatures automatically succeed on their saving throws against the spell, and they take no damage if they would normally take half damage on a successful save.",
      },
      {
        name: "Potent Devices",
        srdName: "Potent Cantrip",
        level: 6,
        description:
          "Your damaging cantrips affect even creatures that avoid the brunt of the effect. When a creature succeeds on a saving throw against your cantrip, the creature takes half the cantrip's damage (if any) but suffers no additional effect from the cantrip.",
      },
      {
        name: "Empowered Evocation",
        srdName: "Empowered Evocation",
        level: 10,
        description:
          "You can add your Intelligence modifier to one damage roll of any Genius evocation spell you cast. The raw energy output of your devices has been optimized beyond what should be theoretically possible.",
      },
    ],
  },
];
