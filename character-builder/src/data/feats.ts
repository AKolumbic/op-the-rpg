export interface Feat {
  id: string;
  name: string;
  category: "origin" | "general" | "fighting-style";
  description: string;
  repeatable: boolean;
  benefits: string[];
  prerequisite?: string;
}

export const FEATS: Feat[] = [
  // ─── Origin Feats ───────────────────────────────────────────

  {
    id: "alert",
    name: "Alert",
    category: "origin",
    description:
      "You've trained yourself to react before anyone else in the room. Whether it's street instincts, military drilling, or just paranoia that pays off — you're never caught flat-footed.",
    repeatable: false,
    benefits: [
      "Initiative Proficiency: When you roll Initiative, you can add your Proficiency Bonus to the roll.",
      "Initiative Swap: Immediately after you roll Initiative, you can swap your Initiative with one willing ally in the same combat. You can't make this swap if you or the ally has the Incapacitated condition.",
    ],
  },
  {
    id: "magic-initiate-cleric",
    name: "Magic Initiate (Cleric)",
    category: "origin",
    description:
      "You have access to abilities that most people can't explain. Maybe you were born with a spark. Maybe something awakened in you. Whatever the source, you can do things that aren't normal. Your abilities draw from the Cleric spell list.",
    repeatable: false,
    benefits: [
      "Two Cantrips: You learn two cantrips of your choice from the Cleric spell list. Intelligence, Wisdom, or Charisma is your spellcasting ability (choose when you select this feat).",
      "Level 1 Spell: Choose a level 1 spell from the Cleric spell list. You always have that spell prepared. You can cast it once without a spell slot, regaining the ability on a Long Rest. You can also cast it using any spell slots you have.",
      "Spell Change: Whenever you gain a new level, you can replace one of the spells you chose for this feat with a different spell of the same level from the Cleric spell list.",
    ],
  },
  {
    id: "magic-initiate-druid",
    name: "Magic Initiate (Druid)",
    category: "origin",
    description:
      "You have access to abilities that most people can't explain. Maybe you were born with a spark. Maybe something awakened in you. Whatever the source, you can do things that aren't normal. Your abilities draw from the Druid spell list.",
    repeatable: false,
    benefits: [
      "Two Cantrips: You learn two cantrips of your choice from the Druid spell list. Intelligence, Wisdom, or Charisma is your spellcasting ability (choose when you select this feat).",
      "Level 1 Spell: Choose a level 1 spell from the Druid spell list. You always have that spell prepared. You can cast it once without a spell slot, regaining the ability on a Long Rest. You can also cast it using any spell slots you have.",
      "Spell Change: Whenever you gain a new level, you can replace one of the spells you chose for this feat with a different spell of the same level from the Druid spell list.",
    ],
  },
  {
    id: "magic-initiate-wizard",
    name: "Magic Initiate (Wizard)",
    category: "origin",
    description:
      "You have access to abilities that most people can't explain. Maybe you were born with a spark. Maybe you studied something you shouldn't have. Whatever the source, you can do things that aren't normal. Your abilities draw from the Wizard spell list.",
    repeatable: false,
    benefits: [
      "Two Cantrips: You learn two cantrips of your choice from the Wizard spell list. Intelligence, Wisdom, or Charisma is your spellcasting ability (choose when you select this feat).",
      "Level 1 Spell: Choose a level 1 spell from the Wizard spell list. You always have that spell prepared. You can cast it once without a spell slot, regaining the ability on a Long Rest. You can also cast it using any spell slots you have.",
      "Spell Change: Whenever you gain a new level, you can replace one of the spells you chose for this feat with a different spell of the same level from the Wizard spell list.",
    ],
  },
  {
    id: "savage-attacker",
    name: "Savage Attacker",
    category: "origin",
    description:
      "You hit hard. Harder than you should. Whether it's raw physical power, trained striking technique, or just the kind of meanness that puts extra force behind every swing — when you connect, it counts.",
    repeatable: false,
    benefits: [
      "Once per turn when you hit a target with a weapon, you can roll the weapon's damage dice twice and use either roll against the target.",
    ],
  },
  {
    id: "skilled",
    name: "Skilled",
    category: "origin",
    description:
      "You pick things up fast. Languages, tools, techniques — you've always been the person who could watch someone do something once and then do it yourself. Maybe it's natural aptitude. Maybe you just never had the luxury of specializing.",
    repeatable: true,
    benefits: [
      "You gain proficiency in any combination of three skills or tools of your choice.",
    ],
  },

  // ─── General Feats ──────────────────────────────────────────

  {
    id: "grappler",
    name: "Grappler",
    category: "general",
    description:
      "You know how to control a fight at close range. Whether it's wrestling training, street fighting instinct, or just being big enough to hold someone down — when you get your hands on someone, the fight changes.",
    repeatable: false,
    prerequisite: "Level 4+, Strength or Dexterity 13+",
    benefits: [
      "Ability Score Increase: Increase your Strength or Dexterity score by 1, to a maximum of 20.",
      "Punch and Grab: When you hit a creature with an Unarmed Strike as part of the Attack action on your turn, you can use both the Damage and the Grapple option. You can use this benefit only once per turn.",
      "Attack Advantage: You have Advantage on attack rolls against a creature Grappled by you.",
      "Fast Wrestler: You don't have to spend extra movement to move a creature Grappled by you if the creature is your size or smaller.",
    ],
  },

  // ─── Fighting Style Feats ──────────────────────────────────

  {
    id: "archery",
    name: "Archery",
    category: "fighting-style",
    description:
      "You're a marksman. Rifles, bows, thrown weapons — anything at range, you put where it needs to go.",
    repeatable: false,
    prerequisite: "Fighting Style feature (The Soldier, The Hunter, or The Oathsworn)",
    benefits: [
      "You gain a +2 bonus to attack rolls you make with Ranged weapons.",
    ],
  },
  {
    id: "defense",
    name: "Defense",
    category: "fighting-style",
    description:
      "You know how to use what you're wearing. Armor, padding, a reinforced jacket — you move in it like a second skin, covering gaps others would leave open.",
    repeatable: false,
    prerequisite: "Fighting Style feature (The Soldier, The Hunter, or The Oathsworn)",
    benefits: [
      "While you're wearing Light, Medium, or Heavy armor, you gain a +1 bonus to Armor Class.",
    ],
  },
  {
    id: "great-weapon-fighting",
    name: "Great Weapon Fighting",
    category: "fighting-style",
    description:
      "When you swing something big, you swing it like you mean it. Bats, hammers, two-handed blades, heavy pipes — you've learned to put everything into every hit.",
    repeatable: false,
    prerequisite: "Fighting Style feature (The Soldier, The Hunter, or The Oathsworn)",
    benefits: [
      "When you roll damage for an attack you make with a Melee weapon that you are holding with two hands, you can treat any 1 or 2 on a damage die as a 3. The weapon must have the Two-Handed or Versatile property to gain this benefit.",
    ],
  },
  {
    id: "two-weapon-fighting",
    name: "Two-Weapon Fighting",
    category: "fighting-style",
    description:
      "Two hands, two weapons, twice the problem. You've trained to fight with a weapon in each hand, and you don't pull punches with either.",
    repeatable: false,
    prerequisite: "Fighting Style feature (The Soldier, The Hunter, or The Oathsworn)",
    benefits: [
      "When you make an extra attack as a result of using a weapon that has the Light property, you can add your ability modifier to the damage of that attack if you aren't already adding it to the damage.",
    ],
  },
];
