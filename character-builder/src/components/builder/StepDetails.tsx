"use client";

import { ORIGIN_STORIES } from "@/data/origin-stories";
import { HUMAN_VARIANTS } from "@/data/human-variants";
import { HOME_TOWNS } from "@/data/home-towns";
import { FEATS } from "@/data/feats";
import { ABILITY_SCORES, ABILITY_SCORE_NAMES } from "@/data/ability-scores";
import { generateRealName, generateAlias } from "@/data/name-generator";
import type { CharacterData } from "@/lib/types";
import { abilityModifier, formatModifier } from "@/lib/utils";
import BackstoryPreview from "./BackstoryPreview";
import AvatarUpload from "./AvatarUpload";

interface Props {
  data: CharacterData;
  characterName: string;
  onNameChange: (name: string) => void;
  onUpdate: (patch: Partial<CharacterData>) => void;
}

export default function StepDetails({ data, characterName, onNameChange, onUpdate }: Props) {
  const variant = HUMAN_VARIANTS.find((v) => v.id === data.humanVariant);
  const homeTown = HOME_TOWNS.find((h) => h.id === data.homeTown);
  const origin = ORIGIN_STORIES.find((o) => o.id === data.originStory);

  function rollRealName() {
    onNameChange(generateRealName());
  }

  function rollAlias() {
    onUpdate({ alias: generateAlias(data.originStory, data.humanVariant) });
  }

  return (
    <div>
      <h2 className="font-display text-2xl text-comic-yellow tracking-wide mb-2">Name & Review</h2>
      <p className="text-muted mb-6">
        Give your hero a name, pick an alias if they have one, and review your build.
      </p>

      {/* Portrait */}
      <div className="mb-8">
        <label className="block font-display tracking-wide mb-2">Portrait</label>
        <AvatarUpload
          avatarUrl={data.avatarUrl}
          onUpload={(url) => onUpdate({ avatarUrl: url })}
        />
      </div>

      {/* Names */}
      <div className="grid gap-6 sm:grid-cols-2 mb-8">
        {/* Real name */}
        <div>
          <label htmlFor="charName" className="block font-display tracking-wide mb-2">
            Real Name
          </label>
          <div className="flex gap-2">
            <input
              id="charName"
              type="text"
              value={characterName}
              onChange={(e) => onNameChange(e.target.value)}
              placeholder="e.g. Frank Callahan"
              className="flex-1 px-4 py-3 bg-card-bg border-3 border-accent focus:outline-none text-xl font-display tracking-wide shadow-[4px_4px_0_#000]"
            />
            <button
              type="button"
              onClick={rollRealName}
              title="Generate a random name"
              className="comic-btn bg-comic-cyan text-black text-lg px-3"
            >
              🎲
            </button>
          </div>
          <p className="text-xs text-muted mt-1">
            Who they are when the mask is off.
          </p>
        </div>

        {/* Alias */}
        <div>
          <label htmlFor="charAlias" className="block font-display tracking-wide mb-2">
            Alias <span className="text-muted text-sm">(optional)</span>
          </label>
          <div className="flex gap-2">
            <input
              id="charAlias"
              type="text"
              value={data.alias}
              onChange={(e) => onUpdate({ alias: e.target.value })}
              placeholder="e.g. The Hammer"
              className="flex-1 px-4 py-3 bg-card-bg border-3 border-accent focus:outline-none text-xl font-display tracking-wide shadow-[4px_4px_0_#000]"
            />
            <button
              type="button"
              onClick={rollAlias}
              title="Generate a random alias"
              className="comic-btn bg-comic-red text-white text-lg px-3"
            >
              🎲
            </button>
          </div>
          <p className="text-xs text-muted mt-1">
            The name the world knows — or fears.
          </p>
        </div>
      </div>

      {/* Backstory preview */}
      <div className="mb-8">
        <h3 className="font-display text-lg text-accent tracking-wide mb-3">Your Backstory</h3>
        <BackstoryPreview data={data} characterName={characterName} />
      </div>

      {/* Mechanical summary */}
      <div className="mb-2">
        <h3 className="font-display text-lg tracking-wide mb-3">Character Sheet</h3>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="comic-panel p-4">
          <h3 className="font-display text-xs text-muted tracking-widest uppercase mb-1">Who Are You?</h3>
          <p className="font-display text-lg text-foreground">{variant?.name ?? "—"}</p>
          {variant?.tagline && (
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
          <h3 className="font-display text-xs text-muted tracking-widest uppercase mb-2">Ability Scores</h3>
          <div className="grid grid-cols-6 gap-2">
            {ABILITY_SCORES.map((ability) => {
              const base = data.abilityScores[ability];
              const bonus = data.abilityScoreBonuses[ability];
              const total = base + bonus;
              const mod = abilityModifier(total);

              return (
                <div key={ability} className="text-center p-2 border-2 border-card-border bg-background shadow-[2px_2px_0_rgba(0,0,0,0.2)]">
                  <p className="text-xs text-muted font-display">
                    {ABILITY_SCORE_NAMES[ability]}
                  </p>
                  <p className="text-xl font-display">{total}</p>
                  <p className="text-xs text-muted">{formatModifier(mod)}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="comic-panel p-4 sm:col-span-2">
          <h3 className="font-display text-xs text-muted tracking-widest uppercase mb-2">Feats</h3>
          <div className="flex flex-wrap gap-2">
            {data.feats.map((featId) => {
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
        {homeTown && (
          <div className="comic-panel p-4 sm:col-span-2">
            <h3 className="font-display text-xs text-muted tracking-widest uppercase mb-2">Skill Proficiencies</h3>
            <div className="flex flex-wrap gap-2">
              {[...new Set([...homeTown.skillProficiencies, ...data.skillProficiencies])].map(
                (skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 text-sm font-display border-2 border-accent/30 bg-accent/5 text-accent shadow-[2px_2px_0_rgba(0,0,0,0.1)]"
                  >
                    {skill}
                  </span>
                )
              )}
            </div>
            {homeTown.toolProficiency && (
              <p className="text-sm text-muted mt-2">
                Tool: {homeTown.toolProficiency}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
