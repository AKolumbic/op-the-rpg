export interface OriginStory {
  id: string;
  name: string;
  srdMapping: string;
  quote: string;
  description: string;
  archetype: string;
}

export const ORIGIN_STORIES: OriginStory[] = [
  {
    id: "the-bereaved",
    name: "The Bereaved",
    srdMapping: "Barbarian",
    quote: "Everyone I loved is gone.",
    description:
      "You lost everything — family, home, purpose. What's left is grief, rage, and the inability to stay down. The pain doesn't make you weaker. It makes you reckless, relentless, and terrifying. You fight like someone with nothing left to lose, because you are.",
    archetype:
      "The traumatized powerhouse. Wolverine after losing everyone. The Punisher before he found a method. Bruce Banner if the anger never stopped.",
  },
  {
    id: "the-celebrity",
    name: "The Celebrity",
    srdMapping: "Bard",
    quote: "Everyone knows my name.",
    description:
      "You're famous — or infamous. Maybe you were a performer, a public figure, a media darling, or a controversial name that never left the headlines. Your power is influence: people listen to you, fight harder around you, and underestimate you at their peril. You have resources, contacts, and a presence that fills a room.",
    archetype:
      "The charismatic leader. Tony Stark's public persona. Oracle as information broker. A hero whose greatest weapon is that everyone already knows who they are.",
  },
  {
    id: "the-chosen",
    name: "The Chosen",
    srdMapping: "Cleric",
    quote: "I was given this power. I don't know by what.",
    description:
      "Something chose you. You didn't seek it out — it found you. The power is real: you can heal, protect, and channel forces that shouldn't be possible. But the source? That's the question you can't answer. Maybe it's divine. Maybe it's something older. Maybe it's something that hasn't revealed its true nature yet. You carry the gift and the uncertainty in equal measure.",
    archetype:
      "The reluctant vessel. Doctor Strange before he understood. A faith healer who doesn't know if their faith is well-placed. Someone touched by a power that may or may not have their best interests at heart.",
  },
  {
    id: "the-shifter",
    name: "The Shifter",
    srdMapping: "Druid",
    quote: "I can become something else.",
    description:
      "You can transform — physically, completely — into animals. Whether this is a mutation, a bond with something primal, or an ability inherited from a bloodline no one understands, the result is the same: your body is not fixed. You are human, and you are also something else, and the line between the two gets blurrier the more you shift.",
    archetype:
      "Beast Boy. Venom (symbiote as shifting). A mutant whose power is biological transformation. Someone who is losing track of where the human ends and the animal begins.",
  },
  {
    id: "the-soldier",
    name: "The Soldier",
    srdMapping: "Fighter",
    quote: "I was built for this.",
    description:
      "You were trained — military, paramilitary, private security, underground fighting circuits, or just a lifetime of discipline. You don't have powers. You don't need them. You have skill, experience, and the ability to adapt to any combat situation faster than anyone else in the room. While others rely on abilities they were born with or given, you rely on what you earned.",
    archetype:
      "Batman (training and discipline over powers). Black Widow. Captain America as a peak-human soldier. The person in the room who doesn't have powers and is still the most dangerous.",
  },
  {
    id: "the-disciple",
    name: "The Disciple",
    srdMapping: "Monk",
    quote: "I mastered myself first.",
    description:
      "You were trained in a specific tradition — a martial art, a monastic discipline, a philosophical school that taught you to weaponize your own body and mind. Your power comes from within, cultivated through years of practice, meditation, and physical conditioning. You move faster, hit harder, and endure more than any normal human should, and it's all earned.",
    archetype:
      "Iron Fist. Shang-Chi. A speedster whose speed comes from discipline rather than mutation. Someone whose body operates at a level that borders on supernatural, but it's all technique.",
  },
  {
    id: "the-oathsworn",
    name: "The Oathsworn",
    srdMapping: "Paladin",
    quote: "I swore an oath and it gave me strength.",
    description:
      "You made a promise — to protect the innocent, to never kill, to uphold justice, to serve something greater than yourself. And somehow, that promise gave you power. The oath is real and binding: as long as you hold to it, you are stronger, more resilient, and capable of things that shouldn't be possible. Break it, and you lose everything.",
    archetype:
      "Superman's moral code as a literal power source. Captain America's conviction. A hero who is powerful precisely because they will not compromise. The boy scout who could bench press a car.",
  },
  {
    id: "the-hunter",
    name: "The Hunter",
    srdMapping: "Ranger",
    quote: "Someone has to make them pay.",
    description:
      "You were wronged — and now you hunt. Not one specific person (though maybe it started that way), but anyone who does what was done to you. You track, you study, you prepare, and then you strike. You're not reckless. You're methodical. Patient. And you don't stop.",
    archetype:
      "The Punisher with a plan. John Wick. Hawkeye or Green Arrow — precision and preparation over raw power. A vigilante who hunts wrongdoers with the patience of a predator.",
  },
  {
    id: "the-scoundrel",
    name: "The Scoundrel",
    srdMapping: "Rogue",
    quote: "Nobody was coming to save me, so I saved myself.",
    description:
      "You grew up on your own — or close enough. No one taught you to fight fair because no one was around to teach you anything. You learned to survive by being smarter, faster, and dirtier than everyone else. You don't have a code. You have instincts. You're not a villain, but you're not exactly a hero either. You're the person who does what needs to be done when the heroes won't.",
    archetype:
      "Catwoman. Red Hood. Deadpool (minus the fourth wall). The anti-hero who operates in the gray area because the black-and-white heroes can't get the job done.",
  },
  {
    id: "the-mutant",
    name: "The Mutant",
    srdMapping: "Sorcerer",
    quote: "I've always been like this.",
    description:
      "You were born with it. You didn't choose your powers, didn't earn them, didn't make a deal for them. They were just... there. Maybe they manifested in childhood. Maybe they erupted during puberty. Maybe you spent years suppressing them before they broke through. The power is part of you — genetic, innate, inseparable from who you are. Learning to control it is the work of a lifetime.",
    archetype:
      "The X-Men. Storm. Jean Grey. Static Shock. Any hero whose powers are a birthright they never asked for and are still learning to master.",
  },
  {
    id: "the-pactbound",
    name: "The Pactbound",
    srdMapping: "Warlock",
    quote: "Something offered me power. I said yes.",
    description:
      "You made a deal. Maybe you were desperate. Maybe you were ambitious. Maybe you didn't fully understand what you were agreeing to. But something — an entity, an organization, a force, a presence — offered you power, and you took it. The power is real. The strings attached are also real. You're stronger than you were, but you're not free.",
    archetype:
      "Ghost Rider. Spawn. Venom (symbiote as pact). A hero who sold something to gain power and is now navigating the consequences.",
  },
  {
    id: "the-genius",
    name: "The Genius",
    srdMapping: "Wizard",
    quote: "I built this with my own mind.",
    description:
      "You don't have powers. You have a brain that operates on a level most people can't comprehend. You built your abilities — literally. Gadgets, suits, weapons, chemical compounds, algorithms, devices. Everything you can do, you engineered. Your \"spells\" are inventions. Your \"spellbook\" is a workshop, a lab, or a hard drive full of schematics. You are the smartest person in any room, and that is your superpower.",
    archetype:
      "Iron Man. Batman (gadget side). Mr. Fantastic. A hero whose power is intellect and preparation — take away the tools and they'll just build new ones.",
  },
];
