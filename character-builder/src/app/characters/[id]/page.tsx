"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { getCharacter, updateCharacter } from "@/hooks/useCharacter";
import type { Character, CharacterData } from "@/lib/types";
import { ORIGIN_STORIES } from "@/data/origin-stories";
import { HUMAN_VARIANTS } from "@/data/human-variants";
import { HOME_TOWNS } from "@/data/home-towns";
import { FEATS } from "@/data/feats";
import { SKILLS } from "@/data/skills";
import { ABILITY_SCORES, ABILITY_SCORE_NAMES } from "@/data/ability-scores";
import { abilityModifier, formatModifier } from "@/lib/utils";
import {
  proficiencyBonus,
  computeHP,
  canLevelUp,
  getFeaturesUpToLevel,
  getScalingValues,
  getOriginData,
} from "@/lib/level-up";
import {
  getSubclass,
  getSubclassFeaturesUpToLevel,
} from "@/data/subclasses";
import Navbar from "@/components/Navbar";
import BackstoryPreview from "@/components/builder/BackstoryPreview";
import LevelUpModal from "@/components/LevelUpModal";
import SubclassPickerModal from "@/components/SubclassPickerModal";

export default function CharacterPage() {
  const params = useParams();
  const router = useRouter();
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [showSubclassPicker, setShowSubclassPicker] = useState(false);

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

  async function handleLevelUp(patch: Partial<CharacterData>) {
    if (!character) return;
    const newData = { ...character.data, ...patch };
    const updated = await updateCharacter(character.id, character.name, newData);
    setCharacter(updated);
    setShowLevelUp(false);
  }

  async function handleSubclassPick(subclassId: string) {
    if (!character) return;
    const newData = { ...character.data, subclass: subclassId };
    const updated = await updateCharacter(character.id, character.name, newData);
    setCharacter(updated);
    setShowSubclassPicker(false);
  }

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
  const originData = getOriginData(data.originStory);
  const proficientSkills = new Set(data.skillProficiencies);

  const hp = computeHP(data);
  const profBonus = proficiencyBonus(data.level);
  const levelUpCheck = canLevelUp(data);
  const features = getFeaturesUpToLevel(data.originStory, data.level);
  const scalingValues = getScalingValues(data.originStory, data.level);
  const needsSubclassRetrofit = data.level >= 3 && !data.subclass;
  const subclass = data.subclass ? getSubclass(data.subclass) : null;
  const subclassFeatures = data.subclass
    ? getSubclassFeaturesUpToLevel(data.subclass, data.level)
    : [];

  // All feats: creation + home town + level-up
  const allFeatIds = [
    ...(data.homeTownFeat ? [data.homeTownFeat] : []),
    ...data.feats,
    ...Object.values(data.levelFeats ?? {}),
  ];

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
                  {subclass && (
                    <span className="text-white/50"> — {subclass.name}</span>
                  )}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2 items-end">
              <a
                href="/dashboard"
                className="comic-btn bg-card-bg text-foreground text-sm"
              >
                Dashboard
              </a>
              {needsSubclassRetrofit && (
                <button
                  onClick={() => setShowSubclassPicker(true)}
                  className="comic-btn bg-comic-blue text-white text-sm"
                >
                  Choose Subclass
                </button>
              )}
              {levelUpCheck.ok && (
                <button
                  onClick={() => setShowLevelUp(true)}
                  className="comic-btn bg-comic-green text-black text-sm"
                >
                  Level Up!
                </button>
              )}
            </div>
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
          {/* Identity */}
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

          {/* Combat Stats */}
          <div className="comic-panel p-4">
            <h3 className="font-display text-xs text-muted tracking-widest uppercase mb-2">Combat Stats</h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-2 border-2 border-comic-red/30 bg-comic-red/5 shadow-[2px_2px_0_rgba(0,0,0,0.2)]">
                <p className="text-xs text-muted font-display">HP</p>
                <p className="text-2xl font-display text-comic-red">{hp}</p>
                {originData && (
                  <p className="text-xs text-muted">{originData.coreTraits.hitDie}</p>
                )}
              </div>
              <div className="text-center p-2 border-2 border-comic-cyan/30 bg-comic-cyan/5 shadow-[2px_2px_0_rgba(0,0,0,0.2)]">
                <p className="text-xs text-muted font-display">Prof.</p>
                <p className="text-2xl font-display text-comic-cyan">+{profBonus}</p>
              </div>
              <div className="text-center p-2 border-2 border-card-border bg-background shadow-[2px_2px_0_rgba(0,0,0,0.2)]">
                <p className="text-xs text-muted font-display">Level</p>
                <p className="text-2xl font-display">{data.level}</p>
                {data.level < 12 && (
                  <p className="text-xs text-muted">/12</p>
                )}
              </div>
            </div>
          </div>

          {/* Saving Throws */}
          {originData && (
            <div className="comic-panel p-4">
              <h3 className="font-display text-xs text-muted tracking-widest uppercase mb-2">Saving Throws</h3>
              <div className="flex gap-2">
                {originData.coreTraits.savingThrows.map((st) => (
                  <span
                    key={st}
                    className="px-3 py-1 text-sm font-display border-2 border-accent/30 bg-accent/5 text-accent shadow-[2px_2px_0_rgba(0,0,0,0.1)]"
                  >
                    {st}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Ability Scores */}
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

          {/* Scaling Values */}
          {scalingValues.length > 0 && (
            <div className="comic-panel p-4 sm:col-span-2">
              <h3 className="font-display text-xs text-muted tracking-widest uppercase mb-2">
                {origin?.name} Scaling
              </h3>
              <div className="flex flex-wrap gap-3">
                {scalingValues.map((sv) => (
                  <div
                    key={sv.label}
                    className="text-center px-4 py-2 border-2 border-comic-orange/30 bg-comic-orange/5 shadow-[2px_2px_0_rgba(0,0,0,0.2)]"
                  >
                    <p className="text-xs text-muted font-display">{sv.label}</p>
                    <p className="text-lg font-display text-comic-orange">{sv.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Feats */}
          <div className="comic-panel p-4 sm:col-span-2">
            <h3 className="font-display text-xs text-muted tracking-widest uppercase mb-2">Feats</h3>
            <div className="flex flex-wrap gap-2">
              {allFeatIds.map((featId) => {
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

          {/* Skills */}
          <div className="comic-panel p-4 sm:col-span-2">
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

          {/* Features by Level */}
          {features.length > 0 && (
            <div className="comic-panel p-4 sm:col-span-2">
              <h3 className="font-display text-xs text-muted tracking-widest uppercase mb-3">
                {origin?.name} Features
              </h3>
              <div className="space-y-3">
                {features.map((feature) => (
                  <div
                    key={`${feature.level}-${feature.name}`}
                    className="p-3 border-2 border-card-border bg-background shadow-[2px_2px_0_rgba(0,0,0,0.1)]"
                  >
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs text-muted font-display">Lv {feature.level}</span>
                      <h4 className="font-display text-sm text-accent tracking-wide">
                        {feature.name}
                      </h4>
                    </div>
                    <p className="text-xs text-muted mt-1 whitespace-pre-line">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Subclass Features */}
          {subclassFeatures.length > 0 && (
            <div className="comic-panel p-4 sm:col-span-2">
              <h3 className="font-display text-xs text-muted tracking-widest uppercase mb-3">
                {subclass?.name} Features
              </h3>
              <div className="space-y-3">
                {subclassFeatures.map((feature) => (
                  <div
                    key={`sc-${feature.level}-${feature.name}`}
                    className="p-3 border-2 border-comic-blue/30 bg-comic-blue/5 shadow-[2px_2px_0_rgba(0,0,0,0.1)]"
                  >
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs text-muted font-display">Lv {feature.level}</span>
                      <h4 className="font-display text-sm text-comic-blue tracking-wide">
                        {feature.name}
                      </h4>
                    </div>
                    <p className="text-xs text-muted mt-1 whitespace-pre-line">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Level Up Modal */}
      {showLevelUp && character && (
        <LevelUpModal
          character={character}
          onConfirm={handleLevelUp}
          onClose={() => setShowLevelUp(false)}
        />
      )}

      {/* Subclass Picker (for characters leveled past 3 before subclass system) */}
      {showSubclassPicker && character && (
        <SubclassPickerModal
          originId={data.originStory}
          onConfirm={handleSubclassPick}
          onClose={() => setShowSubclassPicker(false)}
        />
      )}
    </div>
  );
}
