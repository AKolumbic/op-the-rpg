// =============================================================================
// Origin Story Features — Group 2: The Soldier, The Disciple, The Oathsworn,
// The Hunter
//
// Levels 1-12 only. All features reflavored for OP the RPG superhero setting.
// SRD 5.2 mechanics intact; fiction changes.
// =============================================================================

import type { OriginStoryFeatures } from "./origin-story-features";

export const GROUP_2: OriginStoryFeatures[] = [
  // ===========================================================================
  // THE SOLDIER (Fighter)
  // ===========================================================================
  {
    originId: "the-soldier",
    srdClass: "Fighter",
    coreTraits: {
      primaryAbility: "Strength or Dexterity",
      hitDie: "d10",
      savingThrows: ["Strength", "Constitution"],
      skillChoices: {
        count: 2,
        options: [
          "Acrobatics",
          "Urban",
          "Athletics",
          "History",
          "Intuition",
          "Intimidation",
          "Persuasion",
          "Perception",
          "Wilderness",
        ],
      },
      weaponProficiencies: "Simple and Martial weapons",
      armorTraining: "Light, Medium, and Heavy armor and Shields",
    },
    spellcasting: null,
    scaling: [
      {
        label: "Grit Uses",
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
        label: "Weapon Mastery",
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
    ],
    features: [
      // --- Level 1 ---
      {
        name: "Combat Training",
        srdName: "Fighting Style",
        level: 1,
        description:
          "Your extensive training has honed your martial prowess. You gain a Fighting Style feat of your choice (see Feats). Defense is recommended. Whenever you gain a Soldier level, you can replace this feat with a different Fighting Style feat.",
      },
      {
        name: "Grit",
        srdName: "Second Wind",
        level: 1,
        description:
          "You have a reserve of physical and mental stamina you can draw on. As a Bonus Action, you regain Hit Points equal to 1d10 + your Soldier level. You can use this feature a number of times shown in the Grit Uses column, regaining one use after a Short Rest and all uses after a Long Rest.",
      },
      {
        name: "Weapon Mastery",
        srdName: "Weapon Mastery",
        level: 1,
        description:
          "Your training with weapons allows you to use the mastery properties of a number of Simple or Martial weapons of your choice, as shown in the Weapon Mastery column. Whenever you finish a Long Rest, you can practice weapon drills and change one of those weapon choices. At certain levels you gain mastery of additional weapons.",
      },
      // --- Level 2 ---
      {
        name: "Burst of Action",
        srdName: "Action Surge",
        level: 2,
        description:
          "You can push yourself beyond normal limits for a moment. On your turn, you can take one additional action, except the Magic action. Once you use this feature, you can't do so again until you finish a Short or Long Rest.",
      },
      {
        name: "Tactical Mind",
        srdName: "Tactical Mind",
        level: 2,
        description:
          "You have a mind for tactics on and off the battlefield. When you fail an ability check, you can expend a use of your Grit. Rather than regaining Hit Points, you roll 1d10 and add the number to the ability check, potentially turning it into a success. If the check still fails, the Grit use is not expended.",
      },
      // --- Level 3 ---
      {
        name: "Soldier Subclass",
        srdName: "Fighter Subclass",
        level: 3,
        description:
          "You gain a Soldier subclass of your choice. Subclasses are specializations not yet detailed in the current version.",
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
          "You can attack twice instead of once whenever you take the Attack action on your turn.",
      },
      {
        name: "Tactical Shift",
        srdName: "Tactical Shift",
        level: 5,
        description:
          "Whenever you activate your Grit with a Bonus Action, you can move up to half your Speed without provoking Opportunity Attacks.",
      },
      // --- Level 6 ---
      {
        name: "Ability Score Improvement",
        srdName: "Ability Score Improvement",
        level: 6,
        description:
          "You gain a feat of your choice. In OP, all level-up feats are half-feats that include a +1 ability score increase.",
      },
      // --- Level 7 ---
      {
        name: "Subclass Feature",
        srdName: "Subclass feature",
        level: 7,
        description:
          "You gain a feature from your Soldier subclass.",
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
        name: "Willpower",
        srdName: "Indomitable",
        level: 9,
        description:
          "Sheer force of will lets you push through when your body falters. If you fail a saving throw, you can reroll it with a bonus equal to your Soldier level. You must use the new roll, and you can't use this feature again until you finish a Long Rest. You can use this feature twice before a Long Rest starting at level 13.",
      },
      {
        name: "Tactical Master",
        srdName: "Tactical Master",
        level: 9,
        description:
          "When you attack with a weapon whose mastery property you can use, you can replace that property with the Push, Sap, or Slow property for that attack.",
      },
      // --- Level 10 ---
      {
        name: "Subclass Feature",
        srdName: "Subclass feature",
        level: 10,
        description:
          "You gain a feature from your Soldier subclass.",
      },
      // --- Level 11 ---
      {
        name: "Two Extra Attacks",
        srdName: "Two Extra Attacks",
        level: 11,
        description:
          "You can attack three times instead of once whenever you take the Attack action on your turn.",
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
  // THE DISCIPLE (Monk)
  // ===========================================================================
  {
    originId: "the-disciple",
    srdClass: "Monk",
    coreTraits: {
      primaryAbility: "Dexterity and Wisdom",
      hitDie: "d8",
      savingThrows: ["Strength", "Dexterity"],
      skillChoices: {
        count: 2,
        options: [
          "Acrobatics",
          "Athletics",
          "History",
          "Intuition",
          "Lore",
          "Stealth",
        ],
      },
      weaponProficiencies:
        "Simple weapons and Martial weapons that have the Light property",
      armorTraining: "None",
      toolProficiencies:
        "Choose one type of Artisan's Tools or Musical Instrument",
    },
    spellcasting: null,
    scaling: [
      {
        label: "Martial Arts Die",
        values: {
          1: "1d6",
          2: "1d6",
          3: "1d6",
          4: "1d6",
          5: "1d8",
          6: "1d8",
          7: "1d8",
          8: "1d8",
          9: "1d8",
          10: "1d8",
          11: "1d10",
          12: "1d10",
        },
      },
      {
        label: "Discipline Points",
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
      {
        label: "Unarmored Movement",
        values: {
          1: "-",
          2: "+10 ft.",
          3: "+10 ft.",
          4: "+10 ft.",
          5: "+10 ft.",
          6: "+15 ft.",
          7: "+15 ft.",
          8: "+15 ft.",
          9: "+15 ft.",
          10: "+20 ft.",
          11: "+20 ft.",
          12: "+20 ft.",
        },
      },
    ],
    features: [
      // --- Level 1 ---
      {
        name: "Martial Arts",
        srdName: "Martial Arts",
        level: 1,
        description:
          "Your practice of martial arts gives you mastery of combat styles that use your Unarmed Strike and Monk weapons (Simple Melee weapons and Martial Melee weapons with the Light property). While unarmed or wielding only Monk weapons and not wearing armor or wielding a Shield, you gain: Bonus Unarmed Strike as a Bonus Action; your Martial Arts die (see scaling column) replaces normal damage for Unarmed Strikes and Monk weapons; and you can use Dexterity for attack and damage rolls with Unarmed Strikes and Monk weapons.",
      },
      {
        name: "Unarmored Defense",
        srdName: "Unarmored Defense",
        level: 1,
        description:
          "Your rigorous training has conditioned your body to act as its own armor. While you aren't wearing armor or wielding a Shield, your base Armor Class equals 10 plus your Dexterity and Wisdom modifiers.",
      },
      // --- Level 2 ---
      {
        name: "Discipline",
        srdName: "Monk's Focus",
        level: 2,
        description:
          "Your martial training allows you to harness a well of internal energy cultivated through discipline and practice. This energy is represented by Discipline Points. Your Disciple level determines your points, as shown in the Discipline Points column. You can expend these points to fuel Flurry of Blows, Patient Defense, and Step of the Wind. Points recharge after a Short or Long Rest. The save DC for Discipline features equals 8 + your Wisdom modifier + your Proficiency Bonus.",
      },
      {
        name: "Flurry of Blows",
        srdName: "Flurry of Blows",
        level: 2,
        description:
          "You can expend 1 Discipline Point to make two Unarmed Strikes as a Bonus Action.",
      },
      {
        name: "Patient Defense",
        srdName: "Patient Defense",
        level: 2,
        description:
          "You can take the Disengage action as a Bonus Action. Alternatively, you can expend 1 Discipline Point to take both the Disengage and the Dodge actions as a Bonus Action.",
      },
      {
        name: "Step of the Wind",
        srdName: "Step of the Wind",
        level: 2,
        description:
          "You can take the Dash action as a Bonus Action. Alternatively, you can expend 1 Discipline Point to take both the Disengage and Dash actions as a Bonus Action, and your jump distance is doubled for the turn.",
      },
      {
        name: "Unarmored Movement",
        srdName: "Unarmored Movement",
        level: 2,
        description:
          "Your speed increases while you aren't wearing armor or wielding a Shield. This bonus increases as you gain Disciple levels, as shown in the Unarmored Movement column.",
      },
      {
        name: "Uncanny Metabolism",
        srdName: "Uncanny Metabolism",
        level: 2,
        description:
          "When you roll Initiative and have no Discipline Points remaining, you roll your Martial Arts die and regain Hit Points equal to your Disciple level plus the number rolled. Once you use this feature, you can't use it again until you finish a Long Rest.",
      },
      // --- Level 3 ---
      {
        name: "Deflect Attacks",
        srdName: "Deflect Attacks",
        level: 3,
        description:
          "When an attack roll hits you and its damage includes Bludgeoning, Piercing, or Slashing damage, you can take a Reaction to reduce the total damage by 1d10 + your Dexterity modifier + your Disciple level. If you reduce the damage to 0, you can expend 1 Discipline Point to redirect the attack's force at another creature within 5 feet (melee) or 60 feet (ranged). That creature must succeed on a Dexterity save or take damage equal to two rolls of your Martial Arts die + your Dexterity modifier.",
      },
      {
        name: "Disciple Subclass",
        srdName: "Monk Subclass",
        level: 3,
        description:
          "You gain a Disciple subclass of your choice. Subclasses are specializations not yet detailed in the current version.",
      },
      // --- Level 4 ---
      {
        name: "Ability Score Improvement",
        srdName: "Ability Score Improvement",
        level: 4,
        description:
          "You gain a feat of your choice. In OP, all level-up feats are half-feats that include a +1 ability score increase.",
      },
      {
        name: "Slow Fall",
        srdName: "Slow Fall",
        level: 4,
        description:
          "You can take a Reaction when you fall to reduce any damage you take from the fall by an amount equal to five times your Disciple level.",
      },
      // --- Level 5 ---
      {
        name: "Extra Attack",
        srdName: "Extra Attack",
        level: 5,
        description:
          "You can attack twice instead of once whenever you take the Attack action on your turn.",
      },
      {
        name: "Stunning Strike",
        srdName: "Stunning Strike",
        level: 5,
        description:
          "Once per turn when you hit a creature with a Monk weapon or an Unarmed Strike, you can expend 1 Discipline Point to attempt a stunning strike. The target must make a Constitution saving throw. On a failed save, the target has the Stunned condition until the start of your next turn. On a successful save, the target's Speed is halved until the start of your next turn, and the next attack roll made against the target before then has Advantage.",
      },
      // --- Level 6 ---
      {
        name: "Empowered Strikes",
        srdName: "Empowered Strikes",
        level: 6,
        description:
          "Whenever you deal damage with your Unarmed Strike, it can deal your choice of Force damage or its normal damage type.",
      },
      {
        name: "Subclass Feature",
        srdName: "Subclass feature",
        level: 6,
        description:
          "You gain a feature from your Disciple subclass.",
      },
      // --- Level 7 ---
      {
        name: "Evasion",
        srdName: "Evasion",
        level: 7,
        description:
          "When you are subjected to an effect that allows you to make a Dexterity saving throw to take only half damage, you instead take no damage if you succeed on the saving throw and only half damage if you fail. You don't benefit from this feature if you have the Incapacitated condition.",
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
        name: "Acrobatic Movement",
        srdName: "Acrobatic Movement",
        level: 9,
        description:
          "While you aren't wearing armor or wielding a Shield, you gain the ability to move along vertical surfaces and across liquids on your turn without falling during the movement.",
      },
      // --- Level 10 ---
      {
        name: "Heightened Discipline",
        srdName: "Heightened Focus",
        level: 10,
        description:
          "Your deepening discipline enhances the potency of your techniques. Your Flurry of Blows, Patient Defense, and Step of the Wind gain additional benefits. Flurry of Blows: you can make three Unarmed Strikes instead of two. Patient Defense: you gain Temporary Hit Points equal to two rolls of your Martial Arts die. Step of the Wind: you can choose a willing creature within 5 feet; it moves with you until the end of your turn without provoking Opportunity Attacks.",
      },
      {
        name: "Self-Restoration",
        srdName: "Self-Restoration",
        level: 10,
        description:
          "Through sheer force of will, you can remove one of the following conditions from yourself at the end of each of your turns: Charmed, Frightened, or Poisoned. In addition, forgoing food and drink doesn't give you levels of Exhaustion.",
      },
      // --- Level 11 ---
      {
        name: "Subclass Feature",
        srdName: "Subclass feature",
        level: 11,
        description:
          "You gain a feature from your Disciple subclass.",
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
  // THE OATHSWORN (Paladin)
  // ===========================================================================
  {
    originId: "the-oathsworn",
    srdClass: "Paladin",
    coreTraits: {
      primaryAbility: "Strength and Charisma",
      hitDie: "d10",
      savingThrows: ["Wisdom", "Charisma"],
      skillChoices: {
        count: 2,
        options: [
          "Athletics",
          "Intuition",
          "Intimidation",
          "Medicine",
          "Persuasion",
          "Lore",
        ],
      },
      weaponProficiencies: "Simple and Martial weapons",
      armorTraining: "Light, Medium, and Heavy armor and Shields",
    },
    spellcasting: {
      ability: "Charisma",
      type: "half",
      flavorName: "Oath-Powered Abilities",
      focusFlavor: "a personal symbol of the oath sworn",
    },
    scaling: [
      {
        label: "Channel Conviction Uses",
        values: {
          1: "-",
          2: "-",
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
        label: "Prepared Abilities",
        values: {
          1: 2,
          2: 3,
          3: 4,
          4: 5,
          5: 6,
          6: 6,
          7: 7,
          8: 7,
          9: 9,
          10: 9,
          11: 10,
          12: 10,
        },
      },
      {
        label: "Spell Slots — 1st",
        values: {
          1: 2,
          2: 2,
          3: 3,
          4: 3,
          5: 4,
          6: 4,
          7: 4,
          8: 4,
          9: 4,
          10: 4,
          11: 4,
          12: 4,
        },
      },
      {
        label: "Spell Slots — 2nd",
        values: {
          1: "-",
          2: "-",
          3: "-",
          4: "-",
          5: 2,
          6: 2,
          7: 3,
          8: 3,
          9: 3,
          10: 3,
          11: 3,
          12: 3,
        },
      },
      {
        label: "Spell Slots — 3rd",
        values: {
          1: "-",
          2: "-",
          3: "-",
          4: "-",
          5: "-",
          6: "-",
          7: "-",
          8: "-",
          9: 2,
          10: 2,
          11: 3,
          12: 3,
        },
      },
    ],
    features: [
      // --- Level 1 ---
      {
        name: "Restorative Touch",
        srdName: "Lay On Hands",
        level: 1,
        description:
          "Your oath grants you a pool of restorative power that replenishes when you finish a Long Rest. With that pool, you can restore a total number of Hit Points equal to five times your Oathsworn level. As a Bonus Action, you touch a creature and draw from the pool to restore Hit Points to that creature, up to the maximum remaining. You can also expend 5 Hit Points from the pool to remove the Poisoned condition from the creature; this does not also restore Hit Points.",
      },
      {
        name: "Oath-Powered Abilities",
        srdName: "Spellcasting",
        level: 1,
        description:
          "Your sworn oath channels power into tangible abilities. You prepare a list of Paladin spells (reflavored as oath-powered abilities) that are available for you to use. Charisma is your spellcasting ability. You can use a personal symbol of the oath sworn as a Spellcasting Focus. See the Prepared Abilities column for the number of abilities you can prepare at each level. Slot progression follows the Spell Slots columns.",
      },
      {
        name: "Weapon Mastery",
        srdName: "Weapon Mastery",
        level: 1,
        description:
          "Your training with weapons allows you to use the mastery properties of two kinds of weapons of your choice with which you have proficiency. Whenever you finish a Long Rest, you can change the kinds of weapons you chose.",
      },
      // --- Level 2 ---
      {
        name: "Fighting Style",
        srdName: "Fighting Style",
        level: 2,
        description:
          "You gain a Fighting Style feat of your choice (see Feats). Instead of choosing one of those feats, you can choose the Blessed Warrior option: learn two Cleric cantrips of your choice, which count as Paladin spells for you. Charisma is your spellcasting ability for them. Whenever you gain an Oathsworn level, you can replace one of these cantrips with another.",
      },
      {
        name: "Conviction Strike",
        srdName: "Paladin's Smite",
        level: 2,
        description:
          "Your conviction fuels devastating strikes. You always have the Divine Smite spell prepared (reflavored as Conviction Strike). You can cast it without expending a spell slot, but you must finish a Long Rest before you can cast it this way again.",
      },
      // --- Level 3 ---
      {
        name: "Channel Conviction",
        srdName: "Channel Divinity",
        level: 3,
        description:
          "You can channel the power of your oath directly, using it to fuel extraordinary effects. You start with Sense Conviction, described below. Other Oathsworn subclass features give additional Channel Conviction options. Each time you use Channel Conviction, you choose which effect to create. You can use this feature twice, regaining one expended use after a Short Rest and all expended uses after a Long Rest. You gain an additional use at Oathsworn level 11.",
      },
      {
        name: "Sense Conviction",
        srdName: "Divine Sense",
        level: 3,
        description:
          "As a Bonus Action, you open your awareness to detect sworn enemies and threats. For the next 10 minutes or until you have the Incapacitated condition, you know the location of any Celestial, Fiend, or Undead within 60 feet of yourself, and you know its creature type. You also detect the presence of any consecrated or desecrated place or object within the same radius.",
      },
      {
        name: "Oathsworn Subclass",
        srdName: "Paladin Subclass",
        level: 3,
        description:
          "You gain an Oathsworn subclass of your choice. Subclasses are specializations not yet detailed in the current version.",
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
          "You can attack twice instead of once whenever you take the Attack action on your turn.",
      },
      {
        name: "Faithful Steed",
        srdName: "Faithful Steed",
        level: 5,
        description:
          "You can call on the aid of a loyal steed. You always have the Find Steed spell prepared. You can also cast the spell once without expending a spell slot, regaining the ability to do so when you finish a Long Rest.",
      },
      // --- Level 6 ---
      {
        name: "Aura of Protection",
        srdName: "Aura of Protection",
        level: 6,
        description:
          "You radiate a protective, unseen aura in a 10-foot Emanation. The aura is inactive while you have the Incapacitated condition. You and your allies in the aura gain a bonus to saving throws equal to your Charisma modifier (minimum bonus of +1). If another Oathsworn is present, a creature can benefit from only one Aura of Protection at a time, choosing which.",
      },
      // --- Level 7 ---
      {
        name: "Subclass Feature",
        srdName: "Subclass feature",
        level: 7,
        description:
          "You gain a feature from your Oathsworn subclass.",
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
        name: "Denounce Foes",
        srdName: "Abjure Foes",
        level: 9,
        description:
          "As a Magic action, you can expend one use of your Channel Conviction to denounce your enemies with awe. You present your symbol or weapon and target a number of creatures equal to your Charisma modifier (minimum of one) that you can see within 60 feet. Each target must succeed on a Wisdom saving throw or have the Frightened condition for 1 minute or until it takes any damage. While Frightened this way, a target can only move, take an action, or take a Bonus Action on its turns.",
      },
      // --- Level 10 ---
      {
        name: "Aura of Courage",
        srdName: "Aura of Courage",
        level: 10,
        description:
          "You and your allies have Immunity to the Frightened condition while in your Aura of Protection. If a Frightened ally enters the aura, that condition has no effect on that ally while there.",
      },
      // --- Level 11 ---
      {
        name: "Radiant Strikes",
        srdName: "Radiant Strikes",
        level: 11,
        description:
          "Your strikes now carry supernatural conviction. When you hit a target with an attack roll using a Melee weapon or an Unarmed Strike, the target takes an extra 1d8 Radiant damage.",
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
  // THE HUNTER (Ranger)
  // ===========================================================================
  {
    originId: "the-hunter",
    srdClass: "Ranger",
    coreTraits: {
      primaryAbility: "Dexterity and Wisdom",
      hitDie: "d10",
      savingThrows: ["Strength", "Dexterity"],
      skillChoices: {
        count: 3,
        options: [
          "Urban",
          "Athletics",
          "Intuition",
          "Investigation",
          "Wilderness",
          "Perception",
          "Stealth",
        ],
      },
      weaponProficiencies: "Simple and Martial weapons",
      armorTraining: "Light and Medium armor and Shields",
    },
    spellcasting: {
      ability: "Wisdom",
      type: "half",
      flavorName: "Preparation & Tactics",
      focusFlavor: "a kit, tools, or preparation materials",
    },
    scaling: [
      {
        label: "Marked Target Uses",
        values: {
          1: 2,
          2: 2,
          3: 2,
          4: 2,
          5: 3,
          6: 3,
          7: 3,
          8: 3,
          9: 4,
          10: 4,
          11: 4,
          12: 4,
        },
      },
      {
        label: "Prepared Tactics",
        values: {
          1: 2,
          2: 3,
          3: 4,
          4: 5,
          5: 6,
          6: 6,
          7: 7,
          8: 7,
          9: 9,
          10: 9,
          11: 10,
          12: 10,
        },
      },
      {
        label: "Spell Slots — 1st",
        values: {
          1: 2,
          2: 2,
          3: 3,
          4: 3,
          5: 4,
          6: 4,
          7: 4,
          8: 4,
          9: 4,
          10: 4,
          11: 4,
          12: 4,
        },
      },
      {
        label: "Spell Slots — 2nd",
        values: {
          1: "-",
          2: "-",
          3: "-",
          4: "-",
          5: 2,
          6: 2,
          7: 3,
          8: 3,
          9: 3,
          10: 3,
          11: 3,
          12: 3,
        },
      },
      {
        label: "Spell Slots — 3rd",
        values: {
          1: "-",
          2: "-",
          3: "-",
          4: "-",
          5: "-",
          6: "-",
          7: "-",
          8: "-",
          9: 2,
          10: 2,
          11: 3,
          12: 3,
        },
      },
    ],
    features: [
      // --- Level 1 ---
      {
        name: "Preparation & Tactics",
        srdName: "Spellcasting",
        level: 1,
        description:
          "Your meticulous preparation, traps, field study, and tactical advantages manifest as abilities. You prepare a list of Ranger spells (reflavored as tactical preparations) that are available for you to use. Wisdom is your spellcasting ability. You can use a kit, tools, or preparation materials as a Spellcasting Focus. See the Prepared Tactics column for the number of preparations you can have ready at each level. Slot progression follows the Spell Slots columns.",
      },
      {
        name: "Marked Target",
        srdName: "Favored Enemy",
        level: 1,
        description:
          "You know how to study, track, and mark your prey. You always have the Hunter's Mark spell prepared. You can cast it a number of times without expending a spell slot, as shown in the Marked Target Uses column. You regain all expended uses when you finish a Long Rest.",
      },
      {
        name: "Weapon Mastery",
        srdName: "Weapon Mastery",
        level: 1,
        description:
          "Your training with weapons allows you to use the mastery properties of two kinds of weapons of your choice with which you have proficiency. Whenever you finish a Long Rest, you can change the kinds of weapons you chose.",
      },
      // --- Level 2 ---
      {
        name: "Deft Explorer",
        srdName: "Deft Explorer",
        level: 2,
        description:
          "Your fieldwork has made you exceptionally adaptable. You gain Expertise in one of your skill proficiencies of your choice. You also learn two languages of your choice.",
      },
      {
        name: "Fighting Style",
        srdName: "Fighting Style",
        level: 2,
        description:
          "You gain a Fighting Style feat of your choice (see Feats). Instead of choosing one of those feats, you can choose the Druidic Warrior option: learn two Druid cantrips of your choice, which count as Ranger spells for you. Wisdom is your spellcasting ability for them. Whenever you gain a Hunter level, you can replace one of these cantrips with another.",
      },
      // --- Level 3 ---
      {
        name: "Hunter Subclass",
        srdName: "Ranger Subclass",
        level: 3,
        description:
          "You gain a Hunter subclass of your choice. Subclasses are specializations not yet detailed in the current version.",
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
          "You can attack twice instead of once whenever you take the Attack action on your turn.",
      },
      // --- Level 6 ---
      {
        name: "Roving",
        srdName: "Roving",
        level: 6,
        description:
          "Your Speed increases by 10 feet while you aren't wearing Heavy armor. You also have a Climb Speed and a Swim Speed equal to your Speed.",
      },
      // --- Level 7 ---
      {
        name: "Subclass Feature",
        srdName: "Subclass feature",
        level: 7,
        description:
          "You gain a feature from your Hunter subclass.",
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
          "Choose two of your skill proficiencies with which you lack Expertise. You gain Expertise in those skills.",
      },
      // --- Level 10 ---
      {
        name: "Tireless",
        srdName: "Tireless",
        level: 10,
        description:
          "Your relentless pursuit fuels your endurance. As a Magic action, you can give yourself Temporary Hit Points equal to 1d8 + your Wisdom modifier (minimum of 1). You can use this action a number of times equal to your Wisdom modifier (minimum of once), regaining all uses after a Long Rest. Additionally, whenever you finish a Short Rest, your Exhaustion level, if any, decreases by 1.",
      },
      // --- Level 11 ---
      {
        name: "Subclass Feature",
        srdName: "Subclass feature",
        level: 11,
        description:
          "You gain a feature from your Hunter subclass.",
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
