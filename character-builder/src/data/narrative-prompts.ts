export interface NarrativePrompt {
  id: string;
  label: string;
  placeholder: string;
  multiline?: boolean;
}

export interface VariantPrompts {
  variantId: string;
  specific1: NarrativePrompt;
  specific2: NarrativePrompt;
}

export interface HomeTownPrompts {
  homeTownId: string;
  specific1: NarrativePrompt;
}

export interface OriginHints {
  originId: string;
  whatHappened: string;
  where: string;
  whoElse: string;
  whatYouLost: string;
  whatYouGained: string;
  howYouFeel: string;
}

// Universal prompts for all variants
export const VARIANT_UNIVERSAL_PROMPTS: NarrativePrompt[] = [
  {
    id: "firstImpression",
    label: "How do people react when they first meet you?",
    placeholder: "Fear? Curiosity? They underestimate you?",
  },
  {
    id: "noticeableTraits",
    label: "What's the first thing someone notices about you physically?",
    placeholder: "The scars? The size? The way you move?",
  },
];

// Per-variant specific prompts
export const VARIANT_SPECIFIC_PROMPTS: VariantPrompts[] = [
  {
    variantId: "everyman",
    specific1: {
      id: "specific1",
      label: "What's the one skill you picked up that nobody expected you to have?",
      placeholder: "Lock-picking? Field medicine? Speaking three languages?",
    },
    specific2: {
      id: "specific2",
      label: "When did you first realize you could keep up with people who had every advantage over you?",
      placeholder: "A fight? A test? A moment where talent wasn't enough?",
    },
  },
  {
    variantId: "brute",
    specific1: {
      id: "specific1",
      label: "What made you this tough — hard labor, fighting, or something worse?",
      placeholder: "Construction since 16? Underground fights? Just built different?",
    },
    specific2: {
      id: "specific2",
      label: "What's the last thing that actually hurt you?",
      placeholder: "A person? A weapon? A memory?",
    },
  },
  {
    variantId: "rascal",
    specific1: {
      id: "specific1",
      label: "What's the tightest spot you ever talked or slipped your way out of?",
      placeholder: "A locked room? A cop? Someone twice your size?",
    },
    specific2: {
      id: "specific2",
      label: "Who taught you that being small was an advantage, not a weakness?",
      placeholder: "A parent? A mentor? Nobody — you figured it out yourself?",
    },
  },
  {
    variantId: "savant",
    specific1: {
      id: "specific1",
      label: "When did you first realize you were smarter than everyone around you?",
      placeholder: "School? A conversation? When you solved something nobody else could?",
    },
    specific2: {
      id: "specific2",
      label: "What's the one problem you haven't been able to solve yet?",
      placeholder: "A person? A theory? Something about yourself?",
    },
  },
  {
    variantId: "roughneck",
    specific1: {
      id: "specific1",
      label: "What's the hardest shift you ever worked — and what did it cost you?",
      placeholder: "The mines? The docks? A factory floor in summer?",
    },
    specific2: {
      id: "specific2",
      label: "What's the one thing that should have put you down but didn't?",
      placeholder: "Poison? An explosion? Something you inhaled?",
    },
  },
  {
    variantId: "scion",
    specific1: {
      id: "specific1",
      label: "What do people whisper about your family when they think you can't hear?",
      placeholder: "Old money? Old blood? Something stranger?",
    },
    specific2: {
      id: "specific2",
      label: "When did you first notice you were different — that you could do things others couldn't?",
      placeholder: "Childhood? Adolescence? A moment of crisis?",
    },
  },
  {
    variantId: "ancient",
    specific1: {
      id: "specific1",
      label: "When did you stop trying to hide how big you are?",
      placeholder: "When you broke something? When someone needed you to be big?",
    },
    specific2: {
      id: "specific2",
      label: "Are you gentle by nature, or did you have to learn to be careful around other people?",
      placeholder: "Born gentle? Learned the hard way? Still figuring it out?",
    },
  },
  {
    variantId: "elemental",
    specific1: {
      id: "specific1",
      label: "When did the element first manifest — and what did it destroy or change?",
      placeholder: "A fire? A frozen room? Something you can't take back?",
    },
    specific2: {
      id: "specific2",
      label: "How do you keep it under control in everyday life?",
      placeholder: "Gloves? Meditation? You don't — people just stay away?",
    },
  },
  {
    variantId: "cursed",
    specific1: {
      id: "specific1",
      label: "What's the strangest thing that's happened in a room because you were in it?",
      placeholder: "Lights flickered? Temperature dropped? Someone fainted?",
    },
    specific2: {
      id: "specific2",
      label: "Does your family acknowledge the legacy, or do they pretend it doesn't exist?",
      placeholder: "Open secret? Total denial? They disowned you?",
    },
  },
];

// Universal prompts for all home towns
export const HOMETOWN_UNIVERSAL_PROMPTS: NarrativePrompt[] = [
  {
    id: "neighborhood",
    label: "Describe your block, your street, your corner of town.",
    placeholder: "Quiet cul-de-sac? Row houses? Above a shop on Main Street?",
  },
  {
    id: "importantPerson",
    label: "Who was the most important person in your life growing up, and what did they teach you?",
    placeholder: "A parent? A teacher? The old man at the corner store?",
  },
  {
    id: "memory",
    label: "What's the one thing you'll never forget about home?",
    placeholder: "A smell? A sound? Something that happened on a Tuesday?",
  },
];

// Per-town specific prompts
export const HOMETOWN_SPECIFIC_PROMPTS: HomeTownPrompts[] = [
  {
    homeTownId: "the-small-town",
    specific1: {
      id: "specific1",
      label: "Was there a moment when the community felt like a shelter — or a cage?",
      placeholder: "A town meeting? A secret? The day you decided to leave?",
    },
  },
  {
    homeTownId: "the-industrial-city",
    specific1: {
      id: "specific1",
      label: "What was your hustle? Everyone had one. What was yours?",
      placeholder: "Running numbers? Fixing cars? Something you don't talk about?",
    },
  },
  {
    homeTownId: "the-metropolis",
    specific1: {
      id: "specific1",
      label: "What was the first thing the city showed you that changed how you see the world?",
      placeholder: "A lecture? A protest? Something in a museum at 2 AM?",
    },
  },
  {
    homeTownId: "the-capitol",
    specific1: {
      id: "specific1",
      label: "Did you serve the system, fight it, or learn to work around it?",
      placeholder: "Enlisted? Protested? Found the gaps in the machine?",
    },
  },
];

// Origin story prompts — same 6 questions for all, different hint text per origin
export const ORIGIN_PROMPTS: NarrativePrompt[] = [
  { id: "whatHappened", label: "What happened to you?", placeholder: "", multiline: true },
  { id: "where", label: "Where were you when it happened?", placeholder: "" },
  { id: "whoElse", label: "Who else was involved?", placeholder: "" },
  { id: "whatYouLost", label: "What did you lose?", placeholder: "" },
  { id: "whatYouGained", label: "What did you gain?", placeholder: "" },
  { id: "howYouFeel", label: "How do you feel about it now?", placeholder: "", multiline: true },
];

export const ORIGIN_HINTS: OriginHints[] = [
  {
    originId: "the-bereaved",
    whatHappened: "Who did you lose? All of them, or one at a time?",
    where: "Home? A hospital? Somewhere you weren't supposed to be?",
    whoElse: "Was anyone there with you, or were you completely alone?",
    whatYouLost: "A family? A purpose? The ability to feel safe?",
    whatYouGained: "Rage that doesn't stop. The inability to stay down.",
    howYouFeel: "Does the grief drive you, or does it weigh you down?",
  },
  {
    originId: "the-celebrity",
    whatHappened: "How did you become famous — talent, scandal, or accident?",
    where: "A stage? A camera? The front page?",
    whoElse: "Fans? Managers? People who wanted something from you?",
    whatYouLost: "Privacy. Anonymity. The ability to be nobody.",
    whatYouGained: "Influence. Resources. A name that opens every door.",
    howYouFeel: "Do you love the spotlight, or are you trapped in it?",
  },
  {
    originId: "the-chosen",
    whatHappened: "How did the power arrive — a vision, a voice, a feeling?",
    where: "A church? A hospital bed? The middle of nowhere?",
    whoElse: "Did something speak to you, or did you just suddenly know?",
    whatYouLost: "Certainty. You can't be sure of anything anymore.",
    whatYouGained: "The ability to heal, protect, or channel something vast.",
    howYouFeel: "Do you trust the source, or are you afraid of it?",
  },
  {
    originId: "the-shifter",
    whatHappened: "When did the change first happen — and did you choose it?",
    where: "Were you alone, or did someone see it happen?",
    whoElse: "Is there an animal that feels more like you than your human body does?",
    whatYouLost: "A fixed sense of who you are. The line keeps moving.",
    whatYouGained: "Freedom. You are not limited to one form.",
    howYouFeel: "Are you more human or more animal? Does it matter?",
  },
  {
    originId: "the-soldier",
    whatHappened: "What was your training — military, underground, self-taught?",
    where: "A base? A ring? A basement? A battlefield?",
    whoElse: "A mentor? A unit? An enemy who made you better?",
    whatYouLost: "Innocence. The ability to see violence as anything but practical.",
    whatYouGained: "Skill that nobody can take from you. You earned every bit.",
    howYouFeel: "Do you miss the structure, or are you relieved it's over?",
  },
  {
    originId: "the-disciple",
    whatHappened: "What discipline did you study — and who taught you?",
    where: "A dojo? A monastery? A rooftop? Someone's garage?",
    whoElse: "A master? A rival? Someone who pushed you past what you thought possible?",
    whatYouLost: "Time. Years of your life, given to the practice.",
    whatYouGained: "Mastery of your own body. No one gave this to you.",
    howYouFeel: "Was the sacrifice worth what you became?",
  },
  {
    originId: "the-oathsworn",
    whatHappened: "What did you promise, and to whom — or to what?",
    where: "Where were you standing when the oath took hold?",
    whoElse: "Was someone dying? Was someone watching? Were you alone?",
    whatYouLost: "Freedom. Your oath binds you. Break it and you break.",
    whatYouGained: "Strength that shouldn't be possible. The oath made it real.",
    howYouFeel: "Is the oath a gift or a chain?",
  },
  {
    originId: "the-hunter",
    whatHappened: "What was done to you — or to someone you couldn't protect?",
    where: "Where did the hunt begin? A crime scene? A funeral? A hospital?",
    whoElse: "Do you have a partner, or do you work alone?",
    whatYouLost: "Peace. You don't get to stop.",
    whatYouGained: "Patience. Precision. The ability to find anyone.",
    howYouFeel: "Will you know when to stop, or is this forever?",
  },
  {
    originId: "the-scoundrel",
    whatHappened: "When did you realize no one was coming to help?",
    where: "The streets? Foster care? A place you'd rather forget?",
    whoElse: "Did you have anyone, or did you do this completely alone?",
    whatYouLost: "Trust. The belief that people are basically good.",
    whatYouGained: "Survival instincts. You can't be caught, can't be held.",
    howYouFeel: "Are you out for yourself, or have you found something worth fighting for?",
  },
  {
    originId: "the-mutant",
    whatHappened: "When did the power first show itself?",
    where: "School? Home? A moment of extreme emotion?",
    whoElse: "Did anyone see it happen? Did they help or run?",
    whatYouLost: "Normalcy. You've never been normal and you never will be.",
    whatYouGained: "Raw power. It's part of you, woven into your DNA.",
    howYouFeel: "Have you accepted it, or are you still fighting what you are?",
  },
  {
    originId: "the-pactbound",
    whatHappened: "What was offered, and what did you give up?",
    where: "Where did the deal happen — a dark room, a dream, a screen?",
    whoElse: "What is the entity, and what does it want from you?",
    whatYouLost: "Autonomy. You are not entirely your own anymore.",
    whatYouGained: "Power you didn't earn. It came with a price tag.",
    howYouFeel: "Do you regret the deal, or would you make it again?",
  },
  {
    originId: "the-genius",
    whatHappened: "What was the first thing you built that changed everything?",
    where: "A garage? A lab? A dorm room? A junkyard?",
    whoElse: "Did you have a partner, a rival, or a corporation breathing down your neck?",
    whatYouLost: "Patience for other people. Nobody thinks as fast as you.",
    whatYouGained: "Everything you need — you built it yourself.",
    howYouFeel: "Is the work the point, or is it what the work lets you do?",
  },
];

// Ability score flavor prompts
export const ABILITY_FLAVOR_PROMPTS: NarrativePrompt[] = [
  {
    id: "physicalStrength",
    label: "In one sentence, what's your body's greatest edge?",
    placeholder: "Fast hands? Iron jaw? Unnatural stamina?",
  },
  {
    id: "mentalStrength",
    label: "In one sentence, what's your mind's sharpest quality?",
    placeholder: "Photographic memory? Reading people? Unshakeable willpower?",
  },
];

// Feat narrative prompt
export const FEAT_PROMPT_LABEL = "How did you learn this — or when did you first discover you could do it?";

export const FEAT_PLACEHOLDERS: Record<string, string> = {
  "origin": "A mentor? A crisis? Pure instinct?",
  "origin-story": "It came with the territory. When did it click?",
  "hometown": "Growing up there, you just... picked it up. How?",
  "fighting-style": "Training? Survival? Years of practice?",
  "general": "Experience? Desperation? Natural talent?",
};

// Helper to get variant-specific prompts
export function getVariantPrompts(variantId: string): VariantPrompts | undefined {
  return VARIANT_SPECIFIC_PROMPTS.find((p) => p.variantId === variantId);
}

// Helper to get hometown-specific prompts
export function getHomeTownPrompts(homeTownId: string): HomeTownPrompts | undefined {
  return HOMETOWN_SPECIFIC_PROMPTS.find((p) => p.homeTownId === homeTownId);
}

// Helper to get origin-specific hint text
export function getOriginHints(originId: string): OriginHints | undefined {
  return ORIGIN_HINTS.find((h) => h.originId === originId);
}
