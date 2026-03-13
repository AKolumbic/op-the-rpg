export interface Feat {
  id: string;
  name: string;
  category: "origin" | "origin-story" | "hometown" | "general" | "fighting-style";
  description: string;
  repeatable: boolean;
  benefits: string[];
  prerequisite?: string;
  originStory?: string; // Origin Story ID required (for origin-story feats)
  hometown?: string; // Home Town ID required (for hometown feats)
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

  // ─── Origin Story Feats ──────────────────────────────────────
  // Available at character creation. Each is locked to a specific Origin Story.
  // These represent the unique way your Origin manifests even before level 4.
  // 2 per Origin Story = 24 total.

  // --- The Bereaved (Barbarian) ---
  {
    id: "nothing-left-to-lose",
    name: "Nothing Left to Lose",
    category: "origin-story",
    originStory: "the-bereaved",
    description:
      "You've already lost everything. Fear is just another feeling that doesn't land anymore. And when you're hurt — really hurt — that's when you're most dangerous.",
    repeatable: false,
    prerequisite: "The Bereaved Origin Story",
    benefits: [
      "Fearless: You have Advantage on saving throws against the Frightened condition.",
      "Bloodied Fury: While you are below half your Hit Point maximum, your melee weapon attacks deal extra damage equal to your Proficiency Bonus.",
    ],
  },
  {
    id: "survivors-instinct",
    name: "Survivor's Instinct",
    category: "origin-story",
    originStory: "the-bereaved",
    description:
      "You've been through worse than this. Worse than anything anyone can throw at you. You know what dying feels like, and you're not done yet.",
    repeatable: false,
    prerequisite: "The Bereaved Origin Story",
    benefits: [
      "Proficiencies: You gain proficiency in the Intimidation and Wilderness skills.",
      "Refuse to Die: You have Advantage on Death Saving Throws.",
    ],
  },

  // --- The Celebrity (Bard) ---
  {
    id: "famous-face",
    name: "Famous Face",
    category: "origin-story",
    originStory: "the-celebrity",
    description:
      "Everyone knows who you are. Doors open, people listen, and strangers treat you like a friend. That kind of recognition is a weapon all its own.",
    repeatable: false,
    prerequisite: "The Celebrity Origin Story",
    benefits: [
      "Proficiencies: You gain proficiency in the Persuasion and Performance skills.",
      "Star Recognition: You have Advantage on Charisma checks to influence, impress, or gain access when dealing with creatures that are not hostile to you and could reasonably recognize you.",
    ],
  },
  {
    id: "crowd-favorite",
    name: "Crowd Favorite",
    category: "origin-story",
    originStory: "the-celebrity",
    description:
      "You know how to work a room — or a street corner, or a stadium. Your presence alone changes the energy, and you've picked up a few tricks that keep the crowd eating out of your hand.",
    repeatable: false,
    prerequisite: "The Celebrity Origin Story",
    benefits: [
      "Cantrips: You learn two cantrips of your choice from the Bard spell list. Charisma is your spellcasting ability for them.",
      "Proficiencies: You gain proficiency with one Musical Instrument of your choice, one language of your choice, and one skill of your choice.",
    ],
  },

  // --- The Chosen (Cleric) ---
  {
    id: "healing-touch",
    name: "Healing Touch",
    category: "origin-story",
    originStory: "the-chosen",
    description:
      "Whatever gave you this power, it wants you to help people. Your touch can close wounds and pull someone back from the brink. You don't understand how. It just works.",
    repeatable: false,
    prerequisite: "The Chosen Origin Story",
    benefits: [
      "Spare the Dying: You learn the Spare the Dying cantrip. When you cast it, the range is 15 feet instead of touch. Wisdom is your spellcasting ability.",
      "Emergency Healing: You can cast Cure Wounds once without expending a spell slot, regaining the ability to do so when you finish a Long Rest. Wisdom is your spellcasting ability.",
      "Proficiency: You gain proficiency in the Medicine skill.",
    ],
  },
  {
    id: "vessel-of-mystery",
    name: "Vessel of Mystery",
    category: "origin-story",
    originStory: "the-chosen",
    description:
      "The power that chose you leaks out in small ways — a guiding nudge, a flash of insight, a presence that puts others at ease. You're a conduit, whether you want to be or not.",
    repeatable: false,
    prerequisite: "The Chosen Origin Story",
    benefits: [
      "Cantrips: You learn the Guidance and Thaumaturgy cantrips. Wisdom is your spellcasting ability for them.",
      "Proficiencies: You gain proficiency in the Lore skill and one language of your choice.",
    ],
  },

  // --- The Shifter (Druid) ---
  {
    id: "animal-kinship",
    name: "Animal Kinship",
    category: "origin-story",
    originStory: "the-shifter",
    description:
      "Animals understand you, and you understand them. It's not words — it's something deeper. Body language, instinct, a shared frequency that most humans have lost.",
    repeatable: false,
    prerequisite: "The Shifter Origin Story",
    benefits: [
      "Beast Speech: You can communicate simple ideas and emotions with Beasts, and you understand them in return.",
      "Cantrip: You learn the Druidcraft cantrip. Wisdom is your spellcasting ability.",
      "Proficiency: You gain proficiency in the Urban skill.",
      "Animal Insight: You have Advantage on Wisdom checks to understand, calm, or influence animal behavior.",
    ],
  },
  {
    id: "partial-shift",
    name: "Partial Shift",
    category: "origin-story",
    originStory: "the-shifter",
    description:
      "You don't need to fully transform to tap into the animal side. Claws, night eyes, webbed fingers, heightened senses — small changes that blur the line between human and something else.",
    repeatable: false,
    prerequisite: "The Shifter Origin Story",
    benefits: [
      "Minor Adaptations: Choose two of the following benefits: Low-Light Awareness (60 feet), a Swim Speed equal to your Speed, a Climb Speed equal to your Speed, or Advantage on Wisdom (Perception) checks that rely on smell or hearing.",
      "Flexible Biology: When you finish a Long Rest, you can change one of your two choices.",
    ],
  },

  // --- The Soldier (Fighter) ---
  {
    id: "battle-tested",
    name: "Battle-Tested",
    category: "origin-story",
    originStory: "the-soldier",
    description:
      "You've seen combat — real combat. The kind where people don't get back up. It taught you to keep your head, patch your wounds, and never freeze when it counts.",
    repeatable: false,
    prerequisite: "The Soldier Origin Story",
    benefits: [
      "Proficiencies: You gain proficiency in the Medicine skill and one gaming set of your choice.",
      "Steady Under Fire: You have Advantage on saving throws against the Frightened condition.",
      "Field Medic: When you use a Healer's Kit to stabilize a dying creature, that creature also regains 1 Hit Point.",
    ],
  },
  {
    id: "tactical-training",
    name: "Tactical Training",
    category: "origin-story",
    originStory: "the-soldier",
    description:
      "You don't just fight — you command. You read the battlefield, call out targets, and put your people in position. A good squad leader is worth ten soldiers, and you're better than good.",
    repeatable: false,
    prerequisite: "The Soldier Origin Story",
    benefits: [
      "Proficiency: You gain proficiency in the Intimidation skill.",
      "Quick Orders: You can use the Help action as a Bonus Action.",
      "Tactical Reach: When you use the Help action to aid an ally's attack roll, the ally can benefit from the Help even if the target is up to 30 feet away from you, instead of 5 feet.",
    ],
  },

  // --- The Disciple (Monk) ---
  {
    id: "iron-body",
    name: "Iron Body",
    category: "origin-story",
    originStory: "the-disciple",
    description:
      "Years of physical conditioning have hardened your body against toxins and pain. You eat clean, you train hard, and your body is a machine that doesn't break down easily.",
    repeatable: false,
    prerequisite: "The Disciple Origin Story",
    benefits: [
      "Proficiency: You gain proficiency in the Medicine skill.",
      "Toxin Resistance: You have Advantage on saving throws against Poison, and you have Resistance to Poison damage.",
    ],
  },
  {
    id: "focused-mind",
    name: "Focused Mind",
    category: "origin-story",
    originStory: "the-disciple",
    description:
      "Your training isn't just physical — it's mental. Meditation, focus exercises, and mental discipline have given you a mind that doesn't crack under pressure and remembers everything.",
    repeatable: false,
    prerequisite: "The Disciple Origin Story",
    benefits: [
      "Proficiencies: You gain proficiency in the Intuition skill and one language of your choice.",
      "Mental Discipline: You have Advantage on saving throws against the Charmed condition.",
      "Perfect Recall: You can perfectly recall anything you have seen or heard within the past month.",
    ],
  },

  // --- The Oathsworn (Paladin) ---
  {
    id: "sworn-protector",
    name: "Sworn Protector",
    category: "origin-story",
    originStory: "the-oathsworn",
    description:
      "Your oath isn't abstract — it's personal. You protect the people next to you. When someone swings at your ally, you step in front. That's not bravery. That's the promise you made.",
    repeatable: false,
    prerequisite: "The Oathsworn Origin Story",
    benefits: [
      "Proficiency: You gain proficiency in the Persuasion skill.",
      "Interpose: When a creature within 5 feet of you is hit by an attack, you can use your Reaction to become the target of that attack instead, taking the damage and effects in place of the original target.",
    ],
  },
  {
    id: "righteous-fury",
    name: "Righteous Fury",
    category: "origin-story",
    originStory: "the-oathsworn",
    description:
      "Your conviction doesn't just shield — it burns. When you strike in the name of your oath, there's something extra behind it. A light. A heat. Something that flinches from corruption.",
    repeatable: false,
    prerequisite: "The Oathsworn Origin Story",
    benefits: [
      "Proficiency: You gain proficiency in the Lore skill.",
      "Conviction Strike: Once per turn when you hit a creature with a melee weapon attack, you deal an extra 1d4 Radiant damage.",
    ],
  },

  // --- The Hunter (Ranger) ---
  {
    id: "relentless-tracker",
    name: "Relentless Tracker",
    category: "origin-story",
    originStory: "the-hunter",
    description:
      "Once you're on someone's trail, you don't lose it. Footprints, broken branches, the way dust settles — you read the world like a book, and the story always leads back to your target.",
    repeatable: false,
    prerequisite: "The Hunter Origin Story",
    benefits: [
      "Proficiencies: You gain proficiency in the Investigation skill and one language of your choice.",
      "Expert Tracker: You have Advantage on Wisdom (Perception or Wilderness) checks to track creatures.",
      "Read the Trail: You can study a creature's trail for 1 minute to learn the number of creatures in the group, their approximate sizes, and how long ago they passed through.",
    ],
  },
  {
    id: "prepared-for-anything",
    name: "Prepared for Anything",
    category: "origin-story",
    originStory: "the-hunter",
    description:
      "You never go in without a plan, and you never go in without gear. Traps, poison, ammunition — if you have an hour and some materials, you can make what you need.",
    repeatable: false,
    prerequisite: "The Hunter Origin Story",
    benefits: [
      "Proficiency: You gain proficiency with your choice of Poisoner's Kit or Herbalism Kit.",
      "Field Craft: You can spend 1 hour and available materials to create one of the following at negligible cost: caltrops, ball bearings, a hunting trap, or 10 pieces of ammunition.",
      "Forager: You have Advantage on Wisdom (Wilderness) checks to forage, find water, or navigate.",
    ],
  },

  // --- The Scoundrel (Rogue) ---
  {
    id: "street-smart",
    name: "Street Smart",
    category: "origin-story",
    originStory: "the-scoundrel",
    description:
      "You grew up where the rules were different. You learned to read people, lift wallets, and spot a trap before you walked into it. The streets taught you everything school couldn't.",
    repeatable: false,
    prerequisite: "The Scoundrel Origin Story",
    benefits: [
      "Proficiencies: You gain proficiency in the Deception and Sleight of Hand skills.",
      "Trap Sense: You have Advantage on Intelligence (Investigation) checks to find hidden objects, passages, or traps.",
    ],
  },
  {
    id: "slippery",
    name: "Slippery",
    category: "origin-story",
    originStory: "the-scoundrel",
    description:
      "You're impossible to pin down. Handcuffs, grapples, cornered alleys — you always find a way out. It's not strength. It's the way you move, like water through a crack.",
    repeatable: false,
    prerequisite: "The Scoundrel Origin Story",
    benefits: [
      "Proficiency: You gain proficiency in the Acrobatics skill.",
      "Escape Artist: You have Advantage on ability checks and saving throws to avoid or escape the Grappled and Restrained conditions.",
      "Quick Exit: When you take the Disengage action, your Speed increases by 10 feet until the end of the turn.",
    ],
  },

  // --- The Mutant (Sorcerer) ---
  {
    id: "volatile-power",
    name: "Volatile Power",
    category: "origin-story",
    originStory: "the-mutant",
    description:
      "Your powers crackle at your fingertips even when you're not trying. Small bursts, involuntary discharges, a glow in your eyes when you're stressed — the energy is always there, and sometimes it spills over.",
    repeatable: false,
    prerequisite: "The Mutant Origin Story",
    benefits: [
      "Cantrips: You learn two cantrips of your choice from the Sorcerer spell list. Charisma is your spellcasting ability for them.",
      "Volatile Surge: When you roll damage for a cantrip, you can reroll one of the damage dice and must use the new roll.",
    ],
  },
  {
    id: "adaptive-biology",
    name: "Adaptive Biology",
    category: "origin-story",
    originStory: "the-mutant",
    description:
      "Your mutation isn't just about energy or power — it's changed your body at a fundamental level. Your biology adapts, resists, and endures things that would drop a normal person.",
    repeatable: false,
    prerequisite: "The Mutant Origin Story",
    benefits: [
      "Toxin Immunity: You have Advantage on saving throws against Poison and Disease, and you have Resistance to Poison damage.",
      "Endurance: You can hold your breath for up to 1 hour, and you require half the normal amount of food and water.",
    ],
  },

  // --- The Pactbound (Warlock) ---
  {
    id: "dark-gift",
    name: "Dark Gift",
    category: "origin-story",
    originStory: "the-pactbound",
    description:
      "Your patron gave you a taste of power before the real deal. Cantrips, minor abilities, a way to sense the unseen — just enough to remind you of what you owe.",
    repeatable: false,
    prerequisite: "The Pactbound Origin Story",
    benefits: [
      "Cantrips: You learn two cantrips of your choice from the Warlock spell list. Charisma is your spellcasting ability for them.",
      "Sense the Unseen: You can cast Detect Magic once without expending a spell slot, regaining the ability to do so when you finish a Short or Long Rest.",
    ],
  },
  {
    id: "patrons-whisper",
    name: "Patron's Whisper",
    category: "origin-story",
    originStory: "the-pactbound",
    description:
      "Your patron's voice is always there — in the back of your mind, in your dreams, in the silence between heartbeats. It warns you, it teaches you, and it makes sure nobody else gets inside your head.",
    repeatable: false,
    prerequisite: "The Pactbound Origin Story",
    benefits: [
      "Proficiencies: You gain proficiency in the Deception skill and one language of your choice.",
      "Shielded Mind: You have Advantage on saving throws against the Charmed condition and against having your thoughts read.",
      "Telepathy: You can communicate telepathically with any creature you can see within 30 feet. The creature must know at least one language to understand you, but it doesn't need to share a language with you.",
    ],
  },

  // --- The Genius (Wizard) ---
  {
    id: "polymath",
    name: "Polymath",
    category: "origin-story",
    originStory: "the-genius",
    description:
      "You don't specialize — you dominate every field you touch. Physics, chemistry, biology, engineering, history — your mind absorbs and connects information at a speed that makes experts uncomfortable.",
    repeatable: false,
    prerequisite: "The Genius Origin Story",
    benefits: [
      "Proficiencies: You gain proficiency in two Intelligence-based skills of your choice (Science, History, Investigation, Medicine, Wilderness, or Lore) and with Tinker's Tools.",
      "Encyclopedic Knowledge: You have Advantage on Intelligence checks to recall information about science, history, technology, or other academic subjects.",
    ],
  },
  {
    id: "inventors-mind",
    name: "Inventor's Mind",
    category: "origin-story",
    originStory: "the-genius",
    description:
      "You see broken things and know how to fix them. You see working things and know how to make them better. Give you ten minutes and some scrap, and you'll build something nobody expected.",
    repeatable: false,
    prerequisite: "The Genius Origin Story",
    benefits: [
      "Proficiencies: You gain proficiency with Tinker's Tools and one other set of Artisan's Tools of your choice.",
      "Mending: You learn the Mending cantrip. Intelligence is your spellcasting ability for it.",
      "Jury-Rig: You can spend 10 minutes and available materials to create a simple device or tool that functions for 1 hour before falling apart. The device can replicate the function of any common item worth 50 gp or less.",
    ],
  },

  // ─── Home Town Feats ─────────────────────────────────────────
  // Available at character creation. Each is locked to a specific Home Town.
  // These represent what growing up in that place taught you. 2 per Home Town.

  // --- The Small Town (Acolyte) ---
  {
    id: "everyone-knows-everyone",
    name: "Everyone Knows Everyone",
    category: "hometown",
    hometown: "the-small-town",
    description:
      "You grew up where a handshake was a contract and you could read someone's whole life story from the way they said 'good morning.' You learned to spot a lie before you learned long division.",
    repeatable: false,
    prerequisite: "The Small Town Home Town",
    benefits: [
      "Proficiencies: You gain proficiency in the Persuasion and Medicine skills.",
      "Read People: You have Advantage on Wisdom (Intuition) checks to determine if a creature is lying or withholding information.",
      "Local Knowledge: When you spend at least 1 hour in a settlement, you can learn the names and general reputations of its prominent figures through casual conversation.",
    ],
  },
  {
    id: "old-ways",
    name: "Old Ways",
    category: "hometown",
    hometown: "the-small-town",
    description:
      "Grandma's remedies. The herbs that grow by the creek. The prayer that's not really a prayer but somehow works anyway. The Small Town runs on traditions that predate any institution, and you carry them with you.",
    repeatable: false,
    prerequisite: "The Small Town Home Town",
    benefits: [
      "Proficiency: You gain proficiency with an Herbalism Kit and one language of your choice.",
      "Cantrip: You learn the Guidance cantrip. Wisdom is your spellcasting ability for it.",
      "Folk Remedies: You have Advantage on Wisdom (Medicine) checks when you have access to natural ingredients or folk cures.",
    ],
  },

  // --- The Industrial City (Criminal) ---
  {
    id: "hard-knocks",
    name: "Hard Knocks",
    category: "hometown",
    hometown: "the-industrial-city",
    description:
      "The Industrial City didn't coddle you. It hit you, and you hit back, and eventually you stopped flinching. Poison, fear, pain — you've built up a tolerance to all of it.",
    repeatable: false,
    prerequisite: "The Industrial City Home Town",
    benefits: [
      "Proficiencies: You gain proficiency in the Intimidation and Urban skills.",
      "Hardened: You have Advantage on saving throws against the Frightened and Poisoned conditions.",
    ],
  },
  {
    id: "underworld-connections",
    name: "Underworld Connections",
    category: "hometown",
    hometown: "the-industrial-city",
    description:
      "You know people — the kind of people who don't have business cards. Fences, fixers, informants, and the guy who can get you anything for the right price. In any city, the underworld is the same language with a different accent.",
    repeatable: false,
    prerequisite: "The Industrial City Home Town",
    benefits: [
      "Proficiencies: You gain proficiency in the Deception and Investigation skills.",
      "Street Network: You have Advantage on Intelligence (Investigation) checks in urban environments to locate black market goods, find safe houses, or gather information from criminal networks.",
    ],
  },

  // --- The Metropolis (Sage) ---
  {
    id: "institutional-access",
    name: "Institutional Access",
    category: "hometown",
    hometown: "the-metropolis",
    description:
      "You know how the big systems work — universities, hospitals, courts, newspapers. You know which office to visit, which form to file, and which clerk to flatter. Bureaucracy is a weapon, and you're fluent in it.",
    repeatable: false,
    prerequisite: "The Metropolis Home Town",
    benefits: [
      "Proficiencies: You gain proficiency in the Investigation and Persuasion skills.",
      "Navigate Bureaucracy: You have Advantage on Intelligence checks to navigate institutions, find information in libraries or archives, and understand legal, academic, or financial documents.",
    ],
  },
  {
    id: "research-specialist",
    name: "Research Specialist",
    category: "hometown",
    hometown: "the-metropolis",
    description:
      "Give you a library, a lab, or even a good newspaper archive, and you'll find what no one else can. Research isn't just reading — it's knowing which questions to ask and where the answers are buried.",
    repeatable: false,
    prerequisite: "The Metropolis Home Town",
    benefits: [
      "Proficiency: You gain proficiency in one Intelligence-based skill of your choice (Science, History, Investigation, Medicine, Wilderness, or Lore) and two languages of your choice.",
      "Deep Research: When you spend at least 1 hour researching a topic with access to books, archives, or institutional resources, you have Advantage on any related Intelligence check for the next 24 hours.",
    ],
  },

  // --- The Capitol (Soldier) ---
  {
    id: "military-discipline",
    name: "Military Discipline",
    category: "hometown",
    hometown: "the-capitol",
    description:
      "You were raised in the shadow of the state — drills at dawn, inspections at noon, and the understanding that fear is a luxury you don't get. They trained it out of you, and they trained vigilance in.",
    repeatable: false,
    prerequisite: "The Capitol Home Town",
    benefits: [
      "Proficiencies: You gain proficiency in the Perception skill and one language of your choice.",
      "Steady Nerve: You have Advantage on saving throws against the Frightened condition.",
      "Vigilant Rest: During a Long Rest, you can remain fully alert for the entire rest period without penalty. You still gain all benefits of the Long Rest.",
    ],
  },
  {
    id: "state-connections",
    name: "State Connections",
    category: "hometown",
    hometown: "the-capitol",
    description:
      "You know people in the government, the military, the intelligence agencies. Maybe your parents worked there. Maybe you interned. Maybe you just know how the machine works from growing up inside it.",
    repeatable: false,
    prerequisite: "The Capitol Home Town",
    benefits: [
      "Proficiencies: You gain proficiency in the Persuasion and History skills.",
      "Official Channels: You have Advantage on Charisma checks when interacting with government officials, military personnel, or law enforcement.",
    ],
  },

  // ─── General Half-Feats ───────────────────────────────────────
  // All General Half-Feats require Level 4+ and include a +1 ability score
  // increase. These are the pool for the 3 half-feat picks across levels 1-12.

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
  {
    id: "ironclad",
    name: "Ironclad",
    category: "general",
    description:
      "You take hits that would drop anyone else and keep moving. Whether it's thick skin, sheer stubbornness, or a body that just refuses to quit — you're built to last.",
    repeatable: false,
    prerequisite: "Level 4+, Constitution 13+",
    benefits: [
      "Ability Score Increase: Increase your Constitution score by 1, to a maximum of 20.",
      "Hard to Kill: Your Hit Point maximum increases by an amount equal to twice your level when you gain this feat. Whenever you gain a level thereafter, your Hit Point maximum increases by an additional 2 Hit Points.",
    ],
  },
  {
    id: "unshakable",
    name: "Unshakable",
    category: "general",
    description:
      "There's something about you that just doesn't break. Pick any angle — physical, mental, spiritual — and you're harder to crack than anyone expects.",
    repeatable: true,
    prerequisite: "Level 4+",
    benefits: [
      "Ability Score Increase: Increase one ability score of your choice by 1, to a maximum of 20.",
      "Saving Throw Proficiency: You gain proficiency in saving throws using the chosen ability.",
    ],
  },
  {
    id: "situational-awareness",
    name: "Situational Awareness",
    category: "general",
    description:
      "You notice everything — the exit routes, the body language, the thing that's slightly out of place. People think you're paranoid. You call it prepared.",
    repeatable: false,
    prerequisite: "Level 4+, Intelligence or Wisdom 13+",
    benefits: [
      "Ability Score Increase: Increase your Intelligence or Wisdom score by 1, to a maximum of 20.",
      "Keen Observer: You gain a +5 bonus to your Passive Perception and Passive Investigation scores.",
      "Lip Reader: If you can see a creature's mouth while it's speaking a language you understand, you can interpret what it's saying by reading its lips.",
    ],
  },
  {
    id: "peak-conditioning",
    name: "Peak Conditioning",
    category: "general",
    description:
      "You've pushed your body to the edge of what's humanly possible. You climb faster, jump farther, and recover your footing like it's second nature.",
    repeatable: false,
    prerequisite: "Level 4+, Strength or Dexterity 13+",
    benefits: [
      "Ability Score Increase: Increase your Strength or Dexterity score by 1, to a maximum of 20.",
      "Climber: You gain a Climb Speed equal to your Speed.",
      "Jumper: You only need to move 5 feet on foot before making a running jump, instead of 10 feet.",
      "Quick Recovery: When you are Prone, standing up uses only 5 feet of your movement.",
    ],
  },
  {
    id: "second-skin",
    name: "Second Skin",
    category: "general",
    description:
      "Tactical gear, body armor, reinforced suits — you've worn it all, and you've learned to move in it like it's part of you.",
    repeatable: false,
    prerequisite: "Level 4+, Dexterity 13+, Medium Armor Training",
    benefits: [
      "Ability Score Increase: Increase your Dexterity score by 1, to a maximum of 20.",
      "Silent Movement: Wearing Medium armor doesn't impose Disadvantage on your Dexterity (Stealth) checks.",
      "Agile Defense: When you wear Medium armor, you can add 3, rather than 2, when determining your AC if you have a Dexterity of 16 or higher.",
    ],
  },
  {
    id: "heavy-plating",
    name: "Heavy Plating",
    category: "general",
    description:
      "Power armor, reinforced exosuits, or just the heaviest tactical gear money can buy — you wear it, and it does its job. Incoming fire doesn't faze you.",
    repeatable: false,
    prerequisite: "Level 4+, Strength 13+, Heavy Armor Training",
    benefits: [
      "Ability Score Increase: Increase your Strength score by 1, to a maximum of 20.",
      "Damage Reduction: While you are wearing Heavy armor, Bludgeoning, Piercing, and Slashing damage you take from attacks is reduced by an amount equal to your Proficiency Bonus.",
    ],
  },
  {
    id: "marksman",
    name: "Marksman",
    category: "general",
    description:
      "Distance and cover don't matter. You've trained to place every shot exactly where it needs to go, whether it's a rifle, a bow, or a thrown blade.",
    repeatable: false,
    prerequisite: "Level 4+, Dexterity 13+",
    benefits: [
      "Ability Score Increase: Increase your Dexterity score by 1, to a maximum of 20.",
      "Ignore Cover: Your Ranged weapon attacks ignore Half Cover and Three-Quarters Cover.",
      "Long Shot: Attacking at Long Range doesn't impose Disadvantage on your Ranged weapon attack rolls.",
    ],
  },
  {
    id: "iron-will",
    name: "Iron Will",
    category: "general",
    description:
      "Your mind is a fortress. Psychic attacks, fear tactics, manipulation — they bounce off you. Whatever's in your head, it stays there because you allow it.",
    repeatable: false,
    prerequisite: "Level 4+, Wisdom 13+",
    benefits: [
      "Ability Score Increase: Increase your Wisdom score by 1, to a maximum of 20.",
      "Mental Fortress: You have Advantage on saving throws against the Charmed and Frightened conditions.",
      "Steeled Nerves: When you succeed on a saving throw against being Charmed or Frightened, you are immune to that effect from the same source for 24 hours.",
    ],
  },
  {
    id: "quick-on-your-feet",
    name: "Quick on Your Feet",
    category: "general",
    description:
      "You're fast — not just in a straight line, but in the way you change direction, slip past obstacles, and leave people grabbing at empty air.",
    repeatable: false,
    prerequisite: "Level 4+, Dexterity 13+",
    benefits: [
      "Ability Score Increase: Increase your Dexterity score by 1, to a maximum of 20.",
      "Fleet of Foot: Your Speed increases by 10 feet.",
      "Hard to Pin: Opportunity Attacks against you have Disadvantage.",
    ],
  },
  {
    id: "street-medic",
    name: "Street Medic",
    category: "general",
    description:
      "You've patched up enough bullet wounds, broken bones, and chemical burns to know what you're doing without a hospital. Give you a kit and five minutes, and you'll get someone back on their feet.",
    repeatable: false,
    prerequisite: "Level 4+, Wisdom 13+",
    benefits: [
      "Ability Score Increase: Increase your Wisdom score by 1, to a maximum of 20.",
      "Battle Medic: As an Action, you can spend one use of a Healer's Kit to tend to a creature and restore 1d6 + 4 + the creature's number of Hit Dice in Hit Points. A creature can benefit from this once per Short or Long Rest.",
      "Stabilize: When you use a Healer's Kit to stabilize a dying creature, that creature also regains 1 Hit Point.",
    ],
  },
  {
    id: "commanding-presence",
    name: "Commanding Presence",
    category: "general",
    description:
      "When you speak, people listen. Not because you're loud — because you mean it. Your words can steady a panicking crowd, rally a broken team, or make someone rethink their life choices.",
    repeatable: false,
    prerequisite: "Level 4+, Charisma 13+",
    benefits: [
      "Ability Score Increase: Increase your Charisma score by 1, to a maximum of 20.",
      "Rally: You can spend 10 minutes rallying your companions. When you do, choose up to six friendly creatures (which can include yourself) within 30 feet of you who can see or hear you. Each creature gains Temporary Hit Points equal to your level + your Charisma modifier. A creature can't gain Temporary Hit Points from this feature again until it finishes a Long Rest.",
    ],
  },
  {
    id: "silver-tongue",
    name: "Silver Tongue",
    category: "general",
    description:
      "You can talk your way into or out of almost anything. New identity? Done. Someone else's voice? Easy. The line between who you are and who you're pretending to be gets blurry sometimes.",
    repeatable: false,
    prerequisite: "Level 4+, Charisma 13+",
    benefits: [
      "Ability Score Increase: Increase your Charisma score by 1, to a maximum of 20.",
      "Master of Disguise: You have proficiency with Disguise Kits. If you already have this proficiency, you gain proficiency with one other tool of your choice.",
      "Mimicry: You can mimic the speech of another person or the sounds made by other creatures. A creature that hears the mimicry must succeed on a Wisdom (Intuition) check contested by your Charisma (Deception) check to determine it's fake.",
      "Convincing Persona: You have Advantage on Charisma (Deception) checks to pass yourself off as a different person.",
    ],
  },
  {
    id: "dual-wielder",
    name: "Dual Wielder",
    category: "general",
    description:
      "Two weapons, two problems. Most people can barely fight with one — you've trained to use both hands independently, and you're just as dangerous with either.",
    repeatable: false,
    prerequisite: "Level 4+, Strength or Dexterity 13+",
    benefits: [
      "Ability Score Increase: Increase your Strength or Dexterity score by 1, to a maximum of 20.",
      "Enhanced Dual Wielding: You can use Two-Weapon Fighting even when the one-handed Melee weapons you are wielding aren't Light.",
      "Quick Draw: You can draw or stow two one-handed weapons when you would normally be able to draw or stow only one.",
      "Dual Defense: While wielding a Melee weapon in each hand, you gain a +1 bonus to Armor Class.",
    ],
  },
  {
    id: "focused",
    name: "Focused",
    category: "general",
    description:
      "When you activate your Powers, nothing breaks your concentration. Gunfire, explosions, getting hit — you keep your abilities steady through all of it.",
    repeatable: false,
    prerequisite: "Level 4+, Constitution 13+",
    benefits: [
      "Ability Score Increase: Increase your Constitution score by 1, to a maximum of 20.",
      "Unwavering Concentration: You have Advantage on Constitution saving throws that you make to maintain Concentration.",
      "Somatic Freedom: You can perform somatic components of spells even when you have weapons or a Shield in one or both hands.",
    ],
  },
  {
    id: "ghost",
    name: "Ghost",
    category: "general",
    description:
      "You disappear. Not with Powers — with skill. Shadows, crowds, blind spots — you know where they are, and you know how to use them. People look right at where you were and see nothing.",
    repeatable: false,
    prerequisite: "Level 4+, Dexterity 13+",
    benefits: [
      "Ability Score Increase: Increase your Dexterity score by 1, to a maximum of 20.",
      "Shadow Step: You can try to take the Hide action even when you are only Lightly Obscured by phenomena such as dim light, patchy fog, or moderate foliage.",
      "Silent Movement: When you are Hidden, you can move up to 10 feet in the open without revealing yourself if you end the move in a position where you're not clearly visible to any hostile creature.",
    ],
  },
  {
    id: "power-signature",
    name: "Power Signature",
    category: "general",
    description:
      "Your Powers have a signature — fire, lightning, ice, corrosive energy, or concussive force. You've learned to push that signature harder, burning through defenses that would stop anyone else.",
    repeatable: true,
    prerequisite: "Level 4+, Intelligence, Wisdom, or Charisma 13+",
    benefits: [
      "Ability Score Increase: Increase your Intelligence, Wisdom, or Charisma score by 1, to a maximum of 20.",
      "Energy Mastery: Choose one damage type: Acid, Cold, Fire, Lightning, or Thunder. When you roll damage of the chosen type from a spell or Power, you can treat any 1 on a damage die as a 2.",
      "Overcome Resistance: Spells and Powers you use ignore Resistance to damage of the chosen type.",
    ],
  },
  {
    id: "bruiser",
    name: "Bruiser",
    category: "general",
    description:
      "You don't just hit people — you hit them so hard they rethink the fight. Walls crack. Doors come off hinges. The phrase 'excessive force' was written about people like you.",
    repeatable: false,
    prerequisite: "Level 4+, Strength 13+",
    benefits: [
      "Ability Score Increase: Increase your Strength score by 1, to a maximum of 20.",
      "Devastating Critical: When you score a Critical Hit with a Melee weapon attack, you can roll one additional weapon damage die and add it to the extra damage of the Critical Hit.",
      "Powerful Build: You count as one size larger when determining your carrying capacity and the weight you can push, drag, or lift.",
    ],
  },
  {
    id: "bulwark",
    name: "Bulwark",
    category: "general",
    description:
      "Your shield isn't just defense — it's a weapon, a wall, and a statement. You've trained to interpose it against everything from gunfire to energy blasts.",
    repeatable: false,
    prerequisite: "Level 4+, Strength 13+, Shield Training",
    benefits: [
      "Ability Score Increase: Increase your Strength score by 1, to a maximum of 20.",
      "Shield Bash: If you take the Attack action on your turn, you can replace one of your attacks with a shield bash. On a hit, the shield bash deals 1d6 + your Strength modifier in Bludgeoning damage, and if the target is Large or smaller, you push it 5 feet away from you.",
      "Interpose Shield: If you aren't Incapacitated, you can add your Shield's AC bonus to any Dexterity saving throw you make against an effect that targets only you.",
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
