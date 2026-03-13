import type { SubclassDefinition } from "./subclasses";

// =============================================================================
// Group 2: The Soldier (Fighter), The Disciple (Monk),
//           The Oathsworn (Paladin), The Hunter (Ranger)
// =============================================================================

export const SUBCLASS_GROUP_2: SubclassDefinition[] = [
  // ===========================================================================
  // THE SOLDIER — Combat Specialist
  // Mapped from: SRD 5.2 Champion
  // Subclass feature levels: 3, 7, 10
  // ===========================================================================
  {
    id: "combat-specialist",
    name: "Combat Specialist",
    srdName: "Champion",
    originId: "the-soldier",
    description:
      "You're not flashy. You don't need gadgets, powers, or a tragic backstory to be dangerous. You've honed your body and your combat instincts to the absolute peak of human ability. When others rely on tricks, you rely on fundamentals — and your fundamentals are lethal.",
    quote: "No powers. No gimmicks. Just better than you.",
    features: [
      {
        name: "Improved Critical",
        srdName: "Improved Critical",
        level: 3,
        description:
          "Your weapon attacks score a Critical Hit on a roll of 19 or 20 on the d20.",
      },
      {
        name: "Remarkable Athlete",
        srdName: "Remarkable Athlete",
        level: 7,
        description:
          "You can add half your Proficiency Bonus (round up) to any Strength, Dexterity, or Constitution check you make that doesn't already use your Proficiency Bonus. In addition, when you make a running Long Jump, the distance you can cover increases by a number of feet equal to your Strength modifier.",
      },
      {
        name: "Superior Critical",
        srdName: "Superior Critical",
        level: 10,
        description:
          "Your weapon attacks now score a Critical Hit on a roll of 18, 19, or 20 on the d20. Additionally, when you score a Critical Hit, you gain one additional Fighting Style of your choice from the Soldier list. You can change this style whenever you finish a Long Rest.",
      },
    ],
  },

  // ===========================================================================
  // THE DISCIPLE — Way of the Open Hand
  // Mapped from: SRD 5.2 Warrior of the Open Hand
  // Subclass feature levels: 3, 6, 11
  // ===========================================================================
  {
    id: "way-of-the-open-hand",
    name: "Way of the Open Hand",
    srdName: "Warrior of the Open Hand",
    originId: "the-disciple",
    description:
      "You've mastered the art of unarmed combat to a superhuman degree. Your strikes don't just hurt — they manipulate, control, and devastate. Every punch is precise, every kick is calculated. Your body is the most dangerous weapon in any room.",
    quote: "My hands are open. That should worry you more than if they held a weapon.",
    features: [
      {
        name: "Open Hand Technique",
        srdName: "Open Hand Technique",
        level: 3,
        description:
          "Whenever you hit a creature with an attack granted by your Flurry of Blows, you can impose one of the following effects on that target:\n\n• It must succeed on a Dexterity saving throw or be knocked Prone.\n• It must make a Strength saving throw. If it fails, you can push it up to 15 feet away from you.\n• It can't take Reactions until the start of its next turn.",
      },
      {
        name: "Wholeness of Body",
        srdName: "Wholeness of Body",
        level: 6,
        description:
          "You gain the ability to heal yourself. As a Bonus Action, you can roll your Martial Arts die. You regain a number of Hit Points equal to the number rolled plus your Wisdom modifier (minimum of 1 Hit Point regained). You can use this feature a number of times equal to your Wisdom modifier (minimum of once), and you regain all expended uses when you finish a Long Rest.",
      },
      {
        name: "Quivering Palm",
        srdName: "Quivering Palm",
        level: 11,
        description:
          "You gain the ability to set up lethal vibrations in someone's body. When you hit a creature with an Unarmed Strike, you can spend 4 Focus Points to start these imperceptible vibrations, which last for a number of days equal to your Disciple level. The vibrations are harmless unless you use your action to end them. When you do so, the creature must make a Constitution saving throw. On failure, it is reduced to 0 Hit Points. On success, it takes 10d12 Force damage.",
      },
    ],
  },

  // ===========================================================================
  // THE OATHSWORN — Oath of Justice
  // Mapped from: SRD 5.2 Oath of Devotion
  // Subclass feature levels: 3, 7
  // ===========================================================================
  {
    id: "oath-of-justice",
    name: "Oath of Justice",
    srdName: "Oath of Devotion",
    originId: "the-oathsworn",
    description:
      "You swore to protect the innocent and uphold justice — not the law, not a government, but the principle itself. Your conviction radiates outward, shielding allies and burning away corruption. You are a living symbol of what you believe in.",
    quote: "The oath isn't what gives me power. The power is what makes the oath matter.",
    features: [
      {
        name: "Oath Spells",
        srdName: "Oath Spells",
        level: 3,
        description:
          "Your oath grants you additional spells. You always have the following spells prepared, and they don't count against the number of spells you can prepare: Protection from Evil and Good, Shield of Faith (level 3); Aid, Zone of Truth (level 5); Beacon of Hope, Dispel Magic (level 9).",
      },
      {
        name: "Sacred Weapon",
        srdName: "Sacred Weapon",
        level: 3,
        description:
          "As a Bonus Action, you can channel your conviction into a weapon you're holding. For 10 minutes, you add your Charisma modifier to attack rolls made with that weapon (minimum bonus of +1). The weapon also emits Bright Light in a 20-foot radius and Dim Light 20 feet beyond that. The effect ends early if you drop the weapon, have the Incapacitated condition, or use this feature again. You can use this feature a number of times equal to your Proficiency Bonus, regaining all uses after a Long Rest.",
      },
      {
        name: "Aura of Devotion",
        srdName: "Aura of Devotion",
        level: 7,
        description:
          "You and friendly creatures within 10 feet of you can't be Charmed while you are conscious. Your sheer force of conviction shields the minds of those around you from outside influence. At higher levels, this aura extends to 30 feet.",
      },
    ],
  },

  // ===========================================================================
  // THE HUNTER — Prey Specialist
  // Mapped from: SRD 5.2 Hunter
  // Subclass feature levels: 3, 7, 11
  // ===========================================================================
  {
    id: "prey-specialist",
    name: "Prey Specialist",
    srdName: "Hunter",
    originId: "the-hunter",
    description:
      "You don't just track your targets — you study them, profile them, and exploit every weakness. Whether you're taking down a single high-value threat or dismantling an entire operation, you have the tactical expertise to match any prey.",
    quote: "Everyone has a pattern. Find the pattern, find the kill.",
    features: [
      {
        name: "Hunter's Prey",
        srdName: "Hunter's Prey",
        level: 3,
        description:
          "You gain one of the following features of your choice:\n\n• Colossus Slayer: Once per turn, when you hit a creature with a weapon attack, the creature takes an extra 1d8 damage if it's below its hit point maximum.\n• Horde Breaker: Once per turn when you make an attack with a weapon, you can make another attack with the same weapon against a different creature that is within 5 feet of the original target and within range of your weapon.",
      },
      {
        name: "Defensive Tactics",
        srdName: "Defensive Tactics",
        level: 7,
        description:
          "You gain one of the following features of your choice:\n\n• Escape the Horde: Opportunity Attacks against you are made with Disadvantage.\n• Steel Will: You have Advantage on saving throws against being Frightened.\n• Multiattack Defense: When a creature hits you with an attack, you gain a +4 bonus to AC against all subsequent attacks made by that creature for the rest of the turn.",
      },
      {
        name: "Multiattack",
        srdName: "Multiattack",
        level: 11,
        description:
          "You gain one of the following features of your choice:\n\n• Volley: You can use your action to make a ranged attack against any number of creatures within 10 feet of a point you can see within your weapon's range. You must have ammunition for each target and make a separate attack roll for each.\n• Whirlwind Attack: You can use your action to make a melee attack against any number of creatures within 5 feet of you, with a separate attack roll for each target.",
      },
    ],
  },
];
