"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { getCharacter } from "@/hooks/useCharacter";
import type { Character } from "@/lib/types";
import { ORIGIN_STORIES } from "@/data/origin-stories";
import { HUMAN_VARIANTS } from "@/data/human-variants";
import { HOME_TOWNS } from "@/data/home-towns";
import { FEATS } from "@/data/feats";
import { SKILLS } from "@/data/skills";
import { ABILITY_SCORES, ABILITY_SCORE_NAMES } from "@/data/ability-scores";
import { abilityModifier, formatModifier } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import BackstoryPreview from "@/components/builder/BackstoryPreview";

export default function CharacterPage() {
  const params = useParams();
  const router = useRouter();
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.push("/auth/sign-in");
        return;
      }
      getCharacter(params.id as string)
        .then(setCharacter)
        .catch(() => router.push("/dashboard"))
        .finally(() => setLoading(false));
    });
  }, [params.id, router]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <p className="text-muted font-display text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (!character) return null;

  const { data } = character;
  const variant = HUMAN_VARIANTS.find((v) => v.id === data.humanVariant);
  const homeTown = HOME_TOWNS.find((h) => h.id === data.homeTown);
  const origin = ORIGIN_STORIES.find((o) => o.id === data.originStory);
  const proficientSkills = new Set(data.skillProficiencies);

  return (
    <div className="min-h-screen pt-14">
      <Navbar />

      {/* Hero banner */}
      <div className="bg-comic-red halftone relative">
        <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
          <div className="flex justify-between items-start">
            <div className="flex items-start gap-4">
              {data.avatarUrl && (
                <div className="w-20 h-20 sm:w-24 sm:h-24 border-3 border-white/30 shadow-[4px_4px_0_rgba(0,0,0,0.5)] overflow-hidden flex-shrink-0">
                  <img
                    src={data.avatarUrl}
                    alt={character.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div>
                <h1 className="comic-title text-white text-4xl sm:text-5xl">
                  {data.alias || character.name}
                </h1>
                {data.alias && (
                  <p className="font-display text-white/90 text-lg mt-1 tracking-wide">
                    {character.name}
                  </p>
                )}
                <p className="font-display text-white/70 text-lg mt-1 tracking-wide">
                  Level {data.level} {variant?.name} {origin?.name}
                </p>
              </div>
            </div>
            <a
              href="/dashboard"
              className="comic-btn bg-card-bg text-foreground text-sm"
            >
              Dashboard
            </a>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Backstory */}
        {data.narrative && (
          <div className="mb-8">
            <h2 className="font-display text-xl text-accent tracking-wide mb-3">Backstory</h2>
            <BackstoryPreview data={data} characterName={character.name} />
          </div>
        )}

        <h2 className="font-display text-xl tracking-wide mb-4">Character Sheet</h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="comic-panel p-4">
            <h3 className="font-display text-xs text-muted tracking-widest uppercase mb-1">Who Are You?</h3>
            <p className="font-display text-lg text-foreground">{variant?.name ?? "—"}</p>
            {variant && (
              <p className="text-xs text-muted mt-1">{variant.tagline}</p>
            )}
          </div>

          <div className="comic-panel p-4">
            <h3 className="font-display text-xs text-muted tracking-widest uppercase mb-1">Home Town</h3>
            <p className="font-display text-lg text-foreground">{homeTown?.name ?? "—"}</p>
          </div>

          <div className="comic-panel p-4 sm:col-span-2">
            <h3 className="font-display text-xs text-muted tracking-widest uppercase mb-1">Origin Story</h3>
            <p className="font-display text-lg text-foreground">{origin?.name ?? "—"}</p>
            {origin && (
              <p className="text-sm text-accent italic mt-1">
                &ldquo;{origin.quote}&rdquo;
              </p>
            )}
          </div>

          <div className="comic-panel p-4 sm:col-span-2">
            <h3 className="font-display text-xs text-muted tracking-widest uppercase mb-3">Ability Scores</h3>
            <div className="grid grid-cols-6 gap-3">
              {ABILITY_SCORES.map((ability) => {
                const total =
                  data.abilityScores[ability] +
                  data.abilityScoreBonuses[ability];
                const mod = abilityModifier(total);
                return (
                  <div
                    key={ability}
                    className="text-center p-2 border-2 border-card-border bg-background shadow-[2px_2px_0_rgba(0,0,0,0.2)]"
                  >
                    <p className="text-xs text-muted font-display">
                      {ABILITY_SCORE_NAMES[ability]}
                    </p>
                    <p className="text-2xl font-display">{total}</p>
                    <p className="text-sm text-muted">{formatModifier(mod)}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="comic-panel p-4">
            <h3 className="font-display text-xs text-muted tracking-widest uppercase mb-2">Feats</h3>
            <div className="flex flex-wrap gap-2">
              {[...(data.homeTownFeat ? [data.homeTownFeat] : []), ...data.feats].map((featId) => {
                const feat = FEATS.find((f) => f.id === featId);
                return (
                  <span
                    key={featId}
                    className="px-2 py-1 text-sm font-display border-2 border-accent/30 bg-accent/5 text-accent shadow-[2px_2px_0_rgba(0,0,0,0.1)]"
                  >
                    {feat?.name ?? featId}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="comic-panel p-4">
            <h3 className="font-display text-xs text-muted tracking-widest uppercase mb-2">Skills</h3>
            <div className="flex flex-wrap gap-1">
              {SKILLS.filter((s) => proficientSkills.has(s.id)).map((skill) => (
                <span
                  key={skill.id}
                  className="px-2 py-0.5 text-xs font-display border-2 border-accent/30 bg-accent/5 text-accent shadow-[1px_1px_0_rgba(0,0,0,0.1)]"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
