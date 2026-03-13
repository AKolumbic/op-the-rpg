import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import Navbar from "@/components/Navbar";
import WipeTransition from "@/components/WipeTransition";

const VARIANTS = [
  { name: "An Everyman?", slug: "everyman", tagline: "No powers. No bloodline. No edge except you. What keeps you going when everyone else has something you don't? And why do they still underestimate you?" },
  { name: "A Brute?", slug: "brute", tagline: "Were you always the biggest kid in the room? How many fights did it take before people stopped picking them? What happens when you finally lose your temper?" },
  { name: "A Rascal?", slug: "rascal", tagline: "When did you learn that being small meant being fast? How many times has luck saved you when skill wasn't enough? Do you even know the difference anymore?" },
  { name: "A Savant?", slug: "savant", tagline: "When did you realize you think faster than everyone else? Do people come to you for answers or avoid you because of them? What problem keeps you up at night?" },
  { name: "A Roughneck?", slug: "roughneck", tagline: "What kind of life makes someone poison-proof? How many hits have you taken that should have put you down? Do you even remember what it feels like to be fragile?" },
  { name: "A Scion?", slug: "scion", tagline: "How old is your bloodline? When did the abilities first show themselves? Does your family talk about where the power comes from, or do they pretend it isn't there?" },
  { name: "An Ancient?", slug: "ancient", tagline: "How tall were you at fourteen? What breaks when you stop holding back? Does anyone in your family know why your lineage carries something this old?" },
  { name: "An Elemental?", slug: "elemental", tagline: "When did it first break through — the fire, the ice, the spark? Can you control it, or does it control you? What do people see when they look at your skin?" },
  { name: "Cursed?", slug: "cursed", tagline: "When did the lights start flickering? Do you know what's wrong with your bloodline, or just that something is? How do people act when you walk into a room?" },
];

const ORIGIN_STORIES = [
  { name: "The Bereaved", slug: "bereaved", quote: "Everyone I loved is gone." },
  { name: "The Celebrity", slug: "celebrity", quote: "Everyone knows my name." },
  { name: "The Chosen", slug: "chosen", quote: "I was given this power. I don't know by what." },
  { name: "The Shifter", slug: "shifter", quote: "I can become something else." },
  { name: "The Soldier", slug: "soldier", quote: "I was built for this." },
  { name: "The Disciple", slug: "disciple", quote: "I mastered myself first." },
  { name: "The Oathsworn", slug: "oathsworn", quote: "I swore an oath to never take a life." },
  { name: "The Hunter", slug: "hunter", quote: "Someone has to make them pay." },
  { name: "The Scoundrel", slug: "scoundrel", quote: "Nobody was coming to save me, so I saved myself." },
  { name: "The Mutant", slug: "mutant", quote: "I've always been like this." },
  { name: "The Pactbound", slug: "pactbound", quote: "Something offered me power. I said yes." },
  { name: "The Genius", slug: "genius", quote: "I built this with my own mind." },
];

const HOME_TOWNS = [
  { name: "The Small Town", slug: "small-town", tagline: "Everybody knows everybody. Faith runs deep, gossip runs deeper. What did the neighbors say when your gifts first showed?" },
  { name: "The Industrial City", slug: "industrial-city", tagline: "Smokestacks, empty factories, and streets where the lights don't work. Who taught you to survive when no one was coming to help?" },
  { name: "The Metropolis", slug: "metropolis", tagline: "The biggest city in the country. Universities, skyscrapers, and more people than you can count. What did you learn that nobody else could?" },
  { name: "The Capitol", slug: "capitol", tagline: "The seat of power. Military bases, monuments, and a machine that runs on discipline. What did serving the state cost you?" },
];

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isLoggedIn = !!user;

  return (
    <>
      <ScrollReveal />
      <WipeTransition />
      <Navbar />

      {/* ═══════════════════════ HERO ═══════════════════════ */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 text-center relative">
        <div className="relative z-10">
          <h1 className="comic-title text-comic-yellow text-[7rem] sm:text-[12rem] leading-none animate-slam">
            OP
          </h1>
          <p className="comic-title text-foreground text-3xl sm:text-5xl tracking-[0.3em] mt-2 animate-pop delay-200">
            THE RPG
          </p>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-slide-up delay-700">
          <div className="w-5 h-8 border-2 border-foreground/30 rounded-full flex justify-center pt-1.5">
            <div className="w-1 h-2 bg-foreground/40 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* ═══════════════════════ ABOUT ═══════════════════════ */}
      <section className="py-24 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="reveal comic-title text-comic-green text-4xl sm:text-6xl text-center mb-10">
            What Is OP?
          </h2>
          <div className="reveal reveal-delay-1 space-y-5">
            <p className="text-foreground/90 text-lg leading-relaxed">
              <span className="font-display text-accent">Over Powered</span> is a superhero tabletop
              role playing game set in an alternate 20th century, built on the SRD 5.2.
            </p>
            <p className="text-foreground/60 leading-relaxed">
              You play as people with extraordinary abilities. These abilities are sometimes
              born out of trauma, sometimes from bloodlines, others are a result of
              experimentation or mutation. Character creation starts with three questions:
              who you are, what happened to you, and where you came from. And that&apos;s
              just the beginning...
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ WHO ARE YOU? ═══════════════════════ */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="reveal comic-title text-center text-comic-cyan text-4xl sm:text-6xl mb-4">
            Who Are You?
          </h2>
          <p className="reveal reveal-delay-1 text-center text-muted mb-14 text-lg">
            Who were you before your story began?
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {VARIANTS.map((v, i) => {
              const rotations = ["-rotate-1", "rotate-2", "-rotate-1", "rotate-1", "-rotate-2", "rotate-1", "-rotate-1", "rotate-2", "-rotate-1"];
              return (
                <div
                  key={v.name}
                  data-wipe-link={`/variants/${v.slug}`}
                  data-wipe-color="comic-yellow"
                  className={`reveal reveal-delay-${(i % 9) + 1} comic-caption ${rotations[i]} hover:rotate-0 transition-transform hover:scale-105 cursor-pointer`}
                >
                  <h3 className="font-display text-xl tracking-wide mb-2">{v.name}</h3>
                  <p className="text-sm opacity-70">{v.tagline}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ ORIGIN STORIES ═══════════════════════ */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="reveal comic-title text-center text-comic-magenta text-4xl sm:text-6xl mb-4">
            What&apos;s Your Origin Story?
          </h2>
          <p className="reveal reveal-delay-1 text-center text-muted mb-14 text-lg">
            What happened to you made you what you are today.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ORIGIN_STORIES.map((o, i) => {
              const rotations = ["-rotate-1", "rotate-2", "-rotate-1", "rotate-1", "-rotate-2", "rotate-1", "-rotate-1", "rotate-2", "-rotate-1", "rotate-1", "-rotate-2", "rotate-1"];
              return (
                <div
                  key={o.slug}
                  data-wipe-link={`/origins/${o.slug}`}
                  data-wipe-color="comic-yellow"
                  className={`reveal reveal-delay-${(i % 9) + 1} comic-caption ${rotations[i]} hover:rotate-0 transition-transform hover:scale-105 cursor-pointer`}
                >
                  <p className="font-display text-xl sm:text-2xl leading-snug">
                    &ldquo;{o.quote}&rdquo;
                  </p>
                  <p className="font-display text-base mt-2 opacity-70">
                    &mdash; {o.name}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ WHERE ARE YOU FROM? ═══════════════════════ */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="reveal comic-title text-center text-comic-cyan text-4xl sm:text-6xl mb-4">
            Where Are You From?
          </h2>
          <p className="reveal reveal-delay-1 text-center text-muted mb-14 text-lg">
            The place that shaped you before everything changed.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {HOME_TOWNS.map((t, i) => {
              const rotations = ["rotate-1", "-rotate-1", "-rotate-1", "rotate-1"];
              return (
                <div
                  key={t.slug}
                  data-wipe-link={`/hometowns/${t.slug}`}
                  data-wipe-color="comic-yellow"
                  className={`reveal reveal-delay-${(i % 4) + 1} comic-caption ${rotations[i]} hover:rotate-0 transition-transform hover:scale-105 cursor-pointer`}
                >
                  <h3 className="font-display text-xl tracking-wide mb-2">{t.name}</h3>
                  <p className="text-sm opacity-70">{t.tagline}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ CTA ═══════════════════════ */}
      <section className="py-32 px-4 text-center">
        <div className="reveal max-w-3xl mx-auto">
          <h2 className="comic-title text-comic-yellow text-4xl sm:text-7xl leading-tight mb-10">
            Your Story
            <br />
            Starts Now
          </h2>

          <Link
            href={isLoggedIn ? "/characters/new" : "/auth/sign-up"}
            className="comic-btn bg-foreground text-background text-2xl px-10 py-4"
          >
            {isLoggedIn ? "Build Your Hero" : "Create an Account"}
          </Link>
        </div>
      </section>

      {/* ═══════════════════════ FOOTER ═══════════════════════ */}
      <footer className="border-t-3 border-card-border py-8 text-center">
        <p className="font-display text-lg text-foreground/30 tracking-wide">
          OP the RPG
        </p>
      </footer>
    </>
  );
}
